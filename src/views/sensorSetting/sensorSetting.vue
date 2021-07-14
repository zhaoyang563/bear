<template>
    <div class="collectionIndex">
        <div class="mainView-topView">
            <div class="mainView-topView-flex">
                <p>当前页面: 设置测点/采集卡/传感器 (测点是逻辑分组,采集卡是传感器物理分组)</p>
                <div class="mainView-topView-flex-right">
                    <span>选择设备:    </span>
                    <my-select :illusoryDeviceList="illusoryDeviceList.deviceList" 
                    @dataChange="_getStationList"></my-select>
                </div>
            </div>
        </div>
        <div class="collectionIndexView">
            <div class="alarmSetView">
                <div class="alarmSetViewLeft">
                    <ul class="alarmSetViewLeft-ul">
                        <li class="alarmSetViewLeft-li" 
                            v-for="(item,index) in actionIndexList" :key="index"
                            :class="currentIndex == index?'alarmSetViewLeft-li-active':''"
                            @click="changeCurrentIndex(index)">
                            {{item.name}}
                        </li>
                    </ul>
                </div>
                <div class="alarmSetViewLeft">
                    <div class="choicesView">
                        <el-radio-group v-model="activeSensorAddType" @change="changeActiveSensorAddType">
                            <el-radio-button label="采集卡"></el-radio-button>
                            <el-radio-button label="测点分组"></el-radio-button>
                        </el-radio-group>
                    </div>
                    <ul class="alarmSetViewLeft-ul">
                        <li class="alarmSetViewLeft-li" 
                            v-for="(item,index) in (activeSensorAddType == '采集卡'?allCollectDeviceList:allStationList)" :key="index"
                            :class="(activeSensorAddType == '采集卡'?currentCollectDeviceIndex:currentStationIndex) == index?'alarmSetViewLeft-li-active':''"
                            @click="changeCollectOrStationIndex(index)">
                            {{item.name}}
                            <div class="alarmSetViewLeft-li-set"
                                v-show="(activeSensorAddType == '采集卡'?currentCollectDeviceIndex:currentStationIndex) == index">
                                <p class="el-icon-coordinate" @click.stop="seeStationSensor"></p>
                                <p class="el-icon-circle-close" @click.stop="deleteStation"></p>
                            </div>
                        </li>
                    </ul>
                    <el-button @click="addStation">add</el-button>
                </div>
                <div class="alarmSetViewLeft sensorTopView">
                    <!-- <div class="sensorTopView"></div> -->
                    <ul class="alarmSetViewLeft-ul">
                        <li class="alarmSetViewLeft-li" 
                            v-for="(item,index) in allSensorList" :key="index"
                            :class="currentSensorIndex == index?'alarmSetViewLeft-li-active':''"
                            @click="changeSensorIndex(index)">
                            {{item.name}}
                        </li>
                    </ul>
                </div>
                <div class="alarmSetViewRight">
                    <template v-if="!isAllotSensoring">
                        <ul class="setsensor_ul" v-for="(listitem,listindex) in sensorInfo_more_list" :key="listindex">
                            <p class="setsensor_ul_show_title">{{ listitem.title }}</p>
                            <li class="setsensor_li" v-for="(item, index) in listitem.list" :key="index" v-if="!item.noshow">
                                <div class="setsensor_li_left">
                                    <p class="setsensor_li_left_p_flex">
                                        <span>{{ item.name }}</span>
                                        <span v-if="item.desc" class="setsensor_li_left_p_flex_desc">{{ item.desc }}</span>
                                    </p>
                                    <p class="setsensor_li_left_p" v-show="item.ishaveswitch">
                                        <el-switch
                                            v-model="item.switchvalue"
                                            active-color="#13ce66"
                                            inactive-color="#ff4949"
                                            @change="changeSwitch(item, index)"
                                            >
                                        </el-switch>
                                    </p>
                                </div>
                                <p class="setsensor_li_right" v-if="item.isselect">
                                    <el-select :disabled="item.nochange" v-model="item.value" placeholder="请选择">
                                        <el-option
                                        v-for="(listitem, listindex) in item.list"
                                        :key="listindex"
                                        :label="listitem.name"
                                        :value="listitem.value"
                                        
                                        >
                                        </el-option>
                                    </el-select>
                                </p>
                                <p class="setsensor_li_right" v-else>
                                    <el-input v-show="!item.inputnoshow" :disabled="item.nochange || item.switchvalue == false" v-model="item.value" placeholder="请输入内容" @focus="focusInput(item)" @blur="blurInput(item)"></el-input>
                                    <span :class="item.isshowtoast? 'setsensor_li_right_show' : 'setsensor_li_right_hide'">
                                        {{ item.show }}
                                    </span>
                                </p>
                            </li>
                        </ul>
                    </template>
                    <template v-else>
                        <div class="sensorListView">
                            <!-- <transition name="el-zoom-in-center">
                                <div class="sensorListViewCloseViewLeft" v-show="!createStationHaveId">
                                    <img class="sensorListViewCloseViewLeftImg" src="@/assets/closeView.png" alt="">
                                </div>
                            </transition> -->
                            <table-component :table-data="allOriginSensorList"

                            ></table-component>
                        </div>
                    </template>
                    <p class="alarmBtnView">
                        <el-button class="alarmBtn" type="primary" @click="submitSetting">保存设置</el-button>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import G2 from '@antv/g2';
