import { stat } from "fs";
import Vuex from 'vuex'
import { Button } from "element-ui";

const store = new Vuex.Store({
    state: {
        currentid: null,
        currentDeviceName: null,
        isshowheader: true,
        selectlist: [],
        info: null, // 登录之后的信息
        isshowmobilesetting: false, // 是否显示
        currentprojectname: '', // 项目名称
    },
    mutations: {
        increment (state) {
            state.currentid -- 
        },
        addstate (state) {
            state.currentid ++ 
        },
        changecurrentid (state, index) {
            state.currentid = index
            sessionStorage.setItem('currentid', index)
        },
        changeCurrentDeviceName (state, index) {
            console.log('change风机name')
            state.currentDeviceName = index
            sessionStorage.setItem('currentDeviceName', index)
        },
        // 隐藏头部
        noshowheader (state) {
            state.isshowheader = false
        },
        // 显示头部
        showheader (state) {
            state.isshowheader = true
        },
        // 改变seclectlist
        changelist (state, list) {
            state.selectlist = list
            sessionStorage.setItem('selectlist', JSON.stringify(list))
        },
        // 登录信息保存
        logininfosave (state, info) {
            console.log(info)
            state.info = info
        },
        logininforemove (state) {
            state.info = null;
        },
        showisshowmobilesetting (state) {
            state.isshowmobilesetting = true
        },
        hideisshowmobilesetting (state) {
            state.isshowmobilesetting = false
        },
        // 修改项目名称
        changecurrentprojectname (state, name) {
            console.log('调用store修改项目名称')
            state.currentprojectname = name
            sessionStorage.setItem('currentprojectname', name)
        }
    }
})

export default store
