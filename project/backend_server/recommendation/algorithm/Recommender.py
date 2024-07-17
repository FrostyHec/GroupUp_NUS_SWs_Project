from typing import List, Dict, Optional

from DTO.GroupVectors import GroupVectors
from algorithm.Vector import Vector
from openai import OpenAI
import json

'''
This will be the format of the survey:
[{"id":"1989","type":"TextField","extraAttributes":{"label":"Text field","helperText":"Helper text","required":false,"placeHolder":"Value here..."}},
{"id":"8491","type":"NumberField","extraAttributes":{"label":"Number field","helperText":"Helper text","required":false,"placeHolder":"0"}},
{"id":"4297","type":"TextAreaField","extraAttributes":{"label":"Text area","helperText":"Helper text","required":false,"placeHolder":"Value here...","rows":3}},
{"id":"2355","type":"DateField","extraAttributes":{"label":"Date field","helperText":"Pick a date","required":false}},
{"id":"5736","type":"SelectField","extraAttributes":{"label":"Select field","helperText":"Helper text","placeHolder":"Value here...","required":false,"options":["512","125"]}},
{"id":"4740","type":"CheckboxField","extraAttributes":{"label":"Checkbox field","helperText":"Helper text","required":false}}]

This will a answer format:
{"1989":"124124","2355":"Mon, 01 Jul 2024 16:00:00 GMT","4297":"214124214","4740":"true","5736":"125","8491":"125125125"}
'''

class Recommender: # Can choose different methods to encode the survey.
    def __init__(self, API_key: str):
        self.client = OpenAI(api_key=API_key, base_url="https://api.deepseek.com")

    def get_vector(self, survey: JSON, answer: JSON) -> Vector:
        # Filter out the question type.
        conserved_type = ["TextField", "NumberField", "TextAreaField", "DateField", "SelectField", "CheckboxField"]
        filtered_survey = list(filter(lambda x: x['type'] not in conserved_type, survey))
        
        # Append labels with the answer.
        filtered_survey = list(map(lambda x: x['extraAttributes']['label'] + ": " + answer[x['id']], filtered_survey))
        
        print(length(filtered_survey))
        print(filtered_survey)
        

    def get_willing(self, survey: JSON, willing: str) -> Vector:
        user_content = '问卷内容：' + questionnaire + '\n\n' + '文本内容：' + text
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

    def get_person_preference_order(self, user: Vector,
                                    user_group: Optional[GroupVectors],
                                    current_ungrouped_person: Dict[int, Vector],
                                    restriction) -> Dict[int, float]:
        pass

    def get_group_preference_order(self, user: Vector,
                                   user_group: Optional[GroupVectors],
                                   current_group: List[GroupVectors],
                                   restriction
                                   ) -> Dict[int, float]:
        pass

    def grouping(self, current_group: List[GroupVectors],
                 current_ungrouped: Dict[int, Vector],
                 restriction) -> List[GroupVectors]:
        pass
