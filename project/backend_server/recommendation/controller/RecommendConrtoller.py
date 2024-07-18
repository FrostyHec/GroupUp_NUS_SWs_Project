from typing import Dict, List, Tuple

from flask import request, Flask
from flask_cors import CORS

from common.HTTPWrapper import common_http_response
from common.Log import Log
from common.Response import Response
from dto.GroupVectors import GroupVectors
from dto.Singleton import Singleton
from config.Config import Config
from exception.Exception import ExternalException
from mapper.DatabaseMapper import DatabaseMapper
from service.VectorService import VectorService

app = Flask(__name__)
CORS(app,resource=r'/*')


@app.route(Config.base_api + '/survey/<int:sid>/recommend/group', methods=['GET','OPTIONS'])
@common_http_response
def recommend_group(sid):
    Log.info(f'rcvd_recommend_group, sid:{sid}')
    try:
        page_size = int(request.args.get('page_size'))
        page_no = int(request.args.get('page_no'))
        user_id = int(request.args.get('user_id'))
        description = request.args.get('description')
        description = description if description is not None else ""
        if isinstance(description, str):
            description = description.strip()
        else:
            description = str(description)
        survey_id = sid
    except Exception as e:
        raise ExternalException(Response.get_bad_request(e))
        # 入参检查
    if page_size != -1 and page_no == -1:
        raise ExternalException(Response.get_bad_request(f'request param invalid:page_size:'
                                                         f'{page_size},page_no:{page_no}'))

    user_group = VectorService.query_user_group_vectors(survey_id, user_id)
    current_group = VectorService.query_current_group_vectors(survey_id, user_id)
    restriction = DatabaseMapper.get_restriction(survey_id)
    if description == "":
        user_vector = VectorService.query_user_vector(survey_id, user_id)
    else:
        try:
            user_vector = VectorService.generate_user_vector_by_description(survey_id, description, user_id)
        except Exception as e:
            Log.warn(f"error while generating user vector by description:{e},description:{description}")
            return Response.get_bad_request("cant-generate-recommendation")

    rcmd: Dict[int, float] = Singleton.recommender.get_group_preference_order(user_vector,
                                                                              user_group,
                                                                              current_group,
                                                                              restriction)
    sorted_list: List[Tuple[int, float]] = sorted(rcmd.items(), key=lambda item: item[1],
                                                  reverse=True)
    res = {}
    if page_size != -1:
        start_index = (page_no - 1) * page_size
        end_index = start_index + page_size
        sorted_list = sorted_list[start_index:end_index]

    res['list'] = [{'group_id': gid, 'recommend': val} for gid, val in sorted_list]
    return Response.get_success(res)


@app.route(Config.base_api + '/survey/<int:sid>/recommend/ungrouped', methods=['GET','OPTIONS'])
@common_http_response
def recommend_ungrouped(sid):
    Log.info(f'rcvd_recommend_ungrouped, sid:{sid}')
    try:
        page_size = int(request.args.get('page_size'))
        page_no = int(request.args.get('page_no'))
        user_id = int(request.args.get('user_id'))
        description = request.args.get('description')
        description = description if description is not None else ""
        if isinstance(description, str):
            description = description.strip()
        else:
            description = str(description)
        survey_id = sid
    except Exception as e:
        raise ExternalException(Response.get_bad_request(e))
        # 入参检查
    if page_size != -1 and page_no == -1:
        raise ExternalException(Response.get_bad_request(f'request param invalid:page_size:'
                                                         f'{page_size},page_no:{page_no}'))

    user_group = VectorService.query_user_group_vectors(survey_id, user_id)
    current_ungrouped = VectorService.query_current_person_vectors(survey_id, user_id)
    restriction = DatabaseMapper.get_restriction(survey_id)
    if description == "":
        user_vector = VectorService.query_user_vector(survey_id, user_id)
    else:
        try:
            user_vector = VectorService.generate_user_vector_by_description(survey_id, description, user_id)
        except Exception as e:
            Log.warn(f"error while generating user vector by description:{e},description:{description}")
            return Response.get_bad_request("cant-generate-recommendation")

    rcmd: Dict[int, float] = Singleton.recommender.get_person_preference_order(user_vector,
                                                                               user_group,
                                                                               current_ungrouped,
                                                                               restriction)
    sorted_list: List[Tuple[int, float]] = sorted(rcmd.items(), key=lambda item: item[1],
                                                  reverse=True)
    res = {}
    if page_size != -1:
        start_index = (page_no - 1) * page_size
        end_index = start_index + page_size
        sorted_list = sorted_list[start_index:end_index]

    res['list'] = [{'user_id': gid, 'recommend': val} for gid, val in sorted_list]
    return Response.get_success(res)



@app.route(Config.base_api + '/survey/<int:sid>/recommend/pregrouping', methods=['GET','OPTIONS'])
@common_http_response
def pre_grouping(sid):
    Log.info(f'rcvd_pregrouping, sid:{sid}')
    # TODO 预组对接口
    current_group:List[GroupVectors] = VectorService.query_current_group_vectors(sid)
    current_ungrouped = VectorService.query_current_person_vectors(sid)
    restriction = DatabaseMapper.get_restriction(sid)
    group_res = Singleton.recommender.grouping(current_group,current_ungrouped,restriction)
    DatabaseMapper.update_grouping_result(sid,group_res)
    return Response.get_success()

