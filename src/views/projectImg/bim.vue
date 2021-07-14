<template>
   <div class='main'>
       <div class="mask" v-if="isMask"></div>
    <div class='buttons'>
        <div class="info">
            <div class="ul1">
                <ul>
                    <li>工程名称：{{projectDetail.projectName ? projectDetail.projectName : ''}}</li>
                    <li>基坑支护设计：{{projectDetail.supportDesignUnit ? projectDetail.supportDesignUnit : ''}}</li>
                    <li>基坑监测单位：{{projectDetail.monitoringUnit ? projectDetail.monitoringUnit : ''}}</li>
                </ul>
            </div>
            <div class="ul2">
                <ul>
                    <li>建设单位：{{projectDetail.unit ? projectDetail.unit : ''}}</li>
                    <li>施工单位：{{projectDetail.testUnit ? projectDetail.testUnit : ''}}</li>
                    <li>监理单位：{{projectDetail.designUnit ? projectDetail.designUnit : ''}}</li>
                </ul>
            </div>
            <div class="ul3">
                <ul>
                    <li>勘察单位：{{projectDetail.investigationUnit ? projectDetail.investigationUnit : ''}}</li>
                    <li>总开挖深度：{{projectDetail.depth ? projectDetail.depth : ''}} 米</li>
                    <li>当前开挖深度：{{projectDetail.currentDepth ? projectDetail.currentDepth : ''}} 米</li>
                </ul>
            </div>
            <div class="ul4">
                <ul>
                    <li>地下结构层：{{projectDetail.undergroundStructure ? projectDetail.undergroundStructure : ''}}层</li>
                    <li>基坑施工：{{projectDetail.foundationConstruction ? projectDetail.foundationConstruction : ''}}天</li>
                    <li>项目动态：{{projectDetail.projectNews ? projectDetail.projectNews : ''}}</li>
                </ul>
            </div>
            <div class="ul5">
                <ul>
                    <li>
                        <span>水位报警</span>
                        <span>0次</span>
                        <span>预警</span>
                        <span>0次</span>
                    </li>
                    <li>
                        <span>测斜报警</span>
                        <span>0次</span>
                        <span>预警</span>
                        <span>0次</span>
                    </li>
                    <li>
                        <span>轴力报警</span>
                        <span>0次</span>
                        <span>预警</span>
                        <span>0次</span>
                    </li>
                </ul>
            </div>
            <!-- <ul>
                <li>工程名称：{{projectDetail.projectName ? projectDetail.projectName : ''}}</li>
                <li>建设单位：{{projectDetail.unit ? projectDetail.unit : ''}}</li>
                <li>勘察单位：{{projectDetail.investigationUnit ? projectDetail.investigationUnit : ''}}</li>
                <li>地下结构层：{{projectDetail.undergroundStructure ? projectDetail.undergroundStructure : ''}}层</li>
                <li>基坑支护设计：{{projectDetail.supportDesignUnit ? projectDetail.supportDesignUnit : ''}}</li>
                <li>施工单位：{{projectDetail.testUnit ? projectDetail.testUnit : ''}}</li>
                <li>总开挖深度：{{projectDetail.depth ? projectDetail.depth : ''}} 米</li>
                <li>基坑施工：{{projectDetail.foundationConstruction ? projectDetail.foundationConstruction : ''}}天</li>
                <li>基坑监测单位：{{projectDetail.monitoringUnit ? projectDetail.monitoringUnit : ''}}</li>
                <li>监理单位：{{projectDetail.designUnit ? projectDetail.designUnit : ''}}</li>
                <li>当前开挖深度：{{projectDetail.currentDepth ? projectDetail.currentDepth : ''}} 米</li>
                <li>项目动态：{{projectDetail.projectNews ? projectDetail.projectNews : ''}}</li>
            </ul> -->
        </div>
        <div class="button" v-show="projectId == 64">
            <button class="button" @click="setVideo()">{{isVideo == true ? '查看模型' : '查看监控'}}</button>
            <button class="button"  v-show="!isVideo" @click="hideComponents(list1)">支护结构</button>
            <button class="button"  v-show="!isVideo" @click="hideComponents(list2)">地下水位</button>
        </div>
    </div>
    <!-- 显示测点详细内容 -->
        <!-- 现在改为倾斜全部为纵向 -->
        <div :class="currentStation.unitType == '倾斜监测' ? 'content cx2' : 'content'" v-if="isShowContent">
            <div class="closeBox" @click="closeBox()">×</div>
            <div class="top" :style="currentStation.unitType == '倾斜监测' ? 'flex-wrap:wrap;justify-content:flex-center' : 'flex-wrap:nowrap'">
                <p class="topItem">
                    名称：{{currentStation.pointName}}
                </p>
                <p class="topItem" v-show="isQxMax">
                    类型：{{currentStation.unitType == '水位监测' ? '水位变幅' : currentStation.unitType}}
                </p>
                <p class="topItem" v-show="!isQxMax">
                    类型：{{currentStation.unitType == '水位监测' ? '水位监测' : currentStation.unitType}}
                </p>
                <p v-show="isQxMax" class="topItem" v-if="currentStation.unitType != '倾斜监测'">
                    当前值：{{currentStation.currentValue}}<span>{{currentStation.unitType == '轴力监测' ? 'KN' : currentStation.unitType == '水位监测' ? 'm' : 'mm'}}</span>
                </p>
                <p v-show="!isQxMax" class="topItem" v-if="currentStation.unitType != '倾斜监测'">
                    当前值：{{currentStation.currentSwValue}}<span>{{currentStation.unitType == '轴力监测' ? 'KN' : currentStation.unitType == '水位监测' ? 'm' : 'mm'}}</span>
                </p>
                <p v-else>
                    {{isQxMax ? '时间' : '当前值'}}：{{isQxMax ? currentTimeCX : currentQxValue+'mm'}}
                </p>
                <p  v-if="currentStation.unitType == '倾斜监测'">
                    状态：{{currentStatusCX}}
                </p>
                <p class="topItem" v-if="currentStation.unitType != '倾斜监测'">
                    状态：{{Math.abs(currentStation.currentValue) > currentStation.maxValue ? '预警' :  '正常'}}
                </p>
            </div>
            <div v-show="isQxMax" id="myChart" :style="currentStation.unitType == '倾斜监测' ? 'width:100%;height:500px' : 'width:100%;height:300px'"></div>
            <div v-show="!isQxMax" id="myQxMaxChart" :style="currentStation.unitType == '倾斜监测' ? 'width:100%;height:500px' : 'width:100%;height:300px'"></div>
        </div>
        <div class="monitoring" v-show="isVideo" id="myVideoDiv">
            <!-- <video id="myVideo" class="video-js vjs-default-skin vjs-big-play-centered" controls preload="auto" data-setup='{}'>
                <source id="source" :src="videoSrc" type="application/x-mpegURL"></source>
            </video> -->
            <div v-for="(item,index) in videoList" :key="index" :class="index === currentIndex ? 'bigVideo' : ''">
                <!-- <p>{{item.cameraName}}</p> -->
                <!-- <video :id="'myvideo'+index" class="video-js vjs-default-skin  vjs-big-play-centered" controls preload="auto" style='width: 100%;height: 100%'> -->
                <video :id="'myvideo'+index" class="video-js vjs-default-skin  vjs-big-play-centered"  preload="auto" style='width: 100%;height: 100%' @click="setCurrent(index)">
                    <source :src="item.cameraURL" style='width: 100%;height: 100%' type="application/x-mpegURL">
                </video>
                <div class="handleView">
                    <p><img @click="handleView(item,'UP')" src="../../assets/top.png" alt=""></p>
                    <p style="margin:10px 0">
                        <img @click="handleView(item,'LEFT')" style="margin-right:30px" src="../../assets/left.png" alt="">
                        <img @click="handleView(item,'RIGHT')" style="margin-left:30px" src="../../assets/right.png" alt="">
                    </p>
                    <p><img @click="handleView(item,'DOWN')" src="../../assets/down.png" alt=""></p>
                </div>
            </div>
        </div>

        <!-- <div class="video_content" v-show="isVideo">
            <iframe height=148 width=220 src="http://player.youku.com/embed/XMTU4MTY4OTg5Mg==" frameborder=0 allowfullscreen></iframe>
            <iframe height=500 width=500 src="http://192.168.199.180:8081/m3u8.html" frameborder=0 allowfullscreen></iframe>
        </div> -->
        <!-- 定义DOM元素，用于在该DOM元素中显示模型或图纸 -->
        <div id="domId" v-show="!isVideo"></div>
  </div>
