<template>
    <div class="collectionIndex">
        <el-radio-group style="margin:-10px 0 10px 0;" @change="selectLabel" v-model="showContent">
            <el-radio-button label="地图"></el-radio-button>
            <el-radio-button label="列表"></el-radio-button>
        </el-radio-group>
        <div class="baidumap" id="allmap" v-show="isShowMap"></div>
        <div class="allTerminal" v-show="isShowMap == false">
            <!-- 风机展示 -->
            <div class="showtable">
                <!-- 风车展示列表 -->
                <ul class="carsul">
                    <li class="carsli carsli_a" v-for="(item,index) in projecList" :key="index" >
                        <div class="projectItem">
                            <p class="pojectName">
                                {{item.projectName}}
                                <i class="el-icon-star-on pojectNameMark" v-show="item.isChecked == 1">
                                </i>
                            </p>
                            <div class="peojectFunction">
                                <el-button>编辑信息</el-button>
                                <el-button>子项目设置</el-button>
                                <el-button @click="setProjectStatus(item.id)">{{item.isChecked == 1?'取消默认':'设为默认'}}</el-button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import G2 from '@antv/g2';
import quickNav from '@/components/collectionIndexComponents/quickNavModel';
import alarmingNav from '@/components/collectionIndexComponents/alarmingModel';

