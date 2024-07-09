package com.sustech.groupup.entity.api;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserPublicQueryDTO {
    private long id;
    private String username;
}
