package com.sustech.groupup.entity.api;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GroupResponseDTO {
    private Long requestId;
    private Long fromId;
    private boolean status;
    private Timestamp updateAt;
}
