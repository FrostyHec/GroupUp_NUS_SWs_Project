package com.sustech.groupup.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GroupEntity {
    private int id;
    private String state;
    private int surveyId;
}
