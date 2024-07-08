package com.sustech.groupup.services;

import java.util.List;

public interface UserService {

    /**
     * return success token or throw failed exception
     */
    String login(String username, String password);

    /**
     * complete or throw failed exception
     */
    void register(String username, String password);

    /**
     * return survey id list or throw failed exception
     */
    List<Long> queryOwnSurvey(int id, String pageSize, String pageNo);

    /**
     * return survey id list or throw failed exception
     */
    List<Long> queryParticipateSurvey(int id, String pageSize, String pageNo);

    /**
     * return survey id list or throw failed exception
     */
    List<Long> queryReceivedAnnouncement(int id, String pageSize, String pageNo);
}
