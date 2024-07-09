package com.sustech.groupup.entity.api;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnnouncementDTO {
    private String title;
    private String description;
    private Timestamp createAt;
    private Timestamp updateAt;
}
