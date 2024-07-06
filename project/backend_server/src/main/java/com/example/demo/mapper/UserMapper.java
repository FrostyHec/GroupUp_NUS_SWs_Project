package com.example.demo.mapper;


import com.example.demo.entity.User;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface UserMapper {
    @Select("SELECT * FROM \"User\" WHERE id = #{id}")
    User getUserById(int id);

    @Select("SELECT * FROM \"User\"")
    List<User> getAllUsers();

    @Insert("INSERT INTO \"User\"(username, gender) VALUES(#{username}, #{gender})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insertUser(User user);

    @Update("UPDATE \"User\" SET username = #{username}, gender = #{gender} WHERE id = #{id}")
    void updateUser(User user);

    @Delete("DELETE FROM \"User\" WHERE id = #{id}")
    void deleteUser(int id);
}
