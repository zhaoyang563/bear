/// <reference path="publicInterface.d.ts" />

const defaultStationSet = {
    'voice': {

    },
    // 叶片变形 视频展示
    'video': {

    },
    'upvibration': {
        "setStationInfo": [
            {
                title: '测点参数',
                list: {
                    'terminalId': {
                        name: '风机ID',
                        noshow: true,
                        isselect: false,
                        value: '1',
                    },
                    'id': {
                        name: '测点ID',
                        value: '',
                        noshow: true,
                        isshowtoast: false,
                        show: ''
                    },
                    'name': {
                        name: '测点名称',
                        value: '1',
                        isshowtoast: false,
                        show: ''
                    },
                    'collectId': {
                        name: '采集卡Id',
                        isselect: true,
                        list: [

                        ],
                        value: '',
                        nochange: false,
                    },
                    'sensorsCount': {
                        name: '下属传感器个数',
                        isselect: false,
                        value: '1',
                        nochange: true
                    },
                    'type': {
                        name: '测点类型',
                        isselect: true,
                        list: [
                            {
                                name: '塔筒振动',
                                value: 'bottompolarization'
                            }
                        ],
                        value: ''
                    },
                    'mark': {
                        name: '备注',
                        value: "基础环变形测点",
                        show: "",
                    },
                }
            }
        ]
    },
    'bottompolarization': {
        "setStationInfo": [
            {
                title: '测点参数',
                list: {
                    'terminalId': {
                        name: '风机ID',
                        noshow: true,
                        isselect: false,
                        value: '1',
                    },
                    'id': {
                        name: '测点ID',
                        value: '',
                        noshow: true,
                        isshowtoast: false,
                        show: ''
                    },
                    'name': {
                        name: '测点名称',
                        value: '1',
                        isshowtoast: false,
                        show: ''
                    },
                    'collectId': {
                        name: '采集卡Id',
                        isselect: true,
                        list: [

                        ],
                        value: '',
                        nochange: false,
                    },
                    'sensorsCount': {
                        name: '下属传感器个数',
                        isselect: false,
                        value: '1',
                        nochange: true
                    },
                    'type': {
                        name: '测点类型',
                        isselect: true,
                        list: [
                            {
                                name: '塔底载荷',
                                value: 'bottompolarization'
                            },
                            {
                                name: '塔顶载荷',
                                value: 'uppolarization'
                            },
                            {
                                name: '钢塔应力',
                                value: 'cablestress'
                            },
                            {
                                name: '叶根载荷',
                                value: 'load'
                            }
                        ],
                        value: ''
                    },
                    'mark': {
                        name: '备注',
                        value: "基础环变形测点",
                        show: "",
                    },
                }
            }
        ]
    }, 
    'deformation': {
        "setStationInfo": [
            {
                title: '测点参数',
                list: {
                    'name': {
                        name: '测点名称',
                        value: '100',
                        isshowtoast: false,
                        show: '(0 - 10000)'
                    },
                    'terminalId': {
                        name: '风机ID',
                        isselect: false,
                        value: '1',
                        noshow: true,
                    },
                    'address': {
                        name: '传感器ID',
                        isselect: true,
                        value: '',
                        nochange: true,
                        noshow: true,
                        list: [],
                    },
                    'port': {
                        name: '安装通道',
                        isselect: true,
                        // nochange: true,
                        list: [],
                        value: ''
                    },
                }
            },
            {
                title: "初始值设置",
                list: {
                    'installAngle': {
                        name: '北偏X',
                        value: '1',
                        isshowtoast: false,
                        show: '(0 - 360) °',
                        only: '度',
                    },
                    'radius': {
                        name: '塔筒半径',
                        value: '34',
                        isshowtoast: false,
                        show: '(1 - 6000) mm',
                        only: "mm",
                    },
                    'installHeight': {
                        name: '安装高度',
                        value: '100',
                        isshowtoast: false,
                        show: '(0 - 10000)',
                        only: 'm',
                    },
                    'installModel': {
                        name: '算法选择',
                        isselect: true,
                        brotherNode: 'inclinationType',
                        list: [
                            {
                                name: 'Ari-1826',
                                value: '3.1'
                            },
                            {
                                name: 'Ari-1726',
                                value: '3.2'
                            },
                            {
                                name: 'Ari-1526',
                                value: '4.2'
                            },
                            {
                                name: 'Ari-116',
                                value: '4.1'
                            },
                        ],
                        value: '3.1'
                    },
                    'initAngle1': {
                        name: '方位角1',
                        value: '34',
                        isshowtoast: false,
                        show: '(0 - 360) °',
                        only: "度",
                    },
                    'initH1': {
                        name: '高差1',
                        value: '34',
                        only: "mm",
                    },
                    'initAngle2': {
                        name: '方位角2',
                        value: '34',
                        isshowtoast: false,
                        show: '(0 - 360) °',
                        only: "度",
                    },
                    'initH2': {
                        name: '高差2',
                        value: '34',
                        only: "mm",
                    },
                    'initAngle3': {
                        name: '方位角3',
                        value: '34',
                        isshowtoast: false,
                        show: '(0 - 360) °',
                        only: "度",
                    },
                    'initH3': {
                        name: '高差3',
                        value: '34',
                        only: "mm",
                    },
                    'initAngle4': {
                        name: '方位角4',
                        value: '34',
                        isshowtoast: false,
                        show: '(0 - 360) °',
                        only: "度",
                    },
                    'initH4': {
                        name: '高差4',
                        value: '34',
                        only: "mm",
                    },
                    'initX': {
                        name: '修正值x0',
                        value: '34',
                        nochange: true,
                    },
                    'initY': {
                        name: '修正值y0',
                        value: '34',
                        nochange: true,
                    },
                }
            }
        ]
    },
    // 环境变量的报警设置信息
    'environmental': {
        'warningSet': {

        }
    },
}


export {
    defaultStationSet, 
};