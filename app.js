//app.js
App({
    onLaunch: function() {

        if (wx.getStorageSync('openId')) {

        } else {
            // 登录
            wx.login({
                success: res => {
                    // 发送 res.code 到后台换取 openId, sessionKey, unionId
                    wx.request({
                        url: 'https://caiji.dahang.xyz',
                        header: {
                            'content-type': 'application/x-www-form-urlencoded',
                            'caiji': 'v0.1'
                        },
                        data: {
                            req: 'login',
                            code: res.code
                        },
                        method: 'POST',
                        dataType: 'json',
                        responseType: 'text',
                        success: function(r) {

                            let data = r.data.msg;
                            if (r.data.status == 'ok') {

                                wx.setStorageSync('uid', data.id);
                                wx.setStorageSync('nickName', data.name);
                                wx.setStorageSync('avatarUrl', data.avatar);
                                wx.setStorageSync('openId', data.openId);
                                wx.setStorageSync('unionId', data.unionId);
                                wx.setStorageSync('gender', data.gender);

                            } else {
                                wx.showToast({
                                    title: '未知异常!',
                                    icon: 'none',
                                    duration: 3000
                                });
                            }
                        },
                        fail: function(r) {
                            console.log('fail');
                            wx.showToast({
                                title: '未知异常!',
                                icon: 'none',
                                duration: 3000
                            });
                        },
                        complete: function(r) {

                        }
                    });
                }
            });

            // 获取用户信息
            wx.getSetting({
                success: res => {
                    if (res.authSetting['scope.userInfo']) {
                        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                        wx.getUserInfo({
                            success: res => {
                                // 可以将 res 发送给后台解码出 unionId
                                // this.globalData.userInfo = res.userInfo;

                                let userInfo = res.userInfo;
                                wx.setStorageSync('nickName', userInfo.nickName);
                                wx.setStorageSync('avatarUrl', userInfo.avatarUrl);
                                wx.setStorageSync('gender', userInfo.gender);

                                wx.request({
                                    url: 'https://caiji.dahang.xyz',
                                    header: {
                                        'content-type': 'application/x-www-form-urlencoded',
                                        'caiji': 'v0.1'
                                    },
                                    data: {
                                        req: 'updateUserInfo',
                                        id: wx.getStorageSync('uid'),
                                        openId: wx.getStorageSync('openId'),
                                        name: userInfo.nickName,
                                        avatar: userInfo.avatarUrl,
                                        gender: userInfo.gender
                                    },
                                    method: 'POST',
                                    dataType: 'json',
                                    responseType: 'text',
                                    success: function(r) {},
                                    fail: function(r) {},
                                    complete: function(r) {}
                                });

                                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                                // 所以此处加入 callback 以防止这种情况
                                if (this.userInfoReadyCallback) {
                                    this.userInfoReadyCallback(res);
                                }
                            }
                        })
                    }
                }
            });

        }
    },
    globalData: {

    }
})