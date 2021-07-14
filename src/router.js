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
      path: '/index',
      name: 'Exothecium',
      component: () => import('./views/exothecium.vue'),
      children: [
        {
          path: '/',
          name: 'CollectionIndex',
          component: () => import('./views/collectionIndex/collectionIndex.vue'),
        },
        {
          path: 'chartsDetail',
          name: 'ChartsDetailPage',
          component: () => import('./views/chartsDetailPage/chartsDetailPage.vue'),
        },
        {
          path: 'alarm',
          name: 'AlarmSetting',
          component: () => import('./views/alarmSetting/alarmSetting.vue'),
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
        }
      ]
    },
  ]
});