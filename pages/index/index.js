//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        motto: 'Hello 财吉',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    onLoad: function() {

        if (wx.getStorageSync('nickName')) {
            this.setData({
                userInfo: {
                    nickName: wx.getStorageSync('nickName'),
                    avatarUrl: wx.getStorageSync('avatarUrl')
                },
                hasUserInfo: true
            });

        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {

                let userInfo = res.userInfo;

                wx.setStorageSync('nickName', userInfo.nickName);
                wx.setStorageSync('avatarUrl', userInfo.avatarUrl);
                wx.setStorageSync('gender', userInfo.gender);

                this.setData({
                    userInfo: {
                        nickName: wx.getStorageSync('nickName'),
                        avatarUrl: wx.getStorageSync('avatarUrl')
                    },
                    hasUserInfo: true
                });

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
            }

        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {

                    let userInfo = res.userInfo;

                    wx.setStorageSync('nickName', userInfo.nickName);
                    wx.setStorageSync('avatarUrl', userInfo.avatarUrl);
                    wx.setStorageSync('gender', userInfo.gender);

                    this.setData({
                        userInfo: {
                            nickName: userInfo.nickName,
                            avatarUrl: userInfo.avatarUrl
                        },
                        hasUserInfo: true
                    });

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
                }
            });
        }
    },
    getUserInfo: function(e) {
        let userInfo = e.detail.userInfo;
        if (userInfo.avatarUrl != wx.getStorageSync('avatarUrl')) {
            wx.setStorageSync('avatarUrl', userInfo.avatarUrl);
        }

        if (userInfo.nickName != wx.getStorageSync('nickName')) {
            wx.setStorageSync('nickName', userInfo.nickName);
        }

        if (userInfo.gender != wx.getStorageSync('gender')) {
            wx.setStorageSync('gender', userInfo.gender);
        }

        this.setData({
            userInfo: {
                nickName: wx.getStorageSync('nickName'),
                avatarUrl: wx.getStorageSync('avatarUrl')
            },
            hasUserInfo: true
        });

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
    },
    writeCaiJi: function() {
        wx.navigateTo({
            url: '/pages/writeCaiJi/writeCaiJi',
            success: function(res) {},
            fail: function(res) {
                console.log(res);
                wx.showModal({
                    title: '异常',
                    content: '未知异常',
                    showCancel: false
                });
            },
            complete: function(res) {},
        })
    }
})