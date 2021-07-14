<template>
    <div class="collectionIndex" @click.stop="closeSelectShowView">
        <div class="mainView-topView">
            <div class="mainView-topView-flex">
                <p>当前页面: 设置采集频率和数据保存的策略(注:数据保存策略并不影响采集频率)</p>
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
                <div class="alarmSetViewRight">
                    <div class="choiceView">
                        <div class="chioceItem" :class="isAnalogSignal?'chioceItem-active':''" @click="changeIsAnalogSignal(true)">
                            连续采集频率
                        </div>
                        <div class="chioceItem" :class="!isAnalogSignal?'chioceItem-active':''" @click="changeIsAnalogSignal(false)">
                            分时保存策略
                        </div>
                    </div>
                    <!-- 开始 显示传感器的信息 -->
                    <div class="setsensor">
                        <ul class="setsensor_ul" v-for="(listitem,listindex) in (isAnalogSignal?sensorInfo_analog_list:sensorInfo_more_list)" :key="listindex"
                        >
                            <!-- <p class="setsensor_ul_title">{{ listitem.title }}</p> -->
                            <li class="setsensor_li" v-for="(item, index) in listitem.list" :key="index" v-if="!item.noshow" 
                            >
                                <div class="setsensor_li_left">
                                    {{ item.name }}
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
                                    <el-select
                                    v-model="item.value" 
                                    :multiple="item.isMlu"
                                    :disabled="item.nochange || item.switchvalue == false"
                                    placeholder="请选择"
                                    :title="item.value">
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
                                    <el-input v-show="!item.inputnoshow" :disabled="item.nochange || item.switchvalue == false" v-model="item.value" placeholder="请输入内容" 
                                    @focus="focusInput(item)" 
                                    @blur="blurInput(item)"
                                    @input="frequencyToTime(item, index)"></el-input>
                                    <span :class="item.isshowtoast? 'setsensor_li_right_show' : 'setsensor_li_right_hide'">
                                        {{ item.show }}
                                    </span>
                                </p>
                            </li>
                        </ul>
                        <p class="alarmBtnView">
                            <el-button class="alarmBtn" type="primary" @click="submitCollectTypeChange">保存设置</el-button>
                        </p>
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
import { terminalRequest,stationRequest } from '../../publicJs/request'
import { showmessage } from '../../publicJs/utils'
// 引入绘图初始化参数文件
import { defaultAlarmSet } from '../../publicCollect/defaultAlarmSetting.ts'
import { defaultCollectSet } from '../../publicCollect/defaultCollectSetting.ts'
import { defaultSensorSet } from '../../publicCollect/defaultSensorSetting.ts'
import { defaultProjectSet } from '../../publicCollect/defaultProject.ts'
export default {
    data () {
        var windowheight = window.innerHeight;
        let minsList = [];
        for (let i = 1; i < 61; i++) {
            let obj = {
                name: i + '分钟',
                value: i
            }
            minsList.push(obj);
        }
        let hoursList = [];
        let timeList = []
        for (let i = 1; i < 25; i++) {
            let obj = {
                name: i + '小时',
                value: i
            }
            hoursList.push(obj);
            timeList.push(
                {
                    name: i < 10 ? '0' + i + ' :00' : i + ' :00',
                    value: i
                }  
            )
        }
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
            sensorInfo_analog_list: [
                {
                    title: "数据保存",
                    list: {
                        'number': {
                            name: '采样频率',
                            isselect: false,
                            // nochange: true,
                            list: [],
                            value: '0.5',
                            isshowtoast: false,
                            show: "( 0.2 - 50 )Hz"
                        },
                        'numberToInt': {
                            name: '采样周期',
                            isselect: false,
                            list: [],
                            value: '2',
                            show: ""
                        },
                    }
                },
            ], // 连续采集设置对象
            sensorInfo_more_list: [
                {
                    title: "数据保存",
                    list: {
                        'savebt': {
                            name: '保存间隔',
                            isselect: true,
                            list: hoursList,
                            value: '',
                            isshowtoast: false,
                            show: "( 1 - 3600 )分",
                            ishaveswitch: true,
                            switchvalue: false,
                        },
                        'savetime': {
                            name: '每次保存时长',
                            isselect: true,
                            // nochange: true,
                            list: minsList,
                            value: '',
                            isshowtoast: false,
                            show: "( 1 - 30 )Min",
                            switchvalue: false,
                        },

                        'savebt_d': {
                            name: '定时保存',
                            isselect: true,
                            // nochange: true,
                            isMlu: true,
                            list: timeList,
                            value: '',
                            isshowtoast: false,
                            show: "( 1 - 24 )h",
                            ishaveswitch: true,
                            switchvalue: false,
                        },
                        'savetime_d': {
                            name: '每次保存时长',
                            isselect: true,
                            // nochange: true,
                            list: minsList,
                            value: '',
                            isshowtoast: false,
                            show: "( 1 - 30 )Min",
                            switchvalue: false,
                        },

                        'savebt_c': {
                            name: '触发值保存',
                            isselect: false,
                            // nochange: true,
                            list: [],
                            value: '',
                            isshowtoast: false,
                            show: "( 0.005 - 0.300 )°",
                            ishaveswitch: true,
                            switchvalue: false,
                        },
                        'savetime_c': {
                            name: '每次保存时长',
                            isselect: true,
                            // nochange: true,
                            list: minsList,
                            value: '',
                            isshowtoast: false,
                            show: "( 1 - 30 )Min",
                            switchvalue: false,
                        },
                    }
                },
            ],
            isAnalogSignal: true, // 是否是连续采集频率设置
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
    },
    mounted () {
        // this.getDefaultAlarmSetting(this.actionIndexList[this.currentIndex].value);
        // 显示选中的监测项目
        this.initProject();
        this._getTerminalList();
        this.getHisId();
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
            this.getDefaultAlarmSetting(this.actionIndexList[this.currentIndex].value);
        },
        /**
         * 更改当前选中的li
         */
        changeCurrentIndex(index) {
            this.currentIndex != index && (this.currentIndex = index);
            this.getHisId();
            // this.getDefaultAlarmSetting(this.actionIndexList[this.currentIndex].value);
        },
        /**
         * 获取当前的报警默认参数配置信息
         */
        getDefaultAlarmSetting(type) {
            // this.sensorInfo_more_list = defaultAlarmSet[type].warningSet;
            // this.sensorInfo_more_list = defaultCollectSet.collectInfo;
            // this.sensorInfo_more_list = defaultSensorSet[type].setSensorInfoList;
        },
        /**
         * 选择是否是连续采集
         */
        changeIsAnalogSignal(signal) {
            this.isAnalogSignal = signal;
        },
        // 改变开关 继而影响下一个的禁用
        changeSwitch (item, index) {
            let list = {
                'savebt': 'savetime',
                'savebt_d': 'savetime_d',
                'savebt_c': 'savetime_c',
            }
            this.sensorInfo_more_list[0].list[list[index]].switchvalue = item.switchvalue
            for(let item in list) {
                if(item == index) {

                }else {
                    this.sensorInfo_more_list[0].list[list[item]].switchvalue = false
                    this.sensorInfo_more_list[0].list[item].switchvalue = false
                }
            }
            // if(index == "savebt") {
            //     // 保存间隔
            //     this.sensorInfo_more_list[0].list["savetime"].switchvalue = item.switchvalue
            //     console.log(this.sensorInfo_more_list[2].list["savetime"].switchvalue)
            // }else if(index == "savebt_d") {
            //     // 定时保存
            //     this.sensorInfo_more_list[0].list["savetime_d"].switchvalue = item.switchvalue
            // }else if(index == "savebt_c") {
            //     // 触发值保存
            //     this.sensorInfo_more_list[0].list["savetime_c"].switchvalue = item.switchvalue
            // }
        },
        // 改变开关 不用传入item
        changeInitSwitch (index) {
            let list = {
                'savebt': 'savetime',
                'savebt_d': 'savetime_d',
                'savebt_c': 'savetime_c',
            }
            this.sensorInfo_more_list[0].list[list[index]].switchvalue = true
            for(let item in list) {
                if(item == index) {

                }else {
                    this.sensorInfo_more_list[0].list[list[item]].switchvalue = false
                    this.sensorInfo_more_list[0].list[item].switchvalue = false
                }
            }
        },
        // 频率和周期互换方法
        frequencyToTime(item, index) {
            // if(item.)
            console.log()
            if(index == 'number') {
                let value = event.target.value.replace(/[^0123456789.]/g, '');
                console.log(value)
                item.value = value;
                if(value == 0 || value == '0.') {
                    this.sensorInfo_analog_list[0].list.numberToInt.value = 0;
                }else {
                    this.sensorInfo_analog_list[0].list.numberToInt.value = 1 / value;
                }
            }else if(index == 'numberToInt') {
                let value = event.target.value.replace(/[^0123456789.]/g, '');
                console.log(value)
                item.value = value;
                if(value == 0 || value == '0.') {
                    this.sensorInfo_analog_list[0].list.number.value = 0;
                }else {
                    this.sensorInfo_analog_list[0].list.number.value = 1 / value;
                }
            }
        },
        /**
         * input获取焦点和失去焦点事件
         */
        focusInput (item) {
            console.log('鼠标移动近来')
            item.isshowtoast = true
        },
        blurInput (item) {
            item.isshowtoast = false
        },
        /**
         * 提交修改方法 1 连续采集修改 2 非连续保存修改
         */
        submitCollectTypeChange() {
            // 1.1 获取当前更改的检测类型
            let sensorType = this.actionIndexList[this.currentIndex].value;
            if(this.isAnalogSignal) {
                // 1.0 连续采集使用连续采集接口
                // 0.1 获取采样周期 单位秒
                let frequency = this.sensorInfo_analog_list[0].list.numberToInt.value;
                let frequencyNumber = this.sensorInfo_analog_list[0].list.number.value;
                frequency = frequency * 1000;    
                // 0.1.1 采样周期是0 直接跳出
                if(frequency == 0 || frequency == '0.') {
                    showmessage(this, '采样周期为0 不合法', 'warning');
                    return;
                }
                
                const CorrespondingTypeList = {
                    'deformation': 'inclination',
                    'upvibration': 'upvibration',
                    'bottompolarization': 'opticalfiber'
                }
                // 2.1 拼接路由
                let scheduleUrlPrefix = '/schedule/schedule/reStart' + 
                    '?time=' + frequency + 
                    '&key=' + CorrespondingTypeList[sensorType];
                if(sensorType == 'upvibration') {
                    this.$axios.get('/vibration/vibration_dev_config/list.do').then((res) => {
                        if(res.data.status == 0) {
                            let list = res.data.data;
                            let devId = list[0].devId;
                            // resolve(devId);
                            this.$axios.post('/vibration/vibration_dev_config/updateSamplingFrequency.do' 
                                + '?devId=' + devId + '&samplingFrequency=' + frequencyNumber
                            ).then((res) => {
                                if(res.data.status == 0) {
                                    showmessage(this, res.data.data, 'success');
                                }else {
                                    showmessage(this, res.data.msg, 'success');
                                } 
                            })
                        }
                    })
                }else {
                    // 2.2 后台接口交互
                    this.$axios.post(scheduleUrlPrefix).then((res) => {
                        console.log(res)
                        if(res.data.status == 0) {
                            showmessage(this, res.data.msg, 'success');
                        }else {
                            showmessage(this, res.data.msg, 'success');
                        }
                    })
                }
            }else {
                // 非连续保存策略
                // 3.0 三种保存方案的开关获取
                // 置换后端定时器中定义key
                const discontinuousTypeList = {
                    'deformation': [
                        'inclinationInit',
                        'inclinationTotal',
                    ],
                    'upvibration': ['vibration'],
                    'bottompolarization': ['opticalfiberClearData']
                }
                // '/schedule/reStartByCron' {time,key}
                let timeBtwSwitch = this.sensorInfo_more_list[0].list.savebt.switchvalue
                let timesSwitch = this.sensorInfo_more_list[0].list.savebt_d.switchvalue
                console.log(timeBtwSwitch)
                console.log(timesSwitch)
                let ajaxCronList = [];
                if(timeBtwSwitch) {
                    let timeBtwSwitchInfo = {
                        time: this.sensorInfo_more_list[0].list.savebt.value,
                        mins: this.sensorInfo_more_list[0].list.savetime.value,
                    }
                    ajaxCronList.push(this.createCronList('',timeBtwSwitchInfo.time,timeBtwSwitchInfo.mins));
                }
                if(timesSwitch == true) {
                    let timesSwitchInfo = {
                        time: this.sensorInfo_more_list[0].list.savebt_d.value,
                        mins: this.sensorInfo_more_list[0].list.savetime_d.value,
                    }
                    ajaxCronList.push(this.createCronList('',timesSwitchInfo.time,timesSwitchInfo.mins))
                }
                console.log('cron表达式数组')
                console.log(ajaxCronList)
                if(ajaxCronList.length == 0) {
                    discontinuousTypeList[sensorType].forEach((item) => {
                        let ajaxUrl = '/schedule/schedule/reStartByCollectType';
                        ajaxUrl = ajaxUrl + '?jobName=' + item + '&collectType=1';
                        this.$axios.get(ajaxUrl).then((res) => {
                            if(res.data.status == 0) {
                                showmessage(this, '恢复默认保存策略', 'success');
                            }else {
                                showmessage(this, res.data.data, 'warning');
                            }
                        })
                    });

                }else {
                    for (let index = 0; index < ajaxCronList.length; index++) {
                        // const element = array[index];
                        // console.log(discontinuousTypeList[sensorType])
                        for (let i = 0; i < discontinuousTypeList[sensorType].length; i++) {
                            // const element = array[i];
                            // 组装修改定时任务对象
                            let jobTimeObj = {
                                key: '', // 任务类型
                                // jobTime: '', // 连续采集频率
                                jobCrontime: '', // cron表达式
                                collectType: '', // 采集类型
                                audioTime: '', // 声音保存时长
                            };
                            let ajaxUrl = '/schedule/schedule/reStartByType';
                            jobTimeObj.key = discontinuousTypeList[sensorType][i];
                            jobTimeObj.jobCrontime = ajaxCronList[index];
                            jobTimeObj.collectType = 2;
                            // let ajaxUrl = '/schedule/schedule/reStartByCron' + '?time=' + ajaxCronList[index] + '&key=' + discontinuousTypeList[sensorType][i];
                            // let ajaxUrl = '/schedule/schedule/reStartByCron' + '?time=' + ajaxCronList[index] + '&key=' + discontinuousTypeList[sensorType][i];
                            this.$axios.post(ajaxUrl,jobTimeObj).then((res) => {
                                if(res.data.status == 0) {
                                    showmessage(this, '修改当前保存策略成功', 'success');
                                }else {
                                    showmessage(this, res.data.data, 'warning');
                                }
                            })     
                        }
    
                        
                    }
                }
            }
        },
        /**
         * 获取当前设置的采样频率 和时间格式
         */
        async getHisId () {
            let activeIndexname = this.actionIndexList[this.currentIndex].value;
            // this.activeIndexname = data.indexname;
            let jobName = ''
            let jobNameList = {
                'deformation': [
                    'inclinationInit',
                    'inclinationTotal',
                ],
                'upvibration': ['vibration'],
                'bottompolarization': ['opticalfiberClearData']
            }
            let jobNameListTime = {
                'deformation': 'inclination',
                'upvibration': 'vibration',
                'bottompolarization': 'opticalfiber'
            }
            this.clearOriginInfo();
            await this.$axios.get('/schedule/schedule/showView?jobName=' + jobNameList[activeIndexname][0]).then((res) => {
                console.log(res)
                if(res.data.status == 0) {
                    let cronStr = res.data.data.jobCrontime;
                    let jobTime = res.data.data.jobTime;
                    if(cronStr != '') {
                        let cronInfo = this.explainCronList(cronStr);
                        if(cronInfo != null && res.data.data.collectType == '2') {
                            this.sensorInfo_more_list[0].list[cronInfo.index].switchvalue = true;
                            this.changeInitSwitch(cronInfo.index);
                            let list = {
                                'savebt': 'savetime',
                                'savebt_d': 'savetime_d',
                                'savebt_c': 'savetime_c',
                            }
                            this.sensorInfo_more_list[0].list[cronInfo.index].value = cronInfo.h;
                            this.sensorInfo_more_list[0].list[list[cronInfo.index]].value = cronInfo.m;
                        }
                    }
                }
            })
            if(activeIndexname == 'upvibration') {
                console.log('振动获取采样频率')
                this.vibrationSettingTime();
            }else {
                await this.$axios.get('/schedule/schedule/showView?jobName=' + jobNameListTime[activeIndexname]).then((res) => {
                    console.log(res)
                    if(res.data.status == 0) {
                        let jobTime = res.data.data.jobTime;
                        this.sensorInfo_analog_list[0].list.numberToInt.value = jobTime / 1000;
                        this.sensorInfo_analog_list[0].list.number.value = 1000 / jobTime;
                    }
                })
            }
            this.activeName = "right"
        },
        /**
         * 清空频率和默认的保存参数
         */
        clearOriginInfo () {
            for(let item in this.sensorInfo_more_list[0].list) {
                this.sensorInfo_more_list[0].list[item].value = ''
            }
            for(let item in this.sensorInfo_analog_list[0].list) {
                this.sensorInfo_analog_list[0].list[item].value = ''
            }
        },
        // 振动的采集频率和采集周期是通过采集卡设置
        vibrationSettingTime () {
            this.$axios.get('/vibration/vibration_dev_config/list.do').then((res) => {
                if(res.data.status == 0) {
                    let list = res.data.data;
                    let samplingFrequency = list[0].samplingFrequency;
                    this.sensorInfo_analog_list[0].list.number.value = samplingFrequency;
                    this.sensorInfo_analog_list[0].list.numberToInt.value = 1 /samplingFrequency;
                }
            })
        },
        // 生成cron表达式
        createCronList (type, hourInfo, minInfo) {
            let cronList = {
                s: '0',
                m: '*',
                h: '*',
                d: '*',
                M: '*',
                w: '?',
            }
            let hourResult = '';
            let minResult = '';
            if(hourInfo instanceof Array) {
                hourResult = hourInfo.join(",");
            }else {
                hourResult = '0/' + hourInfo;
            }
            minResult = '1-' + minInfo;
            cronList.m = minResult;
            cronList.h = hourResult;
            let arr = [];
            for(let item in cronList) {
                arr.push(cronList[item]);
            }
            return arr.join(" ");
        },
        // 解析cron表达式
        explainCronList (cronStr) {
            let cronList = {
                s: 0,
                m: 0,
                h: 0,
                d: 0,
                M: 0,
                w: 0,
                index: '',
            }
            if(cronStr == null) {
                return null;
            }
            let cronArray = cronStr.split(" ");
            console.log(cronStr)
            cronArray.forEach((item, index) => {
                if(index == 1) {
                    if(item.indexOf("-") > 0) {
                        let minArr = item.split("-");
                        cronList.m = parseInt(minArr[minArr.length - 1]);
                    }
                }
                if(index == 2) {
                    if(item.indexOf(",") > 0) {
                        let hourArr = item.split(",");
                        for (let i = 0; i < hourArr.length; i++) {
                            hourArr[i] = parseInt(hourArr[i]);
                        }
                        cronList.h = hourArr;
                        cronList.index = 'savebt_d';
                    }else {
                        let hourArr = item.split("/");
                        cronList.h = parseInt(hourArr[hourArr.length - 1]);
                        cronList.index = 'savebt';
                    }
                }
            })

            return cronList;
        },
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
        height: 100%;
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
                height: 100%;
                border-right: 1px solid #999;
                .alarmSetViewLeft-ul {
                    width: 100%;
                    height: 100%;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    .alarmSetViewLeft-li {
                        width: 100%;
                        height: 60px;
                        line-height: 60px;
                        border-bottom: 1px dashed #999;
                        color: #000;
                        cursor: pointer;
                    }
                    .alarmSetViewLeft-li-active {
                        background-color: @activeColor;
                    }
                }
            }
            .alarmSetViewRight {
                flex: 1;
                height: 100%;
                box-sizing: border-box;
                padding: 30px;
                color: #333;
                .choiceView {
                    width: 100%;
                    height: 60px;
                    line-height: 60px;
                    display: flex;
                    justify-content: space-between;
                    border: 1px solid #999;
                    border-radius: 8px;
                    overflow-x: hidden;
                    .chioceItem {
                        width: 50%;
                        height: 100%;
                        font-size: 20px;
                        text-align: center;
                        cursor: pointer;
                    }
                    .chioceItem-active {
                        background-color: #66b1ff;
                    }
                }
                // 设置传感器信息
                .setsensor {
                    width: 100%;
                    box-sizing: border-box;
                    padding: 0 30px;
                    
                    margin-top: 40px;
                    padding-bottom: 40px;
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
                        
                        .setsensor_li {
                            width: 50%;
                            height: 40px;
                            line-height: 40px;
                            box-sizing: border-box;
                            padding-right: 100px;
                            font-size: 20px;
                            display: flex;
                            justify-content: space-between;
                            margin-bottom: 15px;
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
                    .setsensor_ul_title {
                        width: 100%;
                        font-size: 20px;
                        margin-top: 20px;
                        .setsensor_ul_title_btn{
                            font-size: 20px;
                            // width: 80%;
                            // height: 40px;
                            // line-height: 40px;
                        }
                    }
                    // 置零view
                    .zeroviewshell {
                        width: 100%;
                        .zeroview {
                            width: 100%;
                            display: flex;
                            justify-content: space-between;
                            .zeroview_half {
                                width: 50%;
                                font-size: 20px;
                                text-align: center;
                                margin: 20px 0 ;
                            }
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