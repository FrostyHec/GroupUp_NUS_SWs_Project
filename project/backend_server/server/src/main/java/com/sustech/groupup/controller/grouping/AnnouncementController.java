package com.sustech.groupup.controller.grouping;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sustech.groupup.config.Constant;
import com.sustech.groupup.entity.api.AnnouncementDTO;
import com.sustech.groupup.services.AnnouncementService;
import com.sustech.groupup.utils.Response;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(Constant.API_VERSION + "/survey/{id}/announcement")
@RequiredArgsConstructor
public class AnnouncementController {

    private final AnnouncementService announcementService;

    @GetMapping("/{aid}")
    public Response getAnnouncement(@PathVariable long id,
                                    @PathVariable long aid,
                                     long request_user_id
    ) {
        AnnouncementDTO res = announcementService.getAnnouncement(id, aid, request_user_id);
        return Response.getSuccess(Map.of("announcement", res));
    }
    @PostMapping
    public Response createAnnouncement(
            @PathVariable long id,
            @RequestBody @NonNull AnnouncementDTO dto,
            long request_user_id
    ){
        long aid = announcementService.createAnnouncement(id, dto, request_user_id);
        return Response.getSuccess(Map.of("id", aid));
    }

    @PutMapping("/{aid}")
    public Response updateAnnouncement(
            @PathVariable long id,
            @PathVariable long aid,
            @RequestBody @NonNull AnnouncementDTO dto,
            long request_user_id
    ){
        announcementService.updateAnnouncement(id,aid, dto, request_user_id);
        return Response.getSuccess();
    }

    @DeleteMapping("/{aid}")
    public Response deleteAnnouncement(
            @PathVariable long id,
            @PathVariable long aid,
            @RequestBody @NonNull AnnouncementDTO dto,
            long request_user_id
    ){
        announcementService.deleteAnnouncement(id,aid, dto, request_user_id);
        return Response.getSuccess();
    }

    @GetMapping
    public Response getAnnouncements(@PathVariable long id,
                                     int page_size, int page_no,
                                     long request_user_id
    ) {
        if (!(page_size==-1)&&(page_size<=0||page_no<=0)){
            return Response.getInternalError("bad-params");
        }
        List<AnnouncementDTO> res =
                announcementService.getAnnouncements(id, page_size, page_no, request_user_id);
        return Response.getSuccess(Map.of("announcements", res));
    }
}
