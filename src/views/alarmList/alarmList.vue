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
                    <div class="maindataview">
                        <!-- 风机编号 -->
                        <!-- 表格数据显示 -->
                        <div class="areachoice">
                            <!-- <span style="font-weight: blod;">日志信息表格</span> -->
                            <el-table
                                class="tableview"
                                :data="tableData"
                                border
                                :row-class-name="tableRowClassName"
                            >
                                <el-table-column
                                prop="createTime"
                                label="日期"
                                width="">
                                </el-table-column>
                                <el-table-column
                                v-for="(item, index) in tableSeeList"
                                :key="index"
                                :prop="item.value"
                                :label="item.name"
                                :filters="item.filters"
                                :filter-method="filterHandler">
                                </el-table-column>
                            </el-table>
                        </div>
                        <!-- 分页 -->
                        <el-pagination
                            background
                            style="margin-top: 40px;"
                            layout="prev, pager, next"
                            :total="tablepage.pagenum"
                            :current-page ="tablepage.currentpage"
                            @current-change="changecurrentpage"
                        >
                        </el-pagination>
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
import { terminalRequest,stationRequest } from '../../publicJs/request'
import { showmessage,timeapple,Json2Params } from '../../publicJs/utils'
// 引入绘图初始化参数文件
import { defaultAlarmSet } from '../../publicCollect/defaultAlarmSetting.ts'
import { defaultCollectSet } from '../../publicCollect/defaultCollectSetting.ts'
import { defaultSensorSet } from '../../publicCollect/defaultSensorSetting.ts'
import { defaultProjectSet } from '../../publicCollect/defaultProject.ts'
import { defaultAlarmTable } from '../../publicCollect/defaultAlarmTable.ts'
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
            headerdata: [], // 表头数据
            isshowtoasttableview: false, // 是否显示弹出来的表格
            tableData: [], // 报警列表数据
            tableDataall: [] , // 暂存所有数据
            tablepage: {
                pagenum: 1,
                currentpage: 1,
                pageSize: 20,
            },

            tableSeeList: [], // 表头数据
            timeangle: [], // 时间数组
            selectlist: [], // 风机数组
            collectList: [], // 采集卡数组
            warningOriginDataList: [], // 第一次处理之后的所有报警数据暂存处
            warningListLoading: false, // 加载中
            pickerOptions: {
                shortcuts: globalUtils.timeFormatInfo.shortcuts
            },
            value1: [], // 时间起始结束
        }
    },
    components: {
        mySelect: mySelect,
    },
    mounted () {
        this.initProject();
        this.initShowTime();
        this.getTableShowList();
        // this.getDefaultAlarmSetting(this.actionIndexList[this.currentIndex].value);
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
         * 更改当前选中的li
         */
        changeCurrentIndex(index) {
            this.currentIndex != index && (this.currentIndex = index);
            // this.getDefaultAlarmSetting(this.actionIndexList[this.currentIndex].value);
            this.getTableShowList();
        },
        /**
         * 获取当前的报警默认参数配置信息
         */
        getDefaultAlarmSetting(type) {
            this.sensorInfo_more_list = defaultAlarmSet[type].warningSet;
            this.getCloudWarnningSet(type);
            // this.sensorInfo_more_list = defaultCollectSet.collectInfo;
            // this.sensorInfo_more_list = defaultSensorSet[type].setSensorInfoList;
        },
        /**
         * 回显当前的报警信息
         */
        getCloudWarnningSet(type) {
            console.log(type)
            let getListUrl = defaultAlarmSet[type].getWarningUrl;
            this.$axios.get(getListUrl).then((res) => {
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
        // 初始化显示选择时间
        initShowTime () {
            this.timeangle = []
            this.timeangle[0] = timeapple(new Date().getTime() - 1000 * 60 * 60 * 24, 'all')
            this.timeangle[1] = timeapple(new Date().getTime(), 'all')
        },
        /**
         * 获取报警表头
         */
        // 获取要显示的表格头列表
        getTableShowList () {
            // 获取要展示的指标
            this.tableSeeList = []
            let areachoice_showlist = defaultAlarmTable[this.actionIndexList[this.currentIndex].value].errorInfoList;
            for(let areachoice_showlistitem in areachoice_showlist) {
                let obj = {
                    name: '',
                    value: '',
                    filters: [],
                }
                obj.value = areachoice_showlistitem
                // obj.value = 'tableid' + areachoice_showlistitem.value
                obj.name =  areachoice_showlist[areachoice_showlistitem].title
                this.tableSeeList.push(obj)
            }
            console.log('表头数据')
            console.log(this.tableSeeList)
            // 制作数据
            this.getWarningData(this.tablepage.currentpage)
        },
        // 重写获取报警数据的方法 后端不进行分页 
        getWarningData(page) {
            this.warningListLoading = true
            this.tableData = []
            let obj = {
                startTime: timeapple(new Date(this.timeangle[0]).getTime(),'all'),
                endTime: timeapple(new Date(this.timeangle[1]).getTime(),'all'),
                // address: null,
                pageNum: page,
                pageSize: this.tablepage.pageSize,
            }
            let params = Json2Params(obj)
            let getWarningUrl =  defaultAlarmTable[this.actionIndexList[this.currentIndex].value].getWarningUrl
            let warningDataTypeInfo = {
                "strain": {
                    name: "应力"
                },
                "init": {
                    name: "倾斜角"
                },
                "total": {
                    name: "晃动角"
                },
                "accelerate": {
                    name: "加速度"
                },
                "speed": {
                    name: "速度"
                },
                "displacement": {
                    name: "位移"
                },
            }
            // if(page != 1){
            //     let sliceWarningByPage = this.getWarningListByPage(page,this.tablepage.pageSize,this.warningOriginDataList)
            //     for(let i = 0; i < sliceWarningByPage.length; i++) {
            //         let obj = {
            //             'createTime': '',
            //             'terminalName': '',
            //         }
            //         obj.createTime = timeapple(new Date(sliceWarningByPage[i].createTime).getTime(), 'all')
            //         this.tableSeeList.forEach((item,index) => {
            //             obj[item.value] = sliceWarningByPage[i][item.value]
            //             if(item.value == "warningType"){
            //                 obj[item.value] = warningDataTypeInfo[sliceWarningByPage[i]["dataType"]].name
            //                 let dataTypeList = this.getTypeTotalList(sliceWarningByPage,"dataType")
            //             }else{
            //             }
            //         })
            //         console.log(this.tableSeeList)
            //         this.tableData.push(obj)
            //     }
            //     setTimeout(() => {
            //         this.warningListLoading = false
            //     },1500)
            //     return
            // }
            this.$axios.get(getWarningUrl + params).then(async (res) => {
                console.log(res)
                let recordDataList = res.data.data.records;
                // 进行总页数的修改
                this.tablepage.pagenum = res.data.data.pages;
                this.$set(this.tablepage,'pagenum',res.data.data.pages)
                // 数据倒叙处理
                console.log(recordDataList)
                recordDataList.sort((a,b) => {
                    return new Date(b.createTime).getTime()-new Date(a.createTime).getTime()
                })
                // 数据按照时间去重处理
                // recordDataList = this.getWarningSet(recordDataList)

                // 第一次进来的时候 获取数据 保存在中间变量中
                this.warningOriginDataList = recordDataList

                let sliceWarningByPage = this.warningOriginDataList
                // let sliceWarningByPage = this.getWarningListByPage(page,this.tablepage.pageSize,this.warningOriginDataList)
                for(let i = 0; i < sliceWarningByPage.length; i++) {
                    let obj = {
                        'createTime': '',
                        'terminalName': '',
                    }
                    obj.createTime = timeapple(new Date(sliceWarningByPage[i].createTime).getTime(), 'all')
                    // obj.terminalName = this.gerFanNameInLocal(sliceWarningByPage[i].terminalId)
                    // if(this.areaoptions[this.areachoiceactive].indexname == "bottompolarization"){
                    //     if(this.collectList.length == 0){
                    //         await this.getCollectList()
                    //     }       
                    // }
                    this.tableSeeList.forEach(async (item,index) => {
                        obj[item.value] = sliceWarningByPage[i][item.value]
                        if(item.value == "warningType"){
                            obj[item.value] = warningDataTypeInfo[sliceWarningByPage[i]["dataType"]].name
                            let dataTypeList = this.getTypeTotalList(sliceWarningByPage,"dataType")
                            let filterList = []
                            dataTypeList.forEach((item) => {
                                let obj = {
                                    text: "",
                                    value: "",
                                }
                                obj.text = warningDataTypeInfo[item.value].name
                                obj.value = warningDataTypeInfo[item.value].name
                                filterList.push(obj)
                            })
                            item.filters = filterList
                        }else{
                            item.filters = this.getTypeTotalList(sliceWarningByPage,item.value)
                        }

                        if(item.value == 'level') {
                            console.log('风险风机')
                            console.log(obj[item.value])
                            let list = ['','低级风险','中级风险','重度风险'];
                            obj[item.value] = list[obj[item.value]];
                        }
                    })
                    console.log(this.tableSeeList)
                    this.tableData.push(obj)
                }
                this.warningListLoading = false
            },() => {
                // 失败时候取消加载中样式
               this.warningListLoading = false 
            })
        },
        // 对应page获取对应数据
        getWarningListByPage(pageNum,pageSize,warningList){
            let newWarningList = warningList.slice((pageNum-1) * pageSize,pageNum * pageSize -1)
            return newWarningList
        },
        // 改变当前页数
        changecurrentpage (page) {
            this.getWarningData(page)
            // this.tableData = this.tableDataall.slice(0 + (page * 11), 10 + (page * 11))
        },
        // 去重时间数据
        getWarningSet(warningList) {
            let newWarningList = []
            for(let i=0;i<warningList.length;i++){
                if(i == 0){
                    newWarningList.push(warningList[i])
                }else {
                    if(new Date(warningList[i].createTime).getTime() != new Date(warningList[i-1].createTime).getTime()){
                        newWarningList.push(warningList[i])
                    }
                }
            }
            return newWarningList;
        },
        // 每个属性值的去重处理
        getTypeTotalList(warningList,key){
            let keyList = []
            let keySet = []
            for (let index = 0; index < warningList.length; index++) {
                if(keySet.indexOf(warningList[index][key]) < 0){
                    let obj = {
                        text: "",
                        value: "",
                    }
                    obj.text = warningList[index][key]
                    obj.value = warningList[index][key]
                    keySet.push(warningList[index][key])
                    keyList.push(obj)
                }
            }
            return keyList
        },
        /**
         * 表格每行颜色计算
         */
        tableRowClassName({row, rowIndex}) {
            console.log('每行元素')
            console.log(row)
            if (row.level == '重度风险') {
                return 'warning-row';
            } else if (row.level == '中级风险') {
                return 'success-row';
            }
            return '';
        },
        /**
         * 当前选中的时间发生了改变
         */
        changeCurrentTimeAngle() {
            // 重新加载云端数据
            this.getTableShowList();
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
        }
    }
    .collectionIndexView {
        width: 100%;
        color: #fff;
        height: 100%;
        background-color: #fff;
        border-radius: 6px;
        .alarmSetView {
            margin-top: 30px;
            width: 100%;
            overflow-x: hidden;
            height: 100%;
            display: flex;
            justify-content: space-between;
            flex-wrap: nowrap;
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
                width: 80%;
                height: 100%;
                box-sizing: border-box;
                padding: 30px;
                // 主要参数显示区域
                .maindataview {
                    width: 100%;
                    color: #fff;
                    // 位置选择
                    .areachoice {
                        width: 100%;
                        min-width: 100%;
                        text-align: left;
                        font-size: 20px;
                        box-sizing: border-box;
                        padding-left: 30px;
                        margin-bottom: 25px;
                        .areachoice_select {
                            // width: 130px;
                            margin-left: 14px;
                        }
                        .areachoice_checkbox {
                            margin-left: 15px;
                            height: 20px;
                            line-height: 20px;
                            .el-checkbox__label {
                                font-size: 20px !important;
                            
                            }
                        }
                        .areachoice_number {
                            width: 130px;
                            margin-left: 15px;
                        }
                    }
                    .areachoice_sp {
                        padding-left: 0;
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