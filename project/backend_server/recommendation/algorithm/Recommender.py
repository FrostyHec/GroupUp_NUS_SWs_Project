from typing import List, Dict, Optional

from DTO.GroupVectors import GroupVectors
from algorithm.Vector import Vector

from openai import OpenAI
import json
import numpy as np
from text2vec import SentenceModel, cos_sim, semantic_search
from sklearn.cluster import KMeans

'''
This will be the format of the survey:
[{"id":"1989","type":"TextField","extraAttributes":{"label":"Text field","helperText":"Helper text","required":false,"placeHolder":"Value here..."}},
{"id":"8491","type":"NumberField","extraAttributes":{"label":"Number field","helperText":"Helper text","required":false,"placeHolder":"0"}},
{"id":"4297","type":"TextAreaField","extraAttributes":{"label":"Text area","helperText":"Helper text","required":false,"placeHolder":"Value here...","rows":3}},
{"id":"2355","type":"DateField","extraAttributes":{"label":"Date field","helperText":"Pick a date","required":false}},
{"id":"5736","type":"SelectField","extraAttributes":{"label":"Select field","helperText":"Helper text","placeHolder":"Value here...","required":false,"options":["512","125"]}},
{"id":"4740","type":"CheckboxField","extraAttributes":{"label":"Checkbox field","helperText":"Helper text","required":false}}]

This will a answer format:
{"1989":"124124",
"2355":"Mon, 01 Jul 2024 16:00:00 GMT",
"4297":"214124214",
"4740":"true",
"5736":"125",
"8491":"125125125"}
'''

models = {
    "text2vec": "shibing624/text2vec-base-chinese",
    "text2vec-multilingual": "shibing624/text2vec-base-multilingual"
}

