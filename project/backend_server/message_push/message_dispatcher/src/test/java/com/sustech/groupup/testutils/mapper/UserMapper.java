package com.sustech.groupup.testutils.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.sustech.groupup.testutils.entity.UserEntity;
@Mapper
public interface UserMapper extends BaseMapper<UserEntity> {


}
