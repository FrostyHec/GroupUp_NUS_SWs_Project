package com.sustech.groupup.controller.grouping;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sustech.groupup.config.Constant;
import com.sustech.groupup.entity.api.AnnouncementDTO;
import com.sustech.groupup.services.AnnouncementService;
import com.sustech.groupup.utils.Response;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(Constant.API_VERSION + "/survey/{id}/announcement")
@RequiredArgsConstructor
public class AnnouncementController {

    private final AnnouncementService announcementService;

    @GetMapping
    public Response getAnnouncement(@PathVariable long id,
                                    int page_size, int page_no,
                                    long request_user_id
    ) {
        List<AnnouncementDTO> res = announcementService.getAnnouncement(id, page_size, page_no, request_user_id);
        return Response.getSuccess(Map.of("announcements", res));
    }
}
