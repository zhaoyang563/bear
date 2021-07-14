import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

// import Exothecium from './views/exothecium.vue'

// const Exothecium = () => import('./components/exothecium.vue');


export default new Router({
  // base: '/weima/',
  mode: 'hash',
  routes: [
    {
      path:'/wait',
      name:'Wait',
      component: () => import('./views/wait.vue'),
    },
    {
      // path: '/index',
      path: '/',
      name: 'Exothecium',
      component: () => import('./views/exothecium.vue'),
      children: [
        {
          path: '/',
          name: 'Home',
          component: () => import('./views/home/home.vue'),
        },
        {
          path: 'collectionIndex',
          name: 'CollectionIndex',
          component: () => import('./views/collectionIndex/collectionIndex.vue'),
        },
        {
          path: 'chartsDetail',
          name: 'ChartsDetailPage',
          component: () => import('./views/chartsDetailPage/chartsDetailPage.vue'),
        },
        {
          path: 'chartsDetailForSensor',
          name: 'ChartsDetailPageForSensor',
          component: () => import('./views/chartsDetailPageForSensor/chartsDetailPageForSensor.vue'),
        },
        {
          path: 'alarm',
          name: 'AlarmSettingPage',
          component: () => import('./views/alarmSetting/alarmSetting.vue'),
        },
        {
          path: 'showAlarm',
          name: 'ShowAlarmingListPage',
          component: () => import('./views/showAlarmingList/showAlarmingList.vue'),
        },
        {
          path: 'alarmlist',
          name: 'AlarmListPage',
          component: () => import('./views/alarmList/alarmList.vue'),
        },
        {
          path: 'reportList',
          name: 'ReportListPage',
          component: () => import('./views/reportList/reportList.vue'),
        },
        {
          path: 'reportDetail',
          name: 'ReportDetail',
          component: () => import('./views/reportDetail/reportDetail.vue'),
        },
        {
          path: 'setting',
          name: 'SensorSetting',
          component: () => import('./views/sensorSetting/sensorSetting.vue'),
        },
        {
          path: 'collecttype',
          name: 'CollectType',
          component: () => import('./views/collectTypeChange/collectTypeChange.vue'),
        },
        {
          path: 'project',
          name: 'ProjectSet',
          component: () => import('./views/projectSet/projectSet.vue'),
        },
        // show photo
        {
          path: 'showing',
          name: 'ShowAllPhotoPage',
          component: () => import('./views/showAllPhoto/showAllPhoto.vue'),
        },
        {
          path: 'upLoad',
          name: 'UpLoad',
          component: () => import('./views/upLoad/upLoad.vue'),
        },
        {
          path: 'factoryList',
          name: 'FactoryList',
          component: () => import('./views/factoryList/factoryList.vue'),
        },
        {
          path: 'projectImg',
          name: 'ProjectImg',
          component: () => import('./views/projectImg/projectImg.vue'),
        },
        {
          path: 'threeImg',
          name: 'ThreeImg',
          // component: () => import('./views/projectImg/threeImg.vue'),
          component: () => import('./views/projectImg/bim.vue'),
        },
        {
          path: 'stationFrequency',
          name: 'StationFrequency',
          component: () => import('./views/stationFrequency/stationFrequency.vue'),
        }
      ]
    },
    {
      path: '/login',
      name: 'LoginPage',
      // component: () => import('./views/loginPage/loginPage.vue'),
      component: () => import('./views/loginPage/login.vue'),
    },
    {
      path: '/login1',
      name: 'LoginPage1',
      component: () => import('./views/loginPage/loginPage.vue'),
      // component: () => import('./views/loginPage/login.vue'),
    },
    {
      path: '/read',
      name: 'ExotheciumOnlyRead',
      component: () => import('./views/exotheciumOnlyRead.vue'),
      children: [
        {
          path: '/',
          name: 'ChartsDetailPageForSensorOnlyRead',
          component: () => import('./views/chartsDetailPageForSensorOnlyRead/chartsDetailPageForSensor.vue'),
        },
        
      ]
    },
  ]
});