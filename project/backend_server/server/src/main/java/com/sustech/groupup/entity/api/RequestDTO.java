package com.sustech.groupup.entity.api;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequestDTO {
    private Long fromId;
    private boolean toGroup;
    private Long toId;
    private Timestamp createAt;
    private String message;
}
