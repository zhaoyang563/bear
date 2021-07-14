<template>
    <div style="width:100%;height:100%">
        <div class="title">滨江区建设工程基坑风险监测预警平台</div>
        <div class="home">
            <div class="right">
                <div class="projectNum">
                    <p style="margin-top:10px">项目数量</p>
                    <div class="projectNum_box">
                        <div>
                            <div class="projectNum_chart" style="background:#ff0000;" id="myChart8">
                                <span>0个</span>
                                <span>报警</span>
                            </div>
                            <!-- <p>个</p> -->
                        </div>
                        <div>
                            <div class="projectNum_chart" style="background:#FFA500;" id="myChart9">
                                <span>0个</span>
                                <span>预警</span>
                            </div>
                            <!-- <p>个</p> -->
                        </div>
                        <div>
                            <div class="projectNum_chart" style="background:#00FF00;" id="myChart10">
                                <span>{{projecList.length}}个</span>
                                <span>正常</span>
                            </div>
                            <!-- <p>个</p> -->
                        </div>
                        
                    </div>
                </div>
                <div class="projectList">
                    <p>项目名称</p>
                    <ul>
                        <li v-for="item in projecListShow" :key="item.id" :title="item.projectName" @click="setCurrent(item)">
                            {{item.projectName}}
                        </li>
                    </ul>
                </div>
            </div>
            
            <div class="center" id="allmap"></div>
            <div class="left">
                <div class="total" style="margin-top:0px;">
                    <div class="box">
                        <div class="img">
                            <img src="../../assets/shebei.svg" alt="">
                        </div>
                        <div class="chart1" id="myChart1"></div>
                        <div class="content">
                            <div>
                                <p>
                                    <span class="content_online">90</span>
                                    <span class="content_offline"> / 90</span>
                                </p>
                                <p>设备在线</p>
                            </div>
                            <div style="line-height:50px;vertical-align:top;font-size:16px;margin-left:10px">台</div>
                        </div>
                        
                    </div>
                </div>
                <div class="total">
                    <div class="box">
                        <div class="imgSmall">
                            <img src="../../assets/sw.svg" alt="">
                            <p>水位45个</p>
                        </div>
                        <div>
                            <div class="chart1" id="myChart2"></div>
                            <p>今日0个</p>
                        </div>
                        <div>
                            <div class="chart1" id="myChart3"></div>
                            <p>今日0个</p>
                        </div>
                        
                    </div>
                </div>
                <div class="total">
                    <div class="box">
                        <div class="imgSmall">
                            <img src="../../assets/cx.svg" alt="">
                            <p>测斜11个</p>
                        </div>
                        <div>
                            <div class="chart1" id="myChart4"></div>
                            <p>今日0个</p>
                        </div>
                        <div>
                            <div class="chart1" id="myChart5"></div>
                            <p>今日0个</p>
                        </div>
                        
                    </div>
                </div>
                <div class="total">
                    <div class="box">
                        <div class="imgSmall">
                            <img src="../../assets/zl.svg" alt="">
                            <p>轴力34个</p>
                        </div>
                        <div>
                            <div class="chart1" id="myChart6"></div>
                            <p>今日0个</p>
                        </div>
                        <div>
                            <div class="chart1" id="myChart7"></div>
                            <p>今日0个</p>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>
