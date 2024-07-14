package com.sustech.groupup.services;

import java.util.List;

import com.sustech.groupup.entity.api.LoginAuthDTO;
import com.sustech.groupup.entity.api.UserPublicQueryDTO;
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
    List<Long> queryOwnSurvey(long id, int pageSize, int pageNo);

    /**
     * return survey id list or throw failed exception
     */
    List<Long> queryParticipateSurvey(long id, int pageSize, int pageNo);

    /**
     * return survey id list or throw failed exception
     */
    List<Long> queryReceivedAnnouncement(long uid, int pageSize, int pageNo);
    List<UserPublicQueryDTO> queryUserLikeName(String username);
    UserEntity getUserById(long id);
}
