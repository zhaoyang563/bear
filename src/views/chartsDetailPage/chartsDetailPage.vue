<template>
    <div class="collectionIndex">
        <div class="mainView-topView">
            <div class="mainView-topView-flex">
                <div class="mainView-topView-flex-left">
                    <my-select 
                        :illusoryDeviceList="illusoryDeviceList.deviceList" 
                        @dataChange="_getAllStationList(illusoryDeviceList.deviceList.current.id)"></my-select>
                    <my-select 
                        v-show="currentIndexsName == 'inclination'"
                        :illusoryDeviceList="illusoryDeviceList.stationList" 
                        @dataChange="changeCurrentTimeAngle"></my-select>
                    <div class="mainView-topView-groupShell">
                        <div class="mainView-topView-groupView">
                            <div>
                                <el-checkbox-group v-model="illusoryDeviceList.monitorIndexList.current"
                                    @change="changeCurrentIndexs">
                                    <el-checkbox-button 
                                        v-for="city in illusoryDeviceList.monitorIndexList.realList" 
                                        :label="city.id" 
                                        :key="city.id">{{city.name}}</el-checkbox-button>
                                </el-checkbox-group>
                            </div>
                        </div>
                        <div class="mainView-topView-groupView resetMarginLeft">
                            <div class="block"  v-show="currentIndexsName != 'inclination'">
                                <div class="block">
                                    <el-date-picker
                                        v-model="value1"
                                        type="datetimerange"
                                        :picker-options="pickerOptions"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        @change="changeCurrentTimeAngle">
                                    </el-date-picker>
                                </div>
                            </div>
                            <div class="incliantionBlock"  v-show="currentIndexsName == 'inclination'">
                                <div class="block">
                                    <el-date-picker
                                        v-model="inclinationDate"
                                        type="date"
                                        placeholder="选择日期"
                                        @change="changeCurrentTimeAngle">
                                    </el-date-picker>
                                </div>
                                <el-select v-model="detailTestTimeValue" placeholder="请选择">
                                    <el-option
                                    v-for="item in detailTestTimeOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                    @change="changeCurrentTestTime">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="mainView-topView-groupView resetMarginLeft resetBorderRight" title="刷新">
                            <el-button icon="el-icon-refresh" circle
                                @click="reflushTable"></el-button>
                        </div>
                        <div class="mainView-topView-groupView resetMarginLeft resetBorderRight" title="放大/缩小">
                            <el-button :icon="!isMagnify?'el-icon-zoom-out':'el-icon-zoom-in'" circle
                                @click="changeIsMagnify"></el-button>
                        </div>
                    </div>
                </div>
                <!-- <p class="mainView-topView-flex-right">
                    <i class="el-icon-s-help"></i>
                    <span>绘图参数</span>
                </p> -->
            </div>
        </div>
        <div class="collectionIndexView">

            <template v-for="(chartsItem,chartsIndex) in waittingDrawCharts">
                <div class="collectionIndex-chartView"
                    :style="{'width': (isMagnify?'48%':'98%'),'height':(currentIndexsName=='inclination')?(winHeight-200)+'px':((winHeight-200)/2)+'px'}"
                    v-for="(item,index) in chartsItem.options.optionslist"
                    :key="index"
                    ref="chartsView">
                    <p class="collectionIndex-left-title hasNoBorder">
                        {{ item.title }}
                    </p>
                    <div class="collectionIndex-chart" :id="'chartsId' + item.id">

                    </div>
                </div>
            </template>
        </div>

        <!-- <div class="magnifyView" @click="changeIsMagnify">
            <p :class="!isMagnify?'el-icon-zoom-out':'el-icon-zoom-in'" ></p>   
        </div> -->
        <!-- <div class="magnifyView magnifyViewTop" @click="changeIsMagnify">
            <p class="el-icon-s-operation" ></p>   
        </div> -->
    </div>
</template>

<script>
import G2 from '@antv/g2';
import mySelect from '@/components/collectionIndexComponents/mySelectModel.vue';

