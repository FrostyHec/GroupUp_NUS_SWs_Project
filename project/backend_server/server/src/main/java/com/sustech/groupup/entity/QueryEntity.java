package com.sustech.groupup.entity;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QueryEntity {
    private int id;
    private String state;
    private int tempId;
    private Map<String, String> info;
}
