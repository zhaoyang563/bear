<template>
    <div class="collectionIndex" @click.stop="hideSelectToast">
        <div class="mainView-topView">
            <div class="mainView-topView-flex">
                <div class="mainView-topView-flex-left">
                    <!-- <my-select 
                        :illusoryDeviceList="illusoryDeviceList.deviceList" 
                        @dataChange="listSensorsFromReadMeter(illusoryDeviceList.deviceList.current)"></my-select>
                    <my-select 
                        :illusoryDeviceList="illusoryDeviceList.stationList" 
                        @dataChange="getensorDataToDraw"></my-select> -->
                        <p style="line-height:70px">当前传感器：{{currentSensor}}</p>
                        <div class="mainView-topView-groupShell">
                            <div class="mainView-topView-groupView resetMarginLeft">
                                <div class="block"  v-show="currentIndexsName != 'inclination'">
                                    <el-date-picker
                                        v-model="value1"
                                        type="datetimerange"
                                        :picker-options="pickerOptions"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        @change="getensorDataToDraw">
                                    </el-date-picker>
                                </div>
                            </div>
                        <div class="mainView-topView-btnview">
                            <el-button type="primary" @click="createOrUpdateSensor('update')">修改本读数仪密码</el-button>
                            <el-button type="primary" class="add-sensor" @click="createOrUpdateSensor('add')" v-if="false">添加读数仪</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="collectionIndexView">
            <div class="collectionIndex-chartView" ref="chartsView">
                <p class="collectionIndex-left-title hasNoBorder">
                    读数仪传感器走势图
                </p>
                <div class="collectionIndex-chart" id="chartsId">

                </div>
            </div>
        </div>

        <div class="toastview" v-if="isShowSensorDetail">
            <div class="toast-main-view">
                <div class="main-view-detail">
                    <p class="main-view-detail-title">新增/修改本读数仪</p>
                    <p class="input_p" v-if="updateOrAddReadMeteType != 'update'">
                        <el-input class="input_p_input" v-model="sensorInfo.sensorCode" 
                            placeholder="请输入SensorCode" clearable >
                            <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
                        </el-input>
                    </p>
                    <p class="input_p">
                        <el-input class="input_p_input" v-model="sensorInfo.sensorPassword"
                            placeholder="请输入读数仪的密码" clearable>
						    <i slot="prefix" class="el-input__icon el-icon-key"></i>
                        </el-input>
                    </p>
                </div>
                <div class="main-view-btnview">
                    <el-button type="primary" class="save-btn" @click="updateOrAddReadMete">修改</el-button>
                    <el-button @click="hideIsShowSensorDetail">取消</el-button>

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
import { terminalRequest,stationRequest,requestBase} from '../../publicJs/request'
import {responseBack,makeTimeAngle,timeapple, showmessage} from '../../publicJs/utils'
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
                        name: '选择读数仪',
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
                        name: '选择传感器',
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
            sensorInfo: {}, // 传感器对象
            isShowSensorDetail: false, // 是否显示读数仪的修改页面
            updateOrAddReadMeteType: 'update', // 标识是修改还是xinjian
            ChartInfo: null, // 
            currentSensor:'',   //当前传感器
            currentId:'',  //当前传感器的id
        }
    },
    components: {
        mySelect: mySelect,
    },
    mounted () {
        this.winWidth = document.body.clientWidth || document.documentElement.clientWidth;
        this.winHeight = document.body.clientHeight || document.documentElement.clientHeight;
        console.log(this.winWidth + '--' + this.winHeight)
        // 赋值来自路由的参数
        this.currentIndexsName = this.$route.query.currentType;
        if(this.currentIndexsName == 'inclination') {
            this.isMagnify = true;
        }else {
            this.isMagnify = false;
        }
        this.initTimeValues();
        this.listReadMeterByUserId();
        // 绘制左侧折线图
        // this.drawLeftChart('alarmingTotalChartContent');
        // this.drawLeftChart('errorTotalChartContent');
        // this.drawLeftChart('statusTotalChartContent');
        // console.log(globalUtils);
        // // 初始化时间范围
        // // this.initTimeValues();
        // this._pageInit();
        // console.log(defaultDrawInfo)
    },
    methods: {
        // 隐藏select
        hideSelectToast() {
            for(let key in this.illusoryDeviceList) {
                this.illusoryDeviceList[key].isShowToast = false
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
        },
        drawLeftChart (originData) {
            let data = [
                
            ];
            originData.forEach(item => {
                // todo 制作显示的折线数据
                let obj = {year: '',value: '',type: '计算值'}
                obj.year = item.timeCount
                obj.value = item.calculated
                let obj2 = {year: '',value: '',type: '读数'}
                obj2.year = item.timeCount
                obj2.value = item.readData
                data.push(obj)
                data.push(obj2)
            })
            
            if(this.ChartInfo!=null) {
                this.ChartInfo.source(data)
                this.ChartInfo.render()
                return
            }
            
            let chart = new G2.Chart({
                container: 'chartsId',
                forceFit: true,
                height: this.winHeight - 200,
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
            // chart.coord('polar');
            chart.tooltip({
                
                crosshairs: {
                    type: 'line'
                }
            });
            // chart.tooltip(false);
            chart.line().position('year*value').color('type');;
            // chart.point().position('year*value')
            //     .size(4)
            //     .shape('circle')
            //     .style({
            //         stroke: '#fff',
            //         lineWidth: 1
            //     });
            
            chart.render();

            // 赋值保存图形对象
            this.ChartInfo = chart;
        },
        hideIsShowSensorDetail() {
            this.isShowSensorDetail = false;
        },
        createOrUpdateSensor(type) {
            this.isShowSensorDetail = true;
            this.updateOrAddReadMeteType = type;
            if(type == 'update') {
                // this.sensorInfo.sensorCode = this.illusoryDeviceList.deviceList.current.sim
                this.sensorInfo.sensorCode = this.currentSensor
            }
        },
        updateOrAddReadMete() {
            if(this.updateOrAddReadMeteType == 'add') {
                this.createReadMete()
            }else {
                this.updateReadMete()
            }
        },
        createReadMete() {
            if(this.sensorInfo.sensorCode == "" || this.sensorInfo.sensorPassword == '') {
                showmessage(this,'请输入读数仪的编号和密码');
                return
            }
            // 1.0 获取userid
            let userInfoForLocal = localStorage.getItem('userLoginInfo')
            if(userInfoForLocal == null || userInfoForLocal == '') {
                showmessage(this,'登陆过期')
                return;
            }
            userInfoForLocal = JSON.parse(userInfoForLocal)
            this.$axios.post('/found/factory/createReadMeter',{
                sim: this.sensorInfo.sensorCode,
                password: this.sensorInfo.sensorPassword,
                userId: userInfoForLocal.id
            }).then(res => {
                showmessage(this,'创建成功')
                this.isShowSensorDetail = false
                this.listReadMeterByUserId();
            })
        },
        updateReadMete() {
            if(this.sensorInfo.sensorPassword == '') {
                showmessage(this,'请输入读数仪的编号和密码');
                return
            }
            console.log(this.$route.query.sim)
            this.$axios.post('/found/factory/updateReadMeter',{
                // id: this.illusoryDeviceList.deviceList.current.id,
                // id: this.$route.query.id,
                sim: this.$route.query.sim,
                password: this.sensorInfo.sensorPassword,
            }).then(res => {
                console.log('创建成功')
                showmessage(this,'修改成功')
                this.isShowSensorDetail = false
                this.listReadMeterByUserId();
            })
        },
        async listReadMeterByUserId() {
            // 1.0 获取userid
            let groupListResult = [
                {
                    sim: this.$route.query.sim,
                    id: 0
                }
            ]
            // responseBack(this,groupListResult,this.setReadMeterList(groupListResult));
            this.setReadMeterList(groupListResult)
        }, 
        setReadMeterList(list) {
            let realTerminalList = [];
            list.forEach((item) => {
                item.name = item.sim;
                item.id = item.id;
                item.isChecked = false;
                realTerminalList.push(item);
            })
            this.illusoryDeviceList.deviceList.list = realTerminalList;
            this.illusoryDeviceList.deviceList.current = realTerminalList[0];

            // 默认进行第一个读数仪的传感器获取
            this.listSensorsFromReadMeter(this.illusoryDeviceList.deviceList.current)
        },
        async listSensorsFromReadMeter(readMeterItem){
           if(readMeterItem == null) {
               return
           } 
           let groupListResult = await requestBase.baseApi('found/factory/selectSensorBySim','GET',{
                sim: readMeterItem.sim
            })
            console.log('get read meter sensor list')
            console.log(groupListResult);
            responseBack(this,groupListResult,this.setSensorList(groupListResult.data));
        },
        setSensorList(list) {
            let realTerminalList = [];
            list.forEach((item) => {
                item.name = item.sensorCode;
                item.isChecked = false;
                realTerminalList.push(item);
            })
            let queryObj = this.$route.query
            if(queryObj.sensorCode !== undefined){
                this.currentSensor = queryObj.sensorCode
            }else{
                this.currentSensor = realTerminalList[0].sensorCode
            }
            if(queryObj.id !== undefined){
                this.currentId = queryObj.id
            }else{
                this.currentId = realTerminalList[0].id
            }
            // this.illusoryDeviceList.stationList.list = realTerminalList;
            // this.illusoryDeviceList.stationList.current = realTerminalList[0];

            this.getensorDataToDraw();
        },
        async getensorDataToDraw() {
            // 1.0 获取对应的绘图效果了
            // if(this.illusoryDeviceList.stationList.current == null) {
            //     return
            // } 
            let groupListResult = await requestBase.baseApi('found/factory/selectFactoryData','GET',{
                // sensorCode: this.illusoryDeviceList.stationList.current.sensorCode,
                sensorCode: this.currentSensor,
                beginTime: new Date(this.value1[0]).getTime(),
                endTime: new Date(this.value1[1]).getTime(),
            })
            console.log('get read meter sensor data')
            console.log(groupListResult);
            responseBack(this,groupListResult,this.drawLeftChart(groupListResult.data));
        }
    },
    watch: {
		$route (to, from) {
            console.log(to,from)
            if(to.query.sensorCode != from.query.sensorCode){
                this.listReadMeterByUserId()
            }
			if(to.name == from.name && to.query.currentType != from.query.currentType) {
				 // 赋值来自路由的参数
                this.currentIndexsName = to.query.currentType;
                if(this.currentIndexsName == 'inclination') {
                    this.isMagnify = true;
                }else {
                    this.isMagnify = false;
                }
                // 绘制左侧折线图
                // this.drawLeftChart('alarmingTotalChartContent');
                // this.drawLeftChart('errorTotalChartContent');
                // this.drawLeftChart('statusTotalChartContent');
                console.log(globalUtils);
                this._pageInit();
                console.log(defaultDrawInfo)
			}
        },
        detailTestTimeValue() {
            console.log('--------------------------------------------');
            console.log(this.detailTestTimeValue);
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
        background-color: #fff;
        box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.08);
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
                .mainView-topView-btnview {
                    display: flex;
                    align-items: center;
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
        // display: flex;
        // justify-content: space-between;
        // flex-wrap: wrap;
        .collectionIndex-chartView {
            width: 98%;
            background-color: #fff;
            margin-top: 30px;
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
    .toastview {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.8);
        z-index: 2050;
        .toast-main-view {
            position: relative;
            top: 20%;
            left: 50%;
            transform: translateX(-50%);
            width: 438px;
            min-height: 200px;
            height: auto;
            background-color: #fff;
            border-radius: 3px;
            display: flex;
            flex-direction: column;
            .main-view-detail {
                flex: 1;
                .main-view-detail-title {
                    width: 100%;
                    height: @headerHeight;
                    line-height: @headerHeight;
                    border-bottom: 1px solid #e2e2e2;
                }
                .input_p {
                    width: 100%;
                    text-align: center;
                    box-sizing: border-box;
                    padding: 0 10%;
                    margin: 20px 0px;
                    .input_p_input {
                        width: 100%;
                        text-align: left;
                    }
                }
            }
            .main-view-btnview {
                flex: 0 0 60px;
                width: 100%;
                border-top: 1px solid #e2e2e2;
                height: 60px;
                display: flex;
                flex-direction: row-reverse;
                align-items: center;
                text-align: left;
                .save-btn {
                    margin: 0 20px;
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