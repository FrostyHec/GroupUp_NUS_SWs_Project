package com.sustech.groupup.services;

import java.util.List;

import com.sustech.groupup.entity.api.LoginAuthDTO;

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
    List<Long> queryOwnSurvey(int id, int pageSize, int pageNo);

    /**
     * return survey id list or throw failed exception
     */
    List<Long> queryParticipateSurvey(int id, int pageSize, int pageNo);

    /**
     * return survey id list or throw failed exception
     */
    List<Long> queryReceivedAnnouncement(int id, int pageSize, int pageNo);
}
