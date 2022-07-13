import { RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import { DriverDirection } from '@/types/enums'
import { useI18n } from 'vue-i18n'
import { propsToAttrMap } from '@vue/shared'

export const LOGIN_ROUTE_NAME = 'Login'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    redirect: '/configuration/north-driver',
  },
  /* MONITORING */
  {
    path: '/monitoring',
    name: 'Monitoring',
    meta: { title: 'data.monitoring' },
    component: Home,
    children: [
      {
        path: 'data',
        name: 'DataMonitoring',
        component: () => import('@/views/monitoring/DataMonitoring.vue'),
      },
      {
        path: 'log',
        name: 'MonitoringLog',
        component: () => import('@/views/monitoring/Log.vue'),
        meta: { title: 'admin.log' },
      },
    ],
  },
  /* CONFIG */
  // CONFIG-NorthAPP
  {
    path: '/configuration/north-driver',
    name: 'NorthAPP',
    meta: { title: 'config.northAppSetup' },
    component: Home,
    children: [
      {
        path: '',
        name: 'NorthDriver',
        component: () => import('@/views/config/northDriver/Index.vue'),
      },
      {
        path: ':node',
        name: 'NorthDriverGroup',
        component: () => import('@/views/config/northDriver/Group.vue'),
        meta: { title: 'config.groupList' },
      },
      {
        path: 'config/:node',
        name: 'NorthDriverConfig',
        component: () => import('@/views/config/NodeConfig.vue'),
        props: {
          direction: DriverDirection.North,
        },
        meta: { title: 'config.appConfig' },
      },
    ],
  },
  // CONFIG-SouthDevice
  {
    path: '/configuration/south-driver',
    name: 'SouthDevice',
    meta: { title: 'config.southDeviceManagement' },
    component: Home,
    children: [
      {
        path: '',
        name: 'SouthDriver',
        component: () => import('@/views/config/southDriver/Index.vue'),
      },
      {
        path: 'config/:node',
        name: 'SouthDriverConfig',
        component: () => import('@/views/config/NodeConfig.vue'),
        props: {
          direction: DriverDirection.South,
        },
        meta: { title: 'config.deviceConfig' },
      },
      {
        path: ':node',
        name: 'SouthDriverGroupG',
        component: () => import('@/components/LayoutContent.vue'),
        meta: { title: 'config.groupList' },
        props: (route) => ({ node: route.params.node }),

        children: [
          {
            path: '',
            name: 'SouthDriverGroup',
            component: () => import('@/views/config/southDriver/Group.vue'),
          },
          {
            path: ':group',
            name: 'SouthDriverGroupTag',
            component: () => import('@/views/config/southDriver/Tag.vue'),
            meta: { title: 'config.tagList' },
          },
          {
            path: ':group/add',
            name: 'SouthDriverGroupAddTag',
            component: () => import('@/views/config/southDriver/AddTag.vue'),
            meta: { title: 'config.addTags' },
          },
        ],
      },
    ],
  },
  /* About */
  {
    path: '/about',
    name: 'About',
    meta: { title: 'common.about' },
    component: Home,
    children: [
      {
        path: '',
        name: 'About',
        meta: { requireAuth: true },
        component: () => import('@/views/about/About.vue'),
      },
    ],
  },
  /* License */
  {
    path: '/license',
    name: 'License',
    meta: { title: 'License' },
    component: Home,
    children: [
      {
        path: '/license',
        name: 'License',
        meta: { requireAuth: true },
        component: () => import('@/views/about/License.vue'),
      },
    ],
  },
  /** Overview */
  {
    path: '/overview',
    name: 'Overview',
    meta: { title: 'common.overview' },
    component: Home,
    children: [
      {
        path: '/overview',
        name: 'Overview',
        meta: { requireAuth: true },
        component: () => import('@/views/overview/Index.vue'),
      },
    ],
  },
  /** Plugin */
  {
    path: '/configuration/plugin',
    name: 'Plugin',
    meta: { title: 'config.pluginManagement' },
    component: Home,
    children: [
      {
        path: '',
        name: 'PluginManagement',
        component: () => import('@/views/config/plugin/Index.vue'),
      },
    ],
  },
  /** ADMIN */
  {
    path: '/admin',
    name: 'Admin',
    component: Home,
    children: [
      {
        path: 'account-settings',
        name: 'AccountSettings',
        meta: { title: 'common.accountSettings', requireAuth: true },
        component: () => import('@/views/admin/AccountSetting.vue'),
      },
      {
        path: 'log',
        name: 'AdminLog',
        meta: { title: 'admin.log', requireAuth: true },
        component: () => import('@/views/admin/Log.vue'),
      },
    ],
  },

  {
    path: '/:ekuiper(.*)*',
    component: Home,
  },
  {
    path: '/login',
    name: LOGIN_ROUTE_NAME,
    component: Login,
  },
]

export default routes
