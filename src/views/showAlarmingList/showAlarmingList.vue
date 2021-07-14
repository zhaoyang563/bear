<template>
    <div class="collectionIndex">
        <div class="mainView-topView">
            <div class="mainView-topView-flex">
                <p>当前页面: 查看不同时间端的警报数据  (默认显示全部历史数据)</p>
                <div class="mainView-topView-flex-left">
                    <div class="mainView-topView-groupShell">
                        <div class="mainView-topView-groupView resetMarginLeft">
                            <div class="block">
                                <el-date-picker
                                    v-model="timeangle"
                                    type="datetimerange"
                                    :picker-options="pickerOptions"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    @change="changeCurrentTimeAngle">
                                </el-date-picker>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="collectionIndexView">
            <div class="showAlarmView">
                <div class="chartsView">
                    <div class="chartItem" ref="chartsColumnar" id="chartsColumnar" 
                        :style="{'height': (isMagnify?'49%':'100%')}">

                    </div>
                    <div class="chartItem" ref="lineChartId" id="lineChartId">
                        
                    </div>
                </div>
                <div class="tableListView">
                    <div class="alarmTableTr">
                        <div class="alarmTableItem alarmTableItemFixedWidth">测点</div>
                        <div class="alarmTableItem alarmTableItemFullWidth">检测时间</div>
                        <div class="alarmTableItem alarmTableItemFixedWidth alarmBackLevel1"><span>预警</span></div>
                        <div class="alarmTableItem alarmTableItemFixedWidth alarmBackLevel2">报警</div>
                        <div class="alarmTableItem alarmTableItemFixedWidth alarmBackLevel3">控制</div>
                    </div>
                    <div class="alarmTableTr" v-for="(item,index) in alarmList" :key="index">
                        <div class="alarmTableItem alarmTableItemFixedWidth">
                            {{item.pointName}}
                        </div>
                        <div class="alarmTableItem alarmTableItemFullWidth">
                            {{timeFormat(item.time,'all')}}
                        </div>
                        <div class="alarmTableItem alarmTableItemFixedWidth">
                            <p v-if="item.warmCount && item.warmCount > 0" 
                                class="alarmCircle alarmBackLevel1"></p>
                        </div>
                        <div class="alarmTableItem alarmTableItemFixedWidth">
                            <p v-if="item.alarmCount && item.alarmCount > 0" 
                                class="alarmCircle alarmBackLevel2"></p>
                        </div>
                        <div class="alarmTableItem alarmTableItemFixedWidth">
                            <p v-if="item.controlCount && item.controlCount > 0" 
                                class="alarmCircle alarmBackLevel3"></p>
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
// 引入axios配置文件
import { terminalRequest,stationRequest,requestBase } from '../../publicJs/request'
import { showmessage,timeapple,Json2Params,getLocationInfo,responseBack, } from '../../publicJs/utils'
// 引入绘图初始化参数文件
import { defaultAlarmSet } from '../../publicCollect/defaultAlarmSetting.ts'
import { defaultCollectSet } from '../../publicCollect/defaultCollectSetting.ts'
import { defaultSensorSet } from '../../publicCollect/defaultSensorSetting.ts'
import { defaultProjectSet } from '../../publicCollect/defaultProject.ts'
import { defaultAlarmTable } from '../../publicCollect/defaultAlarmTable.ts'
export default {
    data () {
        return {
            pickerOptions: {
                shortcuts: globalUtils.timeFormatInfo.shortcuts
            },
            value1: [], // 时间起始结束
            timeangle: [], // default time
            subProjectList: [], // subProject list
            isMagnify: false, // is show bigger chart
            columnarChartInfo: null, // columnar chart info
            lineChartInfo: null, // columnar chart info
            alarmList: [], // alarmList
            timeFormat: '', // time format function
        }
    },
    components: {
        mySelect: mySelect,
    },
    mounted () {
        this.timeFormat = timeapple;
        this.initShowTime();
        this.initProject();
    },
    methods: {
        /**
         * 选中的当前项目
         */
        async initProject() {
            await this.getSubProjectListFromCloud();
        },
        // 初始化显示选择时间
        initShowTime () {
            this.timeangle = []
            this.timeangle[0] = timeapple(new Date().getTime() - 1000 * 60 * 60 * 24, 'all')
            this.timeangle[1] = timeapple(new Date().getTime(), 'all')
        },
        /**
         * from cloud get subProject
         * get alarm overall status
         */
        async getSubProjectListFromCloud() {
            const projectInfo = getLocationInfo(this,'projectInfo');
            if(projectInfo != null) {
                let responseResult = await requestBase.baseApi('found/alarm/selectAlarmTotal','GET',{
                    projectId: projectInfo.projectId,
                    beginTime: new Date(this.timeangle[0]).getTime(),
                    endTime: new Date(this.timeangle[1]).getTime(),
                });
                responseBack(this,responseResult,this.setSubProjectInfo(responseResult.data));
                console.log('all subproject list...')
                console.log(responseResult)
                this.makeInitChartsColumnarData(responseResult.data);
            }
        },
        /**
         * set subProject list
         */
        setSubProjectInfo(list) {
            return () => {
                this.subProjectList = list;
                
            }
        },
        /**
         * make init charts columnar data
         */
        makeInitChartsColumnarData(list) {
            console.log('make data...')
            console.log(list)
            let resultList = [];
            list.forEach((subProjectItem) => {
                let obj = {};
                obj.type = subProjectItem.type;
                obj.value = subProjectItem.alarmCount;
                obj.subprojectId = subProjectItem.subprojectId;
                // add random data
                resultList.push(obj);
            });

            console.log('init data')
            console.log(resultList)
            // console.log(this.$refs.chartsColumnar.clientWidth)
            // console.log(this.$refs.chartsColumnar.clientHeight)
            let columnarWidth = this.$refs.chartsColumnar.clientWidth;
            let columnarHeight = this.$refs.chartsColumnar.clientHeight;
            this._drawColumnarChart('chartsColumnar',columnarWidth,columnarHeight,resultList);
        },
        /**
         * draw charts type is coulmnar
         */
        _drawColumnarChart(chartsId,calculWidth,calculHeight,resultList) {
            if(this.columnarChartInfo == null) {
                const chart = new G2.Chart({
                    container: chartsId,
                    autoFit: true,
                    width: calculWidth,
                    height: calculHeight,
                    padding: [50, 20, 50, 50],
                });
                chart.source(resultList);
                chart.scale('value', {
                    alias: '总报警数量(条)',
                });

                chart.axis('type', {
                    tickLine: {
                        alignTick: false,
                    },
                });

                chart.tooltip({
                    showMarkers: false,
                });
                chart.interval().position('type*value');
                // chart.interaction('element-active');
                // 添加文本标注
                resultList.forEach((item) => {
                    chart.guide()
                        .text({
                            position: [item.type, item.value],
                            content: item.value,
                            style: {
                                textAlign: 'center',
                            },
                            offsetY: -30,
                        })
                });
                // bind event on chart
                chart.on('click', (ev) => {
                    const shape = ev;
                    if (shape) {
                        // do something
                        // get origin data object. type and value. decide to draw line chart.
                        console.log(shape.data._origin)
                        if(this.lineChartInfo == null) {
                            this.isMagnify = true;
                            let columnarHeight = this.$refs.chartsColumnar.clientHeight  * 0.7;
                            console.log(columnarHeight)
                            this.columnarChartInfo.changeHeight(columnarHeight);
                            this.columnarChartInfo.render();
                            this._drawLineChart();
                            // get all alarming
                            this._getAlarmListFromCloud(shape.data._origin.subprojectId);
                        }else {
                            this._makeTestLineData();
                            // get all alarming
                            this._getAlarmListFromCloud(shape.data._origin.subprojectId);
                        }
                    }
                });
                // set save chart info object
                this.columnarChartInfo = chart;
                let isAllNull = true;
                resultList.forEach((item) => {
                    if(item.value > 0) {
                        isAllNull = false;
                    }
                })
                console.log('all is null...')
                console.log(isAllNull)
                if(isAllNull) {
                    this.columnarChartInfo.guide()
                        .text({
                            top: true,
                            position: ['50%','50%'],
                            content: '无报警',
                            style: {  // 文本的图形样式属性
                                fill: '#666', // 文本颜色
                                fontSize: '20', // 文本大小
                                textAlign: 'center',
                            }, 
                            // offsetY: -30,
                        })
                }else {
                    // this.columnarChartInfo.guide().text();
                }
                chart.render();
            }else {
                let isAllNull = true;
                resultList.forEach((item) => {
                    if(item.value > 0) {
                        isAllNull = false;
                    }
                })
                if(isAllNull) {
                    this.columnarChartInfo.guide()
                        .text({
                            top: true,
                            position: ['50%','50%'],
                            content: '无报警',
                            style: {  // 文本的图形样式属性
                                fill: '#666', // 文本颜色
                                fontSize: '20', // 文本大小
                                textAlign: 'center',
                            }, 
                            // offsetY: -30,
                        })
                }else {
                    this.columnarChartInfo.guide().clear()
                }
                this.columnarChartInfo.source(resultList);
                this.columnarChartInfo.render();
            }
        },
        /**
         * draw line chart
         */
        _drawLineChart() {
            let data = [
                { year: '1991', value: 3 },
                { year: '1992', value: 4 },
                { year: '1993', value: 3.5 },
                { year: '1994', value: 5 },
                { year: '1995', value: 4.9 },
                { year: '1996', value: 6 },
                { year: '1997', value: 7 },
                { year: '1998', value: 9 },
                { year: '1999', value: 13 },
            ];
            let columnarWidth = this.$refs.lineChartId.clientWidth;
            let columnarHeight = this.$refs.lineChartId.clientHeight * 1.9;
            let chart = new G2.Chart({
                container: 'lineChartId',
                forceFit: true,
                width: columnarWidth,
                height: columnarHeight,
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
            chart.line().position('year*value');
            
            chart.render();
            // set save chart info object
            this.lineChartInfo = chart;
        },
        /**
         * make test line data
         */
        _makeTestLineData() {
            console.log('make test line data...')
            let resultList = [];
            for(let index=0;index<10;index++) {
                let obj = {
                    year: 2019 + index,
                    value: Math.ceil(Math.random() * 10)
                }
                resultList.push(obj);
            }

            this.lineChartInfo.source(resultList);
            this.lineChartInfo.render();
        },
        /**
         * get alarm list
         */
        _getAlarmListFromCloud(subProjectId) {
            let paramsObj = {
                subprojectId: subProjectId,
                beginTime: new Date(this.timeangle[0]).getTime(),
                endTime: new Date(this.timeangle[1]).getTime(),
            };
            this.alarmList = [];
            let paramStr = Json2Params(paramsObj);
            this.$axios.get('found/alarm/selectAlarmDetail' + paramStr).then((res) => {
                console.log(res)
                if(res.data.status == 2000) {
                    this.alarmList = res.data.body;
                }else {

                }
                console.log('alarm list...')
                console.log(this.alarmList);
            });
        },
        /**
         * 当前选中的时间发生了改变
         */
        changeCurrentTimeAngle() {
            // 重新加载云端数据
            this.getSubProjectListFromCloud();
        },
        filterTag(value, row) {
            return row.tag === value;
        },
        filterHandler(value, row, column) {
            const property = column['property'];
            return row[property] === value;
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
@normalFontSize: 20px;
@smallFontSize: 14px;

@iconFontSize: 28px;

@activeColor: #7EC0EE;

@chartsSplitLine: 1px dashed #666;
.collectionIndex {
    width: 100%;
    height: 100%;
    .mainView-topView {
        width: 100%;
        height: @headerHeight;
        // background-color: #fff;
        // box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.08);
        box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.5);
        color: #fff;
        .mainView-topView-flex {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            padding: 0 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: @normalFontSize;
        }
    }
    .collectionIndexView {
        width: 100%;
        color: #fff;
        height: 100%;
        background-color: #fff;
        border-radius: 6px;
        .showAlarmView{
           margin-top: 30px;
           width: 100%;
           height: 100%;
           display: flex;
           justify-content: space-between;
           flex-direction: row;
           .chartsView {
               width: 60%;
               height: 100%;
               display: flex;
               flex-direction: column;
               border-right: @chartsSplitLine;
               .chartItem {
                   width: 100%;
                   height: 49%;
                   justify-content: space-between;
                    &:first-child {
                        border-bottom: @chartsSplitLine;
                    }
               }
           }
           .tableListView {
               width: 48%;
               box-sizing: border-box;
               padding: 0 30px;
               .alarmTableTr {
                   width: 100%;
                   height: 50px;
                   line-height: 50px;
                   border-bottom: 1px solid #666;
                   display: flex;
                   justify-content: space-around;
                   flex-wrap: nowrap;
                   color: #333;
                   font-size: @smallFontSize;
                   .alarmTableItemFixedWidth {
                       flex: 0 0 60px;
                       width: 60px;
                   }
                   .alarmTableItemFullWidth {
                       flex: 1;
                   }
               }
           }
        }

    }
}
.alarmBackLevel1 {
    background-color: #409EFF;
}
.alarmBackLevel2 {
    background-color: #E6A23C;
}
.alarmBackLevel3 {
    background-color: #F56C6C;
}
.alarmTableItem {
    // display: flex;
    // align-items: center;
    text-align: center;
}
.alarmCircle {
    width: 20px;
    height: 20px;
    border-radius: 20px;
    margin-left: 50%;
    transform: translateX(-50%);
    margin-top: 50%;
    transform: translateY(-50%);
}
</style>
<style scoped>
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
.myTransitionFade-enter-active, .myTransitionFade-leave-active {
    opacity: 1;
    top: 0;
    transition: all 1.5s;
}
.myTransitionFade-enter, .myTransitionFade-leave-to /* .famyTransitionFadede-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.tableview {
    width: 100% !important;
}
@keyframes myfirst
{
    from {opacity: 1;}
    to {opacity: 0;height: 0;}
}
.el-table .warning-row {
    background: #FFB5C5;
}

.el-table .success-row {
    background: #FFD39B;
}
</style>