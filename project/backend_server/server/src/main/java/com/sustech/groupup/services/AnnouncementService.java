package com.sustech.groupup.services;

import java.util.List;

import com.sustech.groupup.entity.api.AnnouncementDTO;

public interface AnnouncementService {

    List<AnnouncementDTO> getAnnouncements(long surveyId, int pageSize, int pageNo,
                                           long requestUserId);

    long createAnnouncement(long surveyID, AnnouncementDTO dto, long requestUserId);

    void updateAnnouncement(long surveyID, long aid, AnnouncementDTO dto, long requestUserId);

    void deleteAnnouncement(long surveyID, long aid, AnnouncementDTO dto, long requestUserId);

    AnnouncementDTO getAnnouncement(long id, long aid, long requestUserId);
}
