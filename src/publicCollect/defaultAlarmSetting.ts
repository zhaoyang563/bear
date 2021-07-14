/// <reference path="publicInterface.d.ts" />

const defaultAlarmSet = {
    'voice': {
        'warningSet': [
            {
                title: '预警设置（Level1）',
                list: {
                    'terminalId': {
                        name: '风机ID',
                        isselect: false,
                        value: '1',
                        noshow: true,
                    },
                    'totalInitAngleLimit': {
                        name: '叶片最小净距(m)',
                        desc: '3个叶片的净距小于该值预警',
                        value: '100',
                        isshowtoast: false,
                        show: '(0 - 10000)'
                    },
                    'totalInitAngleLimit2': {
                        name: '叶片净距相对偏差(%)',
                        desc: '3个叶片净距的相对偏差大于该值预警',
                        value: '100',
                        isshowtoast: false,
                        show: '(0 - 10000)'
                    },
                    'totalInitAngleLimit3': {
                        name: '重现次数(次)',
                        desc: '连续N次条件成立预警',
                        value: '100',
                        isshowtoast: false,
                        show: '(0 - 10000)'
                    },
                    'totalInitAngleLimit11': {
                        name: '间歇时长(min)',
                        desc: '每该时间段只预警一次',
                        value: '100',
                        isshowtoast: false,
                        show: '(0 - 10000)'
                    }
                }
            },{
                title: '报警设置（Level2）',
                list: {
                    'terminalId': {
                        name: '风机ID',
                        isselect: false,
                        value: '1',
                        noshow: true,
                    },
                    'totalInitAngleLimit': {
                        name: '叶片最小净距(m)',
                        desc: '3个叶片的净距小于该值报警',
                        value: '100',
                        isshowtoast: false,
                        show: '(0 - 10000)'
                    },
                    'totalInitAngleLimit2': {
                        name: '叶片净距相对偏差(%)',
                        desc: '3个叶片净距的相对偏差大于该值报警',
                        value: '100',
                        isshowtoast: false,
                        show: '(0 - 10000)'
                    },
                    'totalInitAngleLimit3': {
                        name: '重现次数(次)',
                        desc: '连续N次条件成立报警',
                        value: '100',
                        isshowtoast: false,
                        show: '(0 - 10000)'
                    },
                    'totalInitAngleLimit11': {
                        name: '间歇时长(min)',
                        desc: '每该时间段只报警一次',
                        value: '100',
                        isshowtoast: false,
                        show: '(0 - 10000)'
                    }
                }
            },{
                title: '超限设置（Level3）',
                list: {
                    'terminalId': {
                        name: '风机ID',
                        isselect: false,
                        value: '1',
                        noshow: true,
                    },
                    'totalInitAngleLimit': {
                        name: '叶片最小净距(m)',
                        desc: '3个叶片的净距小于该值超限警报',
                        value: '100',
                        isshowtoast: false,
                        show: '(0 - 10000)'
                    },
                    'totalInitAngleLimit2': {
                        name: '叶片净距相对偏差(%)',
                        desc: '3个叶片净距的相对偏差大于该值超限警报',
                        value: '100',
                        isshowtoast: false,
                        show: '(0 - 10000)'
                    },
                    'totalInitAngleLimit3': {
                        name: '重现次数(次)',
                        desc: '连续N次条件成立超限警报',
                        value: '100',
                        isshowtoast: false,
                        show: '(0 - 10000)'
                    },
                    'totalInitAngleLimit11': {
                        name: '间歇时长(min)',
                        desc: '每该时间段只超限警报一次',
                        value: '100',
                        isshowtoast: false,
                        show: '(0 - 10000)'
                    }
                }
            },
        ],
    },
    // 叶片变形 视频展示
    'video': {
        'warningSet': [
            {
                title: '预警设置（Level1）',
                list: {
                    'terminalId': {
                        name: '风机ID',
                        isselect: false,
                        value: '1',
                        noshow: true,
                    },
                    'totalInitAngleLimit': {
                        name: '叶片最小净距(m)',
                        desc: '3个叶片的净距小于该值预警',
                        value: '100',
                        isshowtoast: false,
                        show: '(0 - 10000)'
                    },
                    'totalInitAngleLimit2': {
                        name: '叶片净距相对偏差(%)',
                        desc: '3个叶片净距的相对偏差大于该值预警',
                        value: '100',
                        isshowtoast: false,
                        show: '(0 - 10000)'
                    },
                    'totalInitAngleLimit3': {
                        name: '重现次数(次)',
                        desc: '连续N次条件成立预警',
                        value: '100',
                        isshowtoast: false,
                        show: '(0 - 10000)'
                    },
                    'totalInitAngleLimit11': {
                        name: '间歇时长(min)',
                        desc: '每该时间段只预警一次',
                        value: '100',
                        isshowtoast: false,
                        show: '(0 - 10000)'
                    }
                }
            },{
                title: '报警设置（Level2）',
                list: {
                    'terminalId': {
                        name: '风机ID',
                        isselect: false,
                        value: '1',
                        noshow: true,
                    },
                    'totalInitAngleLimit': {
                        name: '叶片最小净距(m)',
                        desc: '3个叶片的净距小于该值报警',
                        value: '100',
                        isshowtoast: false,
                        show: '(0 - 10000)'
                    },
                    'totalInitAngleLimit2': {
                        name: '叶片净距相对偏差(%)',
                        desc: '3个叶片净距的相对偏差大于该值报警',
                        value: '100',
                        isshowtoast: false,
                        show: '(0 - 10000)'
                    },
                    'totalInitAngleLimit3': {
                        name: '重现次数(次)',
                        desc: '连续N次条件成立报警',
                        value: '100',
                        isshowtoast: false,
                        show: '(0 - 10000)'
                    },
                    'totalInitAngleLimit11': {
                        name: '间歇时长(min)',
                        desc: '每该时间段只报警一次',
                        value: '100',
                        isshowtoast: false,
                        show: '(0 - 10000)'
                    }
                }
            },{
                title: '超限设置（Level3）',
                list: {
                    'terminalId': {
                        name: '风机ID',
                        isselect: false,
                        value: '1',
                        noshow: true,
                    },
                    'totalInitAngleLimit': {
                        name: '叶片最小净距(m)',
                        desc: '3个叶片的净距小于该值超限警报',
                        value: '100',
                        isshowtoast: false,
                        show: '(0 - 10000)'
                    },
                    'totalInitAngleLimit2': {
                        name: '叶片净距相对偏差(%)',
                        desc: '3个叶片净距的相对偏差大于该值超限警报',
                        value: '100',
                        isshowtoast: false,
                        show: '(0 - 10000)'
                    },
                    'totalInitAngleLimit3': {
                        name: '重现次数(次)',
                        desc: '连续N次条件成立超限警报',
                        value: '100',
                        isshowtoast: false,
                        show: '(0 - 10000)'
                    },
                    'totalInitAngleLimit11': {
                        name: '间歇时长(min)',
                        desc: '每该时间段只超限警报一次',
                        value: '100',
                        isshowtoast: false,
                        show: '(0 - 10000)'
                    }
                }
            },
        ],
    },
    'upvibration': {
        'getWarningUrl': '/cloud-vibration/vibration_peak_warning_config/list.do',
        'updateWarningSetUrl': '/cloud-vibration/vibration_peak_warning_config/update_by_id.do',
        'warningSet': [
            {
                title: '预警设置（Level1）',
                list: {
                    'id': {
                        name: 'id',
                        isselect: false,
                        value: '1',
                        noshow: true,
                    },
                    'devConfigId': {
                        name: 'id',
                        isselect: false,
                        value: '1',
                        noshow: true,
                    },
                    'terminalId': {
                        name: '风机ID',
                        isselect: false,
                        value: '1',
                        noshow: true,
                    },
                    'firstAccelerateWarning': {
                        name: '振动加速度(m/s2)',
                        desc: '振动值大于该值预警',
                        value: '',
                        isshowtoast: false,
                        show: '(0 - 10000)'
                    },
                    'firstDisplacementWarning': {
                        name: '振动位移(m)',
                        desc: '振动位移大于该值预警',
                        value: '',
                        isshowtoast: false,
                        show: '(0 - 10000)'
                    },
                    'continuityLength': {
                        name: '重现次数(次)',
                        desc: '连续N次条件成立预警',
                        value: '',
                        isshowtoast: false,
                        show: '(0 - 10000)'
                    },
                    'intervalTime': {
                        name: '间歇时长(min)',
                        desc: '每该时间段只预警一次',
                        value: '',
                        isshowtoast: false,
                        show: '(0 - 10000)'
                    }
                }
            },{
                title: '报警设置（Level2）',
                list: {
                    'terminalId': {
                        name: '风机ID',
                        isselect: false,
                        value: '1',
                        noshow: true,
                    },
                    'secondAccelerateWarning': {
                        name: '振动加速度(m/s2)',
                        desc: '振动值大于该值报警',
                        value: '',
                        isshowtoast: false,
                        show: '(0 - 10000)'
                    },
                    'secondDisplacementWarning': {
                        name: '振动位移(m)',
                        desc: '振动位移大于该值报警',
                        value: '',
                        isshowtoast: false,
                        show: '(0 - 10000)'
                    },
                    'continuityLength': {
                        name: '重现次数(次)',
                        desc: '连续N次条件成立报警',
                        value: '',
                        isshowtoast: false,
                        show: '(0 - 10000)'
                    },
                    'intervalTime': {
                        name: '间歇时长(min)',
                        desc: '每该时间段只报警一次',
                        value: '',
                        isshowtoast: false,
                        show: '(0 - 10000)'
                    }
                }
            },{
                title: '超限设置（Level3）',
                list: {
                    'terminalId': {
                        name: '风机ID',
                        isselect: false,
                        value: '1',
                        noshow: true,
                    },
                    'thirdAccelerateWarning': {
                        name: '振动加速度(m/s2)',
                        desc: '振动值大于该值超限警报',
                        value: '',
                        isshowtoast: false,
                        show: '(0 - 10000)'
                    },
                    'thirdDisplacementWarning': {
                        name: '振动位移(m)',
                        desc: '振动位移大于该值超限警报',
                        value: '',
                        isshowtoast: false,
                        show: '(0 - 10000)'
                    },
                    'continuityLength': {
                        name: '重现次数(次)',
                        desc: '连续N次条件成立超限警报',
                        value: '',
                        isshowtoast: false,
                        show: '(0 - 10000)'
                    },
                    'intervalTime': {
                        name: '间歇时长(min)',
                        desc: '每该时间段只超限警报一次',
                        value: '',
                        isshowtoast: false,
                        show: '(0 - 10000)'
                    }
                }
            },
        ],
    },
    'bottompolarization': {
        'warningSet': [
            {
                title: '预警设置（Level1）',
                list: {
                    'terminalId': {
                        name: '风机ID',
                        isselect: false,
                        value: '1',
                        noshow: true,
                    },
                    'totalInitAngleLimit': {
                        name: '弯矩(kNm)',
                        desc: '弯矩值大于该值预警',
                        value: '100',
                        isshowtoast: false,
                        show: '(0 - 10000)'
                    },
                    'totalInitAngleLimit3': {
                        name: '重现次数(次)',
                        desc: '连续N次条件成立预警',
                        value: '100',
                        isshowtoast: false,
                        show: '(0 - 10000)'
                    },
                    'totalInitAngleLimit11': {
                        name: '间歇时长(min)',
                        desc: '每该时间段只预警一次',
                        value: '100',
                        isshowtoast: false,
                        show: '(0 - 10000)'
                    }
                }
            },{
                title: '报警设置（Level2）',
                list: {
                    'terminalId': {
                        name: '风机ID',
                        isselect: false,
                        value: '1',
                        noshow: true,
                    },
                    'totalInitAngleLimit': {
                        name: '弯矩(kNm)',
                        desc: '弯矩值大于该值报警',
                        value: '100',
                        isshowtoast: false,
                        show: '(0 - 10000)'
                    },
                    'totalInitAngleLimit3': {
                        name: '重现次数(次)',
                        desc: '连续N次条件成立报警',
                        value: '100',
                        isshowtoast: false,
                        show: '(0 - 10000)'
                    },
                    'totalInitAngleLimit11': {
                        name: '间歇时长(min)',
                        desc: '每该时间段只报警一次',
                        value: '100',
                        isshowtoast: false,
                        show: '(0 - 10000)'
                    }
                }
            },{
                title: '超限设置（Level3）',
                list: {
                    'terminalId': {
                        name: '风机ID',
                        isselect: false,
                        value: '1',
                        noshow: true,
                    },
                    'totalInitAngleLimit': {
                        name: '弯矩(kNm)',
                        desc: '弯矩值大于该值超限警报',
                        value: '100',
                        isshowtoast: false,
                        show: '(0 - 10000)'
                    },
                    'totalInitAngleLimit3': {
                        name: '重现次数(次)',
                        desc: '连续N次条件成立超限警报',
                        value: '100',
                        isshowtoast: false,
                        show: '(0 - 10000)'
                    },
                    'totalInitAngleLimit11': {
                        name: '间歇时长(min)',
                        desc: '每该时间段只超限警报一次',
                        value: '100',
                        isshowtoast: false,
                        show: '(0 - 10000)'
                    }
                }
            },
        ],
    }, 
    'deformation': {
        'getWarningUrl': '/inclinationzk/inclination-warning-config/list.do',
        'updateWarningSetUrl': '/inclinationzk/inclination-warning-config/update_by_id.do',
        'warningSet': [
            {
                title: '预警设置（Level1）',
                list: {
                    'id': {
                        name: 'id',
                        isselect: false,
                        value: '1',
                        noshow: true,
                    },
                    'terminalId': {
                        name: '风机ID',
                        isselect: false,
                        value: '1',
                        noshow: true,
                    },
                    'firstQxdWarning': {
                        name: '倾斜度(度)',
                        desc: '设置预警的倾斜角度',
                        value: '',
                        isshowtoast: false,
                        show: '(0 - 10000)'
                    },
                    'firstHddWarning': {
                        name: '晃动度(度)',
                        desc: '设置预警的晃动角度',
                        value: '',
                        isshowtoast: false,
                        show: '(0 - 10000)'
                    },
                    'continuityLength': {
                        name: '重现次数(次)',
                        desc: '连续N次条件成立预警',
                        value: '',
                        isshowtoast: false,
                        show: '(0 - 10000)'
                    },
                    'intervalTime': {
                        name: '间歇时长(min)',
                        desc: '每该时间段只预警一次',
                        value: '',
                        isshowtoast: false,
                        show: '(0 - 10000)'
                    }
                }
            },{
                title: '报警设置（Level2）',
                list: {
                    'terminalId': {
                        name: '风机ID',
                        isselect: false,
                        value: '1',
                        noshow: true,
                    },
                    'secondQxdWarning': {
                        name: '倾斜度(度)',
                        desc: '设置报警的倾斜角度',
                        value: '',
                        isshowtoast: false,
                        show: '(0 - 10000)'
                    },
                    'secondHddWarning': {
                        name: '晃动度(度)',
                        desc: '设置报警的晃动角度',
                        value: '',
                        isshowtoast: false,
                        show: '(0 - 10000)'
                    },
                    'continuityLength': {
                        name: '重现次数(次)',
                        desc: '连续N次条件成立报警',
                        value: '',
                        isshowtoast: false,
                        show: '(0 - 10000)'
                    },
                    'intervalTime': {
                        name: '间歇时长(min)',
                        desc: '每该时间段只报警一次',
                        value: '',
                        isshowtoast: false,
                        show: '(0 - 10000)'
                    }
                }
            },{
                title: '超限设置（Level3）',
                list: {
                    'terminalId': {
                        name: '风机ID',
                        isselect: false,
                        value: '1',
                        noshow: true,
                    },
                    'thirdQxdWarning': {
                        name: '倾斜度(度)',
                        desc: '设置超限的倾斜角度',
                        value: '',
                        isshowtoast: false,
                        show: '(0 - 10000)'
                    },
                    'thirdHddWarning': {
                        name: '晃动度(度)',
                        desc: '设置超限的晃动角度',
                        value: '',
                        isshowtoast: false,
                        show: '(0 - 10000)'
                    },
                    'continuityLength': {
                        name: '重现次数(次)',
                        desc: '连续N次条件成立超限警报',
                        value: '',
                        isshowtoast: false,
                        show: '(0 - 10000)'
                    },
                    'intervalTime': {
                        name: '间歇时长(min)',
                        desc: '每该时间段只超限警报一次',
                        value: '',
                        isshowtoast: false,
                        show: '(0 - 10000)'
                    }
                }
            },

        ],
    },
    // 环境变量的报警设置信息
    'environmental': {
        'warningSet': {

        }
    },
    'strain': {
        'warningSet': {

        }
    },
}


export {
    defaultAlarmSet, 
};