package org.linlinjava.litemall.db.dao;
import org.linlinjava.litemall.db.domain.HeadPtureVo;
import org.linlinjava.litemall.db.domain.LitemallHeadPtureVo;

import java.util.ArrayList;
import java.util.List;

public interface LitemallHeadPtureMapper {
    /**
     *获取预存头像图片
     * @return
     */
    ArrayList<HeadPtureVo> getHeadPture();

//    int deleteByPrimaryKey();
//    int insert();
//    int insertSelective();
//    int updateByPrimaryKeySelective();
//    int updateByPrimaryKey();

    void updateUserInfo(LitemallHeadPtureVo body);
}