import mySelect from '@/components/collectionIndexComponents/mySelectModel.vue';
import tableComponent from '@/components/collectionIndexComponents/TableComponent.vue';

// 全局共享数据
import globalUtils from '../../publicJs/globalSetting'
import store from '../../publicJs/store'
// 引入axios配置文件
import { terminalRequest,stationRequest,allSettingUrl,getCurrentTerminalId } from '../../publicJs/request'
import { showmessage } from '../../publicJs/utils'
// 引入绘图初始化参数文件
import { defaultAlarmSet } from '../../publicCollect/defaultAlarmSetting.ts'
import { defaultCollectSet } from '../../publicCollect/defaultCollectSetting.ts'
import { defaultSensorSet } from '../../publicCollect/defaultSensorSetting.ts'
import { defaultCollectDeviceSet } from '../../publicCollect/defaultCollectDeviceSetting.ts'
import { defaultStationSet } from '../../publicCollect/defaultStationSetting.ts'
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
                },
                {
                    name: '物理载荷',
                    value: 'bottompolarization'
                }
            ],
            currentIndex: 0,

            allCollectDeviceList: [

            ],
            currentCollectDeviceIndex: -1,

            
            allStationList: [

            ],
            currentStationIndex: -1,

            allSensorList: [

            ],
            currentSensorIndex: -1,


            sensorInfo_more_list: [], // 报警默认参数列表
            activeSensorAddType: '采集卡', // 默认选中是采集卡
            allOriginSensorList: [], // 暂存原始传感器列表
            isAllotSensoring: false, // 是否在分配传感器中
            isCreateRecord: false, // 是否是新建操作
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
        }
    },
    components: {
        mySelect: mySelect,
        tableComponent: tableComponent,
    },
    mounted () {
        // 默认加载
        this.initProject();
        this.getDefaultAlarmSetting('indexsType',this.actionIndexList[this.currentIndex].value);
        this.initPage();
    },
    methods: {
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
            this.getCurrentTypeStation(this.actionIndexList[this.currentIndex].value);
            this.getCurrentTypeCollectDevice(this.actionIndexList[this.currentIndex].value);
        },
        /**
         * 更改当前选中的li
         */
        changeCurrentIndex(index) {
            this.currentIndex != index && (this.currentIndex = index);
            this.getDefaultAlarmSetting('indexsType',this.actionIndexList[this.currentIndex].value);
            this.initActiveIndex(2);
            this.getCurrentTypeStation(this.actionIndexList[this.currentIndex].value);
            this.getCurrentTypeCollectDevice(this.actionIndexList[this.currentIndex].value);
        },
        /**
         * 测点或者采集卡更改选中项
         */
        changeCollectOrStationIndex(index) {
            if(this.activeSensorAddType == '采集卡') {
                this.currentCollectDeviceIndex != index && (this.currentCollectDeviceIndex = index);
                // 渲染右侧的设置页面
                this.getDefaultAlarmSetting('collectDeviceType',this.actionIndexList[this.currentIndex].value);
                this.realDataToModel(this.allCollectDeviceList[this.currentCollectDeviceIndex]);
            }else {
                this.currentStationIndex != index && (this.currentStationIndex = index);
                // 渲染右侧的设置页面
                this.getDefaultAlarmSetting('stationType',this.actionIndexList[this.currentIndex].value);
                this.realDataToModel(this.allStationList[this.currentStationIndex]);
            }
            this.initActiveIndex(1);
            this.getCurrentTypeSensor(this.actionIndexList[this.currentIndex].value);
            
        },
        /**
         * 传感器传中事件
         */
        changeSensorIndex(index) {
            this.currentSensorIndex != index && (this.currentSensorIndex = index);
            // 渲染右侧的设置页面
            this.getDefaultAlarmSetting('sensorType',this.actionIndexList[this.currentIndex].value);
            this.realDataToModel(this.allSensorList[this.currentSensorIndex]);
        },
        /**
         * 改变显示采集卡还是测点
         */
        changeActiveSensorAddType() {
            this.initActiveIndex(2);
            this.sensorInfo_more_list = [];
        },
        /**
         * 初始化选中的项目
         */
        initActiveIndex(num) {
            if(num == 1) {
                this.currentSensorIndex = -1;
            }else if(num == 2) {
                this.currentSensorIndex = -1;
                this.currentCollectDeviceIndex = -1;
                this.currentStationIndex = -1;
            }
        },
        /**
         * 获取当前的报警默认参数配置信息
         */
        getDefaultAlarmSetting(activeType,type) {
            if(activeType == 'indexsType') {
                // 点击最外层
                this.sensorInfo_more_list = [];
            }
            if(activeType == 'collectDeviceType') {
                // 点击采集卡
                this.sensorInfo_more_list = defaultCollectDeviceSet[type].collectSetInfo;
            }
            if(activeType == 'stationType') {
                // 点击测点
                this.sensorInfo_more_list = defaultStationSet[type].setStationInfo;
            }
            if(activeType == 'sensorType') {
                // 点击传感器
                this.sensorInfo_more_list = defaultSensorSet[type].setSensorInfoList;
            }
            // this.sensorInfo_more_list = defaultAlarmSet[type].warningSet;
            // this.sensorInfo_more_list = defaultCollectDeviceSet[type].collectSetInfo;
            // this.sensorInfo_more_list = defaultStationSet[type].setStationInfo;
            // this.sensorInfo_more_list = defaultSensorSet[type].setSensorInfoList;
        },
        /**
         * 获取当前监测类型下的-测点
         */
        async getCurrentTypeStation(type) {
            // 初始化测点列表
            this.allStationList = [];
            let currentTerminalId = await getCurrentTerminalId();
            console.log('获取当前的风机id' + currentTerminalId);
            let collectDeviceList = await stationRequest.getStationListByType(type,currentTerminalId);
            console.log('获取测点成功')
            console.log(collectDeviceList)
            if(collectDeviceList.responseStatus == 'success') {
                // 当前的测点列表置换
                this.allStationList = this.cloudDataToStation(this.actionIndexList[this.currentIndex].value,collectDeviceList.data);
                // 当前数据替换

            }
        },
        /**
         * 获取当前监测类型下的-采集卡
         */
        async getCurrentTypeCollectDevice(type) {
            // 初始化测点列表
            this.allCollectDeviceList = [];
            let currentTerminalId = await getCurrentTerminalId();
            console.log('获取当前的风机id' + currentTerminalId);
            let collectDeviceList = await stationRequest.getCollectListByType(type,currentTerminalId);
            console.log('获取采集卡成功')
            console.log(collectDeviceList)
            if(collectDeviceList.responseStatus == 'success') {
                // 当前的测点列表置换
                this.allCollectDeviceList = this.cloudDataToStation(this.actionIndexList[this.currentIndex].value,collectDeviceList.data);
                // 当前数据替换

            }
        },
        /**
         * 获取当前监测类型下的-传感器
         */
        async getCurrentTypeSensor(type) {
            // 初始化传感器列表
            this.allSensorList = [];
            let currentTerminalId = await getCurrentTerminalId();
            console.log('获取当前的风机id' + currentTerminalId);
            let collectDeviceList = await stationRequest.getSensorListByType(type,currentTerminalId);
            console.log('获取传感器成功')
            console.log(collectDeviceList)
            if(collectDeviceList.responseStatus == 'success') {
                // 当前的测点列表置换
                // 原始传感器保持列表
                this.allOriginSensorList = this.cloudDataToStation(this.actionIndexList[this.currentIndex].value,collectDeviceList.data);
                this.allSensorList = this.cloudDataToStation(this.actionIndexList[this.currentIndex].value,collectDeviceList.data);
                if(this.activeSensorAddType == '采集卡') {
                    this.allSensorList = this.allSensorList.filter((item) => {
                        let middleKey = this.actionIndexList[this.currentIndex].value == 'deformation'?item.address:item.collectId;
                        if(this.actionIndexList[this.currentIndex].value == 'upvibration') {
                            return item.devId == this.allCollectDeviceList[this.currentCollectDeviceIndex].devId;
                        }
                        return middleKey == this.allCollectDeviceList[this.currentCollectDeviceIndex].id;
                    })
                }else {
                    this.allSensorList = this.allSensorList.filter((item) => {
                        let middleKey = this.actionIndexList[this.currentIndex].value == 'deformation'?item.address:item.groupId;
                        return middleKey == this.allStationList[this.currentStationIndex].id;
                    })
                }
                // 当前数据替换
                setTimeout(() => {
                    // 是否有传感器
                    this.currentNoSensorsFunc(); 
                }, 0);
            }
        },
        
        /**
         * 后端数据置换测点列表
         */
        cloudDataToStation(type1,dataList) {
            let type = this.actionIndexList[this.currentIndex].value;
            let resultList = [];
            if(type == 'deformation') {
                dataList.forEach((item) => {
                    // 主要置换id -< address
                    item.id = item.address;
                    resultList.push(item);
                })
            }else {
                dataList.forEach((item) => {
                    // 主要置换id -< address
                    resultList.push(item);
                })
            }
            return resultList;
        },
        /**
         * 替换当前选中测点 右侧显示数据的替换
         */
        realDataToModel(currentList) {
            this.sensorInfo_more_list.forEach((list) => {
                for(let key in list.list) {
                    console.log(key)
                    console.log(currentList[key])
                    if(currentList[key] != null) {
                        if(list.list[key].isselect) {
                            list.list[key].value = '' + currentList[key];
                        }else {
                            list.list[key].value = currentList[key];
                        }
                    }
                }
            })
            console.log(this.sensorInfo_more_list)
           
        },
        /**
         * 所有值清空 新建测点 采集卡 或者传感器
         */
        nullDataToModel(currentList) {
            this.sensorInfo_more_list.forEach((list) => {
                for(let key in list.list) {
                    list.list[key].value = '';
                }
            })
            console.log(this.sensorInfo_more_list)
           
        },
        /**
         * 当前所选的采集卡或者是测点下没传感器解决方法
         */
        currentNoSensorsFunc() {
            if(this.allSensorList.length == 0) {
                this.isAllotSensoring = true;
                this.calIsCurrentCollectOrStation();
                console.log('没有传感器')
            }else {
                this.isAllotSensoring = false;
                console.log('有传感器Z')
            }
        },
        /**
         * 提交数据事件
         */
        submitSetting() {
            // 1.0 计算出url
            let requestUrl = '';
            let originObj = {};
            let submitObj = {};
            // 测点选中传感器为选中
            if(!this.isCreateRecord) {
                if(this.currentSensorIndex >= 0) {
                    requestUrl = allSettingUrl[this.actionIndexList[this.currentIndex].value].sensor.update;
                    originObj = this.allSensorList[this.currentSensorIndex];
                }else {
                    if(this.currentStationIndex >= 0) {
                        requestUrl = allSettingUrl[this.actionIndexList[this.currentIndex].value].station.update;
                        originObj = this.allStationList[this.currentStationIndex];
                    }else {
                        requestUrl = allSettingUrl[this.actionIndexList[this.currentIndex].value].collect.update;
                        originObj = this.allCollectDeviceList[this.currentCollectDeviceIndex];
                    }
                }
                this.sensorInfo_more_list.forEach((settingList) => {
                    for(let settingKey in settingList.list) {
                        submitObj[settingKey] = settingList.list[settingKey].value;
                    }
                })
                console.log('提交数据整理')
                // console.log(submitObj)
                // 2.0 对象中未用到值的整理
                submitObj = this.compareObjsAndCopy(originObj,submitObj);
                console.log(submitObj)
            }else {
                // 新增时候按照采集卡和测点区分
                if(this.activeSensorAddType == '采集卡') {
                    requestUrl = allSettingUrl[this.actionIndexList[this.currentIndex].value].collect.add;
                }else {
                    requestUrl = allSettingUrl[this.actionIndexList[this.currentIndex].value].station.add;
                }

                this.sensorInfo_more_list.forEach((settingList) => {
                    for(let settingKey in settingList.list) {
                        submitObj[settingKey] = settingList.list[settingKey].value;
                    }
                })
                console.log('提交数据整理')
                // console.log(submitObj)
                // 2.0 对象中未用到值的整理
                console.log(submitObj)
            }
            this.$axios.post(requestUrl,submitObj).then((result) => {
                console.log(result)
                if(result.data.status == 0) {
                    showmessage(this,'修改成功','success');
                    if(this.currentSensorIndex >= 0) {
                        this.allSensorList[this.currentSensorIndex] = submitObj;
                    }else {
                        if(this.currentStationIndex >= 0) {
                            this.allStationList[this.currentStationIndex] = submitObj;
                        }else {
                            this.allCollectDeviceList[this.currentCollectDeviceIndex] = submitObj;
                        }
                    }
                }
            }).catch((err) => {
                
            });
        },
        /**
         * 修改原始传感器中的是否本测点的值
         */
        calIsCurrentCollectOrStation() {
            this.allOriginSensorList.forEach((item) => {
                if(this.activeSensorAddType == '采集卡') {
                    item.isThisGroup = (item.collectId == this.allCollectDeviceList[this.currentCollectDeviceIndex].id)?'是':'否';
                }else {
                    item.isThisGroup = (item.groupId == this.allStationList[this.currentStationIndex].id)?'是':'否';
                }
            })
        },
        /**
         * 原对象中未改变值赋值
         */
        compareObjsAndCopy(originObj,targetObj) {
            for(let key in originObj) {
                if(targetObj[key] == null) {
                    targetObj[key] = originObj[key];
                }
            }
            return targetObj;
        },
        /**
         * 页面初始化函数
         */
        initPage() {
            this._getTerminalList();
            this.getCurrentTypeStation(this.actionIndexList[this.currentIndex].value);
            this.getCurrentTypeCollectDevice(this.actionIndexList[this.currentIndex].value);
        },
        /**
         * 添加测点
         * 倾斜的话 测点等于采集卡等于传感器
         */
        addStation() {
            this.initActiveIndex(2);
            if(this.activeSensorAddType == '采集卡') {
                // 渲染右侧的设置页面
                this.getDefaultAlarmSetting('collectDeviceType',this.actionIndexList[this.currentIndex].value);
                this.nullDataToModel(this.allCollectDeviceList[this.currentCollectDeviceIndex]);
            }else {
                this.getDefaultAlarmSetting('stationType',this.actionIndexList[this.currentIndex].value);
                this.nullDataToModel(this.allStationList[this.currentStationIndex]);
            }
            this.isCreateRecord = true;
        },
        /**
         * input获取焦点和失去焦点事件
         */
        focusInput (item) {
            console.log('鼠标移动近来')
            // item.isshowtoast = true
        },
        blurInput (item) {
            // item.isshowtoast = false
        },
        /**
         * 查看测点下面传感器
         */
        seeStationSensor() {
            console.log('查看测点下传感器')
        },
        /**
         * 删除测点
         */
        deleteStation() {
            console.log('删除测点')
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
        height: auto;
        min-height: 100%;
        background-color: #fff;
        border-radius: 6px;
        .alarmSetView {
            margin-top: 30px;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            .alarmSetViewLeft {
                flex: 0 0 200px;
                width: 200px;
                // height: 100%;
                min-height: 100%;
                border-right: 1px solid #999;
                .choicesView {
                    height: 60px;
                    line-height: 60px;
                }
                .sensorTopView {
                    margin-top: 120px !important;
                }
                .alarmSetViewLeft-ul {
                    width: 100%;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    margin-bottom: 30px;
                    .alarmSetViewLeft-li {
                        width: 100%;
                        height: 60px;
                        line-height: 60px;
                        border-bottom: 1px dashed #999;
                        color: #000;
                        cursor: pointer;
                        position: relative;
                        .alarmSetViewLeft-li-set {
                            position: absolute;
                            right: 0;
                            width: 70px;
                            top: 0;
                            bottom: 0;
                            background-color: rgba(144,238,144,0.6);
                            z-index: 2020;
                            display: flex;
                            justify-content: space-around;
                            align-items: center;
                            p {
                                font-size: 30px;
                            }
                        }
                    }
                    .alarmSetViewLeft-li-active {
                        background-color: @activeColor;
                    }
                }
            }
            .sensorTopView {
                box-sizing: border-box;
                padding-top: 120px !important;
                // border-top: 1px solid #999;
            }
            .alarmSetViewRight {
                flex: 1;
                height: 100%;
                box-sizing: border-box;
                padding: 30px;
                // background-color: @activeColor;
                .setsensor_ul {
                    width: 100%;
                    list-style: none;
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    margin: 0;
                    padding: 0;
                    margin-top: 20px;
                    border-radius: 5px;
                    box-sizing: border-box;
                    padding: 15px 30px;
                    border: 1px dashed #666;
                    position: relative;
                    .setsensor_ul_show_title {
                        position: absolute;
                        top: -15px;
                        left: 10px;
                        height: 30px;
                        line-height: 30px;
                        width: 100%;
                        font-size: 20px;
                        text-align: left;
                        color: #333;
                    }
                    .setsensor_li {
                        width: 50%;
                        height: 40px;
                        // line-height: 40px;
                        box-sizing: border-box;
                        padding-right: 100px;
                        font-size: 20px;
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 25px;
                        color: #444;
                        .setsensor_li_left {
                            flex: 1;
                            display: flex;
                            justify-content: space-between;
                            box-sizing: border-box;
                            padding-right: 30px;
                            .setsensor_li_left_p {
                                flex: 0 0 50px;
                                width: 50px;
                                .el-switch {
                                    width: 100% !important;
                                }
                            }
                            .setsensor_li_left_p_flex {
                                display: flex;
                                flex-direction: column;
                                justify-content: space-around;
                                .setsensor_li_left_p_flex_desc {
                                    display: inline-block;
                                    max-width: 100%;
                                    overflow: hidden;
                                    text-overflow:ellipsis;
                                    white-space: nowrap;
                                    font-size: 12px;
                                    text-align: left;
                                    color: #666;
                                }
                            }
                        }
                        .setsensor_li_right {
                            flex: 0 0 200px;
                            width: 200px;
                            position: relative;
                            .setsensor_li_right_show {
                                position: absolute;
                                font-size: 18px;
                                top: -25px;
                                right: 0;
                                z-index: 2099;
                                display: inline-block;
                                // width: 200px;
                                transition: all 1.2s;
                                opacity: 1;
                            }
                            .setsensor_li_right_hide {
                                position: absolute;
                                font-size: 18px;
                                top: 0;
                                right: 0;
                                z-index: -1;
                                opacity: 0;
                                display: inline-block;
                                // width: 200px;
                            }
                        }
                    }
                    .savebtn {
                        display: block;
                        margin: 0 auto;
                    }
                }
                .alarmBtnView {
                    width: 100%;
                    height: 50px;
                    margin-top: 40px;
                    // background-color: blue;
                    .alarmBtn {
                        width: 65%;
                        height: 100%;
                    }
                }
                // 所有传感器列表区域
                .sensorListView {
                    position: relative;
                    width: 100%;
                    margin-top: 30px;
                    .sensorListViewCloseViewLeft {
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        z-index: 2020;
                        background-color: rgba(0, 0, 0, 0.6);
                        .sensorListViewCloseViewLeftImg {
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            width: 128px;
                            height: 128px;
                            transform: translate(-50%,-50%);
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
@keyframes myfirst
{
    from {opacity: 1;}
    to {opacity: 0;height: 0;}
}
</style>