<template>
    <div class="collectionIndex">
        <div class="mainView-topView">
            <div class="mainView-topView-flex">
                <p>当前页面: 设置可见的监测类型</p>
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
                    <ul class="setsensor_ul">
                    <!-- <ul class="setsensor_ul" v-for="(listitem,listindex) in sensorInfo_more_list" :key="listindex"> -->
                        <li class="projectItem"  v-for="(listitem,index) in sensorInfo_more_list" :key="index">
                            <div class="projectItemReal" :class="listitem.isshow?'projectItemReal-active':''" 
                                @click="changeCurrentIsShow(listitem)">
                                {{ listitem.name }}
                            </div>
                        </li>
                    </ul>
                    <p class="alarmBtnView">
                        <el-button class="alarmBtn" type="primary" @click="updateLocalStroge">保存设置</el-button>
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
        return {
            actionIndexList: [
                {
                    name: '风电项目',
                    value: 'deformation'
                },
            ],
            currentIndex: 0,
            sensorInfo_more_list: [], // 报警默认参数列表
        }
    },
    components: {
        mySelect: mySelect,
    },
    mounted () {
        this.getDefaultProjectSet();
    },
    methods: {
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
        // getDefaultAlarmSetting(type) {
        //     this.sensorInfo_more_list = defaultAlarmSet[type].warningSet;
        //     // this.sensorInfo_more_list = defaultCollectSet.collectInfo;
        //     // this.sensorInfo_more_list = defaultSensorSet[type].setSensorInfoList;
        // },
        /**
         * 获取默认的配置
         */
        getDefaultProjectSet() {
            let getLocalProjectSet = this.getLocalHaveData();
            console.log(getLocalProjectSet)
            if(getLocalProjectSet != null) {
                this.sensorInfo_more_list = getLocalProjectSet;
            }else {
                this.sensorInfo_more_list = defaultProjectSet;
            }
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
         * 点击改变当前模块选中状态
         */
        changeCurrentIsShow(item) {
            item.isshow = !item.isshow;
        },
        /**
         * 点击更新缓存中数据
         */
        updateLocalStroge() {
            // this.sensorInfo_more_list 变成json字符串存在缓存中
            // 数据改变成map
            let obj = {};
            this.sensorInfo_more_list.forEach((item,index) => {
                obj['p' + index] = item;
            });
            console.log(obj)
            let projectStr = JSON.stringify(obj);
            localStorage.setItem(globalUtils.locationSaveKey,projectStr);
            // localStorage.setItem('globalUtils.locationSaveKey',projectStr);
            showmessage(this,'保存修改成功 浏览器即将刷新', 'success')
            setTimeout(() => {
                window.location.reload()
            }, 1000);
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
                    flex-wrap: wrap;
                    flex-direction: row;
                    margin: 0;
                    padding: 0;
                    margin-top: 20px;
                    border-radius: 5px;
                    box-sizing: border-box;
                    padding: 15px 30px;
                    .projectItem {
                        width: 200px;
                        height: 120px;
                        box-sizing: border-box;
                        padding: 15px;
                        .projectItemReal {
                            width: 100%;
                            height: 100%;
                            line-height: 90px;
                            border-radius: 9px;
                            border: 1px solid #999;
                            color: #333;
                            cursor: pointer;
                        }
                        .projectItemReal-active {
                            background-color: #409EFF;
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
@keyframes myfirst
{
    from {opacity: 1;}
    to {opacity: 0;height: 0;}
}
</style>