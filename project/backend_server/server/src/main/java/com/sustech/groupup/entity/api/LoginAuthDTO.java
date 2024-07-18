package com.sustech.groupup.entity.api;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginAuthDTO {
    long id;
    String token;
}
