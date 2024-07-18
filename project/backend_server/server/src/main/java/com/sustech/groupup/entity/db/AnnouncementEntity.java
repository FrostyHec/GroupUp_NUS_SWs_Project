package com.sustech.groupup.entity.db;

import java.sql.Timestamp;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@TableName("announcement")
public class AnnouncementEntity {
    @TableId(type = IdType.AUTO)
    private Long id;
    private Long surveyId;
    private String title;
    private String description;
    private Timestamp createAt;
    private Timestamp updateAt;
}
