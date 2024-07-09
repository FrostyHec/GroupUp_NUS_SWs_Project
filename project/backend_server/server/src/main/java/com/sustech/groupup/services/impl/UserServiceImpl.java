package com.sustech.groupup.services.impl;

import java.util.List;
import java.util.Map;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.sustech.groupup.entity.api.UserPublicQueryDTO;
import com.sustech.groupup.entity.db.UserEntity;
import com.sustech.groupup.entity.api.LoginAuthDTO;
import com.sustech.groupup.exception.ExternalException;
import com.sustech.groupup.mapper.SurveyMapper;
import com.sustech.groupup.mapper.UserMapper;
import com.sustech.groupup.services.UserService;
import com.sustech.groupup.utils.JwtUtil;
import com.sustech.groupup.utils.Response;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserMapper userMapper;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final SurveyMapper surveyMapper;

    @Override
    public LoginAuthDTO login(String username, String password) {
        QueryWrapper<UserEntity> queryWrapper = Wrappers.query();
        queryWrapper.eq("username", username);
        List<UserEntity> users = userMapper.selectList(queryWrapper);
        if (users.isEmpty()) {
            throw new ExternalException(Response.getNotFound("user-no-found"));
        } else if (users.size() > 1) {
            throw new ExternalException(Response.getInternalError("user-duplicate"));
        }
        UserEntity user = users.getFirst();
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new ExternalException(Response.getBadRequest("wrong-password"));
        }

        String token = jwtUtil.generateToken(user.getId());
        return new LoginAuthDTO(users.getFirst().getId(), token);
    }

    @Override
    @Transactional
    public void register(String username, String password) {
        password = passwordEncoder.encode(password);
        userMapper.selectByMap(Map.of("username", username))
                  .stream().findAny().ifPresent(e -> {
                      throw new ExternalException(Response.getBadRequest("user-duplicate"));
                  });
        userMapper.insert(new UserEntity(null, username, password));
    }

    @Override
    public List<Long> queryOwnSurvey(int id, int pageSize, int pageNo) {
        return surveyMapper.queryOwnSurvey(id, pageSize, pageNo);
    }

    @Override
    public List<Long> queryParticipateSurvey(int id, int pageSize, int pageNo) {
        return surveyMapper.queryParticipateSurvey(id, pageSize, pageNo);
    }

    @Override
    public List<Long> queryReceivedAnnouncement(int id, int pageSize, int pageNo) {
        return null;//TODO
    }

    @Override
    public List<UserPublicQueryDTO> queryUserLikeName(String username) {
        QueryWrapper<UserEntity> queryWrapper = Wrappers.query();
        queryWrapper.like("username", username).orderByAsc("LENGTH(username)");
        List<UserEntity> users = userMapper.selectList(queryWrapper);
        //converting user to DTO
        return users.stream().map(e -> new UserPublicQueryDTO(e.getId(), e.getUsername())).toList();
    }
}