<script>
import {requestBase} from '../../publicJs/request'
import {timeapple,Json2Params,showmessage,responseBack} from '../../publicJs/utils'
export default {
    data(){
        return{
            projecListShow:[],
            projecList:[]
        }
    },
    mounted(){
        this.drawLine(100,'myChart1','在线')
        this.drawLine(0,'myChart2','报警') 
        this.drawLine(0,'myChart3','预警') 
        this.drawLine(0,'myChart4','报警') 
        this.drawLine(0,'myChart5','预警') 
        this.drawLine(0,'myChart6','报警') 
        this.drawLine(0,'myChart7','预警') 
        // this.drawLine(5,'myChart8','预警') 
        // this.drawLine(4,'myChart9','预警') 
        // this.drawLine(1,'myChart10','预警') 
        this.getCloudTeminals()
        
    },
    methods:{
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
                this.projecListShow = list;
                this.baiduMap1(list)
                console.log('测试列表的')
                console.log(this.projecList)
                console.log(this.projecListShow)
            }
        },
        drawLine(value,id,text){
            let typeColor = ''
            let rateColor = ''
            if(text == '在线'){
                typeColor = '#00ff00'
                rateColor = '#00ff00'
            }else if(text == '预警'){
                typeColor = '#FFA500'
                rateColor = '#ff0000'
            }else if(text == '报警'){
                typeColor = '#ff0000'
                rateColor = '#ff0000'
            }
            let myChart = this.$echarts.init(document.getElementById(id))
            let option = {
                series: [{
                    type: 'gauge',
                    startAngle: 90,
                    endAngle: -270,
                    pointer: {
                        show: false
                    },
                    progress: {
                        show: true,
                        overlap: false,
                        roundCap: true,
                        clip: false,
                        // 设置百分比颜色
                        itemStyle: {
                            borderWidth: 1,
                            // color:'#00ff00',
                            // borderColor: '#00ff00',
                            color:rateColor,
                            borderColor: rateColor,
                        }
                    },
                    axisLine: {
                        // 设置圆圈颜色
                        lineStyle: {
                            width: 5,
                            color: [[0.2, '#F8F8FF'], [1, '#F8F8FF']]
                            // color: [[0.2, '#00ff00'], [1, '#00ff00']]
                        }
                    },
                    splitLine: {
                        show: false,
                        distance: 0,
                        length: 10
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: false,
                        distance: 50
                    },
                    data: [{
                        value: value,
                        name: text,
                        
                        title: {
                            offsetCenter: ['0%', '-20%'],
                            color:typeColor,
                        },
                        detail: {
                            offsetCenter: ['0%', '25%'],
                            color:typeColor,
                        }
                    }
                    ],
                    title: {
                        fontSize: 14
                    },
                    detail: {
                        width: 50,
                        height: 14,
                        fontSize: 14,
                        color: '#fff',
                        // borderColor: 'auto',
                        // borderRadius: 20,
                        // borderWidth: 1,
                        formatter: '{value}%'
                    }
                }]
            };
            console.log(option)
            myChart.setOption(option)
            console.log(myChart)
        },
        baiduMap1(projectList){
             // GL版命名空间为BMapGL
            // 按住鼠标右键，修改倾斜角和角度
            var map = new BMapGL.Map("allmap");    // 创建Map实例
            map.enableScrollWheelZoom(true);
            
            var navi3DCtrl = new BMapGL.NavigationControl3D();
            map.addControl(navi3DCtrl)
            // var point = new BMapGL.Point(120.195311,30.187461);   // 初始化point, 给定一个默认x,y值
            var point = new BMapGL.Point(120.193227,30.187492);   // 初始化point, 给定一个默认x,y值
            map.centerAndZoom(point, 14);        // 将point点放入map中，展示在页面中心展示，10=缩放程度
            map.addControl(new BMapGL.MapTypeControl());          //添加地图类型控件
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
            // projectList.push(...arr)
            console.log(projectList)
            projectList.forEach((e, i) => {
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
                let id =e.id
                if(projectId == 64){
                    e.longitude = 120.235771,
                    e.latitude = 30.189732
                }
                this.markerFun(map,pointNumber, infoWindow, label, myIcon,projectId,e.longitude,e.latitude,id)
            })
        },
        markerFun(map,points, infoWindow, label, myIcon,projectId,longitude,latitude,id) {
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
                that.setProjectStatus(id)
                let routerName = 'CollectionIndex'
                that.$router.push({
                    // name: 'ProjectImg',
                    name: routerName,
                    query: {
                        projectId:projectId,
                        latitude:latitude,
                        longitude:longitude
                    }
                })
            });
            // 标注的鼠标移入事件
            if(projectId){
                markers.addEventListener("mouseover", function (event) {
                    map.openInfoWindow(infoWindow, points);//参数：窗口、点  根据点击的点出现对应的窗口
                });
                // 标注的鼠标移出事件
                // markers.addEventListener("mouseout", function (event) {
                //     map.closeInfoWindow(infoWindow, points);//参数：窗口、点  根据点击的点出现对应的窗口
                // });
            }
            
        },
        setCurrent(item){
            this.setProjectStatus(item.id)
            let routerName = 'CollectionIndex'
            this.$router.push({
                // name: 'ProjectImg',
                name: routerName,
                query: {
                    projectId:item.projectId,
                    latitude:item.latitude,
                    longitude:item.longitude
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
<style scoped>
    /* 去除百度地图版权那行字 和 百度logo */
    /deep/ .BMap_cpyCtrl {
        display: none !important;
    }
    /deep/ .anchorBL {
        display: none !important;
    }
    *{
        margin: 0;
        padding: 0;
    }
    .title{
        line-height: 50px;
        color: #fff;
        font-size: 20px;
        margin: -20px 0 20px 0;
        background-image: url('../../assets/headTitle_bg.png');
        background-repeat: no-repeat;
        background-position: center;
    }
    .home{
        width: 100%;
        height: 80%;
        display: flex;
        justify-content: space-between;
    }
    .home > div{
        /* border: 1px solid #ccc; */
    }
    .left{
        flex: 1;
        display: flex;
        flex-direction:column;
        justify-content: space-between;
    }
    .left > div{
        /* margin: 48px 0; */
    }
    .left .total{
        /* background: chartreuse; */
        color: #fff;
        width: 100%;
        height: 20%;
        /* border: 1px solid #fff; */
        box-sizing: border-box;
        position: relative;
        
        box-shadow: inset 0 0 10px rgb(255 255 255 / 50%);
    }
    .box{
        width: 100%;
        display: flex;
        justify-content: space-around;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .content{
        margin-top: 20px;
    }
    .content > div{
        display: inline-block;
    }
    .content .content_online{
        text-shadow: 0 0 10px #00b3ff, 0 0 20px #00b3ff, 0 0 40px #00b3ff, 0 0 80px #00b3ff;
        font-size: 20px;
    }
    .chart1{
        width: 100px;
        height: 100px;
        /* border: 1px solid #fff; */
        box-sizing: border-box;
        border-radius: 50%;
    }
    .imgSmall img{
        width: 40px;
        height: 40px;
        margin-top: 16px;
    }
    .imgSmall > p{
        font-size: 14px;
        color: #FFEBCD;
    }
    .img img{
        width: 60px;
        height: 60px;
        margin-top: 20px;
    }
    .center{
        flex: 2;
        margin: 0 10px;
    }
    .right{
        flex: 1;
        /* padding:30px  40px; */
        box-sizing: border-box;
        /* box-shadow: inset 0 0 10px rgb(255 255 255 / 50%); */
    }
    .right .projectNum{
        width: 100%;
        height: 25%;
        padding-top: 10px;
        box-sizing: border-box;
        margin: 0 auto 10px;
        box-shadow: inset 0 0 10px rgb(255 255 255 / 50%);
    }
    .right .projectNum_box{
        width: 100%;
        margin-top: 20px;
        display: flex;
        justify-content: space-around;
    }
    .projectNum_box > div{
        display: flex;
        justify-content: center;
    }
    .projectNum_box p{
        margin-top: 0 !important;
        margin-left: 10px;
        line-height: 50px;
    }
    .projectNum_box .projectNum_chart{
        width: 50px;
        height: 50px;
        text-align: center;
        color: #fff;
    }
    .projectNum_chart span{
        display: block;
        line-height: 25px;
        font-weight: bolder;
    }
    .right .projectList{
        width: 100%;
        height: 74%;
        overflow: hidden;
        box-shadow: inset 0 0 10px rgb(255 255 255 / 50%);
    }
    .right p{
        color: #fff;
        font-size: 20px;
        margin-top: 30px;
        /* background: rgba(255, 255, 255, 0.1) */
    }
    .right ul{
        list-style: disc ;
        margin-left: 40px;
    }
    .right li{
        color: #fff;
        margin: 15px 0;
        text-align: left;
        cursor: pointer;
    }
    .right li:hover{
        color:#13fdf6
    }
</style>