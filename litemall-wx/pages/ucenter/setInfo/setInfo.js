const util = require('../../../utils/util.js');
const api = require('../../../config/api.js');
var app = getApp();
// pages/ucenter/setInfo/setInfo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showHead: false,
        showNickName: false,
        showBirthday: false,
        showMobile: false,
        showSex: false,
        scrollLeft: 0,
        selectHead: 0,
        columns: [{
            text: '男',
            value: '1'
        }, {
            text: '女',
            value: '2'
        }],
        inputNickName: "",
        inputMobile: "",
        userInfo: {
            headUrl: "",
            nickName: "去填写",
            sex: "去填写",
            birthday: "去填写",
            mobile: "",
            mobileValue: "",
            headList: [{
                    id: "1",
                    url: "https://img.yzcdn.cn/vant/cat.jpeg"
                },
                {
                    id: "1",
                    url: "https://img.yzcdn.cn/vant/cat.jpeg"
                },
                {
                    id: "1",
                    url: "https://img.yzcdn.cn/vant/cat.jpeg"
                },
                {
                    id: "1",
                    url: "https://img.yzcdn.cn/vant/cat.jpeg"
                },
                {
                    id: "1",
                    url: "https://img.yzcdn.cn/vant/cat.jpeg"
                },
                {
                    id: "1",
                    url: "https://img.yzcdn.cn/vant/cat.jpeg"
                }
            ],
            minDate: new Date().getTime(),
            maxDate: new Date(2019, 10, 1).getTime(),
            formatter(type, value) {
                if (type === 'year') {
                    return `${value}年`;
                }
                if (type === 'month') {
                    return `${value}月`;
                }
                return value;
            },


        }
    },
    //滚动方法
    scrollToPosition() {
        this.setData({
            scrollLeft: 240 // 滚动到240px的位置
        });
    },
    //点击头像底部弹出
    showHeadPopup() {
        //获取图片列表
        util.request(api.AuthGetHeadPture, {}, 'POST').then(res => {
            // console.log(res);
            if (res.errno === 0) {
                this.setData({
                    "userInfo.headList": res.data
                });
            } else {

            }
        }).catch((err) => {

        });
        this.setData({
            showHead: true
        });
    },
    //关闭点击头像底部弹出
    onCloseHead() {
        this.setData({
            showHead: false
        });
    },
    //点击确定头像
    defineHead() {
        this.setData({
            "userInfo.headUrl": this.data.selectHead
        });
        this.setData({
            showHead: false
        });
        this.submintUserInfo(this.data.userInfo,"头像")
    },
    onChangeSelectHead(event) {

        this.setData({
            selectHead: event.detail,
        });
        console.log(this.data.selectHead);
    },
    //点击弹出昵称底部弹框
    showNickNamePopup() {
        this.setData({
            showNickName: true
        });
    },
    //关闭点击昵称底部弹出
    onCloseNickName() {
        this.setData({
            showNickName: false
        });
    },
    //点击确定昵称
    defineNickName() {
        this.setData({
            showNickName: false
        });
        this.setData({
            "userInfo.nickName": this.data.inputNickName
        });
        this.submintUserInfo(this.data.userInfo,"昵称")
    },
    clickInputNickName() {
        this.setData({
            "userInfo.nickName": ""
        });

    },
    clickInputNickName1(event) {
        console.log(event.detail);
        this.setData({
            inputNickName: event.detail.value
        });

    },

    showBirthDayPopup() {
        this.setData({
            showBirthday: true
        });
    },
    //关闭点击昵称底部弹出
    onCloseBirthDay() {
        this.setData({
            showBirthday: false
        });
    },
    //点击确定生日
    defineBirthDay() {
        this.setData({
            showBirthday: false
        });
       
    },
    onInput(event) {
        const date = new Date(event.detail);
        // 提取年份、月份和日期
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // 月份从0开始，需要加1
        const day = String(date.getUTCDate()).padStart(2, '0');

        // 组合成 yyyy-mm-dd 格式
        const formattedDate = `${year}-${month}-${day}`;

        // console.log(formattedDate); // 输出结果为 yyyy-mm-dd 格式
        this.setData({
            "userInfo.birthday": formattedDate,
        });
        this.setData({
            showBirthday: false
        });
        this.submintUserInfo(this.data.userInfo,"生日")
    },
    //切换性别
    onChange(event) {
        // const { picker, value, index } = event.detail;
        // Toast(`当前值：${value}, 当前索引：${index}`);
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },
    showSexPopup() {
        this.setData({
            showSex: true
        });
        // this.setData({ "userInfo.nickName": "" });
    },
    //关闭点击昵称底部弹出
    onCloseSex() {
        this.setData({
            showSex: false
        });
    },
    //点击确定性别
    defineSex() {
        this.setData({
            showSex: false
        });
      
    },
    onConfirm(event) {
        this.setData({
            "userInfo.sex": event.detail.value.text
        });
        this.setData({
            showSex: false
        });
          this.submintUserInfo(this.data.userInfo,"性别")
    },
    onCancel(event) {
        this.setData({
            showSex: false
        });
    },
    showMobile() {
        this.setData({
            showMobile: true
        });
    },
    defineMobile() {
        this.setData({
            showMobile: false
        });
        this.setData({
            "userInfo.mobile": this.data.inputMobile
        });
        this.submintUserInfo(this.data.userInfo,"手机号")
    },
    onCloseMobile() {
        this.setData({
            showMobile: false
        });
    },
    clickInputMobile() {
        this.setData({
            "userInfo.mobile": ""
        });
    },
    clickInputMobile1(event) {
        console.log(event.detail);
        this.setData({
            inputMobile: event.detail.value
        });
    },

    submintUserInfo(data,msg){
      //调取接口将头像更新到用户信息(使用用户详细信息)
        util.request(api.AuthUpdateUserInfoPture, {
            birthday:data.birthday=="去填写"?"":data.birthday,
            headUrl: data.headUrl=="去填写"?"":data.headUrl,
            mobile: data.mobile,
            mobileValue: data.mobileValue,
            nickName:data.nickName=="去填写"?"":data.nickName,
            sex:data.sex=="去填写"?"":(data.sex=="男"?"1":"2"),

        }, 'POST').then(res => {
            if (res.errno === 0) {
                console.log(msg+"更新成功！", res);
            } else {
                console.log(msg+"更新失败,服务异常！", res);
            }
        }).catch((err) => {
            console.log(msg+"更新失败", res);
        })
    },



    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        console.log(wx.getStorageSync('userInfo'));
        this.setData({
            "userInfo.birthday":wx.getStorageSync('userInfo').birthday,
            "userInfo.nickName":wx.getStorageSync('userInfo').nickName,
            "userInfo.sex": wx.getStorageSync('userInfo').gender =="1"?"男":"女",
            "userInfo.mobile": wx.getStorageSync('userInfo').mobile,
            "userInfo.headUrl": wx.getStorageSync('userInfo').avatarUrl,
        })
 
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})