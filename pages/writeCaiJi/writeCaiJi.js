// pages/writeCaiJi/writeCaiJi.js

const util = require('../../utils/util.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        today: null,
        time: null,
        date: null,
        type: ['类别1', '类别2', '类别3'],
        index: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            time: util.formatTime(new Date()),
            date: util.formatDate(new Date()),
            today: util.formatDate(new Date())
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },

    bindDateChange: function(e) {
        this.setData({
            date: e.detail.value
        });
    },
    bindTimeChange: function(e) {
        this.setData({
            time: e.detail.value + ':00'
        });
    },
    bindTypePicker: function(e) {
        this.setData({
            index: e.detail.value
        });
    }
})