import { defaultProjectSet } from '../../publicCollect/defaultProject.ts'
import { defaultAlarmTable } from '../../publicCollect/defaultAlarmTable.ts';
import store from '../../publicJs/store'
import globalUtils from '../../publicJs/globalSetting'
import {timeapple,Json2Params,showmessage,responseBack} from '../../publicJs/utils'
import {requestBase} from '../../publicJs/request'
export default {
    data () {
        return {
            isCollapse: false, // 是否折叠左侧的导航条
            isShowUserSetting: false, // 是否显示用户下方的功能
            actionIndexList: [], // 默认显示的监测类型
            olddata: [], // 暂存风机id
            getpicdata: [], // 
            isShowAllTerminal: false, // 是否选中所有风机
            currentDeviceName: store.state.currentDeviceName || sessionStorage.getItem('currentDeviceName') || '等待选择',
            isShowAlarmListView: false, // 是否显示报警区域
            allAlarmInfoList: [
                {
                calTime: '14:00',
                typeName: '倾斜',
                terminalId: '风机1'
                }
            ], // 暂存所有报警数据信息
            allAlarmInfoListMap: {}, // 暂存所有报警数据map
            timeOutCo: null, // 定时器
            projecList: [], // all project list
            showContent:'地图',
            isShowMap:true,
            latitude:'',
            longitude:'',
        }
    },
    components: {
        quickNav: quickNav,
        alarmingNav: alarmingNav
    },
    mounted () {
        // 绘制左侧折线图
        // this.initProject();

        console.log(123321)
        this.latitude = this.$route.query.latitude
        this.longitude = this.$route.query.longitude
        console.log(this.point)
        this.getCloudTeminals();
        
        // this.$nextTick(() => { 
        // })
    },
    methods: {
        // 地图列表切换
        selectLabel(label){
            console.log(label)
            this.showContent = label
            if(label == '列表'){
                this.isShowMap = false
            }else{
                this.isShowMap = true
            }
            console.log(this.isShowMap)
        },
        // 腾讯地图经纬度转换为百度地图经纬度
        qqMapTransBMap(lng, lat) {
            let x_pi = 3.14159265358979324 * 3000.0 / 180.0;
            let x = lng;
            let y = lat;
            let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
            let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
            let lngs = z * Math.cos(theta) + 0.0065;
            let lats = z * Math.sin(theta) + 0.006;
           
            return {
                  lng: lngs,
                  lat: lats 
            } 
        },
        baiduMap1(){
             // GL版命名空间为BMapGL
            // 按住鼠标右键，修改倾斜角和角度
            var map = new BMapGL.Map("allmap");    // 创建Map实例
            map.enableScrollWheelZoom(true);
            
            var navi3DCtrl = new BMapGL.NavigationControl3D();
            map.addControl(navi3DCtrl)
            console.log(this.longitude,this.latitude)
            if(this.longitude && this.latitude){
                var point = new BMapGL.Point(this.longitude,this.latitude);   // 初始化point, 给定一个默认x,y值
                map.centerAndZoom(point, 18);        // 将point点放入map中，展示在页面中心展示，10=缩放程度
            }else{
                var point = new BMapGL.Point(120.18009,30.187876);   // 初始化point, 给定一个默认x,y值
                map.centerAndZoom(point, 14);        // 将point点放入map中，展示在页面中心展示，10=缩放程度
            }
            
            map.addControl(new BMapGL.MapTypeControl());          //添加地图类型控件
            let data = this.projecList
            console.log(data)
            let arr = [
                {
                    latitude: 30.198731,
                    longitude: 120.241295
                },
                {
                    latitude: 30.168731,
                    longitude: 120.201295
                },
                {
                    latitude: 30.178731,
                    longitude: 120.201395
                },
                {
                    latitude: 30.208731,
                    longitude: 120.191395
                },
                {
                    latitude: 30.1982251,
                    longitude: 120.195495
                },
                {
                    latitude: 30.195431,
                    longitude: 120.201365
                },
                {
                    latitude: 30.186631,
                    longitude: 120.225695
                },
                {
                    latitude: 30.208731,
                    longitude: 120.191395
                }
            ]
            // data.push(...arr)
            console.log(data)
            data.forEach((e, i) => {
                // 创建point, 将x,y值传入
                // let pointNumber = new BMap.Point(e.x, e.y)
                let pointNumber = new BMapGL.Point(e.longitude, e.latitude)
                console.log(pointNumber)
                // 创建信息窗口对象 
                // 先写信息窗口中要展示的内容
                let content = 
                    `<div style="margin:5px 0;color:#00BFFF;font-size:18px">`+'项目名称：'+`<span style="font-weight:normal;color:#000;font-size:16px">`+e.projectName+`</span>`+`</div>`
                let infoWindow = new BMapGL.InfoWindow(content, {
                    width: 80,     // 信息窗口宽度   
                    height: 80,     // 信息窗口高度   
                    //title: "Hello" + i  // 信息窗口标题  
                });
                // 将data中的name加入地图中
                var label = new BMapGL.Label(e.name, {
                    offset: new BMapGL.Size(60, 22)
                });
                let myIcon = ''
                let projectImg = require('@/assets/location.png')
                myIcon = new BMapGL.Icon(projectImg, new BMapGL.Size(40, 40));
                let projectId = e.projectId
                this.markerFun(map,pointNumber, infoWindow, label, myIcon,projectId)
            })
        },
        baiduMap2(){
            var map = new BMap.Map("allmap");   //初始化map, 绑定id=allmap
            var point = new BMap.Point(120.18009,30.187876);   // 初始化point, 给定一个默认x,y值
            map.centerAndZoom(point, 14);        // 将point点放入map中，展示在页面中心展示，10=缩放程度
            map.enableScrollWheelZoom();         // 开启滚动鼠标滑轮
            // map.setMapType(BMAP_PERSPECTIVE_MAP);     //修改地图类型为3D地图
            // map.setMapType(BMAP_NORMAL_MAP); //普通地图
            // map.setMapType(BMAP_HYBRID_MAP); //混合地图
            map.setMapType(BMAP_SATELLITE_MAP); //卫星地图

            // map.addControl(new BMap.MapTypeControl());          //添加地图类型控件
            // 如有多个point去展示，可根据后端接口传入为主
            // let data = [
            //     { x: 120.102578, y: 30.300443, name: '杭政工出21号地块智慧健康科技产品产业化基地项目', status:0,currentValue:123, maxValue:321 },
            // ]
            let data = this.projecList
            console.log(data)
            let arr = [
                {
                    latitude: 30.198731,
                    longitude: 120.241295
                },
                {
                    latitude: 30.168731,
                    longitude: 120.201295
                },
                {
                    latitude: 30.178731,
                    longitude: 120.201395
                },
                {
                    latitude: 30.208731,
                    longitude: 120.191395
                },
                {
                    latitude: 30.1982251,
                    longitude: 120.195495
                },
                {
                    latitude: 30.195431,
                    longitude: 120.201365
                },
                {
                    latitude: 30.186631,
                    longitude: 120.225695
                },
                {
                    latitude: 30.208731,
                    longitude: 120.191395
                }
            ]
            data.push(...arr)
            data.forEach((e, i) => {
                // 创建point, 将x,y值传入
                // 这两行是腾讯地图经纬度转换为百度地图经纬度
                // e.x = this.qqMapTransBMap(e.x, e.y).lng
                // e.y = this.qqMapTransBMap(e.x, e.y).lat


                // let pointNumber = new BMap.Point(e.x, e.y)
                let pointNumber = new BMap.Point(e.longitude, e.latitude)
                console.log(pointNumber)
                // 创建信息窗口对象 
                // 先写信息窗口中要展示的内容
                let content = 
                    `<div style="margin:5px 0;color:#00BFFF;font-size:18px">`+'项目名称：'+`<span style="font-weight:normal;color:#000;font-size:16px">`+e.projectName+`</span>`+`</div>`
                let infoWindow = new BMap.InfoWindow(content, {
                    width: 80,     // 信息窗口宽度   
                    height: 80,     // 信息窗口高度   
                    //title: "Hello" + i  // 信息窗口标题  
                });
                // 将data中的name加入地图中
                var label = new BMap.Label(e.name, {
                    offset: new BMap.Size(60, 22)
                });
                let myIcon = ''
                let projectImg = require('@/assets/location.png')
                myIcon = new BMap.Icon(projectImg, new BMap.Size(60, 60));
                let projectId = e.projectId
                this.markerFun(map,pointNumber, infoWindow, label, myIcon,projectId)
            })
        
            // function markerFun(points, infoWindows, label, myIcon,projectId) {
            //     let markers = new BMap.Marker(points, {icon: myIcon});
            //     map.addOverlay(markers);  // 将标注添加到地图中
            //     markers.setLabel(label);  // 将data中的name添加到地图中
            //     // 修改label的样式
            //     label.setStyle({
            //         border:'none',
            //         color:'transparent',
            //         fontSize:'20px',
            //         background:'none'
            //     })
            //     // 标注的点击事件
            //     markers.addEventListener("click", function (event) {
            //         // this.$router.push({
            //         //     path: '/read',
            //         //     query: {
            //         //         projectId:projectId
            //         //     }
            //         // })
            //         this.toProjectImg(projectId)
            //         console.log(projectId)
            //         // map.openInfoWindow(infoWindows, points);//参数：窗口、点  根据点击的点出现对应的窗口
            //     });
            //     // 标注的鼠标移入事件
            //     markers.addEventListener("mouseover", function (event) {
            //         map.openInfoWindow(infoWindows, points);//参数：窗口、点  根据点击的点出现对应的窗口
            //     });
            //     // 标注的鼠标移出事件
            //     markers.addEventListener("mouseout", function (event) {
            //         map.closeInfoWindow(infoWindows, points);//参数：窗口、点  根据点击的点出现对应的窗口
            //     });
            // }
        
            // 获取当前地理位置
            // var geolocation = new BMap.Geolocation();
            // geolocation.getCurrentPosition(function (r) {
            //     if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            //     var mk = new BMap.Marker(r.point);
            //     map.addOverlay(mk);
            //     map.panTo(r.point);
            //     // alert('您的位置：' + r.point.lng + ',' + r.point.lat);
            //     } else {
            //     // alert('failed' + this.getStatus());
            //     }
            // });
        },
        markerFun(map,points, infoWindows, label, myIcon,projectId) {
            // var map = new BMap.Map("allmap"); 
            var that = this
            let markers = new BMapGL.Marker(points, {icon: myIcon});
            map.addOverlay(markers);  // 将标注添加到地图中
            markers.setLabel(label);  // 将data中的name添加到地图中
            // 修改label的样式
            label.setStyle({
                border:'none',
                color:'transparent',
                fontSize:'20px',
                background:'none'
            })
            // 标注的点击事件
            markers.addEventListener("click", function (event) {
                let routerName = ''
                if(projectId){
                    routerName = 'ThreeImg'
                }
                // else if(projectId){
                //     routerName = 'ProjectImg'
                // }
                else{
                    return
                }
                that.$router.push({
                    // name: 'ProjectImg',
                    name: routerName,
                    query: {
                        projectId:projectId
                    }
                })
                // window.location.href = '/#/index/projectImg?projectId='+projectId
            });
            // 标注的鼠标移入事件
            if(projectId){
                markers.addEventListener("mouseover", function (event) {
                    map.openInfoWindow(infoWindows, points);//参数：窗口、点  根据点击的点出现对应的窗口
                });
                // 标注的鼠标移出事件
                // markers.addEventListener("mouseout", function (event) {
                //     map.closeInfoWindow(infoWindows, points);//参数：窗口、点  根据点击的点出现对应的窗口
                // });
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

            console.log('现在显示的监测类型');
            console.log(this.actionIndexList);
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
         * get location info
         */
        getLocationInfo(key) {
            if(localStorage.getItem(key) == null && key == 'userLoginInfo') {
                // is mean not login
                showmessage(this,'请先登录','warning');
                this.$router.push({
                    name: 'LoginPage'
                })
                return null;
            }else {
                return JSON.parse(localStorage.getItem(key));
            }
        },
        /**
         * 获取所有设备
         */
        async getCloudTeminals() {
            let userInfo = this.getLocationInfo('userLoginInfo');
            let responseResult = await requestBase.baseApi('found/project/selectProjectByUserId','GET',{
                userId: userInfo.id
            });
            responseBack(this,responseResult,this.setProjectList(responseResult.data));
            console.log('all project list...')
            console.log(this.projecList)
        },
        /**
         * set project list
         */
        setProjectList(list) {
            return () => {
                this.projecList = list;
                
                this.baiduMap1()
            }
        },
        /**
         * 点击风机修改store中的数据和缓存中数据
         */
        gotoitemindex (item) {
            // console.log(index)
            store.commit('changecurrentid', item.value);
            store.commit('changeCurrentDeviceName', item.label);
            this.isShowAllTerminal = false;
            this.currentDeviceName = item.label;
            this.identNavigate('ChartsDetailPage','deformation')
        },
        /**
         * 按照类型跳转页面
         */
        identNavigate(type,currentType) {
            this.$router.push({
                name: type,
                query: { 
                currentType: currentType 
                }
            })
        },
        /**
         * 设置项目的check状态
         */
        async setProjectStatus(id){
            let responseResult = await requestBase.baseApi('found/project/updateProjectIsChecked','POST',{
                id:id,
                isChecked:1
            });
            console.log(responseResult)
            if(responseResult.responseStatus == 'success'){
                // location.reload();
                this.$router.go(0);
            }
        },
    }
}
</script>

<style lang="less" scoped>
@mainAsideBgColor: #5CACEE;
// @mainAsideBgColor: #edf1f5;
.collectionIndex {
    text-align: left;
    width: 100%;
    .baidumap{
        width: 100%;
        height: 850px;
        /* 去除百度地图版权那行字 和 百度logo */
        /deep/ .BMap_cpyCtrl {
            display: none !important;
        }
        /deep/ .anchorBL {
            display: none !important;
        }
    }
    .allTerminal {
      .closeAllTerminal {
        position: absolute;
        right: 20px;
        top: 20px;
        font-size: 35px;
        cursor: pointer;
      }
      .carsul {
        width: 100%;
        box-sizing: border-box;
        list-style: none;
        padding: 10px 20px;

        .carsli {
            width: 100%;
            cursor: pointer;
            padding: 10px;
            margin-right: -1px;
            margin-bottom: -1px;
            border-bottom: 1px solid #666;
            position: relative;
            padding-left: 0;
            .projectItem {
                width: 100%;
                height: 60px;
                display: flex;
                flex-direction: row;
                justify-content: space-around;
                align-items: center;
                .pojectName {
                    width: 50%;
                    height: 100%;
                    line-height: 60px;
                    text-align: left;
                    font-size: 20px;
                    .pojectNameMark {
                        font-size: 22px;
                        color: #409eff;
                    }
                }
            }
            // 遮罩层
            .carslitoast {
                position: absolute;
                top: -70%;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: -1;
                background-color: #fff;
                transition: all 0.5s;
                opacity: 0;
                .carslitoast_title {
                    margin-top: 10px;
                    font-size: 22px;
                }
                .carslitoast_vicetitle {
                    font-size: 18px;
                    margin-top: 15px;
                }
            }
            .carslitoast_active {
                top: 0;
                z-index: 2019;
                opacity: 1;
            }
            .carsli_img {
                float: left;
                width: 60px;
                height: 60px;
                margin-top: 30px;
                margin-left: 10px;
            }
            .carsli_title {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                // text-align: left;
                font-size: 18px;
                margin-top: 10px;
                .carsli_span_sp {
                    background-color: #FFEF40;
                }
                .carsli_span_error {
                    background-color: #FF4053;
                }
            }
            .carsli_div {
                position: absolute;
                bottom: 0px;
                left: 90px;
                .carsli_vicetitle {
                    font-size: 18px;
                    // width: 100%;
                    text-align: left;
                    .carsli_span {
                        display: inline-block;
                        width: 18px;
                        height: 18px;
                        vertical-align: middle;
                        background-color: #40FF69;
                        border: 2px solid #333;
                        border-radius: 50%;
                    }
                }
            }
            .bottomvicetitle {
                box-sizing: border-box;
                padding-left: 22px;
            }
        }
    }
    }
}
</style>