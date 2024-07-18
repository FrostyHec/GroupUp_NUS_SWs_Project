package com.sustech.groupup.mapper;


import java.util.List;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.sustech.groupup.entity.api.UserPublicQueryDTO;
import com.sustech.groupup.entity.db.UserEntity;

import org.apache.ibatis.annotations.*;

@Mapper
public interface UserMapper extends BaseMapper<UserEntity> {
}
