<template>
  <div class="hello">
    <el-container>
        <el-container class="mainViewShell">
            <el-aside :class="isCollapse? 'mainViewShell-aside mainViewShell-aside-close' : 'mainViewShell-aside'">
              <div class="mainViewShell-aside-topview">
                {{ isCollapse? '' : '基坑监测平台' }}
              </div>
              <div class="asideNavMenuView">
                <el-menu default-active="1-4-1" 
                class="el-menu-vertical-demo"  
                :collapse="isCollapse"
                background-color="#004E9B"
                text-color="#fff">
                  <!-- <el-menu-item index="1" @click="identNavigate('CollectionIndex')">
                    <template slot="title">
                      <i class="el-icon-house"></i>
                      <span slot="title">主页</span>
                    </template>
                  </el-menu-item> -->

                  <!-- <el-submenu index="2">
                    <template slot="title">
                      <i class="el-icon-tickets"></i>
                      <span slot="title">工程项目</span>
                    </template>
                    <el-menu-item-group>
                    </el-menu-item-group>
                  </el-submenu> -->

                  <!-- <el-submenu index="3">
                    <template slot="title">
                      <i class="el-icon-pie-chart"></i>
                      <span slot="title">监测数据</span>
                    </template>
                    <el-menu-item-group>
                      <el-menu-item v-for="(item,index) in subProjectList" 
                        :key="index" index="'3-' + index" 
                        @click="identNavigate('ChartsDetailPage',item.type,item.id)">
                        {{item.type}}
                      </el-menu-item>
                    </el-menu-item-group>
                  </el-submenu> -->

                  <!-- <el-menu-item index="5" @click="identNavigate('ChartsDetailPageForSensorOnlyRead')">
                    <template slot="title">
                      <i class="el-icon-bell"></i>
                      <span slot="title">读数仪信息</span>
                    </template>
                  </el-menu-item> -->
                  <el-submenu index="5">
                    <template slot="title">
                      <i class="el-icon-pie-chart"></i>
                      <span slot="title">传感器</span>
                    </template>
                    <el-menu-item-group>
                      <el-menu-item v-for="(item,index) in defaultSensorList" :key="index" index="'5-' + index" @click="toChartOnlyRead('ChartsDetailPageForSensorOnlyRead',item.sensorCode,item.id)">
                        {{item.sensorCode}}
                      </el-menu-item>
                    </el-menu-item-group>
                  </el-submenu>

                  <!-- <el-menu-item index="6" @click="identNavigate('ReportListPage')">
                    <template slot="title">
                      <i class="el-icon-bell"></i>
                      <span slot="title">报表信息</span>
                    </template>
                  </el-menu-item>

                   <el-menu-item index="4" @click="identNavigate('ShowAlarmingListPage')">
                    <template slot="title">
                      <i class="el-icon-bell"></i>
                      <span slot="title">报警信息</span>
                    </template>
                  </el-menu-item> -->

                  <!-- <el-submenu index="4">
                    <template slot="title">
                      <i class="el-icon-news"></i>
                      <span slot="title">计算设置</span>
                    </template>
                    <el-menu-item-group>
                      <el-menu-item index="4-1" @click="identNavigate('AlarmSettingPage')">预警设置</el-menu-item>
                      <el-menu-item index="4-1" @click="identNavigate('AlarmListPage')">警报列表</el-menu-item>
                      <el-menu-item index="4-1" @click="identNavigate('ShowAlarmingListPage')">基坑报警</el-menu-item>
                      <el-menu-item index="4-2" @click="identNavigate('CollectType')" v-if="false">采集策略</el-menu-item>
                    </el-menu-item-group>
                  </el-submenu> -->

                  <!-- <el-submenu index="5" v-show="userInfo != null">
                    <template slot="title">
                      <i class="el-icon-set-up"></i>
                      <span slot="title">安装设置</span>
                    </template>
                    <el-menu-item-group>
                      <el-menu-item index="5-1" @click="identNavigate('SensorSetting')">初始化设置</el-menu-item>
                      <el-menu-item index="5-2" @click="identNavigate('ProjectSet')">项目设置</el-menu-item>
                    </el-menu-item-group>
                  </el-submenu> -->

                </el-menu>
              </div>
            </el-aside>
            <el-container class="mainViewShell-main">
              <el-main class="mainViewShell-elmain">
                <div class="mainView">
                  <div class="headerStyle-div">
                    <div class="headerStyle-div-flex">
                      <div class="headerStyle-div-flex-leftview">
                        <i class="el-icon-s-fold" @click="changeIsCollapse"></i>
                        <div class="leftview-cItem">
                          <!-- <span>当前项目: {{currentProject}}</span> -->
                          <span>当前读数仪: {{currentSensor}}</span>
                          <!-- <span class="leftview-cItem-text" @click="clickChangeTerminal">
                            切换设备
                          </span> -->
                        </div>
                      </div>

                      <div class="headerStyle-div-flex-rightview">
                        <!-- <p class="alarmingView" @click.stop="changeShowAlarmListView(null)">
                          <i class="el-icon-bell"></i>
                          <span class="alarmingView-icon" v-show="alarmTotal > 0">
                            {{ alarmTotal }}
                          </span>
                        </p> -->
                        <div class="leftview-cItem">
                          <div class="leftview-cItem-top">
                            <span>{{ userInfo != null?userInfo.name:'' }}</span>
                            <!-- <span>{{ userInfo }}</span> -->
                            <!-- <i class="el-icon-caret-bottom"></i> -->
                          </div>
                        </div>
                        <div class="leftview-cItem" @click="exitAdminUser">
                          <span>退出</span>
                          <img src="../assets/exit.png" alt="" style="width:30px;height:30px;vertical-align:middle">
                        </div>
                        <transition name="fadeUserSetting">
                          <div class="userSettingView" v-show="isShowUserSetting">
                            <ul class="userSettingView-ul">
                              <li class="userSettingView-li" @click="navigatorLoginPage">
                                用户登录
                              </li>
                              <li class="userSettingView-li" @click="exitAdminUser">
                                退出登录
                              </li>
                            </ul>
                          </div>
                        </transition>
                      </div>
                    </div>
                  </div>
                  <!-- 这里是上方的功能条 -->
                  <div class="mainView-middleView">
                    <div class="mainView-middleView-view">
                      <router-view/>
                    </div>
                  </div>
                </div>
              </el-main>
              <div class="allTerminal" v-if="isShowAllTerminal">
                <p class="closeAllTerminal" @click="closeShowAllterminal">
                  <i class="el-icon-circle-close"></i>  
                </p> 
                <!-- 风机展示 -->
                <div class="showtable">
                    <!-- 风车展示列表 -->
                    <ul class="carsul">
                        <li class="carsli carsli_a" @click="gotoitemindex(item)" v-for="(item,index) in olddata" :key="index" >
                            <img class="carsli_img" :src="item.pic" alt="">
                            <p class="carsli_title">
                                {{ item.label }}
                            </p>
                            <div class="carsli_div">
                                <p class="carsli_vicetitle">
                                    振动分11量: {{ item.speed }} V
                                </p>
                                <p class="carsli_vicetitle">
                                    倾斜角: {{ item.eledata }} °
                                </p>
                                <p class="carsli_vicetitle">
                                    倾斜方位: {{ item.inclinationAngle }} °
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
              </div>
            </el-container>
        </el-container>
        <!-- <el-footer class="footerStyle">Footer</el-footer> -->
    </el-container> 
    <!-- 右上方报警提示区域 -->
    <transition name="el-zoom-in-top">
        <div class="alarmView" v-show="false"> 
            <!-- 报警下方的功能列表 -->
            <div class="alarmListView">
                <ul class="alarmListView-ul">
                    <li class="alarmListView-li" v-for="(item,index) in allAlarmInfoList" :key="index" @click="identNavigate('AlarmListPage')">
                        <div class="alarmListView-li-leftview">
                            <p class="alarmListView-li-leftview-p">
                                {{ item.id }}
                            </p>
                        </div>
                        <div class="alarmListView-li-rightview">
                            <p class="alarmListView-li-rightview-p">警报项目: {{ item.typeName }}</p>
                            <p class="alarmListView-li-rightview-p">触发时间: {{ item.calTime }}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </transition>
    <!-- change backstage -->
    <!-- <div class="backstageView" 
      v-if="true"
      @mouseover="mouseOverBackstageView" @mouseout="mouseOutBackstageView">
      <div class="realBackstage "
        :class="isHidePartBackstageView?'realBackstageHide':''"
        @click="changeIsChangeFrontView">
        <p class="backstageBtn">{{isChangeFrontView?'数据模型':'测点布置'}}</p>
      </div>
    </div> -->
    <!-- backstage view front view -->
    <div :class="isChangeFrontView?'frontView':'frontView frontView_hide'">
      <div class="frontImageView">
        <img class="frontImageView_img" :src="mainBackImage" alt="">
      </div>
      <div class="frontMainView">
        <div class="frontMainView_top">
            <span v-for="(item,index) in subProjectList" :key="index" 
              v-if="item.type != '拍照巡检'"
              :class="item.actived?'frontMainView_top_p frontMainView_top_p_active':'frontMainView_top_p'"
              @click="cancelCurrentItemActived(item,index)"
              :style='(isShowTypeList)?calculTransiton(index+1):
                (isShowTypeList == null?{}:calculTransitonToShow(index+1))'>{{item.type}}</span>
            <span class="showSignView" :class="(isShowTypeList != null && isShowTypeList)?'showSignView showSignView_hide':'showSignView'" @click="changeIsShowTypeList">
              <i class="el-icon-d-arrow-left"></i>
            </span>
        </div>

        <div class="frontMainView_top">
            <span v-for="(item,index) in alarmTypeList" :key="index" 
              :class="item.actived?'frontMainView_top_p frontMainView_top_p_active'+index:'frontMainView_top_p'"
              @click="cancelCurrentAlarmItemActived(item,index)"
              :style='(isShowTypeList)?calculTransiton(index+1):
                (isShowTypeList == null?{}:calculTransitonToShow(index+1))'>{{item.name}}</span>
            <span class="showSignView showSignView_bottom" :class="(isShowTypeList != null && isShowTypeList)?'showSignView showSignView_hide':'showSignView'" @click="changeIsShowTypeList">
              <i class="el-icon-d-arrow-left"></i>
            </span>
        </div>
      </div>
      <div v-for="(groupList,groupIndex) in subProjectList" :key="groupIndex">
        <template v-show="groupList.stationList!=null && groupList.stationList.length>0"> 
          <div v-for="(stationItem,stationIndex) in groupList.stationList" :key="stationIndex">
            <div class="stationPonit"
              @click="changeStationClicked(groupIndex,stationIndex)"
              v-show="groupList.actived"
              :style="calculPointColorAndAddress(groupIndex,stationItem)">
              {{ stationItem.pointName }}
              <div class="stationPointDetailView" v-show="stationItem.isClicked">
                <!-- <p class="stationPointDetailView_close" >
                  <i class="el-icon-circle-close"></i>
                </p> -->
                <p class="el-icon-circle-close closeToast"
                   @click.stop="cancelStationClicked(groupIndex,stationIndex)"></p>
                <p class="stationPointDetailView_name">测点名称: {{stationItem.pointName}}
                  
                </p>
                <p class="stationPointDetailView_name">监测类型: {{stationItem.unitType}}</p>
                <p class="stationPointDetailView_name"
                  :style="{'color':alarmColorList[stationItem.variableAlarm]}">单次变化值: {{stationItem.variable}}</p>
                <p class="stationPointDetailView_name"
                  :style="{'color':alarmColorList[stationItem.sumVariableAlarm]}">累计变化值: {{stationItem. sumVariable}}</p>
                <p class="stationPointDetailView_name">采集时间: {{!stationItem.time? '---' : timeFormat(stationItem.time,'all')}}</p>
                <p class="stationPointDetailView_name">
                  <el-button type="primary" @click.stop="currentPointNavigator(groupList.type,groupList.id,stationItem.id)">查看详情</el-button>
                </p>
              </div>  
            </div>
          </div>
        </template>
      </div>

    </div>
  </div>