</template>

<script>
import {Json2Params,timeapple} from '../../publicJs/utils'
import request from '../../publicJs/axios.js'
export default {
    name: 'HelloWorld',
    data () {
        return {
            isShowContent:false,
            viewToken: '1fd2558f42464f6f8f225b3210b6c932',
            viewer3D:'',
            app:'',
            viewAdded:false,
            isMapLoaded:false,
            loaderConfig:null,
            cunstomItemContainer:'',
            currentStation:{},
            maxList:[],
            currentTimeCX:'',   //测斜2的时间
            currentStatusCX:'正常',   //测斜2的状态
            stationList:[
                {
                    id:'1',
                    type:'zl',
                    name:'zl1',
                    position:{'x': 91588.80027220602, 'y': 56239.55085008204, 'z': 4799.838378906483},
                    currentValue:20,
                    status:1,
                    max:50,
                    valueList:[
                        {
                            time:'2021-6-5 17:26:00',
                            name:'轴力',
                            value:10
                        },
                        {
                            time:'2021-6-5 17:00:00',
                            name:'轴力',
                            value:20
                        },
                        {
                            time:'2021-6-6 10:00:00',
                            name:'轴力',
                            value:15
                        }
                    ],
                },
                {
                    id:'2',
                    type:'sw',
                    name:'sw1',
                    position: {'x': 65778.53626710987, 'y': 168756.9080718443, 'z': 5618.656613629311},
                    currentValue:50,
                    status:1,
                    max:50,
                    valueList:[
                        {
                            time:'2021-6-5 17:26:00',
                            name:'水位',
                            value:18
                        },
                        {
                            time:'2021-6-5 17:00:00',
                            name:'水位',
                            value:45
                        },
                        {
                            time:'2021-6-6 10:00:00',
                            name:'水位',
                            value:35
                        }
                    ]
                },
                {
                    id:'3',
                    type:'qx',
                    name:'qx1',
                    position: {'x': 295114.78437032405, 'y': 88871.67247572853, 'z': -6898.087890625234},
                    currentValue:80,
                    status:1,
                    max:50,
                    valueList:[
                        {
                            time:'2021-6-5 17:26:00',
                            name:'倾斜',
                            value:65
                        },
                        {
                            time:'2021-6-5 17:00:00',
                            name:'倾斜',
                            value:80
                        },
                        {
                            time:'2021-6-6 10:00:00',
                            name:'倾斜',
                            value:30
                        }
                    ]
                },
            ],
            Base64:require('js-base64').Base64,
            accessToken:'',
            list1:['5911814','5874817','5844402','5844928','5878182'],   //只显示支护结构
            list2:['5911814','5844402','5844928','5878182'],   //只显示地下水位
            list3:[],   //只显示土层(地面也要显示)
            isShowOrDisplay:false,   //显示或隐藏对应的构件
            positionDescList:[
                {
                    name:'北侧 围护桩＋止水帷幕',
                    // name:'围护桩+止水帷幕',
                    id:0,
                    worldPosition:{"x":88046.46633346175,"y":232830.82798831462,"z":-5049.668564008417}
                },
                {
                    name:'西侧 地下连续墙',
                    // name:'地下连续墙',
                    id:1,
                    worldPosition:{"x":20184.63720548137,"y":204025.16897483895,"z":-1366.6233427045718}
                },
                {
                    name:'南侧 围护桩＋止水帷幕',
                    // name:'围护桩+止水帷幕',
                    id:2,
                    worldPosition:{"x":74713.90577163012,"y":10250.739808165235,"z":-6367.103103722039}
                },
                {
                    name:'东侧 围护桩＋止水帷幕',
                    // name:'围护桩+止水帷幕',
                    id:3,
                    worldPosition:{"x":330000.98046875006,"y":149756.86359782697,"z":-751.1539429606928}
                },
                {
                    name:'支撑梁',
                    id:4,
                    worldPosition:{"x":78908.82007508342,"y":203087.8524912837,"z":4799.838378906251}
                },
                {
                    name:'支撑梁',
                    id:5,
                    worldPosition:{"x":208449.60723271515,"y":179125.74015675014,"z":4341.110698107706}
                },
                {
                    name:'支撑梁',
                    id:6,
                    worldPosition:{"x":53170.5284002257,"y":60368.22332089769,"z":4376.670066692255}
                },
                {
                    name:'支撑梁',
                    id:7,
                    worldPosition:{"x":247664.85775324822,"y":36742.607079531146,"z":4379.186851135848}
                },
                {
                    name:'地铁一号线',
                    id:8,
                    worldPosition:{"x":107556.45925845191,"y":306821.7240459958,"z":-13002.9501953125}
                },
                {
                    name:'地铁五号线',
                    id:9,
                    worldPosition:{"x":-275.5754528770631,"y":-63016.63671875,"z":-24834.486014837636}
                }
            ],
            myVideo:'',
            videoSrc:'http://220.184.156.50:83/openUrl/V0XnVmg/live.m3u8',
            isVideo:false,
            projectId:'',
            videoList:[],
            projectDetail:{},
            currentIndex:'',
            isMask:false,
            isQxMax:true,
            currentQxValue:''
        }
    },
    mounted() {
        // this.playVideo()
        // this.getBimFaceToken()
        let projectId = this.$route.query.projectId
        sessionStorage.setItem('projectId',projectId)
        this.projectId = parseInt(sessionStorage.getItem('projectId'))
        console.log(this.projectId)
        this.getVideoList()
        this.getProjectDetail()
        this.getViewTokenFromCloud()
        // this.getAllStation()
    },
    methods:{
        setCurrent(index){
            if(this.currentIndex === index){
                this.currentIndex = '0'
                this.isMask = false
            }else{
                this.currentIndex = index
                this.isMask = true
            }
            console.log(index)
            console.log(this.currentIndex)
        },
        handleView(item,command){
            let objData = {
                cameraIndexCode:item.cameraIndexCode,
                // action:command == 'STOP' ? 1 : 0,
                action:0,
                command:command,
                presetIndex:0
            }
            let url = '/found/camera/controlling'
            let params = Json2Params(objData)
            this.$axios.post(url+params).then(res => {
                console.log(res)
            })
        },
        setVideo(){
            this.isVideo = !this.isVideo
            console.log(this.videoList)
            for (let i = 0; i < this.videoList.length; i++) {
                let myVideo = videojs("myvideo" + i, {
                        bigPlayButton: false,
                        textTrackDisplay: false,
                        posterImage: true,
                        errorDisplay: false,
                        controlBar: true
                    },
                    function () {
                        myVideo.play();
                    }
                );
            }
            // var myVideo = videojs('myVideo', {
            //     bigPlayButton: true,
            //     textTrackDisplay: false,
            //     posterImage: false,
            //     errorDisplay: false,
            // })
            // if(this.isVideo == true){
            //     var myVideoDiv = document.getElementById("myVideoDiv")
            //     console.log(myVideoDiv.innerHTML)
            //     // myVideoDiv.innerHTML = "<video id='myVideo' class='video-js vjs-default-skin  vjs-big-play-centered' controls preload='auto' style='width: 100%;height: 100%' controlBar='true'><source src="+ this.videoSrc +" style='width: 100%;height: 100%' type='application/x-mpegURL'></video>"
                
            //     myVideo.play()
            // }else{
            //     // myVideo.dispose()  //销毁video组件
            // }
        },
        // 获取直播流列表
        getVideoList(){
            this.$axios.get('/found/camera/getCamera?projectId='+this.projectId).then(res => {
                console.log('测试流地址列表')
                console.log(res)
                if(res.data.status == 2000){
                    this.videoList = res.data.body
                    this.videoList.map(item => {
                        item.cameraURL = item.cameraURL.slice(5)
                    })
                    console.log(this.videoList)
                }
            })
        },
        // 获取单个项目的详情
        getProjectDetail(){
            this.$axios.get('/found/project/selectOneProject?id='+this.projectId).then(res => {
                console.log('测试流地址列表')
                console.log(res)
                if(res.data.status == 2000){
                    this.projectDetail = res.data.body
                    console.log(this.projectDetail)
                }
            })
        },
        // 点击按钮隐藏或显示对应的构件
        hideComponents(list){
            this.isShowOrDisplay = !this.isShowOrDisplay
            console.log('刚进来的时候')
            console.log(this.isShowOrDisplay)
            this.viewer3D.showComponentsById(this.list1)
            if(this.isShowOrDisplay){
                console.log(list)
                this.viewer3D.hideComponentsById(list);
                this.viewer3D.render();
            }else{
                console.log(list)
                this.viewer3D.showComponentsById(list);
                this.viewer3D.render();
            }
            // this.isShowOrDisplay = !this.isShowOrDisplay
            console.log('操作了')
            console.log(this.isShowOrDisplay)
            
        },
        // 从bimface获取bimFace的Access Token
        getBimFaceToken(){
            // let Base64 = require('js-base64').Base64
            console.log(this.Base64.encode('潘高'))
            console.log(this.Base64.decode('5r2Y6auY'))
            let param = {
                method:'POST',
                // 将字符串 appKey:appSecret 拼接，即：“Basic” + “ ” + Base64Encode(appKey + “:” + appSecret)，这俩均在控制台应用概览查看
                dev:'Basic'+' '+this.Base64.encode('cxyydzPgQbKJnJ5bArMHHmXRwPgAUgR4'+':'+'cVX78CbF7bEfR6YtdW1NaN428cvhkn7d'),
                url:'/oauth2/token'
            }
            console.log(param)
            request(param).then(res => {
                console.log(res)
                if(res.status == 200 && res.data.code == 'success'){
                    this.accessToken = res.data.data.token
                    this.getViewToken(res.data.data.token)
                }
            })
        },
        // 从bimface根据Access Token获取viewToken
        getViewToken(accessToken){
            let param = {
                method:'GET',
                url:'/view/token',
                // url:'/view/token?fileId=2144220182596224',
                dev:'bearer'+' '+accessToken,
                params:{
                    // fileId是文件转换ID，在控制台上传转换查看
                    fileId:'2144220182596224'
                }
            }
            request(param).then(res => {
                console.log(res)
                if(res.status == 200 && res.data.code == 'success'){
                    this.viewToken = res.data.data
                    // 获取到viewToken后再去查询测点和加载模型
                    this.getAllStation()
                }
            })
        },
        // 从后端获取viewToken
        getViewTokenFromCloud(){
            let projectId = this.projectId
            let fileId 
            switch(projectId){
                case 60 : fileId = '2160204849760896'; break;  //智慧新天地创新中心项目
                case 64 : fileId = '2149154936621504'; break;  //滨康综合体
                case 62 : fileId = '2160241323027072'; break;  //闻涛大厦
                case 71 : fileId = '2160204097718912'; break;  //滨江区拆迁安置房十二区块扩点项目  (联庄二区)
                case 73 : fileId = '2160203489143424'; break;  //杭政储出2020（70）地块
                // case 59 : fileId = '2154071941147072'; break;  //杭政工出  21号地
                case 76 : fileId = '2160200653744768'; break;  //物联网产业园配套幼儿园及人防工程
                case 67 : fileId = '2160201765276288'; break;  //区政府南广场项目
                case 61 : fileId = '2160202538486208'; break;  //滨江区拆迁安置房十三区块扩点项目
                case 74 : fileId = '2160202828401088'; break;  // 滨江工业综合体
                case 75 : fileId = '2160203440417408'; break;  //当虹科技智能视频产业基地项目
                case 66 : fileId = '2160204051990976'; break;  //杭州趣链科技项目
            }
            // let fileId = '2149154936621504'
            this.$axios.get('/found/user/getToken?fileId='+fileId).then(res => {
                console.log(res)
                if(res.data.status == 2000){
                    this.viewToken = res.data.body
                    this.getAllStation()
                }
            })
        },
        // 将所有测点暂时先按顺序排列（修改名称）
        setStationName(arr){
            arr.map(item => {
                switch(item.pointName){
                    case 'SW2': item.pointName = 'SW1';break;
                    case 'SW13': item.pointName = 'SW2';break;
                    case 'SW24': item.pointName = 'SW3';break;
                    case 'SW50': item.pointName = 'SW4';break;
                    case 'ZCL9': item.pointName = 'ZCL1';break;
                    case 'ZCL10': item.pointName = 'ZCL2';break;
                    case 'ZCL2': item.pointName = 'ZCL3';break;
                    case 'ZCL4': item.pointName = 'ZCL4';break;
                    case 'ZCL25': item.pointName = 'ZCL5';break;
                    case 'ZCL26': item.pointName = 'ZCL6';break;
                    case 'ZCL41': item.pointName = 'ZCL7';break;
                    case 'ZCL42': item.pointName = 'ZCL8';break;
                    // case 'CX2': item.pointName = 'CX1';break;
                    // case 'CX10': item.pointName = 'CX2';break;
                    // case 'CX30': item.pointName = 'CX3';break;
                    // case 'CX50': item.pointName = 'CX4';break;
                }
            })
            return arr
        },
        // 获取所有测点
        getAllStation(){
            let subprojectIdArr = [224,225,247]
            let url = '/found/pc/map/selectChatDTO?subprojectId='
            let promiseArr = []
            subprojectIdArr.map(item => {
                let x = this.$axios.get(url+item)
                promiseArr.push(x)
            })
            // res.data.body
            let stationArr = []
            Promise.all(promiseArr)
            .then(resd => {
                for(let i = 0 ; i < resd.length; i++){
                    if(resd[i].data.status == 2000){
                        for(let j = 0; j < resd[i].data.body.length; j++){
                            if(resd[i].data.body[j].coordinates){
                                stationArr.push(resd[i].data.body[j])
                            }
                        }
                    }
                }
                stationArr.map(item => {
                    item.coordinates = JSON.parse(item.coordinates)
                    item.coordinates.x = parseFloat(item.coordinates.x)
                    item.coordinates.y = parseFloat(item.coordinates.y)
                    item.coordinates.z = parseFloat(item.coordinates.z)
                    // if(item.unitType == '轴力监测'){
                    //     item.pointName = item.pointName.replace('C','')
                    // }
                })
                console.log(stationArr)
                stationArr = this.setStationName(stationArr)
                this.stationList = stationArr
                // 加载模型
                var that=this
                var options = new BimfaceSDKLoaderConfig();
                options.viewToken = that.viewToken;
                BimfaceSDKLoader.load( options, that.successCallback,that.failureCallback);
            })
        },
        // 测斜根据测点查询计划
        getInclinationPlan(){
            let url = '/found/incline/selectOne?pointId='
            let pointId = this.currentStation.pointId
            // let obj = {
            //     pointId:id,
            //     // 当天零点的时间
            //     zero:new Date(new Date().toLocaleDateString()).getTime()
            // }
            this.$axios.get(url+pointId).then(res => {
                if(res.data.status == 2000){
                    
                    let arr = res.data.body
                    this.currentTimeCX = timeapple(arr[0].time.time,'all')
                    arr.map(item => {
                        item.time = timeapple(item.time.time,'all')
                        item.maxValue = 55
                        if(this.currentStation.pointName == 'CX50'){
                            item.maxValue = 25
                        }
                        item.maxName = '预警指标'
                        if(item.sumVariable > 55){
                            this.currentStatusCX = '预警'
                            return
                        }
                    })
                    this.drawLine1(arr)
                }
            })
        },
        // 获取绘图数据
        getChartData(){
            let type = this.currentStation.unitType
            let pointId = this.currentStation.pointId
            let chartArr = []
            let url
            switch(type){
                case '轴力监测': url = '/found/axial/selectOneAxial?pointId=';break;
                case '水位监测': url = '/found/water_level/selectOneWater?pointId=';break;
                case '倾斜监测': url = '/found/incline/selectOneInline?pointId=';break;
            }
            this.$axios.get(url+pointId).then(res => {
                if(res.data.status == 2000){
                    chartArr = res.data.body
                    console.log(chartArr)
                    if(this.currentStation.unitType == '水位监测'){
                        this.$set(this.currentStation,'currentValue',chartArr[chartArr.length-1].variable)
                    }else{
                        this.$set(this.currentStation,'currentValue',chartArr[chartArr.length-1].calculated)
                    }
                    chartArr.map(item => {
                        item.maxName = '预警指标'
                        item.time = timeapple(item.time.time,'all')
                        item.unitType = item.pointName.substring(0,2)
                        if(item.unitType == 'ZC'){
                            item.maxValue = 7000
                        }else if(item.unitType == 'SW'){
                            item.maxValue = 0.5
                        }else if(item.unitType == 'CX'){
                            if(item.pointName == 'CX10' || item.pointName == 'CX50'){
                                item.maxValue = 25
                            }else if(item.pointName == 'CX2' || item.pointName == 'CX30'){
                                item.maxValue = 55
                            }
                        }
                        if(item.pointName == this.currentStation.pointName){
                            console.log(123321123)
                            this.$set(this.currentStation,'maxValue',item.maxValue)
                        }
                    })
                    console.log(chartArr)
                    console.log(this.currentStation)
                    this.drawLine(chartArr)
                }
                
            })
        },
        // 根据标签点击测点得到的测点名称设置当前选中的测点
        setCurrentStation(name){
            let arr = this.stationList
            for(let i = 0; i < arr.length; i++){
                if(arr[i].pointName == name){
                    this.currentStation = arr[i]
                }
            }
            console.log(this.currentStation)
            // if(this.currentStation.pointName == 'CX2'){
            if(this.currentStation.unitType == '倾斜监测'){
                this.getInclinationPlan()
            }else{
                this.getChartData()
            }
        },
        // 设置初始视角
        setInitialView(){
            // var homeview = this.viewer3D.getCameraStatus();
            // this.viewer3D.recordCustomHomeview(homeview);
            // // window.alert(JSON.stringify(homeview));
            // this.viewer3D.render();
            let cameraState = this.viewer3D.getCameraStatus();
        },
        // 关闭弹框
        closeBox(){
            this.isShowContent = false
        },
        // 纵向绘图
        drawLine1(chartList){
            chartList= this.setStationName(chartList)
            console.log('测试是否能取到测点id')
            console.log(chartList)
            console.log(this.currentStation.pointId)
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('myChart'))
            // 给图表添加点击事件
            let that = this
            myChart.on('click', function (params) {
                // console.log(params);
                that.getQxMaxData()
            });
            // 绘制图表
            let option = {
                // title: { text: '在Vue中使用echarts' },
                legend:{
                    data:[chartList[0].pointName,chartList[0].maxName]
                },
                tooltip: {
                    trigger: 'axis',
                    // formatter: 'Temperature : <br/>{b}mm : {c}°C'
                },
                xAxis: {
                    type: 'value',
                    position: 'top',
                    axisLabel: {
                        formatter: '{value} mm'
                    }
                },
                yAxis: {
                    inverse:true,
                    type: 'category',
                    axisLine: {onZero: false},
                    axisLabel: {
                        formatter: '{value} m'
                    },
                    // inverse：true,
                    boundaryGap: false,
                    data:chartList.map(item => {
                        return item.presentDepth
                    }),
                },
                series:[
                    {
                        name:chartList[0].pointName,
                        type:'line',
                        data:chartList.map(item => {
                            return item.sumVariable
                        }),
                        itemStyle:{
                            normal: {
                                color: "#00ff00",//折线点的颜色
                            },
                            lineStyle: {
                                color: "#00ff00"//折线的颜色
                            }
                        },
                        smooth:true,  
                    },
                    {
                        name:chartList[0].maxName,
                        type:'line',
                        data:chartList.map(item => {
                            return item.maxValue
                        }),
                        itemStyle:{
                            normal: {
                                color: "#ff0000",//折线点的颜色
                                lineStyle: {
                                    color: "#ff0000",//折线的颜色
                                    type:'dashed'

                                }
                            },
                            
                        },
                        smooth:true,  
                    }
                ]
            }
            myChart.setOption(option)
        },
        // 倾斜最大值的数据
        getQxMaxData(){
            this.isQxMax = false
            let chartList = []
            let pointId = this.currentStation.pointId 
            this.$axios.get('/found/incline/getMaxPerDay?pointId='+pointId).then(res => {
                console.log(res)
                if(res.data.status == 2000){
                    chartList = res.data.body
                    console.log(chartList)
                    this.currentQxValue = chartList[chartList.length-1].max
                    chartList.map(item => {
                        item.maxValue = 55
                        if(this.currentStation.pointName == 'CX50'){
                            item.maxValue = 25
                        }
                        item.maxName = '预警指标'
                    })
                    this.drawLineQxMax(chartList)
                }
            })
        },
        // 倾斜最大值的绘图
        drawLineQxMax(chartList){
            let myChart = this.$echarts.init(document.getElementById('myQxMaxChart'))
            // 给图表添加点击事件
            let that = this
            myChart.on('click', function (params) {
                that.isQxMax = true
            });
            console.log(chartList)
            let option = {
                title: { 
                    text: '向\n基\n坑\n内\n侧\n位\n移',
                    subtext:'',
                    top: '40%',
                    left: '0%',
                    textStyle: {　
                        fontSize: 14,
                        fontWeight:500,
                        color: "#0000CD",
                        textAlign: "center",
                        // marginTop:"20px",
                    }
                },
                tooltip: {
                        trigger: 'axis'
                    },
                legend:{
                    data:[chartList[0].pointName,chartList[0].maxName]
                    // data:[chartList[0].pointName]
                },
                xAxis: {
                    data:chartList.map(item => {
                        return timeapple(item.time.time,'all')
                    }),
                    boundaryGap: false,
                    // 坐标轴字的样式
                    axisLabel:{
                        textStyle:{
                            color:'#0000CD'
                        },
                        
                    },
                    // 坐标轴线的样式
                    axisLine:{
                        lineStyle:{
                            color:'#0000CD'
                        }
                    }
                },
                
                yAxis: {
                    // type: 'category',
                    // name:'mm',
                    axisLabel:{
                        textStyle:{
                            color:'#0000CD'
                        },
                        
                        formatter: '{value}mm',
                    },
                    axisLine:{
                        show:true,
                        // onZero: true,
                        lineStyle:{
                            color:'#0000CD',
                            // width:2
                        }
                    },
                    // 网格线
                    splitLine:{
                        show:false
                    },
                },
                series:[
                    {
                        name:chartList[0].pointName,
                        type:'line',
                        data:chartList.map(item => {
                            return item.max
                            
                        }),
                        itemStyle:{
                            normal: {
                                color: "#00ff00",//折线点的颜色
                            },
                            lineStyle: {
                                color: "#00ff00"//折线的颜色
                            }
                        },
                        smooth:true,  
                    },
                    {
                        name:chartList[0].maxName,
                        type:'line',
                        data:chartList.map(item => {
                            return item.maxValue
                        }),
                        itemStyle:{
                            normal: {
                                color: "#ff0000",//折线点的颜色
                                lineStyle: {
                                    color: "#ff0000",//折线的颜色
                                    type:'dashed'

                                }
                            },
                            
                        },
                        smooth:true,  
                    },
                    // {
                    //     name:chartList[0].maxName,
                    //     type:'line',
                    //     data:chartList.map(item => {
                    //         return -item.maxValue
                    //     }),
                    //     itemStyle:{
                    //         normal: {
                    //             color: "#ff0000",//折线点的颜色
                    //             lineStyle: {
                    //                 color: "#ff0000",//折线的颜色
                    //                 type:'dashed'

                    //             }
                    //         },
                            
                    //     },
                    //     smooth:true,  
                    // }
                ]
            }
            myChart.setOption(option)
            console.log(myChart)
        },
        // 水位根据测点获取数据
        getSwStationData(){
            this.isQxMax = false
            let chartList = []
            let pointId = this.currentStation.pointId 
            this.$axios.get('/found/water_level/getOneMapData?pointId='+pointId).then(res => {
                console.log(res)
                if(res.data.status == 2000){
                    chartList = res.data.body
                    console.log(chartList)
                    this.$set(this.currentStation,'currentSwValue',chartList[chartList.length-1].calculated)
                    for(let i = 0; i < chartList.length; i++){
                        chartList[i].maxName = '预警值1',
                        chartList[i].minName = '预警值2',
                        chartList[i].floorName = '地面标高'
                        chartList[i].floor = 5.8
                        chartList[i].bottomName = '坑底标高'
                        chartList[i].bottom = -6.35
                        if(chartList[0].calculated+3 < 5.8){
                            chartList[i].max = chartList[0].calculated+3
                        }else{
                            chartList[i].max = 5.8
                        }
                        chartList[i].min = parseFloat((chartList[0].calculated-3).toFixed(2))
                    }
                    chartList= this.setStationName(chartList)
                    console.log(chartList)
                    this.drawLineSwByStation(chartList)
                }
            })
        },
        // 水位根据测点绘图
        drawLineSwByStation(chartList){
            let myChart = this.$echarts.init(document.getElementById('myQxMaxChart'))
            // 给图表添加点击事件
            let that = this
            myChart.on('click', function (params) {
                console.log(params)
                that.isQxMax = true
            });
            console.log(chartList)
            let option = {
                tooltip: {
                        trigger: 'axis'
                    },
                legend:{
                    // data:[chartList[0].pointName,chartList[0].maxName]
                    data:[chartList[0].floorName,chartList[0].maxName,chartList[0].pointName+'水位',chartList[0].minName,chartList[0].bottomName]
                },
                xAxis: {
                    // name:'黄海标高',
                    // nameLocation:'start',
                    // nameTextStyle: {
                    //     padding: [0, 10, 0, 0]    // 四个数字分别为上右下左与原位置距离
                    // },
                    data:chartList.map(item => {
                        return timeapple(item.time.time,'all')
                    }),
                    boundaryGap: false,
                    // 坐标轴字的样式
                    axisLabel:{
                        textStyle:{
                            color:'#0000CD'
                        },
                        
                    },
                    // 坐标轴线的样式
                    axisLine:{
                        lineStyle:{
                            color:'#0000CD'
                        }
                    }
                },
                
                yAxis: {
                    name:'水位',
                    // type: 'category',
                    axisLabel:{
                        textStyle:{
                            color:'#0000CD'
                        },
                        // formatter: '{value} mm',
                        formatter:function(value){
                            let valueText
                            console.log(value)
                            if(value == parseInt(6)){
                                console.log(123)
                                valueText = '地面标高'
                            }else if(value == parseInt(-6.35)){
                                console.log(456)
                                valueText = '坑底标高'
                            }else if(value == 0){
                                valueText = '黄海标高'
                            }else{
                                console.log(789)
                                valueText = value
                            }
                            return valueText
                        },
                    },
                    axisTick:{ //y轴刻度线
                        show:true
                    },
                    axisLine:{
                        show:true,
                        // onZero: true,
                        lineStyle:{
                            color:'#0000CD'
                        }
                    },
                    // 网格线
                    splitLine:{
                        show:false
                    },
                },
                series:[
                    {
                        // 地面
                        name:chartList[0].floorName,
                        type:'line',
                        data:chartList.map(item => {
                            return item.floor
                        }),
                        itemStyle:{
                            normal: {
                                color: "#CDAA7D",//折线点的颜色
                                lineStyle: {
                                    color: "#CDAA7D",//折线的颜色
                                    type:'dashed'

                                }
                            },
                            
                        },
                        smooth:true,  
                    },
                    {
                        // 最大值
                        name:chartList[0].maxName,
                        type:'line',
                        data:chartList.map(item => {
                            return item.max
                        }),
                        itemStyle:{
                            normal: {
                                color: "#ff0000",//折线点的颜色
                                lineStyle: {
                                    color: "#ff0000",//折线的颜色
                                    type:'dashed'

                                }
                            },
                            
                        },
                        smooth:true,  
                    },
                    {
                        // 水位
                        name:chartList[0].pointName+'水位',
                        nameLocation:'left',
                        type:'line',
                        data:chartList.map(item => {
                            return item.calculated
                        }),
                        itemStyle:{
                            normal: {
                                color: "#00ff00",//折线点的颜色
                            },
                            lineStyle: {
                                color: "#00ff00"//折线的颜色
                            }
                        },
                        smooth:true,  
                    },
                    
                    
                    {
                        // 最小值
                        name:chartList[0].minName,
                        type:'line',
                        data:chartList.map(item => {
                            return item.min
                        }),
                        itemStyle:{
                            normal: {
                                color: "#ff0000",//折线点的颜色
                                lineStyle: {
                                    color: "#ff0000",//折线的颜色
                                    type:'dashed'

                                }
                            },
                            
                        },
                        smooth:true,  
                    },
                    {
                        // 最小值
                        name:chartList[0].bottomName,
                        type:'line',
                        data:chartList.map(item => {
                            return item.bottom
                        }),
                        itemStyle:{
                            normal: {
                                color: "#8B7355",//折线点的颜色
                                lineStyle: {
                                    color: "#8B7355",//折线的颜色
                                    type:'dashed'

                                }
                            },
                            
                        },
                        smooth:true,  
                    }
                ]
            }
            myChart.setOption(option)
            console.log(myChart)
        },
        // 横向绘图
        drawLine(chartList){
            console.log(chartList)
            chartList= this.setStationName(chartList)
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('myChart'))
            let that = this
            if(this.currentStation.unitType == '水位监测'){
                myChart.on('click', function (params) {
                    // console.log(params);
                    that.getSwStationData()
                });
            }
            // 绘制图表
            let option = {
                // title: { text: '在Vue中使用echarts' },
                tooltip: {
                        trigger: 'axis'
                    },
                legend:{
                    data:[chartList[0].pointName,chartList[0].maxName]
                },
                xAxis: {
                    data:chartList.map(item => {
                        return item.time
                    }),
                    boundaryGap: false,
                    // 坐标轴字的样式
                    axisLabel:{
                        textStyle:{
                            color:'#0000CD'
                        }
                    },
                    // 坐标轴线的样式
                    axisLine:{
                        lineStyle:{
                            color:'#0000CD'
                        }
                    }
                },
                
                yAxis: {
                    axisLabel:{
                        textStyle:{
                            color:'#0000CD'
                        }
                    },
                    axisLine:{
                        lineStyle:{
                            color:'#0000CD'
                        }
                    },
                    // 网格线
                    splitLine:{
                        show:false
                    },
                },
                series:[
                    {
                        name:chartList[0].pointName,
                        type:'line',
                        data:chartList.map(item => {
                            if(item.unitType == 'SW'){
                                return item.variable
                            }else{
                                return item.calculated
                            }
                            
                        }),
                        itemStyle:{
                            normal: {
                                color: "#00ff00",//折线点的颜色
                            },
                            lineStyle: {
                                color: "#00ff00"//折线的颜色
                            }
                        },
                        smooth:true,  
                    },
                    {
                        name:chartList[0].maxName,
                        type:'line',
                        data:chartList.map(item => {
                            return item.maxValue
                        }),
                        itemStyle:{
                            normal: {
                                color: "#ff0000",//折线点的颜色
                                lineStyle: {
                                    color: "#ff0000",//折线的颜色
                                    type:'dashed'

                                }
                            },
                            
                        },
                        smooth:true,  
                    },
                    {
                        name:chartList[0].maxName,
                        type:'line',
                        data:chartList.map(item => {
                            return -item.maxValue
                        }),
                        itemStyle:{
                            normal: {
                                color: "#ff0000",//折线点的颜色
                                lineStyle: {
                                    color: "#ff0000",//折线的颜色
                                    type:'dashed'

                                }
                            },
                            
                        },
                        smooth:true,  
                    }
                ]
            }
            myChart.setOption(option)
            console.log(myChart)
        },
        // 加载成功回调函数
        successCallback(viewMetaData) {
            var that=this
            var dom4Show = document.getElementById('domId');
            // 设置WebApplication3D的配置项
            var webAppConfig = new Glodon.Bimface.Application.WebApplication3DConfig();
            webAppConfig.domElement = dom4Show;
            webAppConfig.enableLogarithmicDepthBuffer = true;
            // 创建WebApplication3D，用以显示模型
            var app = new Glodon.Bimface.Application.WebApplication3D(webAppConfig);
            app.addView(viewMetaData.viewToken);
            var viewer3D = app.getViewer();
            this.viewer3D = viewer3D;
            // 增加加载完成监听事件
            viewer3D.addEventListener(Glodon.Bimface.Viewer.Viewer3DEvent.ViewAdded, function () {
                that.viewAdded = true;
                //自适应屏幕大小
                window.onresize = function () {
                viewer3D.resize(document.documentElement.clientWidth, document.documentElement.clientHeight - 40)
                }
                // 渲染场景
                viewer3D.render();
            });
            // 构件的鼠标点击事件，写在这里为了获取构件的elementId，不用就注释掉
            viewer3D.addEventListener(Glodon.Bimface.Viewer.Viewer3DEvent.MouseClicked, function(data){
                console.log(JSON.stringify(data));
            });
            console.log('成功的回调')
            console.log(this.viewer3D)
            // 鼠标点击的监听事件  写在这里是为了获取测点的坐标用的   不用就注释掉
            // viewer3D.addEventListener(Glodon.Bimface.Viewer.Viewer3DEvent.MouseClicked, this.addCustomItem);

            // 模型加载成功后设置测点
            console.log(this.stationList)
            if(this.projectId == 64 ){
                this.setStation(this.stationList)
                this.setDesc()
            }
            
            // 添加三维标签
            // this.addMarker()
            // 移除监听点击事件
            // viewer3D.removeEventListener(Glodon.Bimface.Viewer.Viewer3DEvent.MouseClicked, this.addCustomItem())
        },
        // 加载失败回调函数
        failureCallback(error) {
            console.log(error);
        },
        // 添加三维标签
        addMarker() {
            // 构造三维标签容器配置markerContainerConfig
            var markerContainerConfig = new Glodon.Bimface.Plugins.Marker3D.Marker3DContainerConfig();
            // 设置markerContainerConfig匹配的viewer对象
            markerContainerConfig.viewer = this.viewer3D;
            // 构造三维标签容器markerContainer
            var markerContainer = new Glodon.Bimface.Plugins.Marker3D.Marker3DContainer(markerContainerConfig);
            // 构造三维标签配置项
            var markerConfig = new Glodon.Bimface.Plugins.Marker3D.Marker3DConfig();
            // 为标签指定图片路径
            // markerConfig.src = "http://static.bimface.com/resources/3DMarker/warner/warner_red.png";
            markerConfig.src = require('../../assets/monitoring.png');
            // 构造点位，并指定为标签的插入点
            var markerPos = {"x": -1200.838548165086, "y": -1667.12605781937, "z": 12923.137945446013};
            markerConfig.worldPosition = markerPos;
            // 指定标签大小
            markerConfig.size = 40;
            // 构造三维标签
            var marker = new Glodon.Bimface.Plugins.Marker3D.Marker3D(markerConfig);
            console.log(marker)
            // 添加标签的点击事件
            marker.onClick(function() {
            window.alert('Warning!');
            });
            // 将三维标签添加至容器内
            markerContainer.addItem(marker);
        },
        // 动态设置测点
        setStation(arr){
            for(let i = 0; i < arr.length; i++){
                this.addCustomItem(arr[i])
            }
        },
        // 添加标签  实际是设置测点
        // addCustomItem(object,station){
        addCustomItem(station){
            // let showName = parseInt(station.pointName)
            let showName= station.pointName.replace(/[^0-9]/ig,"");
            switch(station.unitType){
                case '轴力监测' : showName = '轴力'+showName;break;
                case '倾斜监测' : showName = '测斜'+showName;break;
                case '水位监测' : showName = '水位'+showName;break;
            }
            var that = this
            this.createCustomItemContainer();
            // 创建CustomItemConfig
            var config = new Glodon.Bimface.Plugins.Drawable.CustomItemConfig();
            var content = document.createElement('div');
            // 自定义样式，支持HTML的任意DOM元素
            // 设置标签的宽度和高度
            // content.style.width = station.unitType == '倾斜监测' ? '50px' : '40px';
            content.style.width = '40px';
            content.style.height = '25px';
            // 设置标签样式
            // content.style.border = 'solid';
            // content.style.borderColor = '#FFFFFF';
            // content.style.borderWidth = '2px';
            content.style.borderRadius = station.unitType == '轴力监测' ? '50%' : 0;
            content.style.background = '#009ACD';
            content.style.cursor = 'pointer';
            // 设置标签文字内容与样式
            // content.innerText = station.pointName;
            content.innerText = showName;
            content.style.color = '#FFFFFF';
            content.style.textAlign = 'center';
            content.style.lineHeight = '25px';
            content.style.padding = '5px';
            content.style.fontSize = '12px';
            // 设置自定义标签配置
            config.content = content;
            config.viewer = this.viewer3D;
            config.worldPosition = station.coordinates;
            // config.worldPosition = {"x": -1200.838548165086, "y": -1667.12605781937, "z": 12923.137945446013}
            // 创建自定义标签对象
            var customItem = new Glodon.Bimface.Plugins.Drawable.CustomItem(config);
            // 将自定义标签添加至标签容器内
            this.cunstomItemContainer.addItem(customItem)
            // customItem.onMouseEnter(function(){
            //     console.log('测试鼠标点击事件')
            // })
            // 给构件添加hover效果
            // this.viewer3D.enableHover(true);
            // 右键事件
            // customItem.onRightClick(function() {
            //     console.log(customItem.config)
            //     customItem.config.content.style.background = '#ff0000'
            // });
            customItem.onClick(function() {
                // return
                that.isShowContent = true
                that.$nextTick(() => {
                    // that.setCurrentStation(customItem.config.content.innerText)
                    that.isQxMax = true
                    that.setCurrentStation(station.pointName)
                })
                
            });
        },
        // 循环数组添加结构位置说明
        setDesc(){
            let arr = this.positionDescList
            for(let i = 0; i < arr.length; i++){
                this.addDescItem(arr[i])
            }
        },
        // 添加结构描述说明
        addDescItem(desc){
            this.createCustomItemContainer();
            // 创建CustomItemConfig
            var config = new Glodon.Bimface.Plugins.Drawable.CustomItemConfig();
            var content = document.createElement('div');
            // 自定义样式，支持HTML的任意DOM元素
            // 设置标签的宽度和高度
            content.style.width = '160px';
            if(desc.id == 1 || desc.id == 3){
                content.style.width = '0px';
            }
            if(desc.id > 3 && desc.id < 8){
                content.style.width = '50px';
            }
            // content.style.height = '40px';
            // 设置标签文字内容与样式
            // content.innerText = station.pointName;
            content.innerText = desc.name;
            content.style.color = '#0000CD';
            content.style.textAlign = 'center';
            // content.style.lineHeight = '40px';
            // content.style.padding = '5px';
            content.style.fontSize = '12px';
            if(desc.id == 8 || desc.id==9){
                content.style.fontSize = '16px';
            }
            // 设置自定义标签配置
            config.content = content;
            config.viewer = this.viewer3D;
            config.worldPosition = desc.worldPosition;
            // config.worldPosition = {"x": -1200.838548165086, "y": -1667.12605781937, "z": 12923.137945446013}
            // 创建自定义标签对象
            var customItem = new Glodon.Bimface.Plugins.Drawable.CustomItem(config);
            // 将自定义标签添加至标签容器内
            this.cunstomItemContainer.addItem(customItem)
        },
        // 创建标签容器
        createCustomItemContainer() {
            var cunstomItemContainer = null
            if (!cunstomItemContainer) {
            // 创建标签容器配置
            var drawableContainerConfig = new Glodon.Bimface.Plugins.Drawable.DrawableContainerConfig();
            // 设置容器配置匹配的对象
            drawableContainerConfig.viewer = this.viewer3D;
            // 创建标签容器
            this.cunstomItemContainer = new Glodon.Bimface.Plugins.Drawable.DrawableContainer(drawableContainerConfig);
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    * {
      margin: 0;
      padding: 0;
    }

    html,
    body {
      height: 100%;
    }
    .main {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      height: 100%;
    }
    .mask{
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: 50;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.8);
    }
    .monitoring{
        /* width: 90%; */
        height: auto;
        color: #fff;
        font-size: 20px;
        /* position: absolute; */
        /* top: 60%; */
        /* left: 50%; */
        /* transform: translate(-50%,-52%); */
        /* z-index: 100; */
        display: flex;
        justify-content: space-around;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .monitoring > div{
        width: 48%;
        margin: 5px 0;
        height: 450px;
    }
    .monitoring .bigVideo{
        width: 70% !important;
        height: 600px !important;
        position: fixed !important;
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%,-50%) !important;
        z-index: 1000;
    }
    .monitoring video{
        width: 100%;
        height: 100%;
        object-fit:fill;
    }
    .monitoring .handleView{
        width: 100%;
        /* height: 150px; */
        margin-top: 20px;
        /* border: 1px solid #ccc; */
    }
    .handleView img{
        cursor: pointer;
    }
    .content{
        width: 50%;
        background:rgba(245, 245, 245,0.9);
        color: #0620a0;
        font-size: 20px;
        
        position: absolute;
        padding: 10px;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        z-index: 100;
        border: 1px solid #999;
    }
    .cx2{
        width: 40% !important;
        /* height: 500px !important; */
    }
    .content .closeBox{
        font-size: 40px;
        position: absolute;
        top: 5px;
        right: 5px;
        cursor: pointer;
    }
    .content .top{
        margin: 20px 0 10px 0;
        display: flex;
        justify-content: space-around;
    }
    .buttons{
        /* margin-bottom: 20px; */
        display: flex;
        justify-content: space-around;
    }
    .buttons .info{
        flex: 4;
        flex-wrap: wrap;
        color: #fff;
        display: flex;
        justify-content: space-between;
        text-align: left;
    }
    .info li{
        list-style: none;
    }
    .info .ul5 span{
        display: inline-block;
        margin-right: 10px;
    }
    /* .info ul{
        width: 100%;
    }
    .info li{
        width: 24%;
        height: 24px;
        float: left;
        list-style: none;
        text-align: left;
        overflow: hidden;
        margin-left: 10px;
    } */
    .buttons .button{
        flex: 1;
        text-align: left;
    }
    .buttons button {
        text-align: center !important;
        margin: 5px 0 5px 5px;
        width: 100px;
        height: 30px;
        border-radius: 3px;
        border: none;
        background: #32D3A6;
        color: #FFFFFF;
    }

    

    
     #domId {
      flex: 1;
      height:500px;
    }
</style>