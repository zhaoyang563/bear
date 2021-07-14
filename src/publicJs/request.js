import Vue from 'vue';
import store from './store';

const requestAxios = Vue.prototype.$axios;

console.log("外置js是否有axios")
console.log(requestAxios);

const xxx= "111"

// 请求地址前缀对应表
const REQUESTPREP = {
    voice: '',
    video: '',
    upvibration: '/cloud-vibration/station-config/list.do',
    bottompolarization: '/opticalfiber/station_config/',
    deformation: '/inclinationzk/inclination_config/list_with_terminal_id.do',
    environmental: ''
}

const REQUESTPREPSENSOR = {
    voice: '',
    video: '',
    upvibration: '/cloud-vibration/vibration-sensor-config/list.do',
    bottompolarization: '/opticalfiber/sensor_config/',
    deformation: '/inclinationzk/inclination_config/list_with_terminal_id.do',
    environmental: ''
}

const REQUESTPREPCOLLECT = {
    voice: '',
    video: '',
    upvibration: '/cloud-vibration/collect-config/list.do',
    bottompolarization: '/opticalfiber/collect_config/',
    deformation: '/inclinationzk/inclination_config/list_with_terminal_id.do',
    environmental: ''
}

const allSettingUrl = {
    voice: '',
    video: '',
    upvibration: {
        'collect': {
            'list': '/cloud-vibration/collect-config/list.do',
            'getone': '',
            'update': '/cloud-vibration/collect-config/update.do',
            'delete': '/cloud-vibration/collect-config/delete.do',
            'add': '/cloud-vibration/collect-config/save.do',
        },
        'station': {
            'list': '/cloud-vibration/station-config/list.do',
            'getone': '',
            'update': '/cloud-vibration/station-config/update_by_id.do',
            'delete': '/cloud-vibration/station-config/delete_by_id.do',
            'add': '/cloud-vibration/station-config/save.do',
        },
        'sensor': {
            'list': '/cloud-vibration/vibration-sensor-config/list.do',
            'getone': '/cloud-vibration/vibration-sensor-config/get_by_id.do',
            'update': '/cloud-vibration/vibration-sensor-config/update_by_id.do',
            'delete': '/cloud-vibration/vibration-sensor-config/delete_by_id.do',
            'add': '/cloud-vibration/vibration-sensor-config/save.do',
        },
    },
    bottompolarization: '/opticalfiber/collect_config/',
    deformation: {
        'collect': {
            'list': '/inclinationzk/inclination_config/list.do',
            'getone': '/inclinationzk/inclination_config/get_by_id.do',
            'update': '/inclinationzk/inclination_config/update.do',
            'delete': '',
            'add': '/inclinationzk/inclination_config/save.do',
        },
        'station': {
            'list': '/inclinationzk/inclination_config/list.do',
            'getone': '/inclinationzk/inclination_config/get_by_id.do',
            'update': '/inclinationzk/inclination_config/update.do',
            'delete': '',
            'add': '/inclinationzk/inclination_config/save.do',
        },
        'sensor': {
            'list': '/inclinationzk/inclination_config/list.do',
            'getone': '/inclinationzk/inclination_config/get_by_id.do',
            'update': '/inclinationzk/inclination_config/update.do',
            'delete': '',
            'add': '/inclinationzk/inclination_config/save.do',
        },
    },
    environmental: ''
}

// requestAxios.post("/xxx/xxx").then((res) => {
//     console.log(res)
// })
const errorInfoList = {
    '404': '请求错误接口',
    '500': '请稍后再试',
}
const requestBase = {
    baseApi: (ajaxUrl, method, data) => {
        let realData = data;
        if (method == 'GET') {
            ajaxUrl = ajaxUrl + jsonToParams(data);
            realData = {};
        }
        return new Promise((resolve,reject) => {
            requestAxios({
                method: method,
                url: ajaxUrl,
                data: realData
            }).then((res) => {
                let responseClass = null;
                console.log(res)
                if (res.data.status == '0' || res.data.status == 2000) {
                    responseClass = new responseJson('success', res.data.body, res.data.msg);
                }else {
                    responseClass = new responseJson('fail', null, res.data.msg);
                }
                resolve(responseClass);
            }).catch((err) => {
                console.log(err.message)
                let responseClass = new responseJson('outLine', null, errorInfoList[''+err.response]);
                resolve(responseClass);
            });
        })
    }
}

