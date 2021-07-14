<template>
    <div class="collectionIndex" @click.stop="closeSelectShowView">
        <div class="mainView-topView">
            <div class="mainView-topView-flex">
                <p>当前页面: 显示所有的巡检照片</p>
            </div>
        </div>
        <div class="collectionIndexView">
            <div class="showingView">
                <div class="showingItem"  v-for="(photoList,photosindex) in photoList" :key="photosindex">
                    <p class="showTitle">
                        {{ photoList[0].city }},{{ photoList[0].district }} 
                    </p>
                    <div class="showPhotos">
                        <div class="photoStyle" v-for="(item,index) in photoList" :key="index" v-if="index != 0">
                            <img :src="item.url" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import G2 from '@antv/g2';
import mySelect from '@/components/collectionIndexComponents/mySelectModel.vue';

// 全局共享数据
import globalUtils from '../../publicJs/globalSetting'
import store from '../../publicJs/store'
// 引入axios配置文件
import { terminalRequest,stationRequest,getCurrentTerminalId,requestBase } from '../../publicJs/request'
import { showmessage,responseBack,getLocationInfo } from '../../publicJs/utils'
// 引入绘图初始化参数文件
import { defaultAlarmSet } from '../../publicCollect/defaultAlarmSetting.ts'
import { defaultCollectSet } from '../../publicCollect/defaultCollectSetting.ts'
import { defaultSensorSet } from '../../publicCollect/defaultSensorSetting.ts'
import { defaultProjectSet } from '../../publicCollect/defaultProject.ts'
export default {
    data () {
        return {
            actionIndexList: [
                {
                    name: '基础倾斜',
                    value: 'deformation'
                },
                {
                    name: '塔顶振动',
                    value: 'upvibration'
                }
            ],
            currentIndex: 0,
            sensorInfo_more_list: [], // 报警默认参数列表
            illusoryDeviceList: {
                'deviceList': {
                    'isShowToast': false,
                    'iconClass': 'el-icon-office-building',
                    'current': {
                        name: '选择设备',
                        id: '',
                        isChecked: false
                    },
                    'list': [
                        {
                            id: 1,
                            name: '1号设备',
                            isChecked: false,
                        },
                        {
                            id: 2,
                            name: '2号设备',
                            isChecked: false,
                        },
                        {
                            id: 1,
                            name: '2号设备',
                            isChecked: false,
                        },
                    ]
                },
            },
            photoList: [], // photo list
        }
    },
    components: {
        mySelect: mySelect,
    },
    mounted () {
        this.getSubProjectListFromCloud();
        // this.initProject();
        // this._getTerminalList();
        // this.getDefaultAlarmSetting(this.actionIndexList[this.currentIndex].value);
    },
    methods: {
        /**
         * from cloud get subProject
         * get alarm overall status
         */
        async getSubProjectListFromCloud() {
            const projectInfo = getLocationInfo(this,'projectInfo');
            if(projectInfo != null) {
                let responseResult = await requestBase.baseApi('found/photo/showPhoto','GET',{
                    projectId: projectInfo.projectId,
                });
                responseBack(this,responseResult,this.setAllPhotoList(responseResult.data));
                console.log('all photos list...')
                console.log(responseResult)
                console.log(this.photoList);
            }
        },
        /**
         * set photo list
         */
        setAllPhotoList(list) {
            return () => {
                this.photoList = list;
            }
        },
        /**
         * 选中的当前项目
         */
        initProject() {
            let getLocalProjectSet = this.getLocalHaveData();
            console.log(getLocalProjectSet)
            if(getLocalProjectSet != null) {
                this.actionIndexList = getLocalProjectSet;
            }else {
                this.actionIndexList = defaultProjectSet;
            }
            this.actionIndexList = this.actionIndexList.filter((item) => {
                return item.isshow;
            })
            this.currentIndex = 0;
        },
        /**
         * 获取缓存中是否有数据
         */
        getLocalHaveData() {
            let localStr = localStorage.getItem(globalUtils.locationSaveKey);
            let result = null;
            if(localStr != null) {
                result = localStr;
                let resultJson = JSON.parse(result);
                let array = [];
                for(let item in resultJson) {
                    array.push(resultJson[item]);
                }
                result = array;
            }else {
                result = defaultProjectSet;
            }
            return result;
        },
        /**
         * 获取风机列表信息
         */
        _getTerminalList() {
            let terminalList = terminalRequest.list();
            let realTerminalList = [];
            terminalList.then((res) => {
                console.log('获取风机设备列表');
                console.log(res);
                if(res.responseStatus == 'success') {
                    let terminalListData = res.data; 
                    terminalListData.forEach((item) => {
                        item.isChecked = false;
                        realTerminalList.push(item);
                    })
                }
                this.illusoryDeviceList.deviceList.list = realTerminalList;
                if(store.state.currentid != null || (sessionStorage.getItem('currentid') && sessionStorage.getItem('currentid') != null)) {
                    // 说明现在所选择的风机存在
                    let currentDeviceId = store.state.currentid || sessionStorage.getItem('currentid');
                    realTerminalList.forEach((item) => {
                        if(item.id == currentDeviceId) {
                            item.isChecked = true;
                            this.illusoryDeviceList.deviceList.current = item;
                        }
                    })
                }else {
                    this.illusoryDeviceList.deviceList.current = realTerminalList[0];
                    // 同时改变选中的缓存中当前选中的风机id
                    store.commit('changecurrentid', this.illusoryDeviceList.deviceList.current.id);
                    store.commit('changeCurrentDeviceName', this.illusoryDeviceList.deviceList.current.name);
                }
                return realTerminalList;
            })
        },
        /**
         * 关闭seclect
         */
        closeSelectShowView() {
            this.illusoryDeviceList.deviceList.isShowToast = false;
        },
        /**
         * 切换风机
         */
        _getStationList() {
            this.illusoryDeviceList.deviceList.isShowToast = false;
            store.commit('changecurrentid', this.illusoryDeviceList.deviceList.current.id);
            store.commit('changeCurrentDeviceName', this.illusoryDeviceList.deviceList.current.name);
            this.getDefaultAlarmSetting(this.actionIndexList[this.currentIndex].value);
        },
        /**
         * 更改当前选中的li
         */
        changeCurrentIndex(index) {
            this.currentIndex != index && (this.currentIndex = index);
            this.getDefaultAlarmSetting(this.actionIndexList[this.currentIndex].value);
        },
        /**
         * 获取当前的报警默认参数配置信息
         */
        getDefaultAlarmSetting(type) {
            this.sensorInfo_more_list = [];
            this.sensorInfo_more_list = defaultAlarmSet[type].warningSet;
            this.getCloudWarnningSet(type);
            // this.sensorInfo_more_list = defaultCollectSet.collectInfo;
            // this.sensorInfo_more_list = defaultSensorSet[type].setSensorInfoList;
        },
        /**
         * 回显当前的报警信息
         */
        async getCloudWarnningSet(type) {
            console.log(type)
            let terminalId = await getCurrentTerminalId();
            let getListUrl = defaultAlarmSet[type].getWarningUrl;
            this.$axios.get(getListUrl
                + '?terminalId=' + terminalId).then((res) => {
                console.log('预警指标回显')
                console.log(res.data.status)
                if(res.data.status == '0') {
                    this.setCloudDataToShell(res.data.data[0]);
                };
            }).catch((err) => {
                
            });
        },
        /**
         * 回显数据到数据中
         */
        setCloudDataToShell(data) {
            console.log('赛虎数据')
            console.log(data)
            this.sensorInfo_more_list.forEach((listItem) => {
                console.log(listItem)
                for(let item in listItem.list) {
                    console.log(item)
                    listItem.list[item].value = data[item];
                }
            });
        },
        /**
         * 上传预警设置信息
         */
        submitWarnningSet() {
            let updateUrl = defaultAlarmSet[this.actionIndexList[this.currentIndex].value].updateWarningSetUrl;
            let waittingSubmitData = this.listObjToOneObj(this.sensorInfo_more_list);
            console.log('准备上传数据')
            console.log(waittingSubmitData)
            this.$axios.post(updateUrl,waittingSubmitData).then((res) => {
                if(res.data.status == '0') {
                    showmessage(this,'修改配置成功','success');
                }else {
                    showmessage(this,res.data.data,'fail');
                }
            })
        },
        /**
         * input获取焦点和失去焦点事件
         */
        focusInput (item) {
            console.log('鼠标移动近来')
            item.isshowtoast = true
        },
        blurInput (item,index) {
            item.isshowtoast = false
        },
        changeInput(item,index) {
            let value = event.target.value;
            this.sensorInfo_more_list.forEach((listItem) => {
                console.log(listItem)
                for(let item in listItem.list) {
                    console.log(item)
                    if(item == index) {
                        listItem.list[item].value = value;
                    }
                }
            });
        },
        /**
         * 数组对象转换成一个对象
         */
        listObjToOneObj(list) {
            let obj = {};
            if(list instanceof Array) {
                list.forEach((item) => {
                    for(let key in item.list) {
                        obj[key] = item.list[key].value;
                    }
                })
            }else {
                for(let key in list) {
                    obj[key] = list[key].value;
                }
            }
            return obj;
        }
    }
}
</script>

