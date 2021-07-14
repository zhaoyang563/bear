/// <reference path="publicInterface.d.ts" />
const defaultDrawInfo: DrawInfo = {
    'inclination': {
        'indexsList': [
            {
                name: '最大',
                value: '2',
            },
            {
                name: '累计',
                value: '0',
            },
            {
                name: '增量',
                value: '1',
            },
            
        ],
        'default': ['0', '1','2'],
    },
    // 叶片变形 视频展示
    'sedimentation': {
        'indexsList': [
            {
                name: '累计',
                value: '0',
            },
            {
                name: '增量',
                value: '1',
            }
        ],
        'default': ['0', '1'],
    },
    'waterLevel': {
        'indexsList': [
            {
                name: '累计',
                value: '0',
            },
            {
                name: '增量',
                value: '1',
            }
        ],
        'default': ['0', '1'],
    },
    'strain': {
        'indexsList': [
            {
                name: '累计',
                value: '0',
            },
            {
                name: '增量',
                value: '1',
            }
        ],
        'default': ['0', '1'],
    }, 
    'axialForce': {
        'indexsList': [
            {
                name: '累计',
                value: '0',
            },
            {
                name: '增量',
                value: '1',
            },
            {
                name: '结果',
                value: '2',
            }
        ],
        'default': ['0', '1','2'],
    },
}

