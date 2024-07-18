package com.sustech.groupup.services;

import java.util.List;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.sustech.groupup.entity.api.AnnouncementDTO;
import com.sustech.groupup.entity.api.LoginAuthDTO;
import com.sustech.groupup.entity.api.QueryDTO;
import com.sustech.groupup.entity.api.SurveyDTO;
import com.sustech.groupup.entity.api.UserPublicQueryDTO;
import com.sustech.groupup.entity.db.AnnouncementEntity;
import com.sustech.groupup.entity.db.QueryEntity;
import com.sustech.groupup.entity.db.UserEntity;

public interface UserService {

    /**
     * return success authDTO or throw failed exception
     */
    LoginAuthDTO login(String username, String password);

    /**
     * complete or throw failed exception
     */
    void register(String username, String password);

    /**
     * return survey id list or throw failed exception
     */
    List<SurveyDTO> queryOwnSurvey(long id, int pageSize, int pageNo) throws JsonProcessingException;

    /**
     * return survey id list or throw failed exception
     */
    List<SurveyDTO> queryParticipateSurvey(long id, int pageSize, int pageNo) throws JsonProcessingException;

    /**
     * return survey id list or throw failed exception
     */
    List<AnnouncementDTO> queryReceivedAnnouncement(long uid, int pageSize, int pageNo);
    List<UserPublicQueryDTO> queryUserLikeName(String username);
    UserEntity getUserById(long id);
}
