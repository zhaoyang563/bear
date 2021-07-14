<template>
    <div class="collectionIndex" @click.stop="closeSelectShowView">
        <div class="mainView-topView">
            <div class="mainView-topView-flex">
                <p>当前页面: 对应设备的各项指标进行预警值的设置(分为三级报警，以优先级高的报出)</p>
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
                                <el-input v-show="!item.inputnoshow" :disabled="item.nochange || item.switchvalue == false" v-model="item.value" placeholder="请输入内容" 
                                  @focus="focusInput(item)" @blur="blurInput(item,index)" @input="changeInput(item,index)"></el-input>
                                <span :class="item.isshowtoast? 'setsensor_li_right_show' : 'setsensor_li_right_hide'">
                                    {{ item.show }}
                                </span>
                            </p>
                        </li>
                    </ul>
                    <p class="alarmBtnView">
                        <el-button class="alarmBtn" type="primary" @click="submitWarnningSet">保存设置</el-button>
                    </p>
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
import { terminalRequest,stationRequest,getCurrentTerminalId } from '../../publicJs/request'
import { showmessage } from '../../publicJs/utils'
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
        }
    },
    components: {
        mySelect: mySelect,
    },
    mounted () {
        this.initProject();
        this._getTerminalList();
        this.getDefaultAlarmSetting(this.actionIndexList[this.currentIndex].value);
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