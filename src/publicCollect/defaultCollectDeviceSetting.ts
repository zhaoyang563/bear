/// <reference path="publicInterface.d.ts" />

const defaultCollectDeviceSet = {
    'voice': {

    },
    // 叶片变形 视频展示
    'video': {

    },
    'upvibration': {
        'collectSetInfo': [
            {
                title: '采集卡设置',
                list: {
                    'terminalId': {
                        name: '风机ID',
                        isselect: false,
                        value: '1',
                        noshow: true,
                    },
                    'address': {
                        name: '采集卡ID',
                        noshow: true,
                        isselect: false,
                        value: '1',
                        nochange: true,
                    },
                    'id': {
                        name: 'id',
                        noshow: true,
                        value: ''
                    },
                    'name': {
                        name: '采集卡名称',
                        value: '100',
                        isshowtoast: false,
                    },
                    'oversamplingRate': {
                        name: '通道数',
                        value: '1',
                        isshowtoast: false,
                        show: ''
                    },
                    // 'meterRange': {
                    //     name: '量程类型',
                    //     value: '34',
                    //     isshowtoast: false,
                    //     show: '(1/+-10,0/+-5)'
                    // },

                    // 'samplingFrequency': {
                    //     name: '连续采样频率',
                    //     value: '34',
                    //     isshowtoast: false,
                    //     show: '(100 - 100000)Hz'
                    // },
                    'manufacturers': {
                        name: '生产厂家',
                        value: "基础环变形测点",
                        show: "",
                    },
                    'mark': {
                        name: '备注',
                        value: "基础环变形测点",
                        show: "",
                    },
                }
            },
        ],
    },
    'bottompolarization': {
        'collectSetInfo': [
            {
                title: '采集卡设置',
                list: {
                    'terminalId': {
                        name: '风机ID',
                        isselect: false,
                        value: '1',
                        noshow: true,
                    },
                    'address': {
                        name: '测点ID',
                        noshow: true,
                        isselect: false,
                        value: '1',
                        nochange: true,
                    },
                    'id': {
                        name: 'id',
                        noshow: true,
                        value: ''
                    },
                    'name': {
                        name: '采集卡名称',
                        value: '100',
                        isshowtoast: false,
                    },
                    'installType': {
                        name: '通道数',
                        value: '1',
                        isshowtoast: false,
                        show: '6/8'
                    },
                    'tcpAddress': {
                        name: '网络地址',
                        value: '',
                        isshowtoast: false,
                        show: ''
                    },
                    'tcpPort': {
                        name: 'tcp端口号',
                        value: '',
                        isshowtoast: false,
                        show: ''
                    },
                    'manufacturers': {
                        name: '生产厂家',
                        value: '34',
                        isshowtoast: false,
                    },
                    'mark': {
                        name: '备注',
                        value: "基础环变形测点",
                        show: "",
                    },
                }
            },
        ],
    }, 
    'deformation': {
        'collectSetInfo': [
            {
                title: '采集卡设置',
                list: {
                    'terminalId': {
                        name: '风机ID',
                        isselect: false,
                        value: '1',
                        noshow: true,
                    },
                    'address': {
                        name: '测点ID',
                        noshow: true,
                        isselect: false,
                        value: '1',
                        nochange: true,
                    },
                    'id': {
                        name: 'id',
                        noshow: true,
                        value: ''
                    },
                    'name': {
                        name: '采集卡名称',
                        value: '100',
                        isshowtoast: false,
                    },
                    'mark': {
                        name: '备注',
                        value: "基础环变形测点",
                        show: "",
                    },
                }
            },
        ],
    },
    // 环境变量的报警设置信息
    'environmental': {
        'warningSet': {

        }
    },
}


export {
    defaultCollectDeviceSet, 
};