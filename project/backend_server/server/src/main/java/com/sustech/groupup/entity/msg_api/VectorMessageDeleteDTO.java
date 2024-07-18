package com.sustech.groupup.entity.msg_api;

import lombok.Data;

@Data
public class VectorMessageDeleteDTO {
    private VectorMessageType type = VectorMessageType.DELETE;
    private long user_id;
    private long survey_id;

    public VectorMessageDeleteDTO(long memberId, long surveyId) {
        this.user_id = memberId;
        this.survey_id = surveyId;
    }
}