<style lang="less" scoped>
@mainAsideBgColor: #edf1f5;
@headerBgColor: #2f323e;
@headerHeight: 70px;
@mainAsideBgColor: #edf1f5;
@footerBgColor: #fff;

@middleViewTop: 60px;

@asideFontColor: #fff;
@middleFontSize: 22px;

@iconFontSize: 28px;

@activeColor: #7EC0EE;
.collectionIndex {
    width: 100%;
    height: 100%;
    .mainView-topView {
        width: 100%;
        height: @headerHeight;
        background-color: #fff;
        box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.08);
        .mainView-topView-flex {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            padding: 0 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .mainView-topView-flex-right {
                display: flex;
                align-items: center;
                height: 100%;
            }
        }
    }
    .collectionIndexView {
        color: #fff;
        // height: 100%;
        background-color: #fff;
        border-radius: 6px;
        .showingView {
            width: 100%;
            margin-top: 30px;
            .showingItem {
                width: 100%;
                box-sizing: border-box;
                padding: 0 30px;
                .showTitle {
                    width: 100%;
                    height: 50px;
                    line-height: 50px;
                    font-size: 18px;
                    color: #333;
                    text-align: left;
                    margin-bottom: 10px;
                }
                .showPhotos {
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    .photoStyle {
                        display: block;
                        width: 150px;
                        height: 200px;
                        margin-right: 10px;
                        margin-bottom: 8px;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
            }
        }
    }
}
</style>
<style>
.myTransitionFade-enter-active, .myTransitionFade-leave-active {
    opacity: 1;
    top: 0;
    transition: all 1.5s;
}
.myTransitionFade-enter, .myTransitionFade-leave-to /* .famyTransitionFadede-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.mainView-topView-flex-right {
    display: flex;
    align-items: center;
    height: 100%;
}
@keyframes myfirst
{
    from {opacity: 1;}
    to {opacity: 0;height: 0;}
}
</style>