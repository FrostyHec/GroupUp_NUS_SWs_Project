package com.sustech.groupup.entity.api;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GroupResponseDTO {
    private long fromId;
    private long surveyId;
    private Timestamp creatAt;
    private Timestamp updateAt;
    private String message;
    private int status;
    private Long requestId;
    private Long userId;
}