const defaultDrawSet = {
    'sedimentation': {
        'selist': [
            {
                value: '0',
                label: '累计趋势图',
                only: '(mm)',
                isrootdata: false,
                responsetype: 'records',
                requesturl: '/found/pc/chat/selectChatDTO',
                options: {
                    id: '111',
                    optionslist: [
                        {
                            title: '累计趋势图',
                            id: '111-0',
                            charttype: 'line',
                            xshowtype: 'datetime',
                            xtitle: '时间',
                            ytitle: '位移(mm)',
                            seriestitle: '位移',
                            xdataname: 'date',
                            ydataname: 'sumVariable',
                            ispolar: false
                        },
                    ]
                }
            },
            {
                value: '1',
                label: '增量趋势图',
                only: '(mm)',
                isrootdata: false,
                responsetype: 'records',
                requesturl: '/found/pc/chat/selectChatDTO',
                options: {
                    id: '112',
                    optionslist: [
                        {
                            title: '增量趋势图',
                            id: '112-0',
                            charttype: 'line',
                            xshowtype: 'datetime',
                            xtitle: '时间',
                            ytitle: '位移(mm)',
                            seriestitle: '位移',
                            xdataname: 'date',
                            ydataname: 'variable',
                            ispolar: false
                        },
                    ]
                }
            }
        ],
    },
    'waterLevel': {
        'selist': [
            {
                value: '0',
                label: '水位趋势图',
                only: '(m)',
                isrootdata: false,
                responsetype: 'records',
                requesturl: '/found/pc/chat/selectChatDTO',
                options: {
                    id: '111',
                    optionslist: [
                        {
                            title: '水位趋势图',
                            id: '114-0',
                            charttype: 'line',
                            xshowtype: 'datetime',
                            xtitle: '时间',
                            ytitle: '水位(m)',
                            seriestitle: '水位',
                            xdataname: 'date',
                            // ydataname: 'sumVariable',
                            ydataname: 'calculated',
                            ispolar: false
                        },
                    ]
                }
            },
            {
                value: '1',
                label: '增量趋势图',
                only: '(m)',
                isrootdata: false,
                responsetype: 'records',
                requesturl: '/found/pc/chat/selectChatDTO',
                options: {
                    id: '112',
                    optionslist: [
                        {
                            title: '增量趋势图',
                            id: '112-1',
                            charttype: 'line',
                            xshowtype: 'datetime',
                            xtitle: '时间',
                            ytitle: '水位(m)',
                            seriestitle: '水位',
                            xdataname: 'date',
                            ydataname: 'variable',
                            ispolar: false
                        },
                    ]
                }
            }
        ],
    },
    'inclination': {
        'selist': [
            {
                value: '2',
                label: '最大值',
                only: '(mm)',
                isrootdata: false,
                responsetype: 'records',
                requesturl: '/found/fixedIncline/selectLastWeek',
                // requesturl: '/found/pc/chat/selectInclineChatDTO',
                options: {
                    id: '1113',
                    optionslist: [
                        {
                            title: '最大值',
                            id: '1113-0',
                            charttype: 'line',
                            xshowtype: 'datetime',
                            xtitle: '时间',
                            ytitle: '位移(mm)',
                            seriestitle: '位移',
                            xdataname: 'date',
                            ydataname: 'sumValue',
                            ispolar: false
                        },
                    ]
                }
            },
            {
                value: '0',
                label: '倾斜位移图',
                only: '(mm)',
                isrootdata: false,
                responsetype: 'records',
                requesturl: '/found/incline/selectOneGroupIncline',
                // requesturl: '/found/pc/chat/selectInclineChatDTO',
                options: {
                    id: '111',
                    optionslist: [
                        {
                            title: '倾斜位移图',
                            id: '101-0',
                            charttype: 'line',
                            xshowtype: 'datetime',
                            xtitle: '时间',
                            ytitle: '位移(mm)',
                            seriestitle: '位移',
                            xdataname: 'presentDepth',
                            ydataname: 'sumVariable',
                            ispolar: false
                        },
                    ]
                }
            },
            {
                value: '1',
                label: '增量趋势图',
                only: '(mm)',
                isrootdata: false,
                responsetype: 'records',
                requesturl: '/found/incline/selectOneGroupIncline',
                // requesturl: '/found/pc/chat/selectInclineChatDTO',
                options: {
                    id: '112',
                    optionslist: [
                        {
                            title: '增量趋势图',
                            id: '102-0',
                            charttype: 'line',
                            xshowtype: 'datetime',
                            xtitle: '时间',
                            ytitle: '位移(mm)',
                            seriestitle: '位移',
                            xdataname: 'presentDepth',
                            ydataname: 'variable',
                            ispolar: false
                        },
                    ]
                }
            },
            
        ],
    },
    'strain': {
        'selist': [
            {
                value: '0',
                label: '累计趋势图',
                only: '(kN)',
                isrootdata: false,
                responsetype: 'records',
                requesturl: '/found/pc/chat/selectChatDTO',
                options: {
                    id: '111',
                    optionslist: [
                        {
                            title: '累计趋势图',
                            id: '111-0',
                            charttype: 'line',
                            xshowtype: 'datetime',
                            xtitle: '时间',
                            ytitle: '轴力(kN)',
                            seriestitle: '轴力',
                            xdataname: 'date',
                            ydataname: 'sumVariable',
                            ispolar: false
                        },
                    ]
                }
            },
            {
                value: '1',
                label: '增量趋势图',
                only: '(kN)',
                isrootdata: false,
                responsetype: 'records',
                requesturl: '/found/pc/chat/selectChatDTO',
                options: {
                    id: '112',
                    optionslist: [
                        {
                            title: '增量趋势图',
                            id: '112-0',
                            charttype: 'line',
                            xshowtype: 'datetime',
                            xtitle: '时间',
                            ytitle: '轴力(kN)',
                            seriestitle: '轴力',
                            xdataname: 'date',
                            ydataname: 'variable',
                            ispolar: false
                        },
                    ]
                }
            }
        ],
    },
    'axialForce': {
        'selist': [
            {
                value: '0',
                label: '轴力趋势图',
                only: '(kN)',
                isrootdata: false,
                responsetype: 'records',
                requesturl: '/found/pc/chat/selectChatDTO',
                options: {
                    id: '111',
                    optionslist: [
                        {
                            title: '轴力趋势图',
                            id: '113-1',
                            charttype: 'line',
                            xshowtype: 'datetime',
                            xtitle: '时间',
                            ytitle: '轴力(kN)',
                            seriestitle: '轴力',
                            xdataname: 'date',
                            // ydataname: 'sumVariable',
                            ydataname: 'calculated',
                            ispolar: false
                        },
                    ]
                }
            },
            {
                value: '1',
                label: '增量趋势图',
                only: '(kN)',
                isrootdata: false,
                responsetype: 'records',
                requesturl: '/found/pc/chat/selectChatDTO',
                options: {
                    id: '112',
                    optionslist: [
                        {
                            title: '增量趋势图',
                            id: '112-0',
                            charttype: 'line',
                            xshowtype: 'datetime',
                            xtitle: '时间',
                            ytitle: '轴力(kN)',
                            seriestitle: '轴力',
                            xdataname: 'date',
                            ydataname: 'variable',
                            ispolar: false
                        },
                    ]
                }
            },
            {
                value: '2',
                label: '结果趋势图',
                only: '(kN)',
                isrootdata: false,
                responsetype: 'records',
                requesturl: '/found/pc/chat/selectChatDTO',
                options: {
                    id: '113',
                    optionslist: [
                        {
                            title: '结果趋势图',
                            id: '113-0',
                            charttype: 'line',
                            xshowtype: 'datetime',
                            xtitle: '时间',
                            ytitle: '轴力(kN)',
                            seriestitle: '轴力',
                            xdataname: 'date',
                            ydataname: 'calculated',
                            ispolar: false
                        },
                    ]
                }
            }
        ],
    },
}

const getDrawSetByType = function (type: IndexsKeys) {
    return defaultDrawSet[type].selist;
}

export {
    defaultDrawInfo, 
    defaultDrawSet,
    getDrawSetByType
};