// 光纤对应接口
const opticalfiberRequest = {
    sensorConfig: {
        /**
         * 获取所有光纤传感器
         */
        list: async () => {
            let result = await requestBase.baseApi('/opticalfiber/sensor_config/list.do','GET');
            return result;
        },
        /**
         * 根据id获取某个传感器
         */
        getById: async (data) => {
            let result = await requestBase.baseApi('/opticalfiber/sensor_config/get_by_id.do','GET',data);
            return result;
        },
        /**
         * 根据采集卡id获取对应的传感器
         */
        getByCollectId: async (data) => {
            let result = await requestBase.baseApi('/opticalfiber/sensor_config/get_by_collectid.do','GET',data);
            return result;
        },
        /**
         * 新建传感器
         */
        save: async (data) => {
            let result = await requestBase.baseApi('/opticalfiber/sensor_config/save.do','POST',data);
            return result;
        },
        /**
         * 更新传感器
         */
        updateById: async (data) => {
            let result = await requestBase.baseApi('/opticalfiber/sensor_config/update_by_id.do','POST',data);
            return result;
        },
        /**
         * 更新传感器上的测点id
         */
        updateByStationId: async (data) => {
            let result = await requestBase.baseApi('/opticalfiber/sensor_config/update_station_id.do','POST',data);
            return result;
        },
        /**
         * 移除传感器上的测点id
         */
        removeStationId: async (data) => {
            let result = await requestBase.baseApi('/opticalfiber/sensor_config/update_station_id.do','GET',data);
            return result;
        }
    },
    collectConfig: {
        /**
         * 获取所有光纤采集卡
         */
        list: async () => {
            let result = await requestBase.baseApi('/opticalfiber/collect_config/list.do','GET');
            return result;
        },
        /**
         * 根据id获取某个采集卡
         */
        getById: async (data) => {
            let result = await requestBase.baseApi('/opticalfiber/collect_config/get_by_id.do','GET',data);
            return result;
        },
        /**
         * 新建采集卡
         */
        save: async (data) => {
            let result = await requestBase.baseApi('/opticalfiber/collect_config/save.do','POST',data);
            return result;
        },
        /**
         * 更新采集卡
         */
        updateById: async (data) => {
            let result = await requestBase.baseApi('/opticalfiber/collect_config/update_by_id.do','POST',data);
            return result;
        },
        /**
         * 删除采集卡
         */
        deleteById: async (data) => {
            let result = await requestBase.baseApi('/opticalfiber/collect_config/delete_by_id.do','GET',data);
            return result;
        },
    },
    stationConfig: {
        /**
         * 获取所有测点
         */
        list: async () => {
            let result = await requestBase.baseApi('/opticalfiber/station_config/list.do','GET');
            return result;
        },
        /**
         * 根据类型获取测点列表
         */
        listByType: async (data) => {
            let result = await requestBase.baseApi('/opticalfiber/station_config/list_by_type.do','GET',data);
            return result;
        },
        /**
         * 根据id获取测点
         */
        getById: async (data) => {
            let result = await requestBase.baseApi('/opticalfiber/station_config/get_by_id.do','GET',data);
            return result;
        },
        /**
         * 根据采集卡获取测点
         */
        getByCollectId: async (data) => {
            let result = await requestBase.baseApi('/opticalfiber/station_config/get_by_collect_id.do','GET',data);
            return result;
        },
        /**
         * 新建测点
         */
        save: async (data) => {
            let result = await requestBase.baseApi('/opticalfiber/station_config/save.do','POST',data);
            return result;
        },
        /**
         * 更新测点
         */
        updateById: async (data) => {
            let result = await requestBase.baseApi('/opticalfiber/station_config/update_by_id.do','POST',data);
            return result;
        },
        /**
         * 删除测点
         */
        deleteById: async (data) => {
            let result = await requestBase.baseApi('/opticalfiber/station_config/delete_by_id.do','GET',data);
            return result;
        },
    }
}

// 设备信息对应接口
const terminalRequest = {
    /**
     * 获取所有设备信息
     */
    list: async () => {
        let result = await requestBase.baseApi('/terminal/terminal/list.do','GET');
        return result;
    },
    /**
     * 更新传感器
     */
    updateById: async (data) => {
        let result = await requestBase.baseApi('/terminal/terminal/update.do','POST',data);
        return result;
    },
}

// 测点位置 即测点 对应接口
const stationRequest = {
    /**
     * 传入前端定义的类型 获取后端接口前缀 
     * get请求测点列表 
     * 对于倾斜来言 获取传感器的列表
     */
    getStationListByType: async (type,terminalId) => {
        console.log('请求url拼接' + REQUESTPREP[type] + '?terminalId=' + terminalId)
        let result = await requestBase.baseApi( REQUESTPREP[type],'GET',{
            terminalId: terminalId
        });
        return result;
    },

    getSensorListByType: async (type,terminalId) => {
        let result = await requestBase.baseApi( REQUESTPREPSENSOR[type],'GET',{
            terminalId: terminalId
        });
        return result;
    },

    getCollectListByType: async (type,terminalId) => {
        let result = await requestBase.baseApi( REQUESTPREPCOLLECT[type],'GET',{
            terminalId: terminalId
        });
        return result;
    }
}
 

// opticalfiberRequest.getOpticalfiberSensorsList();

/**
 * 将json对象的数据组装成GET上的url字符串类型
 * @param {*json对象数据} data 
 */
function jsonToParams(data) {
    let base = "?";
    let baseList = [];
    for (let item in data) {
        let itemStr = item + '=' + data[item];
        baseList.push(itemStr);
    }
    let baseListToStr = baseList.join('&');
    baseListToStr = base + baseListToStr;
    return baseListToStr;
}

function responseJson(flag, data, msg) {
    this.responseStatus = flag;
    this.data = data;
    this.msg = msg;
    this.getResponseStatus = function () {
        return this.responseStatus;
    }
}

function getCurrentTerminalId() {
    let result = '';
    return new Promise(async (resolve,reject) => {
        if(store.state.currentid !== null || (sessionStorage.getItem('currentid') && 
            sessionStorage.getItem('currentid') != null)) {
                result = store.state.currentid || sessionStorage.getItem('currentid');
                resolve(result);
            }else {
                let terminalList = terminalRequest.list();
                if(terminalList.responseStatus == 'success') {
                    result = terminalList.data[0].id;
                    resolve(result);
                }else {
                    resolve('');
                }
            }
    })
}

export {
    requestBase,
    opticalfiberRequest,
    terminalRequest,
    stationRequest,
    allSettingUrl,
    getCurrentTerminalId,
};