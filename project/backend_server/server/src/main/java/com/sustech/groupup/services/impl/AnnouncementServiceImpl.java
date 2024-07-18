package com.sustech.groupup.services.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sustech.groupup.entity.api.AnnouncementDTO;
import com.sustech.groupup.entity.converter.AnnouncementConverter;
import com.sustech.groupup.entity.db.AnnouncementEntity;
import com.sustech.groupup.exception.ExternalException;
import com.sustech.groupup.mapper.AnnouncementMapper;
import com.sustech.groupup.mapper.SurveyMapper;
import com.sustech.groupup.services.AnnouncementService;
import com.sustech.groupup.services.MessagePushService;
import com.sustech.groupup.utils.Response;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AnnouncementServiceImpl implements AnnouncementService {

    private final AnnouncementMapper announcementMapper;
    private final SurveyMapper surveyMapper;
    private final MessagePushService messagePushService;
    @Override
    @Transactional
    public List<AnnouncementDTO> getAnnouncements(long surveyId, int pageSize, int pageNo,
                                                  long requestUserId) {
        //鉴权
        if(!surveyMapper.isAccessable(surveyId, requestUserId)){
            throw new ExternalException(Response.getUnauthorized("no-privilege"));
        }
        List<AnnouncementEntity> res=  announcementMapper.getAnnouncementInSurvey(surveyId, pageSize, pageNo);
        return res.stream().map(AnnouncementConverter::toDTO).toList();
    }

    @Override
    @Transactional
    public long createAnnouncement(long surveyID, AnnouncementDTO dto, long requestUserId) {
        if(!surveyMapper.isOwner(surveyID,requestUserId)){
            throw new ExternalException(Response.getUnauthorized("no-privilege"));
        }
        AnnouncementEntity entity = AnnouncementConverter.toEntity(surveyID,dto);
        announcementMapper.insert(entity);
        var members = surveyMapper.getMemberIdBySurveyId(entity.getSurveyId());
        messagePushService.pushEmptyToIds(requestUserId,members);
        return entity.getId();
    }

    @Override
    @Transactional
    public void updateAnnouncement(long surveyID, long aid, AnnouncementDTO dto, long requestUserId) {
        if(!surveyMapper.isOwner(surveyID,requestUserId)){
            throw new ExternalException(Response.getUnauthorized("no-privilege"));
        }
        AnnouncementEntity entity = AnnouncementConverter.toEntity(surveyID,dto);
        entity.setId(aid);
        announcementMapper.updateById(entity);
    }

    @Override
    @Transactional
    public void deleteAnnouncement(long surveyID, long aid, AnnouncementDTO dto, long requestUserId) {
        if(!surveyMapper.isOwner(surveyID,requestUserId)){
            throw new ExternalException(Response.getUnauthorized("no-privilege"));
        }
        AnnouncementEntity entity = AnnouncementConverter.toEntity(surveyID,dto);
        entity.setId(aid);
        announcementMapper.deleteById(entity);
    }

    @Override
    public AnnouncementDTO getAnnouncement(long id, long aid, long requestUserId) {
        if(!surveyMapper.isAccessable(id, requestUserId)){
            throw new ExternalException(Response.getUnauthorized("no-privilege"));
        }
        AnnouncementEntity res = announcementMapper.selectById(aid);
        return AnnouncementConverter.toDTO(res);
    }
}
