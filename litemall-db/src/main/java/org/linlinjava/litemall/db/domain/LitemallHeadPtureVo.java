package org.linlinjava.litemall.db.domain;

import java.util.List;

public class LitemallHeadPtureVo {
    private Integer id;//用户Id
    private String nickName;////昵称
    private String headUrl;// 头像地址
    private String sex;//性别
    private String birthday;//生日
    private String mobile;// 电话号码
    private String mobileValue;//验证码
    private List<HeadPtureVo> headList;

    public String getMobileValue() {
        return mobileValue;
    }

    public void setMobileValue(String mobileValue) {
        this.mobileValue = mobileValue;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getSex() {return sex;}

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getBirthday() {return birthday;}

    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }

    public String getHeadUrl() {
        return headUrl;
    }

    public void setHeadUrl(String headUrl) {
        this.headUrl = headUrl;
    }

    public List<HeadPtureVo> getHeadList() {
        return headList;
    }

    public void setHeadList(List<HeadPtureVo> headList) {
        this.headList = headList;
    }

    @Override
    public String toString() {
        return "LitemallHeadPtureVo{" +
                "id=" + id +
                ", nickName='" + nickName + '\'' +
                ", headUrl='" + headUrl + '\'' +
                ", sex='" + sex + '\'' +
                ", birthday='" + birthday + '\'' +
                ", mobile='" + mobile + '\'' +
                ", mobileValue='" + mobileValue + '\'' +
                ", headList=" + headList +
                '}';
    }
}
