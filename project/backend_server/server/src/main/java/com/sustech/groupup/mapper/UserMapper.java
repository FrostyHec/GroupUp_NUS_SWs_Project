package com.sustech.groupup.mapper;


import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.sustech.groupup.entity.db.DemoEntity;
import org.apache.ibatis.annotations.*;

@Mapper
public interface UserMapper extends BaseMapper<DemoEntity> {
}
