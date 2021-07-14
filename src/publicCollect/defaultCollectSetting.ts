/// <reference path="publicInterface.d.ts" />

let minsList = [];
for (let i = 1; i < 61; i++) {
    let obj = {
        name: i + '分钟',
        value: i
    }
    minsList.push(obj);
}
let hoursList = [];
let timeList = []
for (let i = 1; i < 25; i++) {
    let obj = {
        name: i + '小时',
        value: i
    }
    hoursList.push(obj);
    timeList.push(
        {
            name: i < 10 ? '0' + i + ' :00' : i + ' :00',
            value: i
        }  
    )
}

const defaultCollectSet = {
    'collectInfo': [{
        title: "数据保存",
        list: {
            'number': {
                name: '采样频率',
                isselect: false,
                // nochange: true,
                list: [],
                value: '0.5',
                isshowtoast: false,
                show: "( 0.2 - 50 )Hz"
            },
            'numberToInt': {
                name: '采样周期',
                isselect: false,
                list: [],
                value: '2',
                show: ""
            },
            'savebt': {
                name: '保存间隔',
                isselect: true,
                list: hoursList,
                value: '',
                isshowtoast: false,
                show: "( 1 - 3600 )分",
                ishaveswitch: true,
                switchvalue: false,
            },
            'savetime': {
                name: '每次保存时长',
                isselect: true,
                // nochange: true,
                list: minsList,
                value: '',
                isshowtoast: false,
                show: "( 1 - 30 )Min",
                switchvalue: false,
            },

            'savebt_d': {
                name: '定时保存',
                isselect: true,
                // nochange: true,
                isMlu: true,
                list: timeList,
                value: '',
                isshowtoast: false,
                show: "( 1 - 24 )h",
                ishaveswitch: true,
                switchvalue: false,
            },
            'savetime_d': {
                name: '每次保存时长',
                isselect: true,
                // nochange: true,
                list: minsList,
                value: '',
                isshowtoast: false,
                show: "( 1 - 30 )Min",
                switchvalue: false,
            },

            'savebt_c': {
                name: '触发值保存',
                isselect: false,
                // nochange: true,
                list: [],
                value: '',
                isshowtoast: false,
                show: "( 0.005 - 0.300 )°",
                ishaveswitch: true,
                switchvalue: false,
            },
            'savetime_c': {
                name: '每次保存时长',
                isselect: true,
                // nochange: true,
                list: minsList,
                value: '',
                isshowtoast: false,
                show: "( 1 - 30 )Min",
                switchvalue: false,
            },
        }
    }],
    // 'voice': {
        
    // },
    // // 叶片变形 视频展示
    // 'video': {

    // },
    // 'upvibration': {

    // },
    // 'bottompolarization': {

    // }, 
    // 'deformation': {

    // },
    // // 环境变量的报警设置信息
    // 'environmental': {

    // },
}


export {
    defaultCollectSet, 
};