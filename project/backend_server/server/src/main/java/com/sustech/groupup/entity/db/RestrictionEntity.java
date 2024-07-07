package com.sustech.groupup.entity.db;

import java.util.List;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.extension.handlers.JacksonTypeHandler;

public class RestrictionEntity {
    private int groupSize;
    @TableField(typeHandler = JacksonTypeHandler.class)
    private List<RuleEntity> customizedRestriction;
}
