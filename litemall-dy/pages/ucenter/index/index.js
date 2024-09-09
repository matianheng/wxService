var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var user = require('../../../utils/user.js');
var app = getApp();

Page({
  data: {
    newGoods: [],
    userInfo: {
      nickName: '点击登录',
      avatarUrl: '/static/images/my.png'
    },
    order: {
      unpaid: 0,
      unship: 0,
      unrecv: 0,
      uncomment: 0
    },
    hasLogin: false
  },
  onLoad: function (options) {

    // 页面初始化 options为页面跳转所带来的参数
  }, onReady: function () {
    this.getIndexData();
  },
  onShow: function () {

    //获取用户的登录信息
    if (app.globalData.hasLogin) {
      let userInfo = tt.getStorageSync('userInfo');
      this.setData({
        userInfo: userInfo,
        hasLogin: true
      });

      let that = this;
      util.request(api.UserIndex).then(function (res) {
        if (res.errno === 0) {
          that.setData({
            order: res.data.order
          });
        }
      });
    }

  },
  onHide: function () {


    // 页面隐藏
  }, onUnload: function () {

    // 页面关闭
  }, goLogin() {
    if (!this.data.hasLogin) {
      tt.navigateTo({
        url: "/pages/auth/login/login"
      });
    }
  },
  goOrder() {
    if (this.data.hasLogin) {
      try {
        tt.setStorageSync('tab', 0);
      } catch (e) {

      }
      tt.navigateTo({
        url: "/pages/ucenter/order/order"
      });
    } else {
      tt.navigateTo({
        url: "/pages/auth/login/login"
      });
    }
  },
  setInfo() {
    if (this.data.hasLogin) {
      try {
        tt.setStorageSync('tab', 0);
      } catch (e) {

      }
      tt.navigateTo({
        url: "/pages/ucenter/setInfo/setInfo"
      });
      tt.setNavigationBarTitle({
        title: "用户信息"
      });
    } else {
      tt.navigateTo({
        url: "/pages/auth/login/login"
      });
    }
  },
  goOrderIndex(e) {
    if (this.data.hasLogin) {
      let tab = e.currentTarget.dataset.index;
      let route = e.currentTarget.dataset.route;
      try {
        tt.setStorageSync('tab', tab);
      } catch (e) {

      }
      tt.navigateTo({
        url: route,
        success: function (res) {},
        fail: function (res) {},
        complete: function (res) {}
      });
    } else {
      tt.navigateTo({
        url: "/pages/auth/login/login"
      });
    };
  },
  goCoupon() {
    if (this.data.hasLogin) {
      tt.navigateTo({
        url: "/pages/ucenter/couponList/couponList"
      });
    } else {
      tt.navigateTo({
        url: "/pages/auth/login/login"
      });
    };
  },
  goGroupon() {
    if (this.data.hasLogin) {
      tt.navigateTo({
        url: "/pages/groupon/myGroupon/myGroupon"
      });
    } else {
      tt.navigateTo({
        url: "/pages/auth/login/login"
      });
    };
  },
  goCollect() {
    if (this.data.hasLogin) {
      tt.navigateTo({
        url: "/pages/ucenter/collect/collect"
      });
    } else {
      tt.navigateTo({
        url: "/pages/auth/login/login"
      });
    };
  },
  goFeedback(e) {
    if (this.data.hasLogin) {
      tt.navigateTo({
        url: "/pages/ucenter/feedback/feedback"
      });
    } else {
      tt.navigateTo({
        url: "/pages/auth/login/login"
      });
    };
  },
  goFootprint() {
    if (this.data.hasLogin) {
      tt.navigateTo({
        url: "/pages/ucenter/footprint/footprint"
      });
    } else {
      tt.navigateTo({
        url: "/pages/auth/login/login"
      });
    };
  },
  goAddress() {
    if (this.data.hasLogin) {
      tt.navigateTo({
        url: "/pages/ucenter/address/address"
      });
    } else {
      tt.navigateTo({
        url: "/pages/auth/login/login"
      });
    };
  },
  bindPhoneNumber: function (e) {
    debugger;
    if (e.detail.errMsg !== "getPhoneNumber:ok") {
      // 拒绝授权
      return;
    }

    if (!this.data.hasLogin) {
      tt.showToast({
        title: '绑定失败：请先登录',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    util.request(api.AuthBindPhone, {
      iv: e.detail.iv,
      encryptedData: e.detail.encryptedData
    }, 'POST').then(function (res) {
      if (res.errno === 0) {
        tt.showToast({
          title: '绑定手机号码成功',
          icon: 'success',
          duration: 2000
        });
      }
    });
  },
  goAfterSale: function () {
    if (this.data.hasLogin) {
      tt.navigateTo({
        url: "/pages/ucenter/aftersaleList/aftersaleList"
      });
    } else {
      tt.navigateTo({
        url: "/pages/auth/login/login"
      });
    };
  },
  aboutUs: function () {
    tt.navigateTo({
      url: '/pages/about/about'
    });
  },
  goHelp: function () {
    tt.navigateTo({
      url: '/pages/help/help'
    });
  },
  exitLogin: function () {
    tt.showModal({
      title: '',
      confirmColor: '#b4282d',
      content: '退出登录？',
      success: function (res) {
        if (!res.confirm) {
          return;
        }

        util.request(api.AuthLogout, {}, 'POST');
        app.globalData.hasLogin = false;
        tt.removeStorageSync('token');
        tt.removeStorageSync('userInfo');
        tt.reLaunch({
          url: '/pages/index/index'
        });
      }
    });

  },
  getIndexData: function () {
    let that = this;
    util.request(api.IndexUrl).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          newGoods: res.data.newGoodsList

        });
      }
    });
  }
});