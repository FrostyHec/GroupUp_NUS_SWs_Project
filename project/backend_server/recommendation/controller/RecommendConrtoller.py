from enum import Enum
from typing import Dict

from flask import Flask, request, make_response, jsonify

from common.HTTPWrapper import common_http_response
from dto.Singleton import Singleton
from config.Config import Config
from service.DatabaseMapper import DatabaseMapper
from mapper.VectorService import VectorService

app = Flask(__name__)


@app.route(Config.base_api + '/survey/<int:id>/recommend/group', methods=['GET'])
@common_http_response
def recommend_group(id):
    page_size = int(request.args.get('page_size'))
    page_no = int(request.args.get('page_no'))
    user_id = int(request.args.get('user_id'))
    survey_id = id

    user_vector = VectorService.query_user_vector(survey_id, user_id)
    user_group = VectorService.query_user_group_vectors(survey_id,user_id)
    current_group = VectorService.query_current_group_vectors()
    restriction = DatabaseMapper.get_restriction(survey_id)
    res: Dict[int, float] = Singleton.recommender.get_group_preference_order(user_vector,
                                                                             user_group,
                                                                             current_group,
                                                                             restriction)
    # TODO  to dict, please, and limit size

    return res


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=Config.port)
