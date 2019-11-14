package com.example.datajdbc.mapper;

import com.example.datajdbc.bean.User;
import org.apache.ibatis.annotations.*;

import java.util.List;

//@Mapper
public interface UserMapper {
    @Select("select * from _User where userId=#{id}")
    public User getUserById(Integer id);

    @Select("select * from _User")
    public List<User> getAllUser();

    @Delete("delete from _User where userId =#{id}")
    public void deleteUserById(Integer id);

    @Options(useGeneratedKeys = true, keyProperty = "userId")
    @Insert("insert into _User(userName,userPsd,userSex) values(#{userName},#{userPsd},#{userSex})")
    public void insertUser(User user);

    @Update("update _User set userName=#{userName} where userId=#{id}")
    public void updateUser(User user);
}
