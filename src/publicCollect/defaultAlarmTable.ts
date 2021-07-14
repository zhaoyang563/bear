/// <reference path="publicInterface.d.ts" />

const defaultAlarmTable = {
    'voice': {
        "errorInfoList": {
            "terminalId": {
                title: "风机Id",
            },
            "level": {
                title: "报警等级",
            },
            "collectName": {
                title: "所属采集卡",
            },
            "sensorName": {
                title: "所属传感器",
            },
            "warningType": {
                title: "报警指标",
            },
            "warningValue": {
                title: "报警值",
            },
        },
    },
    // 叶片变形 视频展示
    'video': {
        "errorInfoList": {
            "terminalId": {
                title: "风机Id",
            },
            "level": {
                title: "报警等级",
            },
            "collectName": {
                title: "所属采集卡",
            },
            "sensorName": {
                title: "所属传感器",
            },
            "warningType": {
                title: "报警指标",
            },
            "warningValue": {
                title: "报警值",
            },
        },
    },
    'upvibration': {
        'getWarningUrl': '/cloud-vibration/vibration_peak_warning/list.do',   
        "errorInfoList": {
            "terminalId": {
                title: "风机Id",
            },
            "level": {
                title: "报警等级",
            },
            "devConfigName": {
                title: "所属采集卡",
            },
            "groupName": {
                title: "所属测点",
            },
            "warningType": {
                title: "报警指标",
            },
            "vibrationPeakWarning": {
                title: "报警值",
            },
        },
    },
    'bottompolarization': {
        "errorInfoList": {
            "terminalId": {
                title: "风机Id",
            },
            "level": {
                title: "报警等级",
            },
            "collectName": {
                title: "所属采集卡",
            },
            "sensorName": {
                title: "所属传感器",
            },
            "warningType": {
                title: "报警指标",
            },
            "warningValue": {
                title: "报警值",
            },
        },
    }, 
    'deformation': {
        'getWarningUrl': '/inclinationzk/inclination_warning/list.do',
        "errorInfoList": {
            "terminalId": {
                title: "风机Id",
            },
            "level": {
                title: "报警等级",
            },
            "name": {
                title: "报警测点",
            },
            "warningType": {
                title: "报警指标",
            },
            "inclinationWarning": {
                title: "报警值",
            },
        },
    },
    // 环境变量的报警设置信息
    'environmental': {
        
    },
    'strain': {
        
    },
}


export {
    defaultAlarmTable, 
};