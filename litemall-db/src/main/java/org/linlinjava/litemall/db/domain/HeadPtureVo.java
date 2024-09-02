package org.linlinjava.litemall.db.domain;


public class HeadPtureVo {

    private Integer id;

    private String name;

    private String falg;

    private String url;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFalg() {
        return falg;
    }

    public void setFalg(String falg) {
        this.falg = falg;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    @Override
    public String toString() {
        return "HeadPtureVo{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", falg='" + falg + '\'' +
                ", url='" + url + '\'' +
                '}';
    }
}