class Recommender:
    def __init__(self, API_key: str, model: str = "default"):
        self.client = OpenAI(api_key=API_key, base_url="https://api.deepseek.com")
        if(model == "default" or model not in models.keys()):
            self.model = SentenceModel()
        else:
            self.model = SentenceModel(models[model])

    def get_vector(self, survey: JSON, answer: JSON) -> Vector:
        """
        :param survey: 标准问卷的json格式
        :param answer:
        :return:
        """
        # Filter out the question type.
        conserved_type = ["TextField", "NumberField", "TextAreaField", "DateField", "SelectField", "CheckboxField"]
        filtered_survey = list(filter(lambda x: x['type'] not in conserved_type, survey))
        
        corpus = []
        for survey in filtered_survey:
            target_id = survey['id']
            result = [item.value for item in answer if item.key == target_id]
            content = str(result[0])
            corpus.append(content)
        
        corpus_np = np.array(corpus)
        vector = self.model.encode(corpus_np)
        shape = vector.shape
        result = Vector(shape, vector)
        return result
            
    def get_willing(self, survey: JSON, willing: str, answer: JSON) -> Vector:
         # Filter out the question type.
        conserved_type = ["TextField", "NumberField", "TextAreaField", "DateField", "SelectField", "CheckboxField"]
        filtered_survey = list(filter(lambda x: x['type'] not in conserved_type, survey))
        
        # Make Prompts to deepseek chat to transform the willing into a survey answer.
        user_content = '问卷内容：' + str(filtered_survey) + '\n\n' + '文本内容：' + text
        response = self.client.chat.completions.create(
            model="deepseek-chat",
            messages=[
                {"role": "system", "content": "你是一个根据JSON格式转换文本的助手，我会给你一个问卷的JSON格式文件，然后输入一段文字，请你把文字转换成问卷的答案，然后用JSON返回给我（请直接返回JSON格式{id:number, answer:string}）"},
                {"role": "user", "content": user_content},
            ],
            stream=False
        )
        response = response.choices[0].message.content
        response = '\n'.join(response.splitlines()[1:-1])
        response = json.loads(response)
        if(len(response) != len(filtered_survey)):
            raise Exception("The answer is not complete.")
        
        # Transform the answer into embeddings.
        corpus = []
        for answer_willing in response:
            answer_id = answer_willing['id']
            answer_input = [item.value for item in answer if item.key == answer_id]
            content = str(answer_willing['answer']) + " " + answer_input[0]
            corpus.append(content)
        corpus_np = np.array(corpus)
        vector = self.model.encode(corpus_np)
        shape = vector.shape
        result = Vector(shape, vector)
        return result
        
    def get_person_preference_order(self, user: Vector, 
                                    user_group: Optional[GroupVectors], 
                                    current_ungrouped_person: Dict[int, Vector],
                                    restriction) -> Dict[int, float]:
        """
        :param user: 用户的向量
        :param user_group: 可能用户不在一个组中，此时为None
        :param current_group: 当前的组队的组
        :param restriction: 组队的限制
        :return: <groupid,recommendation_value(0~100)>
        """
        if user_group is not None:
            user_group_vector = user_group.info
            user_group_vector = list(user_group_vector.values())
            user_group_vector = np.array(user_group_vector)
            user_group_vector = np.mean(user_group_vector, axis=0)
            user_group_vector = Vector(user_group_vector.shape, user_group_vector)
        else:
            user_group_vector = user
        
        queries_embedding = user_group_vector.vector
        group_ids = list(current_ungrouped_person.keys())
        group_vectors = list(current_ungrouped_person.values())
        group_transpose = np.transpose(np.array(group_vectors), (1, 0, 2))
        result = np.zeros(len(group_vectors), dtype=float)
        for index, query_embedding in enumerate(queries_embedding):
            group_embedding = group_transpose[index]
            similarities = cos_sim(query_embedding, group_embedding)
            result = np.add(result, similarities)
        result = result / len(queries_embedding)
        result_dict = dict(zip(group_ids, result)) * 100
        return result_dict

    def get_group_preference_order(self, user: Vector,
                                   user_group: Optional[GroupVectors],
                                   current_group: List[GroupVectors],
                                   restriction
                                   ) -> Dict[int, float]:
        """
        :param user: 用户的向量
        :param user_group: 可能用户不在一个组中，此时为None
        :param current_group: 当前的组队的组
        :param restriction: 组队的限制
        :return: <groupid,recommendation_value(0~100)>
        """
        if user_group is not None:
            user_group_vector = user_group.info
            user_group_vector = list(user_group_vector.values())
            user_group_vector = np.array(user_group_vector)
            user_group_vector = np.mean(user_group_vector, axis=0)
            user_group_vector = Vector(user_group_vector.shape, user_group_vector)
        else:
            user_group_vector = user
            
        groups = {}
        for group in current_group:
            group_id = group.group_id
            group_vector = group.info
            group_vector = list(group_vector.values())
            group_vector = np.array(group_vector)
            group_vector = np.mean(group_vector, axis=0)
            group_vector = Vector(group_vector.shape, group_vector)
            groups[group_id] = group_vector
        
        queries_embedding = user_group_vector.vector
        group_ids = list(groups.keys())
        group_vectors = list(groups.values())
        group_transpose = np.transpose(np.array(group_vectors), (1, 0, 2))
        result = np.zeros(len(group_vectors), dtype=float)
        for index, query_embedding in enumerate(queries_embedding):
            group_embedding = group_transpose[index]
            similarities = cos_sim(query_embedding, group_embedding)
            result = np.add(result, similarities)
        result = result / len(queries_embedding) * 100
        result_dict = dict(zip(group_ids, result))
        return result_dict 

    def grouping(self, current_group: List[GroupVectors],
                 current_ungrouped: Dict[int, Vector],
                 restriction) -> List[GroupVectors]:
        """
        :param current_group:
        :param current_ungrouped:
        :param restriction:
        :return: 新创建的组的Group的Group ID 为 -1
        """
        # First transform the current_group into a list of vectors.
        group_with_vacancies = {}
        group_members_left = {}
        group_index = {}
        for index, group in enumerate(current_group):
            if(len(group.info) >= restriction):
                continue
            group_vector = group.info
            group_id = group.group_id
            group_vector = list(group_vector.values())
            group_vector = np.array(group_vector)
            group_vector = np.mean(group_vector, axis=0)
            group_vector = Vector(group_vector.shape, group_vector)
            group_vectors[group_id] = group_vector
            group_members_left[group_id] = restriction - len(group.info)
            group_index[group_id] = index
            
        # Calculate the preference for users to the group.
        user_preferences = {}
        group_preferences = {}
        for user_id, user_vector in current_ungrouped.items():
            user_preference = self.get_group_preference_order(user_vector, None, group_with_vacancies, restriction)
            user_preference = dict(sorted(user_preference.items(), key=lambda x: x[1], reverse=True))
            user_preference = {key: value for key, value in user_preference.items() if group_members_left[key] > 0}
            user_preferences[user_id] = user_preference
            
        for group_id, group_vector in group_with_vacancies.items():
            group_preference = self.get_person_preference_order(group_vector, None, current_ungrouped, restriction)
            group_preference = dict(sorted(group_preference.items(), key=lambda x: x[1], reverse=True))
            group_preferences[group_id] = group_preference
        
        # Start the grouping process: First use the gale-shapley algorithm to match the user to the group. 
        # If the group is full, then the user will be sorted using KNN algorithm to form new groups.
        unmatched_users = queue(user_preferences.keys())
        group_application = {key: [] for key in group_members_left.keys()}

        while unmatched_users:
            if(len(unmatched_users) == 0):
                break
            if(all(value == 0 for value in group_members_left.values())):
                break
            user_id = unmatched_users.pop(0)
            if(user_preferences[user_id] == {}):
                unmatched_users.append(user_id)
                continue
            user_pref = user_preferences[user_id] # Dict[group_id, preference]

            for group_id in user_pref.keys():
                del user_preferences[user_id][group_id]
                if(group_members_left[group_id] > 0):
                    group_application[group_id].append(user_id)
                    group_members_left[group_id] -= 1
                    break
                else:
                    group_pref = group_preferences[group_id] # Dict[user_id, preference]
                    min_id = min(group_application[group_id], key=lambda x: group_pref[x])
                    if(group_pref[min_id] < group_pref[user_id]):
                        group_application[group_id].remove(min_id)
                        group_application[group_id].append(user_id)
                        unmatched_users.append(min_id)
                        break
                    else:
                        unmatched_users.append(user_id)
                        break
            
        # Form the new groups for the group_application.
        for group_id, user_ids in group_application.items():
            for user_id in user_ids:
                current_group[group_index[group_id]].info[user_id] = current_ungrouped[user_id]
                del current_ungrouped[user_id]
                
        # For unmatched users, use KNN to form new groups.
        user_to_user = {}
        user_index = {}
        for index, user_id in enumerate(unmatched_users):
            user_vector = current_ungrouped[user_id]
            user_vector = user_vector.vector
            user_preference = self.get_group_preference_order(user_vector, None, current_ungrouped, restriction)
            user_preference[user_id] = 0
            user_preference = dict(sorted(user_preference.items(), key=lambda x: x[1], reverse=True))
            user_to_user[user_id] = user_preference
            user_index[user_id] = index
            
        # Calculate the similarity between users.
        similarity_matrix = np.zeros((n, n))
        for user_id, user_preference in user_to_user.items():
            for target_id, preference in user_preference.items():
                similarity_matrix[user_index[user_id]][user_index[target_id]] = preference
        
        cluster_size = len(unmatched_users) / restriction
        kmeans = KMeans(n_clusters=cluster_size, random_state=0).fit(similarity_matrix)
        labels = kmeans.labels_
        
        new_group = {}
        for index, label in enumerate(labels):
            if(label not in new_group.keys()):
                new_group[label] = GroupVectors(-1, {})
            user_id = user_index[index]
            new_group[label].info[user_id] = current_ungrouped[user_id]
            del current_ungrouped[user_id]           
        
        final_group = current_group + list(new_group.values())
        return final_group
        
        
