package com.sustech.groupup.services.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.sustech.groupup.entity.api.AnnouncementDTO;
import com.sustech.groupup.mapper.AnnouncementMapper;
import com.sustech.groupup.services.AnnouncementService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AnnouncementServiceImpl implements AnnouncementService {

    private final AnnouncementMapper announcementMapper;
    @Override
    public List<AnnouncementDTO> getAnnouncement(long surveyId, int pageSize, int pageNo,
                                                 long requestUserId) {
        var res=  announcementMapper.getAnnouncement(surveyId,pageSize, pageNo);
        return null;
    }
}
