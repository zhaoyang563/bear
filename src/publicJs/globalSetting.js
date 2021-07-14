const globalUtils = {
    'timeFormatInfo':  {
        'shortcuts': [{
            text: '最近一周',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
            }
        }, {
            text: '最近一个月',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
            }
        }, {
            text: '最近三个月',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
            }
        }]
    },
    'locationSaveKey': 'cloudProjectSetInfo',
    'typeInfoTable': {
        "inclination": "倾斜监测",
        "sedimentation": "沉降监测",
        "waterLevel": "水位监测",
        "strain": "应变监测",
        "axialForce": "轴力监测",
        "photoShow": "拍照巡检",
    },
    /**
     * for chinese to type es
     */
    chineseToEs(type) {
        let typeInfoTable = {
            "inclination": "倾斜监测",
            "sedimentation": "沉降监测",
            "waterLevel": "水位监测",
            "strain": "应变监测",
            "axialForce": "轴力监测",
            "photoShow": "拍照巡检",
        };
        let result = '';
        for(let key in typeInfoTable) {
            if(type == typeInfoTable[key]) {
                result = key;
            }
        }
        return result;
    },
    /**
     * ajax station list
     */
    'requestStationListInfo': {
        "inclination": "found/incline/selectInclinePointByGroupId",
        "sedimentation": "found/settlement/selectSettlementPointByGroupId",
        "waterLevel": "found/water_level/selectWaterPointByGroupId",
        "strain": "found/strain/selectStrainPointByGroupId",
        "axialForce": "found/axial/selectAxialPointByGroupId",
        "photoShow": "",
    },
}

export default globalUtils;