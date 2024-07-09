package com.sustech.groupup.services;

import java.util.List;

import com.sustech.groupup.entity.api.AnnouncementDTO;

public interface AnnouncementService {

    List<AnnouncementDTO> getAnnouncement(long surveyId, int pageSize, int pageNo,
                                          long requestUserId);
}