// 全局共享数据
import globalUtils from '../../publicJs/globalSetting'
import store from '../../publicJs/store'
// 引入axios配置文件
import { terminalRequest,stationRequest,requestBase} from '../../publicJs/request'
import {responseBack,makeTimeAngle,timeapple} from '../../publicJs/utils'
// 引入绘图初始化参数文件
import { defaultDrawInfo ,defaultDrawSet} from '../../publicCollect/defaultDrawInfo.ts'
export default {
    data () {
        return {
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
                'stationList': {
                    'isShowToast': false,
                    'iconClass': 'el-icon-coordinate',
                    'current': {
                        name: '选择测点',
                        id: '',
                        isChecked: false
                    },
                    'list': [
                        {
                            id: 1,
                            name: '测点1',
                            isChecked: false,
                        },
                        {
                            id: 2,
                            name: '测点2',
                            isChecked: false,
                        },
                        {
                            id: 1,
                            name: '测点3',
                            isChecked: false,
                        },
                    ]
                },
                'monitorIndexList': {
                    'current': ['倾斜角'],
                    'list': [
                        '倾斜角','晃动角','沉降值','位移值','位移值'
                    ],
                    'realList': [
                        {
                            id: '1101',
                            name: '倾斜角',
                            isChecked: false
                        },
                        {
                            id: '1101',
                            name: '晃动角',
                            isChecked: false
                        },
                        {
                            id: '1101',
                            name: '沉降值',
                            isChecked: false
                        },
                        {
                            id: '1101',
                            name: '位移值',
                            isChecked: false
                        },
                    ]
                }
            },
            waittingDrawCharts: [],
            pickerOptions: {
                shortcuts: globalUtils.timeFormatInfo.shortcuts
            },
            value1: [new Date(2020, 3, 27, 0, 0), new Date(2020, 3, 28, 23, 59)],
            inclinationDate: 0,
            // inclinationDate: new Date().getTime(),
            allChartMap: {

            },
            currentIndexsName: 'upvibration',
            isMagnify: false, // 是否在放大状态
            winWidth: 0,
            winHeight: 0,
            detailTestTimeOptions: [{
                value: '08:30',
                label: '08:30'
            }],
            detailTestTimeValue: '',
            currentProject:'',   //当前项目
            alarmValue:'',    //预警值
            dayAlarmValue:'',   //倾斜的第二个图的预警值
            autoType:'',    //区分是滑动还是固定
        }
    },
    components: {
        mySelect: mySelect,
    },
    mounted () {
        this.winWidth = document.body.clientWidth || document.documentElement.clientWidth;
        this.winHeight = document.body.clientHeight || document.documentElement.clientHeight;
        // 赋值来自路由的参数
        this.currentIndexsName = this.$route.query.currentType;
        this.currentProject = this.$route.query.currentProject;
        if(this.currentIndexsName == 'inclination') {
            this.isMagnify = true;
        }else {
            this.isMagnify = false;
        }
        // 初始化时间范围
        this.initTimeValues();
        this._pageInit();
    },
    methods: {
        drawLeftChart (chartsIdFromHtml) {
            let data = [

            ];
            let chart = new G2.Chart({
                container: chartsIdFromHtml,
                forceFit: true,
                height: this.currentIndexsName == 'inclination'? this.winHeight - 200 : (this.winHeight - 200)/2,
                padding: [30, 30, 150, 60]
            });
            chart.source(data);
            chart.scale('value', {
                // range: [0,1]
            });
            chart.scale('year', {
                range: [ 0, 1 ],
                type: 'time',
                mask: 'M-D HH:MM',
                
            });

             // 纵坐标
            chart.axis('value', {
                title: {
                    text:'',
                    autoRotate:false,
                    textStyle: {
                        // fill: '#1890ff',
                        fill: '#fff',
                        fontSize:'14',
                        textAlign:'center',
                        rotate:270
                        // textBaseline: 'bottom'
                    },
                    
                },
                // 纵坐标刻度值颜色
                label:{
                    textStyle:{
                        fill:'#fff'
                    }
                },
                // 去掉网格线
                grid:{
                    lineStyle:{
                        stroke: '#fff',
                        lineWidth: 0,
                    }
                },
                // 纵轴线
                line:{
                    lineStyle:{
                        stroke: '#fff',
                        lineWidth: 1,
                    }
                },
                // 纵轴刻度线
                tickLine:{
                    lineStyle:{
                        stroke: '#fff',
                        lineWidth: 1,
                    }
                }
            });
            // 横坐标
            chart.axis('year', {
                // 横坐标刻度值颜色
                label:{
                    textStyle:{
                        fill:'#fff'
                    }
                },
                // 去掉网格线
                grid:{
                    lineStyle:{
                        stroke: '#fff',
                        lineWidth: 0,
                    }
                },
                // 横轴线
                line:{
                    lineStyle:{
                        stroke: '#fff',
                        lineWidth: 1,
                    }
                },
                // 横轴刻度线
                tickLine:{
                    lineStyle:{
                        stroke: '#fff',
                        lineWidth: 1,
                    }
                }
            });
            // chart.coord('polar');
            // chart.tooltip({
                
            //     crosshairs: {
            //         type: 'line'
            //     }
            // });
            // chart.tooltip(false);
            chart.tooltip({
                crosshairs: {
                    type: 'line'
                }
            });
            chart.legend({
                textStyle:{
                    fill:'#fff'
                }
            });
            chart.line().position('year*value');
            // chart.point().position('year*value')
            //     .size(4)
            //     .shape('circle')
            //     .style({
            //         stroke: '#fff',
            //         lineWidth: 1
            //     });
            
            chart.render();

            // 赋值保存图形对象
            this.allChartMap[chartsIdFromHtml] = chart;
        },
        /**
         * get groupList
         */
        async _getSubProjectGroup() {
            // currentIndexsName this.$route.query.index
            let groupListResult = await requestBase.baseApi('found/group/selectGroupBySubprojectId','GET',{
                subprojectId: this.$route.query.index
            })
            responseBack(this,groupListResult,this.setGroupList(groupListResult.data));
        },
        /**
         * set grouplist
         */
        setGroupList(list) {
            let realTerminalList = [];
            list.forEach((item) => {
                item.name = item.groupName;
                item.isChecked = false;
                realTerminalList.push(item);
            })
            this.illusoryDeviceList.deviceList.list = realTerminalList;
            this.illusoryDeviceList.deviceList.current = realTerminalList[0];
            // 三个模块均进行预警值的预保存
            this.alarmValue = this.illusoryDeviceList.deviceList.current.alarmValue
            if(this.currentIndexsName == 'inclination') {
                this._getAllStationList(this.illusoryDeviceList.deviceList.current.id);
            }else {
                // 获取监测类型
                this._getDefaultIndexs(this.currentIndexsName,true);
            }
        },
        /**
         * get current date all test.
         */
        getCurrentDateAllTest() {
            this.$axios.get('/found/plan/selectDayPlan?groupId=' +  this.illusoryDeviceList.deviceList.current.id
                + '&zero=' + new Date(this.inclinationDate).getTime()).then((res) => {
                    if(res.data.status == 2000) {
                        let responseData = res.data.body;
                        let filterResponseData = responseData.filter((item) => {
                            return item.pointName == this.illusoryDeviceList.stationList.current.name;
                        })
                        let timeList = [];
                        filterResponseData.forEach((item) => {
                            let obj = {
                                value: '08:30',
                                label: '08:30'
                            };
                            obj.value = item.time;
                            obj.label = timeapple(item.time,'hmin');
                            timeList.push(obj);
                        })
                        this.detailTestTimeOptions = [];
                        this.detailTestTimeOptions = timeList;
                        this.detailTestTimeValue = '';
                        this.detailTestTimeValue = this.detailTestTimeOptions[0].value || '';
                    }
                })
        },
        /**
         * set setStationList
         */
        setStationList(list) {
            let realTerminalList = [];
            list.forEach((item) => {
                if(item.status == 1) {
                    item.isChecked = false;
                    item.name = item.pointName;
                    realTerminalList.push(item);
                }
            })
            this.illusoryDeviceList.stationList.list = realTerminalList;
            if(this.$route.query.stationId != null) {
                realTerminalList.forEach((item,index) => {
                    if(item.id == this.$route.query.stationId) {
                        this.illusoryDeviceList.stationList.current = realTerminalList[index];
                    }
                })
            }else {
                this.illusoryDeviceList.stationList.current = realTerminalList[0];
            }
            if(this.currentIndexsName == 'inclination') {
                // get current date all test.
                this.getCurrentDateAllTest();
            }
            // 获取监测类型
            this._getDefaultIndexs(this.currentIndexsName,true);
        },
        /**
         * if is incliantion get stationlist
         */
        async _getAllStationList(groupId) {
            // autoType区分是滑动还是固定  0-滑动   1-倾斜
            // 下面这两个赋值仅针对于倾斜
            this.autoType = this.illusoryDeviceList.deviceList.current.autoType
            this.dayAlarmValue = this.illusoryDeviceList.deviceList.current.dayAlarmValue
            this.alarmValue = this.illusoryDeviceList.deviceList.current.alarmValue
            // currentIndexsName this.$route.query.index
            let groupListResult = await requestBase.baseApi('found/incline/selectInclinePointByGroupId','GET',{
                groupId: groupId
            })
            responseBack(this,groupListResult,this.setStationList(groupListResult.data));
        },
        /**
         * 获取风机列表信息
         */
        _getTerminalList() {
            let terminalList = terminalRequest.list();
            let realTerminalList = [];
            terminalList.then((res) => {
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
                // 进行测点获取事件
                // this._getStationList();
                this._getStationList();
                return realTerminalList;
            })
        },
        /**
         * 获取测点信息
         */
        _getStationList() {
            let type = this.currentIndexsName;
            let stationList = stationRequest.getStationListByType(type,
                this.illusoryDeviceList.deviceList.current.id);
            let realStationList = [];
            stationList.then((res) => {
                if(res.responseStatus == 'success') {
                    let stationList = res.data; 
                    stationList.forEach((stationItem,index) => {
                        let obj = {};
                        if(this.currentIndexsName == 'deformation') {
                            obj = {
                                name: stationItem.name,
                                id: stationItem.address,
                                isChecked: index == 0,
                                radius: stationItem.radius?stationItem.radius:0,
                                installHeight: stationItem.installHeight?stationItem.installHeight:0,
                            }
                        }else if(this.currentIndexsName == 'upvibration') {
                            obj = {
                                name: stationItem.name,
                                id: stationItem.id,
                                isChecked: index == 0,
                            }
                        }
                        realStationList.push(obj);
                    })
                }else {
                    realStationList = [{
                        name: '默认测点',
                        id: '',
                        isChecked: false
                    }];
                }
                this.illusoryDeviceList.stationList.list = realStationList;
                this.illusoryDeviceList.stationList.current = realStationList[0];
                // 获取监测类型
                this._getDefaultIndexs(this.currentIndexsName,true);
                return realStationList;
            },() => {
                this.illusoryDeviceList.stationList.current = {
                    name: '默认测点',
                    id: '',
                    isChecked: false
                };
            })
        },
        /**
         * 获取传感器列表
         */
        _getSensorList(type) {
            return stationRequest.getSensorListByType(type,this.illusoryDeviceList.deviceList.current.id);
        },
        /**
         * 获取初始化显示图表类型
         */
        _getDefaultIndexs(type,isDefault) {
            this.destoryAllCharts();
            this.allChartMap = {};
            this.waittingDrawCharts = [];
            
            // illusoryDeviceList
            let getIndexList = defaultDrawInfo[type].indexsList;
            console.log('测试绘图的类别')
            console.log(defaultDrawInfo[type].indexsList)
            // 之前加的逻辑判断,不知道有啥用  现在需要吧倾斜也加上
            if(this.currentProject != '留下单元XH304-01农居安置房工程' ||  type != 'axialForce'){
                if(type == 'inclination'){
                    getIndexList = defaultDrawInfo[type].indexsList;
                }else{
                    getIndexList.length = 2
                }
               
            }
            console.log(getIndexList)
            let getDefaultActiveIndex = isDefault? defaultDrawInfo[type].default : this.illusoryDeviceList.monitorIndexList.current;
            let realIndexList = [];
            let realCurrentIndexList = [];
            let realIndexNameList = [];
            getIndexList.forEach((indexItem) => {
                let obj = {
                    name: indexItem.name,
                    id: indexItem.value,
                    isChecked: false,
                }
                // 是否是默认选中项目
                if(getDefaultActiveIndex.indexOf(indexItem.value) > -1) {
                    obj.isChecked = true;
                    realCurrentIndexList.push(indexItem.value);
                }
                realIndexNameList.push(indexItem.name);
                realIndexList.push(obj);
            });
            this.illusoryDeviceList.monitorIndexList.current = realCurrentIndexList;
            this.illusoryDeviceList.monitorIndexList.list = realIndexNameList;
            this.illusoryDeviceList.monitorIndexList.realList = realIndexList;
            // 绘制图形 无数据
            this._accordingIndexsToCharts(this.currentIndexsName);
        },
        /**
         * 根据控制的显示图表类型进行图表的渲染
         * type 是指定类型
         */
        _accordingIndexsToCharts(type) {
            // 1.0 获取对应类型的默认所有图表信息
            let chartsSetting = defaultDrawSet[type].selist;
             // 之前加的逻辑判断,不知道有啥用  现在需要吧倾斜也加上
            if(this.currentProject != '留下单元XH304-01农居安置房工程' || type != 'axialForce'){
                if(type == 'inclination'){
                    chartsSetting = defaultDrawSet[type].selist;
                }else{
                    chartsSetting.length = 2
                }
                
            }
            // 1.1 获取当前选中 可见的图表类型 获取的是图表显示的value值的
            let currentShowedIndexs = this.illusoryDeviceList.monitorIndexList.current;
            let filterCurrentCharts = chartsSetting.filter((currentItem) => {
                return currentShowedIndexs.indexOf(currentItem.value) > -1;
            })
            this.waittingDrawCharts = filterCurrentCharts;
            // 图表的id chartsId + 当前表格的id
            setTimeout(() => {
                this.waittingDrawCharts.forEach((chartsInfo) => {
                    chartsInfo.options.optionslist.forEach((oneChartInfo) => {
                        let chartsId = 'chartsId' + oneChartInfo.id;
                        this.drawLeftChart(chartsId);
                    });
                });

                // 开始获取云端数据
                this._getCloudDataAndDrawForInclination();
                // this._getCloudDataAndDraw();
            });
        },
        /**
         * 根据绘制的图形数据获取 and 绘图
         */
        _getCloudDataAndDraw() {
            this.waittingDrawCharts.forEach((chartsInfo) => {
                // 1.0 构造请求url
                let originUrl = chartsInfo.requesturl;
                let controllerInfo = {
                    beginTime: new Date(this.value1[0]).getTime(),
                    endTime: new Date(this.value1[1]).getTime(),
                    // count: 1024,
                    // querySpeedStatus: 1,
                    // terminalId: this.illusoryDeviceList.deviceList.current.id,
                    // num: 1024,
                };
                if(this.currentIndexsName == 'deformation') {
                    controllerInfo.inclinationId = this.illusoryDeviceList.stationList.current.id
                }else if(this.currentIndexsName == 'upvibration') {
                    controllerInfo.groupId = this.illusoryDeviceList.stationList.current.id
                }
                // testing use groupid 41
                //  controllerInfo.groupId = 41; // sed test group
                //  controllerInfo.groupId = 40; // water test group
                controllerInfo.groupId = this.illusoryDeviceList.deviceList.current.id; 
                controllerInfo.planTime = this.detailTestTimeValue;
                if(this.currentIndexsName == 'inclination') {
                    controllerInfo.pointId = this.illusoryDeviceList.stationList.current.id; 
                    controllerInfo.planTime = this.detailTestTimeValue;
                    // this.inclinationDate
                    // let inclinationBTime = makeTimeAngle(this.inclinationDate);
                    // controllerInfo.beginTime = inclinationBTime[0];
                    // controllerInfo.endTime = inclinationBTime[1];
                }
                originUrl += this.Json2Params(controllerInfo);
                setTimeout(() => {
                    this.$axios.get(originUrl).then((responseData) => {
                        let originDataList;
                        if(this.currentIndexsName == 'inclination') {
                            originDataList = responseData.data.body || [];
                        }else {
                            originDataList = responseData.data.body.chatConvertDOS || [];
                        }
                        
                        // 遍历内层图形列表
                        chartsInfo.options.optionslist.forEach(async(oneChart) => {
                            // 1.0制作数据显示格式
                            let showDataList = [];
                            if(oneChart.accordKey != null) {
                                if(this.currentIndexsName == 'strain') {
                                    // 临时应变使用方法
                                    originDataList.forEach((oneOriginData) => {
                                        let middleObj = {
                                            year: oneChart['xdataname'] == 'date'? new Date(oneOriginData[oneChart['xdataname'] == 'date'?'createTime':oneChart['xdataname']]).getTime() : oneOriginData[oneChart['xdataname']],
                                            value: oneOriginData[oneChart['ydataname']],
                                            type: oneChart['accordKey'] + oneOriginData[oneChart['accordKey']],
                                        }
                                        // 2.0 push数据
                                        showDataList.push(middleObj);
                                    });
                                }else {
                                    // 需要按照 accordKey 进行数据分条
                                    let sensorList = await this._getSensorList(this.currentIndexsName);
                                    let filterSensors = [];
                                    let filterSensorsKeys = [];
                                    filterSensors = sensorList.data.filter((item) => {
                                        return item.groupId == this.illusoryDeviceList.stationList.current.id;
                                    })
                                    filterSensors.forEach((item) => {
                                        filterSensorsKeys.push(item[oneChart.accordKey]);
                                    })
                                    originDataList.forEach((oneOriginData) => {
                                        if(filterSensorsKeys.indexOf(oneOriginData[oneChart['accordKey']]) > -1) {
                                            let middleObj = {
                                                year: oneChart['xdataname'] == 'date'? new Date(oneOriginData[oneChart['xdataname'] == 'date'?'createTime':oneChart['xdataname']]).getTime() : oneOriginData[oneChart['xdataname']],
                                                value: oneOriginData[oneChart['ydataname']],
                                                type: oneChart['accordKey'] + oneOriginData[oneChart['accordKey']],
                                            }
                                            // 2.0 push数据
                                            showDataList.push(middleObj);
                                        }
                                    });
                                }
                            }else {
                                originDataList.forEach((oneOriginData) => {
                                    if(Array.isArray(oneChart.ydataname)) {
                                        oneChart.ydataname.forEach((item,index) => {
                                            let middleObj = {
                                                year: oneChart['xdataname'] == 'date'? new Date(oneOriginData[oneChart['xdataname'] == 'date'?'createTime':oneChart['xdataname']]).getTime() : oneOriginData[oneChart['xdataname']],
                                                value: oneOriginData[item],
                                                type: item
                                            }
                                            // 2.0 push数据
                                            showDataList.push(middleObj);
                                        })
                                    }else {
                                        // list[list] for
                                        let middleObj = {
                                            year: oneChart['xdataname'] == 'date'?
                                                new Date(oneOriginData[oneChart['xdataname'] == 'date'?'planTime':oneChart['xdataname']]).getTime() : 
                                                oneOriginData[oneChart['xdataname']],
                                            value: oneOriginData[oneChart['ydataname']],
                                            type: oneOriginData.pointName,
                                        }
                                        // 看是否需要计算
                                        if(oneChart.formulaid == 1) {
                                            middleObj.value = Math.sin(middleObj.value) * (this.illusoryDeviceList.stationList.current.radius);
                                        }
                                        if(oneChart.formulaid == 2) {
                                            middleObj.value = Math.sin(middleObj.value) * (this.illusoryDeviceList.stationList.current.installHeight) * 0.75;
                                        }
                                        // 2.0 push数据
                                        showDataList.push(middleObj);
        
                                    }
                                });
                            }
                            // 3.0 计算当前图形的id
                            let chartId = 'chartsId' + oneChart.id;
                            if(oneChart.charttype == 'scatter') {
                                this.allChartMap[chartId].clear();
                                this.allChartMap[chartId].coord('polar');
                                this.allChartMap[chartId].scale('year', {
                                    // range: [ 0,360],
                                    // type: "cat",
                                    min: 0,
                                    max: 360,
                                    // values: [0,90,180,270,360],
                                    // min: 0,
                                    // max: 360,
                                    tickCount: 8,
                                    formatter: (val) => {
                                        if(val == 0) {
                                            return '北'
                                        }
                                        if(val == 90) {
                                            return '东'
                                        }
                                        if(val == 180) {
                                            return '南'
                                        }
                                        if(val == 270) {
                                            return '西'
                                        }
                                        return val;
                                    },
                                    // mask: 'M-D HH:MM',
                                    
                                });
                                this.allChartMap[chartId].point().position('year*value').color('Grade').shape('circle').opacity(0.65).size(1);
                            }
                            // if(Array.isArray(oneChart.ydataname) || oneChart.accordKey != null) {
                            //     this.allChartMap[chartId].clear();
                            //     this.allChartMap[chartId].scale('year', {
                            //         range: [ 0, 1 ],
                            //         type: 'timeCat',
                            //         mask: 'M-D HH:MM',
                                    
                            //     });
                            //     this.allChartMap[chartId].source(showDataList);
                            //     this.allChartMap[chartId].line().position('year*value').color('type');
                            // }else {
                            //     this.allChartMap[chartId].changeData(showDataList);
                            // }
                            this.allChartMap[chartId].clear();
                            this.allChartMap[chartId].scale('year', {
                                range: [ 0, 1 ],
                                type: 'timeCat',
                                mask: 'M-D HH:MM',
                                
                            });
                            // this.allChartMap[chartId].guide().text({
                            //     top: true, // 指定 giude 是否绘制在 canvas 最上层，默认为 false, 即绘制在最下层
                            //     position: ['start', 'end'], // 文本的起始位置，值为原始数据值，支持 callback
                            //     content: oneChart.ytitle, // 显示的文本内容
                            //     style: {  // 文本的图形样式属性
                            //         fill: '#000', // 文本颜色
                            //         fontSize: '12', // 文本大小
                            //     }, // 文本的图形样式属性
                            //     offsetX: -42, // x 方向的偏移量
                            //     offsetY: -20, // y 方向偏移量
                            // });
                            this.allChartMap[chartId].guide().text({
                                top: true, // 指定 giude 是否绘制在 canvas 最上层，默认为 false, 即绘制在最下层
                                position: ['end', 'start'], // 文本的起始位置，值为原始数据值，支持 callback
                                content: this.currentIndexsName == 'inclination'?"深度(m)":'(日期)', // 显示的文本内容
                                style: {  // 文本的图形样式属性
                                    fill: '#000', // 文本颜色
                                    fontSize: '12', // 文本大小
                                }, // 文本的图形样式属性
                                offsetX: -30, // x 方向的偏移量
                                offsetY: 0, // y 方向偏移量
                            });
                            this.allChartMap[chartId].source(showDataList);
                            this.allChartMap[chartId].line().position('year*value').color('type');
                            this.allChartMap[chartId].legend('value', {
                                position: 'right',
                                bottom: 10,
                                left: 'center',
                                data: ['1','3']
                            });
                            this.allChartMap[chartId].render();
                        })

                    })
                })
            });
        },
        /**
         * 根据绘制的图形数据获取 and 绘图
         * only inclination
         */
        _getCloudDataAndDrawForInclination() {
            this.waittingDrawCharts.forEach((chartsInfo) => {
                // 1.0 构造请求url
                let originUrl = chartsInfo.requesturl;
                let controllerInfo = {
                    beginTime: new Date(this.value1[0]).getTime(),
                    // endTime: new Date(this.value1[1]).getTime()-1000*60*60*24,
                    endTime: new Date(this.value1[1]).getTime(),
                };
                // testing use groupid 41
                //  controllerInfo.groupId = 41; // sed test group
                //  controllerInfo.groupId = 40; // water test group
                controllerInfo.groupId = this.illusoryDeviceList.deviceList.current.id; 
                if(this.currentIndexsName == 'inclination') {
                    controllerInfo.pointId = this.illusoryDeviceList.stationList.current.id; 
                    // this.inclinationDate
                    let inclinationBTime = makeTimeAngle(this.inclinationDate);
                    controllerInfo.beginTime = inclinationBTime[0];
                    controllerInfo.endTime = inclinationBTime[1];
                    controllerInfo.planTime = this.detailTestTimeValue || 0;
                    // 如果是固定倾斜即autoType=1
                    if(chartsInfo.options.id == '1113'){
                        if(this.autoType == 1){
                            originUrl = '/found/fixedIncline/selectLastWeek'
                        }else{
                            originUrl = '/found/fixedIncline/getMaxPerDay'
                        }
                    }else{
                        if(this.autoType == 1){
                            originUrl = '/found/fixedIncline/selectOneGroupFixedIncline'
                        }
                    }
                    
                }
                originUrl += this.Json2Params(controllerInfo);
                setTimeout(() => {
                    this.$axios.get(originUrl).then((responseData) => {
                        let originDataList;
                        if(this.currentIndexsName == 'inclination') {
                            // 固定倾斜返回数据格式和滑动倾斜(原来的)不一致，在这块进行处理
                            if(this.autoType == 1){
                                originDataList = responseData.data.body || [];
                            }else{
                                originDataList = responseData.data.body.inclines || [];
                            }
                            originDataList.map(item => {
                                if(item.createTime){
                                    item.planTime = item.createTime.time
                                }
                            })
                        }else {
                            originDataList = responseData.data.body.chatConvertDOS || [];
                        }
                        // 取出数据中时间戳的最大最小值，也就是预警值的开始和截至时间
                        let alarmMin = originDataList[0].planTime
                        let alarmMax = originDataList[0].planTime
                        for(let i = 0; i < originDataList.length; i++){
                            if(originDataList[i].planTime < alarmMin){
                                alarmMin = originDataList[i].planTime
                            }
                            if(originDataList[i].planTime > alarmMax){
                                alarmMax = originDataList[i].planTime
                            }
                        }
                        let alarmMinIn = originDataList[0].presentDepth
                        let alarmMaxIn = originDataList[0].presentDepth
                        // 根据测点名称计算每次绘图数据有及各测点的类
                        let typeNum = 1
                        console.log(originDataList)
                        for(let i = 1; i < originDataList.length; i++){
                            if(originDataList[i-1].pointName != originDataList[i].pointName){
                                typeNum++
                            }
                        }
                        if(this.currentIndexsName == 'inclination'){
                            for(let i = 0; i < originDataList.length; i++){
                                if(originDataList[i].presentDepth < alarmMinIn){
                                    alarmMinIn = originDataList[i].presentDepth
                                }
                                if(originDataList[i].presentDepth > alarmMaxIn){
                                    alarmMaxIn = originDataList[i].presentDepth
                                }
                            }
                        }
                        // 遍历内层图形列表
                        chartsInfo.options.optionslist.forEach(async(oneChart) => {
                            // 1.0制作数据显示格式
                            let showDataList = [];
                            if(oneChart.id == '113-1' && this.currentIndexsName == 'axialForce'){
                                let a = {
                                    pointName:'报警指标上限',
                                    calculated:this.alarmValue,
                                    planTime:alarmMin
                                }
                                let b = {
                                    pointName:'报警指标上限',
                                    calculated:this.alarmValue,
                                    planTime:alarmMax
                                }
                                let a1 = {
                                    pointName:'报警指标下限',
                                    calculated:-this.alarmValue,
                                    planTime:alarmMin
                                }
                                let b1 = {
                                    pointName:'报警指标下限',
                                    calculated:-this.alarmValue,
                                    planTime:alarmMax
                                }
                                originDataList.unshift(a)
                                originDataList.push(b)
                                originDataList.unshift(a1)
                                originDataList.push(b1)
                            }
                            if(oneChart.id == '112-1' && this.currentIndexsName == 'waterLevel'){
                                let sum = this.alarmValue/1000
                                let a = {
                                    pointName:'报警指标上限',
                                    variable:parseFloat(this.alarmValue/1000),
                                    planTime:alarmMin
                                }
                                let b = {
                                    pointName:'报警指标上限',
                                    variable:parseFloat(this.alarmValue/1000),
                                    planTime:alarmMax
                                }
                                let a1 = {
                                    pointName:'报警指标下限',
                                    variable:-parseFloat(this.alarmValue/1000),
                                    planTime:alarmMin
                                }
                                let b1 = {
                                    pointName:'报警指标下限',
                                    variable:-parseFloat(this.alarmValue/1000),
                                    planTime:alarmMax
                                }
                                originDataList.unshift(a)
                                originDataList.push(b)
                                originDataList.unshift(a1)
                                originDataList.push(b1)
                            }
                            if(oneChart.id == '101-0' && this.currentIndexsName == 'inclination' && this.autoType == 0){
                                let a = {
                                    pointName:'报警指标上限',
                                    sumVariable:this.alarmValue,
                                    presentDepth:alarmMinIn
                                }
                                let b = {
                                    pointName:'报警指标上限',
                                    sumVariable:this.alarmValue,
                                    presentDepth:alarmMaxIn
                                }
                                // let a1 = {
                                //     pointName:'报警指标下限',
                                //     sumVariable:-this.alarmValue,
                                //     presentDepth:originDataList[0].presentDepth
                                // }
                                // let b1 = {
                                //     pointName:'报警指标下限',
                                //     sumVariable:-this.alarmValue,
                                //     presentDepth:originDataList[originDataList.length-1].presentDepth
                                // }
                                originDataList.unshift(a)
                                originDataList.push(b)
                                // originDataList.unshift(a1)
                                // originDataList.push(b1)
                            }
                            if(oneChart.id == '102-0' && this.currentIndexsName == 'inclination' && this.autoType == 0){
                                let a = {
                                    pointName:'报警指标上限',
                                    variable:this.dayAlarmValue,
                                    presentDepth:alarmMinIn
                                }
                                let b = {
                                    pointName:'报警指标上限',
                                    variable:this.dayAlarmValue,
                                    presentDepth:alarmMaxIn
                                }
                                let a1 = {
                                    pointName:'报警指标下限',
                                    variable:-this.dayAlarmValue,
                                    presentDepth:alarmMinIn
                                }
                                let b1 = {
                                    pointName:'报警指标下限',
                                    variable:-this.dayAlarmValue,
                                    presentDepth:alarmMaxIn
                                }
                                originDataList.unshift(a)
                                originDataList.push(b)
                                originDataList.unshift(a1)
                                originDataList.push(b1)
                            }
                            
                            let startTime = new Date(alarmMin).getTime()
                            originDataList.forEach((oneOriginData) => {
                                let middleObj = {};
                                
                                if(this.currentIndexsName == 'inclination' && oneChart.id == '1113-0') {
                                    middleObj = {
                                        year: oneChart['xdataname'] == 'date'?
                                            new Date(oneOriginData[oneChart['xdataname'] == 'date'?'planTime':oneChart['xdataname']]).getTime() : 
                                            oneOriginData[oneChart['xdataname']],
                                        value: oneOriginData[oneChart['ydataname']],
                                        type: oneOriginData.pointName,
                                    };
                                }else {
                                    middleObj = {
                                        year: oneChart['xdataname'] == 'date'?
                                            new Date(oneOriginData[oneChart['xdataname'] == 'date'?'planTime':oneChart['xdataname']]).getTime() : 
                                            oneOriginData[oneChart['xdataname']],
                                        value: oneOriginData[oneChart['ydataname']],
                                        type: oneOriginData.pointName,
                                    };
                                }
                                // 看是否需要计算
                                if(oneChart.formulaid == 1) {
                                    middleObj.value = Math.sin(middleObj.value) * (this.illusoryDeviceList.stationList.current.radius);
                                }
                                if(oneChart.formulaid == 2) {
                                    middleObj.value = Math.sin(middleObj.value) * (this.illusoryDeviceList.stationList.current.installHeight) * 0.75;
                                }
                                // 2.0 push数据
                                showDataList.push(middleObj);
                            });
                            // if is inclination sort
                            if(this.currentIndexsName == 'inclination') {
                                showDataList.sort((item) => {
                                    return item.value;
                                })
                            }
                            // 3.0 计算当前图形的id
                            let chartId = 'chartsId' + oneChart.id;
                            this.allChartMap[chartId].clear();
                            if(this.currentIndexsName == 'inclination' && oneChart.id != '1113-0') {
                                this.allChartMap[chartId].scale('year', {
                                    range: [ 0, 1 ],
                                    type: 'linear',
                                });
                                 this.allChartMap[chartId].axis('year', {
                                //    position: 'top'
                                });
                            }else {
                                this.allChartMap[chartId].scale('year', {
                                    range: [ 0, 1 ],
                                    type: 'timeCat',
                                    // mask: 'M-D HH:MM', 
                                });
                            }
                            this.allChartMap[chartId].guide().text({
                                top: true, // 指定 giude 是否绘制在 canvas 最上层，默认为 false, 即绘制在最下层
                                position: ['start', 'end'], // 文本的起始位置，值为原始数据值，支持 callback
                                content: oneChart.ytitle, // 显示的文本内容
                                style: {  // 文本的图形样式属性
                                    fill: '#fff', // 文本颜色
                                    fontSize: '12', // 文本大小
                                }, // 文本的图形样式属性
                                offsetX: -42, // x 方向的偏移量
                                offsetY: -20, // y 方向偏移量
                            });
                            this.allChartMap[chartId].guide().text({
                                top: true, // 指定 giude 是否绘制在 canvas 最上层，默认为 false, 即绘制在最下层
                                position: ['end', 'start'], // 文本的起始位置，值为原始数据值，支持 callback
                                content: this.currentIndexsName == 'inclination' && oneChart.id != '1113-0'?"深度(m)":'(日期)', // 显示的文本内容
                                style: {  // 文本的图形样式属性
                                    fill: '#fff', // 文本颜色
                                    fontSize: '12', // 文本大小
                                }, // 文本的图形样式属性
                                offsetX: -30, // x 方向的偏移量
                                offsetY: 0, // y 方向偏移量
                            });
                            this.allChartMap[chartId].source(showDataList);
                            if(this.currentIndexsName == 'inclination' && oneChart.id != '1113-0') {
                                if(this.autoType == 0){
                                    if(oneChart.id == '101-0'){
                                        this.allChartMap[chartId].line().position('year*value').color('type',['#2998ff','#FF0000']).style('type',{
                                            lineDash:(val) => {
                                                if(val == '报警指标上限' || val == '报警指标下限'){
                                                    return [3,3]
                                                }
                                            }
                                        });
                                        // 设置报警指标的文字及位置(101-0和102-0的预警指标不一样,101-0是alarmValue,102-0是dayAlarmValue)
                                        this.allChartMap[chartId].guide().text({
                                            content: '报警指标上限',
                                            position: [ alarmMinIn, this.alarmValue ],
                                            style: {
                                                fill: '#fff',
                                                fontSize: 14,
                                                fontWeight: 300,
                                                // rotate:90,
                                            },
                                            offsetY: 50,
                                            offsetX: -90,  //
                                            
                                        });

                                        // this.allChartMap[chartId].guide().text({
                                        //     content: '报警指标下限',
                                        //     position: [ startTime, -this.alarmValue ],
                                        //     style: {
                                        //         fill: '#ff0000',
                                        //         fontSize: 14,
                                        //         fontWeight: 300
                                        //     },
                                        //     offsetY: -10,
                                        //     // offsetX: -50,
                                        // });
                                    }else{
                                        this.allChartMap[chartId].line().position('year*value').color('type',['#FF0000','#2998ff','#FF0000']).style('type',{
                                            lineDash:(val) => {
                                                if(val == '报警指标上限' || val == '报警指标下限'){
                                                    return [3,3]
                                                }
                                            }
                                        });
                                        this.allChartMap[chartId].guide().text({
                                            content: '报警指标上限',
                                            position: [ alarmMinIn, this.dayAlarmValue ],
                                            style: {
                                                fill: '#fff',
                                                fontSize: 14,
                                                fontWeight: 300,
                                                // rotate:90,
                                            },
                                            offsetY: 50,
                                            offsetX: -90,  //
                                            
                                        });
                                        this.allChartMap[chartId].guide().text({
                                            content: '报警指标下限',
                                            position: [ alarmMinIn, -this.dayAlarmValue ],
                                            style: {
                                                fill: '#fff',
                                                fontSize: 14,
                                                fontWeight: 300,
                                                // rotate:90,
                                            },
                                            offsetY: 50,
                                            offsetX: 0,  //
                                        });
                                    }
                                    
                                }else{
                                    this.allChartMap[chartId].line().position('year*value').color('type');
                                }
                                
                                // this.allChartMap[chartId].coord().reflect('y');
                                this.allChartMap[chartId].coord().transpose().reflect('y');
                                this.allChartMap[chartId].axis('value', {
                                    title: {
                                        text:'',
                                        autoRotate:false,
                                        textStyle: {
                                            // fill: '#1890ff',
                                            fill: '#fff',
                                            fontSize:'14',
                                            textAlign:'center',
                                            rotate:270
                                            // textBaseline: 'bottom'
                                        },
                                        
                                    },
                                    // 纵坐标刻度值颜色
                                    label:{
                                        textStyle:{
                                            fill:'#fff'
                                        }
                                    },
                                    // 去掉网格线
                                    grid:{
                                        lineStyle:{
                                            stroke: '#fff',
                                            lineWidth: 0,
                                        }
                                    },
                                    // 纵轴线
                                    line:{
                                        lineStyle:{
                                            stroke: '#fff',
                                            lineWidth: 1,
                                        }
                                    },
                                    // 纵轴刻度线
                                    tickLine:{
                                        lineStyle:{
                                            stroke: '#fff',
                                            lineWidth: 1,
                                        }
                                    }
                                });
                                // 横坐标
                                this.allChartMap[chartId].axis('year', {
                                    // 横坐标刻度值颜色
                                    label:{
                                        textStyle:{
                                            fill:'#fff'
                                        }
                                    },
                                    // 去掉网格线
                                    grid:{
                                        lineStyle:{
                                            stroke: '#fff',
                                            lineWidth: 0,
                                        }
                                    },
                                    // 横轴线
                                    line:{
                                        lineStyle:{
                                            stroke: '#fff',
                                            lineWidth: 1,
                                        }
                                    },
                                    // 横轴刻度线
                                    tickLine:{
                                        lineStyle:{
                                            stroke: '#fff',
                                            lineWidth: 1,
                                        }
                                    }
                                });
                            }else {
                                // 113-1  轴力    112-1  水位
                                let colorArr = ['#FF0000','#FF0000','#2998ff','#3ec667','#fad025','#33417d','#8e51e2','#24c6c6','#3436c7','#f04864']
                                if(oneChart.id == '113-1'){
                                    let arr = [3,3]
                                    // this.allChartMap[chartId].line().position('year*value').color('type',['#FF0000','#FF0000','#2998ff','#3ec667','#fad025','#33417d','#8e51e2','#24c6c6']);
                                    this.allChartMap[chartId].line().position('year*value').color('type',colorArr.slice(0,typeNum+2)).style('type',{
                                        // 将报警指标设置为虚线
                                        lineDash:(val) => {
                                            if(val == '报警指标上限' || val == '报警指标下限'){
                                                return [3,3]
                                            }
                                        }
                                    });
                                }else if(oneChart.id == '112-1'){
                                    // this.allChartMap[chartId].line().position('year*value').color('type',['#FF0000','#FF0000','#2998ff','#3ec667','#fad025','#33417d','#8e51e2','#24c6c6','#3436c7','#f04864']);
                                    this.allChartMap[chartId].line().position('year*value').color('type',colorArr.slice(0,typeNum+2)).style('type',{
                                        // 将报警指标设置为虚线
                                        lineDash:(val) => {
                                            if(val == '报警指标上限' || val == '报警指标下限'){
                                                return [3,3]
                                            }
                                        }
                                    });
                                }else{
                                    this.allChartMap[chartId].line().position('year*value').color('type');
                                }
                                
                            }
                            if(oneChart.id == '113-1' || oneChart.id == '112-1'){
                                if(this.currentIndexsName == 'waterLevel'){
                                    this.alarmValue = parseFloat(this.alarmValue/1000)
                                }
                                // 设置预警值文字及位置
                                console.log(startTime)
                                console.log(this.alarmValue)
                                this.allChartMap[chartId].guide().text({
                                    content: '报警指标上限',
                                    position: [ startTime, this.alarmValue ],
                                    style: {
                                        fill: '#fff',
                                        fontSize: 14,
                                        fontWeight: 300
                                    },
                                    offsetY: -10,
                                    offsetX: 30,
                                });

                                this.allChartMap[chartId].guide().text({
                                    content: '报警指标下限',
                                    position: [ startTime, -this.alarmValue ],
                                    style: {
                                        fill: '#fff',
                                        fontSize: 14,
                                        fontWeight: 300
                                    },
                                    offsetY: -10,
                                    offsetX: 30,
                                });
                                // 设置警戒线
                                // this.allChartMap[chartId].guide().line({
                                //     start: ['min', this.alarmValue],
                                //     end: ['max', this.alarmValue],
                                //     lineStyle: {
                                //         stroke: '#ff0000',
                                //         fill:'#ff0000',
                                //         lineWidth: 2,
                                //         lineDash: [3, 3],
                                //     },
                                //     text: {
                                //         position: 'start',
                                //         style: {
                                //         fill: '#fff',
                                //         fontSize: 15,
                                //         fontWeight: 'normal',
                                //         },
                                //         content: '预警线 85%',
                                //         offsetY: -5,
                                //         offsetX: -50,
                                //     },
                                // });
                                // this.allChartMap[chartId].guide().line({
                                //     start: ['min', -this.alarmValue],
                                //     end: ['max', -this.alarmValue],
                                //     lineStyle: {
                                //         stroke: '#ff0000',
                                //         fill:'#ff0000',
                                //         lineWidth: 2,
                                //         lineDash: [3, 3],
                                //     },
                                //     text: {
                                //         position: 'start',
                                //         style: {
                                //         fill: '#fff',
                                //         fontSize: 15,
                                //         fontWeight: 'normal',
                                //         },
                                //         content: '预警线 85%',
                                //         offsetY: -5,
                                //         offsetX: -50,
                                //     },
                                // });
                            }
                            // 倾斜最大值绘图的点击事件
                            if(oneChart.id == '1113-0'){
                                let hoverData
                                let obj = {}
                                // new Add -- 监听 tooltip:change 事件
                                this.allChartMap[chartId].on('tooltip:change', ev => {
                                // 自己可以在控制台打印一下ev，看下里面的结构，找到自己所需要的信息
                                // console.log(ev)
                                hoverData = ev.items[0].data;
                                obj.time = ev.items[0].point._origin.year
                                obj.stationName = ev.items[0].name
                                })

                                // new Add -- 监听绘图区plot的点击事件
                                this.allChartMap[chartId].on('plotclick', ev => {
                                // 当用户在画布上点击时，这个时候用户看到tooltip上的数据其实已经被存在了hoverData里。拿到hoverData，相当于你拿到了折线上相关点的数据，之后再有什么需求都可以实现啦！
                                    // console.log(obj);
                                })
                            }
                            this.allChartMap[chartId].legend('value', {
                                position: 'right',
                                bottom: 10,
                                left: 'center',
                                data: ['1','3']
                            });
                            this.allChartMap[chartId].render();
                        })

                    })
                })
            });
        },
        /**
         * json转成param格式
         */
        // json转换成get请求params
        Json2Params (data) {
            let params = '?'
            let list = []
            for(let item in data) {
                let str = item + '=' + data[item]
                list.push(str)
            }
            params = params + list.join('&')
            return params
        },
        // 换算时间
        timeapple (time, type) {
            let timeoffer = new Date(time)
            let y = timeoffer.getFullYear()
            let m = timeoffer.getUTCMonth() < 9 ? '0' + (timeoffer.getUTCMonth() + 1) : (timeoffer.getUTCMonth() + 1)
            let d = timeoffer.getUTCDate() < 10 ? '0' + timeoffer.getUTCDate() : timeoffer.getUTCDate()
            if(type == 'all') {
                d = timeoffer.getDate() < 10 ? '0' + timeoffer.getDate() : timeoffer.getDate()
                m = timeoffer.getMonth() < 9 ? '0' + (timeoffer.getMonth() + 1) : (timeoffer.getMonth() + 1)
            }
            let h = timeoffer.getHours() < 10 ? '0' + timeoffer.getHours() : timeoffer.getHours()
            let min = timeoffer.getMinutes() < 10 ? '0' + timeoffer.getMinutes() : timeoffer.getMinutes()
            let s = timeoffer.getSeconds() < 10 ? '0' + timeoffer.getSeconds() : timeoffer.getSeconds()
            if(type == 'y') {
                return y
            }
            else if(type == 'md'){
                return m + '.' + d
            }
            else if (type == 'hmins') {
                return h + ':' + min + ':' + s
            }
            else if (type == 'hmin') {
                return h + ':' + min
            }
            else if (type == 'ymd') {
                return y + '.' + m + '.' + d
            }
            else if(type == 'all') {
                return y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + s
            }
        },
        async _pageInit() {
            this._getSubProjectGroup();
            // let terminalList = await this._getTerminalList();
            // let stationList = await this._getStationList(this.currentIndexsName);
            // this._getDefaultIndexs('deformation');
            // this._accordingIndexsToCharts('deformation');
            // this._getCloudDataAndDraw();
        },
        /**
         * 改变是否在放大的状态 
         */
        changeIsMagnify() {
            this.isMagnify = !this.isMagnify;
            setTimeout(() => {
                let viewWidth = this.$refs.chartsView[0].offsetWidth;
                let viewHight = this.$refs.chartsView[0].offsetHeight - 60;
                // 图重新渲染
                for(let chartItem in this.allChartMap) {
                    this.allChartMap[chartItem].changeSize(viewWidth,viewHight);
                    this.allChartMap[chartItem].render();
                }
            }, 0);
        },
        /**
         * 当前选中的图形类型变化了
         */
        changeCurrentIndexs(value) {
            this._getDefaultIndexs(this.currentIndexsName,false);
        },
        /**
         * 当前选中的时间发生了改变
         */
        changeCurrentTimeAngle() {
            if(this.currentIndexsName == 'inclination') {
                // get current date all test.
                this.getCurrentDateAllTest();
            }else {
                // 重新加载云端数据
                this._getCloudDataAndDrawForInclination();
            }
            // this._getCloudDataAndDraw();
        },
        /**
         * 销毁所有图像
         */
        destoryAllCharts() {
            for(let item in this.allChartMap) {
                this.allChartMap[item].destroy();
            }
        },
        /**
         * 初始化时间范围
         */
        initTimeValues() {
            let nowTime = new Date().getTime();
            this.value1 = [
                new Date(nowTime - 24 * 60 * 60 * 1000 * 30),
                nowTime,
            ];
            // this.inclinationDate = nowTime;
            this.inclinationDate = new Date(new Date().toLocaleDateString()).getTime();
        },
        /**
         * reflush time and repaint
         */
        reflushTable() {
            this.value1[1] = new Date().getTime();
            this.$set(this.value1,1,new Date().getTime());
            this.changeCurrentTimeAngle();
        },
        /**
         * change inclination test time.
         */
        changeCurrentTestTime() {
        }
    },
    watch: {
		$route (to, from) {
			if(to.name == from.name && to.query.currentType != from.query.currentType) {
				 // 赋值来自路由的参数
                this.currentIndexsName = to.query.currentType;
                if(this.currentIndexsName == 'inclination') {
                    this.isMagnify = true;
                }else {
                    this.isMagnify = false;
                }
                this._pageInit();
			}
        },
        detailTestTimeValue() {
            // 重新加载云端数据
            this._getCloudDataAndDrawForInclination();
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
.collectionIndex {
    width: 100%;
    height: 100%;
    .mainView-topView {
        width: 100%;
        height: @headerHeight;
        // background-color: #fff;
        box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.5);
        color: #fff;
        .mainView-topView-flex {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            padding: 0 30px;
            display: flex;
            justify-content: space-between;
            .mainView-topView-flex-left {
                flex: 1;
                display: flex;
                .mainView-topView-groupShell {
                    flex: 1;
                    display: flex;
                    // width: 100%;
                    .mainView-topView-groupView {
                        flex: 1;
                        height: 100%;
                        line-height: @headerHeight;
                        // margin: 0 30px;
                        // padding-right: 30px;
                        border-right: 1px dashed #999;
                        .block {
                            z-index: 9999 !important;
                        }
                    }
                    .resetMarginLeft {
                        margin-left: 0;
                    }
                    .resetBorderRight {
                        flex: 0 0 100px;
                        width: 100px;
                        border: none;
                    }
                }
            }
            .mainView-topView-flex-right {
                flex: 0 0 100px;
                width: 100px;
                height: 100%;
                display: flex;
                flex-direction: row-reverse;
                align-items: center;
                text-align: right;
            }
            i {
                font-size: @iconFontSize;
                cursor: pointer;
            }
        }
    }
    .collectionIndexView {
        color: #fff;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .collectionIndex-left {
            width: 32%;
            // height: 500px;
            background-color: #fff;
            border-radius: 4px;
            height: auto;
            .collectionIndex-left-title {
                width: 100%;
                height: 50px;
                line-height: 50px;
                color: #333;
                text-align: left;
                font-size: 22px;
                box-sizing: border-box;
                padding-left: 30px;
                border-bottom: 1px solid #999;
            }
            .collectionIndex-left-main {
                width: 100%;
                margin-top: 20px;
                .collectionIndex-left-main-flex {
                    width: 100%;
                    box-sizing: border-box;
                    padding: 30px;
                    padding-top: 0;
                    padding-bottom: 10px;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    .flexItem {
                        width: 23%;
                        height: 100px;
                        margin-bottom: 20px;
                    }
                    .felxItem-alarm {
                        width: 48%;
                    }
                }
                .collectionIndex-left-main-table {
                    width: 100%;
                    box-sizing: border-box;
                    padding: 30px;
                    padding-top: 0;
                    padding-bottom: 10px;
                    .el-table_1_column_2 {
                        background-color: @mainAsideBgColor;
                    }
                }
            }
        }
        .collectionIndex-chartView {
            // width: 98%;
            // background-color: #fff;
             background: rgba(24, 44, 74, 0.5);
            margin-top: 30px;
            height: 500px;
            .collectionIndex-left-title {
                width: 100%;
                height: 50px;
                line-height: 50px;
                // color: #333;
                text-align: left;
                font-size: 22px;
                box-sizing: border-box;
                padding-left: 30px;
                border-bottom: 1px solid #999;
            }
            .hasNoBorder {
                border-bottom: none; 
            }
            .collectionIndex-chart {
                width: 100%;
                height: 100%;
                box-sizing: border-box;
            }
        }
        .collectionIndex-chartView-bottom {
            width: 100% !important;
        }
    }
    .magnifyView {
        width: 60px;
        height: 60px;
        border-radius: 60px;
        line-height: 60px;
        position: fixed;
        bottom: 20px;
        right: 20px;
        // background-color: blue;
        z-index: 2020;
        cursor: pointer;
        p {
            width: 100%;
            height: 100%;
            font-size: 60px;
        }
    }
    .magnifyViewTop {
        bottom: 90px;
    }
}
</style>
<style scoped>
/* /deep/ .el-checkbox-button__orig-checkbox:checked+.el-checkbox-button__inner{ */
/deep/    .el-checkbox-button.is-checked .el-checkbox-button__inner{
    background:rgb(0, 62, 124) !important;
    border-color:rgb(0, 62, 124) !important;
}
.block .el-range-editor.el-input__inner{
        background-color: transparent !important;
        border: 1px solid;
    }
    .block /deep/ .el-range-editor .el-range-input{
        background-color: transparent !important;
        color: #fff !important;
    }
    .block /deep/ .el-date-editor .el-range-separator{
        background-color: transparent !important;
        color: #fff !important;
    }
/deep/ .el-input__inner{
        background-color: transparent !important;
        border: 1px solid;
        color: #fff;
    }
/deep/ .el-input__icon{
    color: #fff;
}
/deep/ .el-input__suffix-inner i{
    color: #fff !important;
}

/deep/ .is-circle{
    background: transparent !important;
    color: #fff !important;
    border: 2px solid #fff;
}

.myTransitionFade-enter-active, .myTransitionFade-leave-active {
    opacity: 1;
    top: 0;
    transition: all 1.5s;
}
.myTransitionFade-enter, .myTransitionFade-leave-to /* .famyTransitionFadede-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.incliantionBlock {
    box-sizing: border-box;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
}
.incliantionBlock .el-date-editor.el-input {
    width: 55% !important;
}
.incliantionBlock .el-select {
    width: 40% !important;
}
@keyframes myfirst
{
    from {opacity: 1;}
    to {opacity: 0;height: 0;}
}
</style>