</template>

<script>
// 基准大小
const baseSize = 25
// 设置 rem 函数
function setRem() {
  // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
  // const scale = document.documentElement.clientWidth / 1920
  let diffnum = 0
  if(document.documentElement.clientWidth > 1000) {
    diffnum = 1920
  }else {
    diffnum = 750
  }
  let scale = document.documentElement.clientWidth / diffnum
  console.log(document.documentElement.clientWidth)
  // 设置页面根节点字体大小
  document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px'
}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = function() {
  setRem()
}
import { defaultProjectSet } from '../publicCollect/defaultProject.ts'
import { defaultAlarmTable } from '../publicCollect/defaultAlarmTable.ts';
import store from '../publicJs/store'
import {timeapple,Json2Params,getLocationInfo,responseBack,showmessage} from '../publicJs/utils'
import {requestBase} from '../publicJs/request'
import globalUtils from '../publicJs/globalSetting'
export default {
  name: 'AlarmSetting',
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

      ], // 暂存所有报警数据信息
      allAlarmInfoListMap: {}, // 暂存所有报警数据map
      timeOutCo: null, // 定时器
      currentProject: '基坑监测平台', // current project
      currentProjectId: '', // current project
      subProjectList: [], // sub project list
      alarmTimer: null, // timer for alarm
      alarmTotal: 0, // alarm total
      isHidePartBackstageView: true, // is hide part backstage
      isChangeFrontView: false, // is show front view
      isShowTypeList: null, // is show type list
      mainBackImage: require('@/assets/frontImage.jpg'), // get main back image
      alarmTypeList: [
        {
          name: '正常',
          actived: true,
        },
        {
          name: '预警',
          actived: true,
        },
        {
          name: '报警',
          actived: true,
        },
        {
          name: '控制',
          actived: true,
        }
      ], // alarm type list
      alarmColorList: ['#67C23A','#E6A23C','#F56C6C','#EE0000'], // alarm color list
      timeFormat: '', // time farmat
      currentSensor:'',  //当前读数仪
      defaultSensorList:[],    //传感器列表
    }
  },
  computed: {
    userInfo() {
      return store.state.info || (localStorage.getItem('logininfo') == null?null:JSON.parse(localStorage.getItem('logininfo')));
    },
  },
  mounted() {
    this.currentSensor = this.$route.query.sim
    this.timeFormat = timeapple;
    this.getLocalUser();
    this.initProject();
    // this.getMainBackImage();
    this.getCloudTeminals();
    this.getSensorList()
    this.alarmTimer = setInterval(() => {
      this.getAlarmTotal();
    },1000 * 60 * 10)
  },
  destoryed() {
    if(this.alarmTimer != null) {
      clearInterval(this.alarmTimer);
      this.alarmTimer = null;
    }
  },
  methods: {
    /**
     * 读数仪登录后获取读数仪名称及传感器列表
     */
    async getSensorList(){
      let sim = this.$route.query.sim
      let groupListResult = await requestBase.baseApi('found/factory/selectSensorBySim','GET',{
          sim: sim
      })
      console.log(996699)
      console.log(groupListResult)
      responseBack(this,groupListResult,this.setReadMeterList(groupListResult.data));
    },
    setReadMeterList(list) {
      let realTerminalList = [];
      list.forEach((item) => {
          item.name = item.sim;
          item.id = item.id;
          item.isChecked = false;
          realTerminalList.push(item);
      })
      this.defaultSensorList = realTerminalList;
      console.log(this.defaultSensorList)
      // this.illusoryDeviceList.deviceList.current = realTerminalList[0];

      // 默认进行第一个读数仪的传感器获取
      // this.listSensorsFromReadMeter(this.illusoryDeviceList.deviceList.current)
    },
    /**
     * 点击传感器跳转到绘图
     */
    toChartOnlyRead(name,sensorCode,id){
      this.$router.push({
        name:name,
        query: { 
          sensorCode: sensorCode,
          id:id
        }
      })
    },
    /**
     * 获取用户信息缓存
     */
    getLocalUser() {
      let localUser = localStorage.getItem('logininfo');
      if(localUser != null) {
        let localStrJson = JSON.parse(localUser);
        this.userInfo = localStrJson;
      }
    },
    /**
     * 选中的当前项目
     */
    initProject() {
        let getLocalProjectSet = this.getLocalHaveData();
        // console.log(getLocalProjectSet)
        if(getLocalProjectSet != null) {
            this.actionIndexList = getLocalProjectSet;
        }else {
            this.actionIndexList = defaultProjectSet;
        }
        this.actionIndexList = this.actionIndexList.filter((item) => {
            return item.isshow;
        })

        console.log('现在显示的监测类型');
        // console.log(this.actionIndexList);
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
     * 获取所有设备
     */
    async getCloudTeminals() {
      let userInfo = getLocationInfo(this,'userLoginInfo');
      // console.log('get userinfo...')
      // console.log(userInfo)
      let responseResult = await requestBase.baseApi('found/project/selectProjectByUserId','GET',{
          userId: userInfo.id
      });
      responseBack(this,responseResult,this.setProjectInfoToLocation(responseResult.data));
      // console.log('all project list...')
      // console.log(this.projecList)
      
    },
    /**
     * set currentProjectinfo
     */
    setProjectInfoToLocation(locationProjectStr) {
      let currentProjectId = -1;
      if(locationProjectStr instanceof Array) {
        console.log('is array')
        locationProjectStr.forEach((item,index) => {
          if(item.isChecked == 1) {
            localStorage.setItem('projectInfo',JSON.stringify(locationProjectStr[index]));
            this.currentProject = locationProjectStr[index].projectName;
            currentProjectId = locationProjectStr[index].projectId;
            this.currentProjectId = locationProjectStr[index].projectId;
          }
        })
      }else {
        localStorage.setItem('projectInfo',JSON.stringify(locationProjectStr));
        this.currentProject = locationProjectStr.projectName;
        currentProjectId = locationProjectStr.projectId;
        this.currentProjectId = locationProjectStr[index].projectId;
      }
      // get main image
      this.getMainBackImage();
      // get all subProjectList
      this.getSubProjectListFromCloud(currentProjectId);
    },
    /**
     * from cloud get subProject
     */
    async getSubProjectListFromCloud(currentProjectId) {
      let responseResult = await requestBase.baseApi('found/subproject/selectAllSubproject','GET',{
          projectId: currentProjectId
      });
      responseBack(this,responseResult,this.setSubProjectInfo(responseResult.data));
      // console.log('all subproject list...')
      // console.log(this.subProjectList)
      // make all subproject has isAcitive
      
      this.getAllGroupBySubProjectId();
    },
    /**
     * set subProject list
     */
    setSubProjectInfo(list) {
      let resultList = [];
      list.forEach((item) => {
        if(item.type != '拍照巡检') {
          item.actived = true;
          resultList.push(item);
        }
      })
      return () => {
        this.subProjectList = resultList;
        // this.subProjectList.sort((item1,item2) => {
        //   return item1.index - item2.index;
        // })
      }
    },
    /**
     * get all groupList by subProjectId
     */
    getAllGroupBySubProjectId() {
      // this.subProjectList.forEach((subprojectItem) => {
      //   this.$axios.get('/found/group/selectGroupBySubprojectId?subprojectId=' + subprojectItem.id).then((groupResponse) => {
      //     if(groupResponse.data.status == 2000 && groupResponse.data.body.length > 0) {
      //       subprojectItem.groupList = groupResponse.data.body;
      //       return new Promise(() => {
      //         groupResponse.data.body.forEach((groupItem) => {
      //           this.$axios.get(globalUtils.requestStationListInfo[globalUtils.chineseToEs(subprojectItem.type)] + '?groupId=' + groupItem.id).then((stationResponse) => {
      //             if(stationResponse.data.status == 2000 && stationResponse.data.body.length > 0) {
      //               let filterList = stationResponse.data.body.filter((stationItem) => {
      //                 return stationItem.status == 1;
      //               })
      //               filterList.forEach((stationItem) => {
      //                 stationItem.isClicked = false;
      //               })
      //               subprojectItem.stationList = filterList;
      //             }
      //           })
      //         })
      //       })
      //     }
      //   })
      // });
      // get all station list by subprojectid
      this.subProjectList.forEach((subprojectItem) => {
        this.$axios.get('/found/pc/map/selectChatDTO?subprojectId=' + subprojectItem.id).then((groupResponse) => {
          if(groupResponse.data.status == 2000 && groupResponse.data.body.length > 0) {
            subprojectItem.stationList = groupResponse.data.body;
            subprojectItem.originStationList = groupResponse.data.body;
          }
        })
      });

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
    },
    /**
     * get alarming total
     */
    getAlarmTotal() {
      this.$axios.get('found/alarm/selectAlarmStatus?projectId=' + this.currentProjectId).then((res) => {
        if(res.data.status == 2000) {
          this.alarmTotal = res.data.body;
        }
      })
    },
    /**
     * get main back image
     */
    async getMainBackImage() {
      let responseResult = await requestBase.baseApi('found/photo/selectMainMap','GET',{
          projectId: this.currentProjectId
      });
      responseBack(this,responseResult,this.setMainBackImage(responseResult.data));
      console.log('get main image...')
      // console.log(this.subProjectList)
      // make all subproject has isAcitive
      
      // this.getAllGroupBySubProjectId();
    },
    /**
     * set main image
     */
    setMainBackImage(image) {
      return () => {
        this.mainBackImage = image[0].url;
      }
    },
    /**
     * 点击切换设备
     */
    clickChangeTerminal() {
      this.isShowAllTerminal = true;
    },
    closeShowAllterminal() {
      console.log('关闭')
      this.isShowAllTerminal = false;
    },
    /**
     * 左侧折叠控制函数
     */
    changeIsCollapse () {
      this.isCollapse = !this.isCollapse;
    },
    /**
     * 用户信息修改功能显隐控制函数
     */
    changeIsShowUserSetting () {
      this.isShowUserSetting = !this.isShowUserSetting;
    },
    /**
     * 按照类型跳转页面
     */
    identNavigate(type,currentType,currentId,isFrontGoInclination) {

      // if is show photos
      if(currentType == '拍照巡检') {
        this.$router.push({
          name: 'ShowAllPhotoPage',
          query: { 
            index: currentId,
          }
        });
        return;
      }
      // es type 
      if(currentType != null && currentId != null) {
        let esType = globalUtils.chineseToEs(currentType);
        this.$router.push({
          name: type,
          query: { 
            currentType: esType,
            index: currentId,
            stationId: isFrontGoInclination,
          }
        })
      }else {
        this.$router.push({
          name: type,
        })
      }
    },
    /**
     * 点击切换显示警报区域
     */
    changeShowAlarmListView(isShow) {
      if(isShow != null) {
        this.isShowAlarmListView = false;
      }else {
        this.isShowAlarmListView = !this.isShowAlarmListView;
      }
    },
    /**
     * 根据所选中的监测类型 动态监测报警数据
     */
    getActiveTypeAlarmList() {
      this.actionIndexList.forEach(async(activeItem) => {
        let alarmUrl = defaultAlarmTable[activeItem.value].getWarningUrl;
        let nowDateTime = Date.now();
        let lastNowDateTime = nowDateTime - 60 * 1000 * 5; // 相差五分钟的接口时间段
        let paramsObj = {
            endTime: timeapple(nowDateTime,'all'),
            startTime: timeapple(lastNowDateTime,'all'),
            // address: null,
            // pageNum: 1,
            // pageSize: 20,
        }
        this.getWarningData(activeItem.value,alarmUrl,paramsObj);

        // this.timeOutCo = setTimeout(() => {
        //   this.getActiveTypeAlarmList();
        // },10000)
      });
    },
    // 重写获取报警数据的方法 后端不进行分页 
    async getWarningData(key,getWarningUrl,paramsObj) {
        let params = Json2Params(paramsObj)
        this.$axios.get(getWarningUrl + params).then(async (res) => {
            if(res.data.data.records) {
              let recordDataList = res.data.data.records || [];
              console.log('获取到的报警数据')
              // console.log(recordDataList)
              this.variousToMap(key,recordDataList);
            }
        },() => {
            // 失败时候取消加载中样式
        })
    },
    /**
     * 根据不同监测类型保存不同数组中
     */
    variousToMap(key,alarmList) {
      if(this.allAlarmInfoListMap[key] == null) {
        this.allAlarmInfoListMap[key] = alarmList;
      }else {
        // 之前已经有数据了 数组类型
        alarmList.forEach((item) => {
          let sign = false;
          this.allAlarmInfoListMap[key].forEach((item1) => {
            if(item1.id == item.id) {
              sign = true;
            }
          });
          if(!sign) {
            this.allAlarmInfoListMap[key].push(item);
          }
        });
      }
      console.log('报警数据数组发生变化');
      // console.log(this.allAlarmInfoListMap);
      this.alarmMapToList(this.allAlarmInfoListMap);
    },
    /**
     * 根据map中的数据报警转移至数组中 
     */
    alarmMapToList(map) {
      this.allAlarmInfoList = [];
      let typeInfo = {

      }
      this.actionIndexList.forEach((item) => {
        typeInfo[item.value] = item.name;
      });
      for(let key in map) {
        map[key].forEach((alarmItem) => {
          alarmItem.typeName = typeInfo[key];
          alarmItem.calTime = timeapple(new Date(alarmItem.createTime).getTime(),'hmin');
          this.allAlarmInfoList.push(alarmItem);
        });
      };
      // console.log(typeInfo)
      // console.log(this.allAlarmInfoList)
      this.removeNotTodayAlarm();
    },
    /**
     * 移除不是今天的报警数据
     */
    removeNotTodayAlarm() {
      this.allAlarmInfoList.forEach((item,index) => {
        let today = new Date();
        let todayTime = new Date(today.getFullYear,today.getMonth,today.getDay).getTime();
        let itemTime = new Date(item.createTime).getTime();
        if(itemTime < todayTime) {
          this.allAlarmInfoList.split(index,1);
        }
      })

      this.allAlarmInfoList.reverse();
    },
    /**
     * 切换至登陆接口
     */
    navigatorLoginPage() {
      this.isShowUserSetting = false;
      this.$router.push({
        name: 'LoginPage'
      })
    },
     /**
     * 退出登录
     */
    exitAdminUser() {
      // console.log(this.userInfo)
      store.commit('logininforemove');
      this.userInfo = null;
      if(localStorage.getItem('userLoginInfo') != null || localStorage.getItem('logininfo') != null) {
        localStorage.removeItem('userLoginInfo');
			  localStorage.removeItem('logininfo');
      }
      this.isShowUserSetting = false;
      setTimeout(() => {
				this.$router.push({
          name: 'LoginPage',
          query:{
            loginWay:'sensor'
          }
				})
			},1500)
    },
    /**
     * change isHidePartBackstageView is false
     */
    mouseOverBackstageView() {
      this.isHidePartBackstageView = false;
    },
    /**
     * change isHidePartBackstageView is false
     */
    mouseOutBackstageView() {
      this.isHidePartBackstageView = true;
    },
    /**
     * changeIsChangeFrontView
     */
    changeIsChangeFrontView() {
      this.isChangeFrontView = !this.isChangeFrontView;
    },
    /**
     * calcul transtion
     */
    calculTransiton(index) {
      // {'transform': 'translateX(100%)','width':'10px'}
      let trantionInfo = {
        'transform': 'translateX(' + (index) * 100 + '%)',
        'transition': 'all' + ' '  + (index) + 's',
        'opacity': '0',
        'z-index': '-1',
      }
      // console.log(JSON.stringify(trantionInfo))
      return trantionInfo;
    },
    /**
     * calcul transtion
     */
    calculTransitonToShow(index) {
      // {'transform': 'translateX(100%)','width':'10px'}
      let trantionInfo = {
        'transform': 'translateX(-' + 0 * 100 + '%)',
        'transition': 'all' + ' '  + (index) + 's',
        'opacity': '1',
      }
      // console.log(JSON.stringify(trantionInfo))
      return trantionInfo;
    },
    calculPointColorAndAddress(index,stationItem) {
      let colorList = ['#FDB8A2','#0023B4','#44CEF6','#F45FAB','#3B8E71','#3cb371','#9932cc'
      ,'#483d8b','#ff00ff','#40e0d0','#2f4f4f','#000'];
      let top = stationItem.vertical;
      let left = stationItem.horizontal;
      // let top = Math.random() * 100;
      // let left = Math.random() * 100;
      // let top = Math.ceil(Math.random() * 100);
      // let left = Math.ceil(Math.random() * 100);
      let styleInfo = {
        'top': top + '%',
        'left': left  + '%',
        'background-color': colorList[index],
      }
      return styleInfo;
    },
    /**
     * change is show type lisy
     */
    changeIsShowTypeList() {
      console.log('click chnage is shwo list...')
      if(this.isShowTypeList == null) {
        this.isShowTypeList = true;
      }else {
        this.isShowTypeList = !this.isShowTypeList;
      }
    },
    /**
     * cancel actived
     */
    cancelCurrentItemActived(item,index) {
      console.log('change item actived')
      // item.actived = !item.actived;
      this.subProjectList[index].actived = !this.subProjectList[index].actived;
    },
    /**
     * cancel alarm actived
     */
    cancelCurrentAlarmItemActived(item,index) {
      console.log('change item actived')
      // item.actived = !item.actived;
      this.alarmTypeList[index].actived = !this.alarmTypeList[index].actived;
      this.filterAlarmTypeToStation();
      // change subproject current stationlist

    },
    /**
     * filter originStationList to stationList by alarmTypeList active
     */
    filterAlarmTypeToStation() {
      let alarmTypeList = [];
      this.alarmTypeList.forEach((item,index) => {
        if(item.actived) {
          alarmTypeList.push(index);
        }
      })
      this.subProjectList.forEach((subProjectItem,subPorjectIndex) => {
        if(subProjectItem.originStationList != null && subProjectItem.originStationList.length > 0) {
          let filterStationList = subProjectItem.originStationList.filter((item) => {
            return alarmTypeList.indexOf(item.sumVariableAlarm) > -1 || alarmTypeList.indexOf(item.variableAlarm) > -1;
          })
          console.log('filter station list...')
          console.log(filterStationList)
          subProjectItem.stationList = filterStationList;
        }
      })
    },
    /**
     * change clicked for station
     */
    changeStationClicked(subIndex,stationIndex) {
      // recover all subproject stationlist
      this.recoverAllStation();
      let currentSubprojectList = this.subProjectList[subIndex];
      currentSubprojectList.stationList.forEach((item,index) => {
        if(index == stationIndex) {
          item.isClicked = true;
        }else {
          item.isClicked = false;
        }
      })
      console.log('changed subproject stationlist...')
      // console.log(currentSubprojectList)
      this.subProjectList.splice(subIndex,1,currentSubprojectList);
      // console.log(this.subProjectList)
    },
    /**
     * recover all station default
     */
    recoverAllStation() {
      this.subProjectList.forEach((subProjectItem,subIndex) => {
        let sss = subProjectItem;
        if(sss.stationList != null) {
          sss.stationList.forEach((stationItem,stationIndex) => {
            stationItem.isClicked = false;
          })
          this.subProjectList.splice(subIndex,1,sss);
        }
      })
    },
    /**
     * cancel clicked for station
     */
    cancelStationClicked(subIndex,stationIndex) {
      let ss = this.subProjectList[subIndex];
      ss.stationList[stationIndex].isClicked = false;
      this.subProjectList.splice(subIndex,1,ss)
    },
    /**
     * click current point to navigator
     */
    currentPointNavigator(subProjectType,subProjectId,stationId) {
      console.log('get current route name')
      // console.log(this.$route.name)
      // hide front 
      this.isChangeFrontView = false;
      // console.log('navigator ' + subProjectType)
      // let calculIndexType = globalUtils.chineseToEs(subProjectType);
      // console.log(calculIndexType)
      if(this.$route.name == 'ChartsDetailPage') {
         let esType = globalUtils.chineseToEs(subProjectType);
          this.$router.push({
            query: { 
              currentType: esType,
              index: subProjectId,
              stationId: stationId,
            }
          })
        return;
      }
      this.identNavigate('ChartsDetailPage',subProjectType,subProjectId,stationId)
    },
  },
  watch: {
    'store.state.info': () => {
      console.log('变化')
      this.userInfo = store.state.info;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  margin: 0;
  padding: 0;
}
.headerStyle {
  padding: 0;
  margin: 0;
  position: fixed;
  top: 0;
  left: 15%;
  right: 0;
  z-index: 2010;
}
.mainViewShell {
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  overflow-y: scroll;
}
.mainViewShell-aside {
  flex: 0 0 15%;
  width: 15%;
  height: 100%;
  background-color: #5CACEE;
  transition: all 1.5s;
}
.mainViewShell-aside-close {
  flex: 0 0 4% !important;
  width: 4% !important;
}

.mainViewShell-main {
  flex: 1;
  height: 100%;
  background-color: aqua;
  position: relative;
}

.allTerminal {
  position: absolute;
  top: 80px;
  left: 30px;
  right: 30px;
  bottom: 100px;
  z-index: 2020;
  border-radius: 8px;
  background-color: #fff;
  border: 1px solid #999;
}


.footerStyle {
  width: 100%;
  height: 60px;
  background-color: blue;
  z-index: 2010;
  position: absolute;
  left: 0;
  right: 0;
  bottom: -60px;
}

.el-menu {
    border: none;
    background-color: #fff;
}
.asideNavMenuView >>> .el-menu--inline {
  /* background-color: red !important; */
}
.asideNavMenuView >>> .el-menu-item-group .el-menu-item {
  font-size: 16px;
  color: #fff;
  padding-left: 55px !important;
}
.asideNavMenuView >>> .el-submenu__title {
  height: 70px;
  line-height: 70px;
}
.asideNavMenuView >>> .el-submenu__icon-arrow {
  font-size: 26px;
  margin-top: -13px;
}
/* 动画控制 显示隐藏用户修改 */
.fadeUserSetting-enter-active, .fadeUserSetting-leave-active {
  
}
.fadeUserSetting-enter, .fadeUserSetting-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.mainViewShell >>> .el-submenu__title i {
  color: #fff !important;
}
body >>> .el-picker-panel {
  z-index: 9999 !important;
}
</style>
<style lang="less" scoped>
@headerBgColor: #0066B3;
// @headerBgColor: #2f323e;
@headerHeight: 70px;
// @mainAsideBgColor: #5CACEE;
@mainAsideBgColor: #edf1f5;
@footerBgColor: #fff;
@asideBackGroud: #004E9B;

@middleViewTop: 60px;

@asideFontColor: #fff;
@middleFontSize: 22px;

@iconFontSize: 28px;

.pointer {
  cursor: pointer;
}

.flex2Center {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.headerHeightFullACenter {
  height: 100%;
  line-height: @headerHeight;
}

.headerHeightACenter {
  height: @headerHeight;
  line-height: @headerHeight;
}


.headerStyle {
  background-color: @headerBgColor;
  height: @headerHeight !important;
  
}


.mainViewShell {
  .mainViewShell-aside {
    background-color: @asideBackGroud;
    box-shadow: 1px 0px 20px rgba(255, 255, 255, 0.28);
    // box-shadow: 1px 0px 20px rgba(0, 0, 0, 0.8);
    z-index: 2030;
    .mainViewShell-aside-topview {
      width: 100%;
      .headerHeightACenter;
      font-size: @middleFontSize;
      color: @asideFontColor;
      text-align: center;
    }
    .asideNavMenuView {
      width: 100%;
      .el-menu {
        background-color: @asideBackGroud;
        color: @asideFontColor;
        .el-submenu {
          text-align: left;
          .el-submenu__title {
            .headerHeightACenter;
            font-size: 20px !important;
            span {
              color: @asideFontColor !important;
              font-size: 20px;
              margin-left: 15px;
            }
            i, .el-submenu__icon-arrow {
              font-size: 26px;
              color: @asideFontColor;
            }
          }
        }
        .el-menu-item {
          text-align: left;
          .headerHeightACenter;
          i {
            font-size: 26px;
            color: @asideFontColor;
          }
          span {
            color: #fff !important;
              font-size: 20px;
              margin-left: 15px;
          }
        }
        .el-menu {
          background-color: #6495ED !important;
        }
      }

    }
  }
  .mainViewShell-main {
    background-color: @mainAsideBgColor;
    height: 100%;
    // overflow-y: scroll;
    .mainViewShell-elmain {
      padding: 0;
      .mainView {
        width: 100%;
        height: 100%;
        .headerStyle-div {
          width: 100%;
          background-color: @headerBgColor;
          height: @headerHeight !important;
          .headerStyle-div-flex {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            padding: 0 30px;
            .flex2Center;
            justify-content: space-between;
            .headerStyle-div-flex-leftview {
              .flex2Center;
              i {
                font-size: @iconFontSize;
                color: #fff;
                .pointer;
              }
              .leftview-cItem {
                .headerHeightFullACenter;
                font-size: 20px;
                color: @asideFontColor;
                margin-left: 30px;
                .leftview-cItem-text {
                  padding: 3px 5px;
                  border: 1px solid #32CD32;
                  border-radius: 6px;
                  margin-left: 15px;
                  font-size: 16px;
                  color: #32CD32;
                  opacity: 0.7;
                  .pointer;
                }
              }
            }
            .headerStyle-div-flex-rightview {
              .flex2Center;
              position: relative;
              .alarmingView {
                width: 40px;
                height: 40px;
                line-height: 40px;
                // background-color: blue;
                position: relative;
                i {
                  font-size: @iconFontSize;
                  color: #fff;
                  .pointer;
                  position: absolute;
                  top: 50%;
                  right: 0;
                  transform: translateY(-50%);
                }
                .alarmingView-icon {
                  position: absolute;
                  top: -5px;
                  right: -5px;
                  width: 20px;
                  height: 20px;
                  border-radius: 50%;
                  display: inline-block;
                  line-height: 20px;
                  background-color: red;
                  color: #fff;
                  font-size: 14px;
                  text-align: center;
                }
              }
              .leftview-cItem {
                .headerHeightFullACenter;
                font-size: 20px;
                color: @asideFontColor;
                margin-left: 30px;
                position: relative;
                .pointer;
                i {
                  margin-left: 20px;
                  font-size: @iconFontSize;
                  color: #fff;
                  .pointer;
                }
              }
              .userSettingView {
                position: absolute;
                background-color: @mainAsideBgColor;
                top: 80px;
                right: 0;
                width: 200px;
                padding-bottom: 30px;
                z-index: 2030;
                // height: 200px;
                transition: all 1.5s;
                .userSettingView-ul {
                  width: 100%;
                  height: 100%;
                  margin: 0;
                  padding: 0;
                  list-style-type: none;
                  .userSettingView-li {
                    width: 100%;
                    height: 60px;
                    line-height: 60px;
                    font-size: 20px;
                    color: #333;
                    border-bottom: 1px solid #999;
                  }
                }
              }
            }
          }
        }
        .mainView-topView {
          width: 100%;
          height: @headerHeight;
          background-color: #fff;
          box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.08);
          .mainView-topView-flex {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            padding: 0 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            i {
              font-size: @iconFontSize;
              cursor: pointer;
            }
          }
        }
        // 中间下侧主要区域
        .mainView-middleView {
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          padding: 20px;
          .mainView-middleView-view {
            width: 100%;
            height: 100%;
            // background-color: @footerBgColor;
            border-radius: 5px;
          }
        }
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
            // display: inline-block;
            width: 230px;
            float: left;
            // margin-bottom: 19px;
            cursor: pointer;
            padding: 10px;
            margin-right: -1px;
            margin-bottom: -1px;
            // text-align: center;
            border: 1px solid #fff;
            position: relative;
            // border: 1px dashed #333;
            // &:hover {
            //     border: 1px solid #4043FF;
            //     border-radius: 12px;
            // }
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
}
.footerStyle {
  background-color: #fff;
}
// 报警区域
.alarmView {
    position: fixed;
    top: 70px;
    right: 20px;
    width: 120px;
    height: 120px;
    // background-color: #444;
    z-index: 9999;
    .alarmImgView {
        position: absolute;
        top: 0;
        left: 0;
        width: 64px;
        height: 64px;
        padding: 10px;
        display: flex;
        align-items: center;
        background-color: #666;
        border-radius: 8px;
        cursor: pointer;
        transition: all 2s;
        img {
            width: 64px;
            height: 64px;
        }
        .alarmImgViewSpan {
            position: absolute;
            font-size: 16px;
            padding: 3px;
            color: #fff;
            background-color: #DC143C;
            border-radius: 50%;
            top: 3px;
            right: 3px;
        }
    }
    .alarmImgViewMiddle {
        top: 0;
        left: -104px;
    }
    .alarmImgViewLeft {
        top: 0;
        left: -208px;
    }
    .zIndexRight {
        z-index: 9999;
    }
    .zIndexMiddle {
        z-index: 8888;
    }
    .zIndexLeft {
        z-index: 7777;
    }
    // 警报列表显示区域
    .alarmListView {
        width: 310px;
        // height: 500px;
        background-color: #fff;
        z-index: 9999;
        position: fixed;
        top: 70px;
        bottom: 50px;
        right: 0;
        border-radius: 6px;
        transition: all 1.5s;
        overflow-y: scroll;
        .alarmListView-ul {
            width: 100%;
            height: 100%;
            list-style-type: none;
            margin: 0;
            padding: 0;
            .alarmListView-li {
                width: 100%;
                box-sizing: border-box;
                padding: 30px;
                padding-right: 0;
                display: flex;
                border-bottom: 1px solid #007bff;
                .alarmListView-li-leftview {
                    flex: 0 0 48px;
                    width: 48px;
                    // height: 48px;
                    // line-height: 1em;
                    background-color: #409eff;
                    position: relative;
                    .alarmListView-li-leftview-p {
                        position: absolute;
                        top: 50%;
                        width: 100%;
                        text-align: center;
                        transform: translateY(-50%);
                        color: #fff;
                        font-size: 20px;
                    }
                }
                .alarmListView-li-rightview {
                    flex: 1;
                    margin-left: 15px;
                    .alarmListView-li-rightview-p {
                        width: 100%;
                        font-size: 18px;
                        text-align: left;
                    }
                }
            }
        }
    }
}
// change backstage
.backstageView {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 80px;
  height: 200px;
  // transform: translateY(-50%);
  z-index: 2050;
  .realBackstage {
    position: absolute;
    top: 0%;
    right: 0;
    // transform: translateY(-50%);
    transition: all 1s;
    width: 60px;
    height: 150px;
    background-color: #004E9B;
    opacity: 0.8;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    .backstageBtn {
      width: 1em;
      font-size: 22px;
      color: #fff;
      height: 150px;
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }
  .realBackstageHide {
    right: -25%;
  }
}
// front view
.frontView {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2030;
  background-color: burlywood;
  transition: all 1.5s;
  .frontImageView {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2031;
    .frontImageView_img {
      width: 100%;
      height: 100%;
    }
  }
  .frontMainView {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2040;
    .frontMainView_top {
      margin-top: 20px;
      margin-right: 60px;
      text-align: right;
      border-radius: 3px;
      // width: 100%;
      .frontMainView_top_p {
        display: inline-block;
        font-size: 18px;
        color: #5f6477;
        padding: 10px 15px;
        background-color: #fff;
        border-right: 1px dashed #999;
        cursor: pointer;
        &:first-child {
          border-top-left-radius: 3px;
          border-bottom-left-radius: 3px;
        }
        &:last-child {
          border-top-right-radius: 3px;
          border-bottom-right-radius: 3px;
          border-right: none;
        }
      }
      .frontMainView_top_p_active {
        color: cornflowerblue;
      }
      .frontMainView_top_p_active0 {
        color: #67C23A;
      }
      .frontMainView_top_p_active1 {
        color: #E6A23C;
      }
      .frontMainView_top_p_active2 {
        color: #F56C6C;
      }
      .frontMainView_top_p_active3 {
        color: #EE0000;
      }
      .frontMainView_top_p_hide {
        transform: translateX(100%);
      }
      .showSignView {
        display: block;
        position: absolute;
        right: 10px;
        top: 15px;
        width: 50px;
        height: 50px;
        border-top-right-radius: 50%;
        border-bottom-right-radius: 50%;
        background-color: #fff;
        line-height: 50px;
        color: #5f6477;
        text-align: center;
        cursor: pointer;
        z-index: 2060;
        // margin-left: 30px;
      }
      .showSignView_bottom {
        top: 80px;
      }
      .showSignView_hide {
        border-top-left-radius: 50%;
        border-bottom-left-radius: 50%;
      }
    }
  }
  // point style
  .stationPonit {
    position: fixed;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    z-index: 2040;
    cursor: pointer;
    color: #fff;
    font-size: 12px;
    line-height: 30px;
    text-align: center;
    .stationPointDetailView {
      position: absolute;
      top: 15px;
      left: 15px;
      width: 300px;
      box-sizing: border-box;
      padding: 10px 20px;
      // height: 120px;
      padding-bottom: 8px;
      background-color: #000;
      border-radius: 6px;
      opacity: 0.7;
      color: #fff;
      text-align: left;
      font-size: 16px;
      z-index: 2050;
      .stationPointDetailView_close {
        text-align: right;
        font-size: 20px;
        box-sizing: border-box;
        padding-right: 5px;
      }
      .closeToast {
        position: absolute;
        right: 10px;
        font-size: 24px;
      }
      .stationPointDetailView_name {
        height: 30px;
        line-height: 30px;
        &:last-child {
          text-align: center
        }
      }
    }
  }
}
.frontView_hide {
  top: -100%;
  z-index: -1;
  opacity: 0;
}
</style>
<style>
.alarmBtnView {
    width: 100%;
    height: 50px;
    margin-top: 40px;
}
.alarmBtn {
    width: 65%;
    height: 100%;
}
</style>