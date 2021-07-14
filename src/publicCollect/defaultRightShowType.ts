/// <reference path="publicInterface.d.ts" />

let defaultRightShowType: WantShowTypeInterface = {
    nameView: {
        name: '设备名称',
        isShow: true,
        dataList: {
            currentItem: {
                name: '设备1',
                value: '0'
            },
            dataList: [
                {
                    name: '设备1',
                    value: '0'
                },{
                    name: '设备2',
                    value: '1'
                },{
                    name: '设备3',
                    value: '2'
                },
            ]
        }
    },
    stationView: {
        name: '测点位置',
        isShow: true,
        dataList: {
            currentItem: {
                name: '设备1',
                value: '0'
            },
            dataList: [
                {
                    name: '设备1',
                    value: '0'
                },{
                    name: '设备2',
                    value: '1'
                },{
                    name: '设备3',
                    value: '2'
                },
            ]
        }
    },
    indexsView: {
        name: '展示指标',
        isShow: true,
        dataList: {
            isMultiple: true,
            multipleValueList: ['0','1'],
            currentItem: [{
                name: '设备1',
                value: '0'
            },{
                name: '设备2',
                value: '1'
            }],
            dataList: [
                {
                    name: '设备1',
                    value: '0'
                },{
                    name: '设备2',
                    value: '1'
                },{
                    name: '设备3',
                    value: '2'
                },
            ]
        }
    },
    timeDiffView: {
        name: '时间',
        isShow: true,
        isHistoryTime: '100',
        timeValue: {
            timeDiffValue: ['2020-03-02', '2020-03-12'],
            timePoint: '08:00:00'
        }
    },
    spaceView: {
        name: '数据点距',
        isShow: true,
        dataList: {
            currentItem: {
                name: '设备1',
                value: '0'
            },
            dataList: [
                {
                    name: '设备1',
                    value: '0'
                },{
                    name: '设备2',
                    value: '1'
                },{
                    name: '设备3',
                    value: '2'
                },
            ]
        }
    },
    arithmeticView: {
        name: '取点算法',
        isShow: true,
        dataList: {
            currentItem: {
                name: '设备1',
                value: '0'
            },
            dataList: [
                {
                    name: '设备1',
                    value: '0'
                },{
                    name: '设备2',
                    value: '1'
                },{
                    name: '设备3',
                    value: '2'
                },
            ]
        }
    },
    drawTypeView: {
        name: '绘图类型',
        isShow: true,
        dataList: {
            currentItem: {
                name: '设备1',
                value: '0'
            },
            dataList: [
                {
                    name: '设备1',
                    value: '0'
                },{
                    name: '设备2',
                    value: '1'
                },{
                    name: '设备3',
                    value: '2'
                },
            ]
        }
    },
}

let setRightShow = {
    /**
     * 根据对象设置名称
     */
    setName: (type: ShowTypeKey, name: string) => {
        defaultRightShowType[type].name = name;
    },
    /**
     * 控制显示隐藏
     */
    setIsShow: (type: ShowTypeKey, isShow: boolean) => {
        defaultRightShowType[type].isShow = isShow;
    },
    /**
     * 除了时间控制 其他的下拉框数据填充
     */
    setDataArray: (type: ShowTypeKeyNoTime, data: DateItemInterface[]) => {
        defaultRightShowType[type].dataList.dataList = data;
    },
    /**
     * 设置当前选中的对象
     * indexs展示指标的选中需要同步到多选数组
     */
    setCurrentData: (type: ShowTypeKeyNoTime, currentObj: DateItemInterface | DateItemInterface[]) => {
        if (type == 'indexsView') {
            defaultRightShowType[type].dataList.currentItem = currentObj;
            // 计算选中点
            let currentPointList: string[] = [];
            if (currentObj instanceof Array) {
                currentObj.forEach((item) => {
                    currentPointList.push('' + item.value);
                })
            }
            defaultRightShowType[type].dataList.multipleValueList = currentPointList;
        }else {
            defaultRightShowType[type].dataList.currentItem = currentObj;
        }
    },
    /**
     * 控制时间开关Switch
     */
    setTimeSwitchStatus: (status: '100'|'001') => {
        defaultRightShowType.timeDiffView.isHistoryTime = status;
    },
    /**
     * 设置历史时间段
     * 设置实时开始时间
     */
    setTimeValue: (timeValueList?: string[], timePointValue?: string) => {
        let defaultDateTime = new Date();
        let defaultDateInfo = {
            year: defaultDateTime.getFullYear(),
            month: defaultDateTime.getMonth() + 1,
            days: defaultDateTime.getDate() + 1,
            hours: defaultDateTime.getHours(),
            mins: defaultDateTime.getMinutes(),
            seconds: defaultDateTime.getSeconds(),
        }
        defaultRightShowType.timeDiffView.timeValue.timeDiffValue = timeValueList || 
            [defaultDateInfo.year + '-' + defaultDateInfo.month + '-' + (defaultDateInfo.days-1),
            defaultDateInfo.year + '-' + defaultDateInfo.month + '-' + defaultDateInfo.days];
        defaultRightShowType.timeDiffView.timeValue.timePoint = timePointValue || 
            defaultDateInfo.hours + ':' + defaultDateInfo.mins;
    },
}


export  {
    defaultRightShowType,
    setRightShow
};