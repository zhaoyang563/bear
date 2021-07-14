/// <reference path="publicInterface.d.ts" />

const defaultSensorSet = {
    'voice': {
        "setSensorInfoList": [
            {
                title: '安装设置',
                list: {
                    'name': {
                        name: '测点名称',
                        isselect: false,
                        value: '测点名称',
                    },
                    'sensorH': {
                        name: '高度',
                        value: '100',
                        isshowtoast: false,
                        show: '(0 - 10000)'
                    },
                    'initDirectAngle': {
                        name: '方位角(北偏X)',
                        value: '1',
                        isshowtoast: false,
                        show: '(0 - 360) °'
                    },
                    'radius': {
                        name: '在圆周上的度数',
                        value: '34',
                        isshowtoast: false,
                        show: '(0 - 360) °'
                    },
                    'sensorDir': {
                        name: '传感器指向',
                        value: '90',
                        isshowtoast: false,
                        show: '(0 - 360) °'
                    },
                    'mark': {
                        name: '备注',
                        value: "塔筒外东向声音测点",
                        show: "",
                    },
                }
            },
            {
                title: "采集方式",
                list: {
                    'name': {
                        name: '测点名称',
                        isselect: false,
                        value: '基础测点'
                    },
                    'port': {
                        name: '采集通道',
                        isselect: true,
                        // nochange: true,
                        list: [{
                            name: '1号通道',
                            value: '110'
                        },
                        {
                            name: '2号通道',
                            value: '111'
                        },{
                            name: '3号通道',
                            value: '112'
                        },{
                            name: '4号通道',
                            value: '113'
                        }],
                        value: '110'
                    },
                    'setting': {
                        name: '标定参数(参考声压)',
                        isselect: false,
                        // nochange: true,
                        list: [],
                        value: ''
                    },
                }
            },
            {
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
                    'none': {
                        name: '',
                        isselect: false,
                        inputnoshow: true,
                        list: [],
                        value: '',
                        show: ""
                    },
                    'savebt': {
                        name: '保存间隔',
                        isselect: false,
                        // nochange: true,
                        list: [],
                        value: '0',
                        isshowtoast: false,
                        show: "( 0.2 - 50 )s"
                    },
                    'savetime': {
                        name: '每次保存时长',
                        isselect: false,
                        // nochange: true,
                        list: [],
                        value: '1',
                        isshowtoast: false,
                        show: "( 1 - 30 )Min"
                    },

                    'savebt_d': {
                        name: '定时保存',
                        isselect: false,
                        // nochange: true,
                        list: [],
                        value: '2',
                        isshowtoast: false,
                        show: "( 1 - 24 )h"
                    },
                    'savetime_d': {
                        name: '每次保存时长',
                        isselect: false,
                        // nochange: true,
                        list: [],
                        value: '1',
                        isshowtoast: false,
                        show: "( 1 - 30 )Min"
                    },

                    'savebt_c': {
                        name: '触发值保存',
                        isselect: false,
                        // nochange: true,
                        list: [],
                        value: '0.01',
                        isshowtoast: false,
                        show: "( 0.005 - 0.300 )°"
                    },
                    'savetime_c': {
                        name: '每次保存时长',
                        isselect: false,
                        // nochange: true,
                        list: [],
                        value: '1',
                        isshowtoast: false,
                        show: "( 1 - 30 )Min"
                    },
                }
            },
            {
                title: "计算参数",
                list: {
                    'initAngle1': {
                        name: '叶片个数',
                        value: '3',
                        isshowtoast: false,
                        show: '(1 - 9) 个'
                    },
                    'initAngle2': {
                        name: '计算结果输出时段间隔',
                        value: '1',
                        isshowtoast: false,
                        show: '(1 - 9) Min'
                    },
                }
            }
        ]
    },
    // 叶片变形 视频展示
    'video': {
        "setSensorInfoList": [
            {
                title: '安装设置',
                list: {
                    'name': {
                        name: '测点名称',
                        isselect: false,
                        value: '机舱左点'
                    },
                    'sensorH': {
                        name: '高度',
                        value: '100',
                        isshowtoast: false,
                        show: '(0 - 10000)'
                    },
                    'initDirectAngle': {
                        name: '方位角(北偏X)',
                        value: '1',
                        isshowtoast: false,
                        show: '(0 - 360) °'
                    },
                    'radius': {
                        name: '摄像机定位参数',
                        value: '34',
                        isshowtoast: false,
                        show: '(0 - 360) m'
                    },
                    'sensorDir': {
                        name: '摄像机指向',
                        isselect: true,
                        // nochange: true,
                        list: [{
                            name: '外侧',
                            value: '110'
                        },
                        {
                            name: '内测',
                            value: '111'
                        }],
                        value: '110'
                    },
                    'mark': {
                        name: '备注',
                        value: "机舱左侧",
                        show: "",
                    },
                }
            },
            {
                title: "采集方式",
                list: {
                    'name': {
                        name: '测点名称',
                        isselect: false,
                        value: '基础测点'
                    },
                    // 'address': {
                    //     name: '传感器ID',
                    //     isselect: false,
                    //     // nochange: true,
                    //     list: [],
                    //     value: 0,
                    //     show: '(0 - 254)'
                    // },
                    'port': {
                        name: '采集通道',
                        isselect: true,
                        // nochange: true,
                        list: [{
                            name: '0981',
                            value: '110'
                        },
                        {
                            name: '0982',
                            value: '111'
                        }],
                        value: '110'
                    },
                    // 'inclinationType': {
                    //     name: '传感器类型',
                    //     isselect: true,
                    //     list: [
                    //         {
                    //             name: '振动速度',
                    //             value: '826T'
                    //         },
                    //         {
                    //             name: '振动加速度',
                    //             value: '726T'
                    //         }
                    //     ],
                    //     value: '826T'
                    // },
                    // 'setting': {
                    //     name: '标定参数(参考声压)',
                    //     isselect: false,
                    //     // nochange: true,
                    //     list: [],
                    //     value: ''
                    // },
                }
            },
            {
                title: "数据保存",
                list: {
                    'number': {
                        name: '采样帧数',
                        isselect: false,
                        // nochange: true,
                        list: [],
                        value: '100',
                        isshowtoast: false,
                        show: "( 100 - 1200 )帧"
                    },
                    'none': {
                        name: '',
                        isselect: false,
                        inputnoshow: true,
                        list: [],
                        value: '',
                        show: ""
                    },
                    'savebt': {
                        name: '保存间隔',
                        isselect: false,
                        // nochange: true,
                        list: [],
                        value: '0',
                        isshowtoast: false,
                        show: "( 0.2 - 50 )s"
                    },
                    'savetime': {
                        name: '每次保存时长',
                        isselect: false,
                        // nochange: true,
                        list: [],
                        value: '1',
                        isshowtoast: false,
                        show: "( 1 - 30 )Min"
                    },

                    'savebt_d': {
                        name: '定时保存',
                        isselect: false,
                        // nochange: true,
                        list: [],
                        value: '2',
                        isshowtoast: false,
                        show: "( 1 - 24 )h"
                    },
                    'savetime_d': {
                        name: '每次保存时长',
                        isselect: false,
                        // nochange: true,
                        list: [],
                        value: '1',
                        isshowtoast: false,
                        show: "( 1 - 30 )Min"
                    },

                    'savebt_c': {
                        name: '触发值保存',
                        isselect: false,
                        // nochange: true,
                        list: [],
                        value: '0.01',
                        isshowtoast: false,
                        show: "( 0.005 - 0.300 )°"
                    },
                    'savetime_c': {
                        name: '每次保存时长',
                        isselect: false,
                        // nochange: true,
                        list: [],
                        value: '1',
                        isshowtoast: false,
                        show: "( 1 - 30 )Min"
                    },
                }
            },
            {
                title: "计算参数",
                list: {
                    // 'initAngle1': {
                    //     name: '叶片个数',
                    //     value: '3',
                    //     isshowtoast: false,
                    //     show: '(1 - 9) 个'
                    // },
                    'initAngle2': {
                        name: '计算结果输出时段间隔',
                        value: '1',
                        isshowtoast: false,
                        show: '(1 - 9) Min'
                    },
                }
            }
        ],
    },
    'upvibration': {
        "setSensorInfoList": [
            {
                title: '传感器参数',
                list: {
                    'terminalId': {
                        name: '风机ID',
                        noshow: true,
                        isselect: false,
                        value: '1',
                    },
                    'groupId': {
                        name: '测点ID',
                        value: '1',
                        isshowtoast: false,
                        show: ''
                    },
                    'groupName': {
                        name: '测点名称',
                        value: '1',
                        isshowtoast: false,
                        show: ''
                    },
                    'id': {
                        name: '传感器ID',
                        isselect: false,
                        value: '1',
                        nochange: true,
                    },
                    'name': {
                        name: '传感器名称',
                        value: '100',
                        isshowtoast: false,
                        show: ''
                    },
                    // 'passagewayCode': {
                    //     name: '所属通道',
                    //     value: '1',
                    //     isshowtoast: false,
                    //     show: ''
                    // },
                    'groupNumber': {
                        name: '传感器分量',
                        isselect: true,
                        list: [
                            {
                                name: 'X方向',
                                value: '0'
                            },
                            {
                                name: 'Y方向',
                                value: '1'
                            },
                        ],
                        value: '0'
                    },
                    'sensorType': {
                        name: '传感器类型',
                        isselect: true,
                        list: [
                            {
                                name: '加速度',
                                value: '1'
                            },
                            {
                                name: '速度',
                                value: '2'
                            },
                        ],
                        value: '1'
                    },
                    'installMode': {
                        name: '安装方式',
                        isselect: true,
                        list: [
                            {
                                name: 'X向心Y逆时',
                                value: '1.1'
                            },
                            {
                                name: 'X逆时Y向心',
                                value: '1.2'
                            },
                            {
                                name: 'X向心Y顺时',
                                value: '2.1'
                            },
                            {
                                name: 'X顺时Y向心',
                                value: '2.2'
                            },
                            {
                                name: 'X背心Y逆时',
                                value: '3.1'
                            },
                            {
                                name: 'X逆时Y背心',
                                value: '3.2'
                            },
                            {
                                name: 'X背心Y顺时',
                                value: '4.1'
                            },
                            {
                                name: 'X顺时Y背心',
                                value: '4.2'
                            }
                        ],
                        value: '1'
                    },
                    'mark': {
                        name: '备注',
                        value: "",
                        show: "",
                    },
                }
            },
            {
                title: "采集设置",
                list: {         
                    'devId': {
                        name: '采集卡',
                        isselect: true,
                        list: [
                            {
                                name: '1',
                                value: '1'
                            }
                        ],
                        value: '1'
                    },
                    'passagewayCode': {
                        name: '通道号',
                        isselect: false,
                        list: [],
                        value: '1'
                    },
                }
            },
            // {
            //     title: "初始值设置",
            //     list: {
            //         'setT': {
            //             name: '参数1',
            //             value: '34',
            //             isshowtoast: false,
            //             show: ''
            //         },
            //         'setZ': {
            //             name: '参数2',
            //             value: '34'
            //         },
            //         'initialWl': {
            //             name: '参数3',
            //             value: '34',
            //             isshowtoast: false,
            //             show: ''
            //         },

            //     }
            // }
        ],
    },
    'bottompolarization': {
        "setSensorInfoList": [
            {
                title: '传感器参数',
                list: {
                    'terminalId': {
                        name: '风机ID',
                        noshow: true,
                        isselect: false,
                        value: '1',
                    },
                    'groupId': {
                        name: '测点ID',
                        value: '1',
                        isshowtoast: false,
                        show: ''
                    },
                    'groupName': {
                        name: '测点名称',
                        isselect: true,
                        list: [],
                        value: '',
                    },
                    'id': {
                        name: '传感器ID',
                        isselect: false,
                        value: '1',
                        nochange: true,
                    },
                    'name': {
                        name: '传感器名称',
                        isselect: false,
                        value: '1',
                    },
                    // 'sensorH': {
                    //     name: '高度',
                    //     value: '100',
                    //     isshowtoast: false,
                    //     show: '(0 - 10000)'
                    // },
                    
                    'sensorType': {
                        name: '传感器类型',
                        isselect: true,
                        list: [
                            {
                                name: '应变',
                                value: '1'
                            },
                            {
                                name: '温度',
                                value: '2'
                            }
                        ],
                        value: ''
                    },
                    'factoryWl': {
                        name: '传感器中心波长',
                        value: '34',
                        isshowtoast: false,
                        only: 'nm'
                    },
                    'setZ': {
                        name: '应变系数',
                        value: '34',
                        only: 'ε/nm',
                    },
                    'setT': {
                        name: '温度系数',
                        value: '34',
                        isshowtoast: false,
                        show: '',
                        only: 'ε/nm',
                    },
                    'installAngle': {
                        name: '安装方位角(北偏X)',
                        value: '1',
                        isshowtoast: false,
                        show: '(0 - 360) °'
                    },
                    'installType': {
                        name: '安装方式',
                        isselect: true,
                        list: [
                            {
                                name: '沿塔筒竖向布置',
                                value: '1'
                            },
                            {
                                name: '沿塔筒环向布置',
                                value: '2'
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
            },
            {
                title: "采集设置",
                list: {         
                    'collectId': {
                        name: '采集卡',
                        isselect: true,
                        list: [],
                        value: ''
                    },
                    'channel': {
                        name: '通道号',
                        isselect: false,
                        list: [],
                        value: '1'
                    },
                    // 'setting': {
                    //     name: '标定参数',
                    //     isselect: false,
                    //     // nochange: true,
                    //     list: [],
                    //     value: ''
                    // },
                    // 'timer': {
                    //     name: '采样频率',
                    //     isselect: false,
                    //     // nochange: true,
                    //     list: [],
                    //     value: ''
                    // },
                }
            },
            {
                title: "初始值设置",
                list: {
                    
                    'initialWl': {
                        name: '初始波长',
                        value: '34',
                        isshowtoast: false,
                        only: 'nm',
                        nochange: true,
                    },
                }
            }
        ],
    }, 
    'deformation': {
        'setSensorInfoList': [
            {
                title: '传感器参数',
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
                        value: '1',
                        nochange: true,
                        noshow: true,
                        list: [{
                            name: '1',
                            value: '1'
                        }],
                    },
                    'inclinationType': {
                        name: '传感器类型',
                        isselect: true,
                        brotherNode: 'installModel',
                        list: [
                            {
                                name: '1826',
                                value: '826T'
                            },
                            {
                                name: '1726',
                                value: '726T'
                            },
                            {
                                name: '1526',
                                value: '526T'
                            },
                            {
                                name: '116',
                                value: '116T'
                            }
                        ],
                        value: '826T'
                    },
                }
            },
        ],
    },
    // 环境变量的报警设置信息
    'environmental': {

    },
}


export {
    defaultSensorSet, 
};