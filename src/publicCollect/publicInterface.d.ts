interface WantShowTypeInterface {
    nameView: PublicDataInterface;
    stationView: PublicDataInterface;
    indexsView: PublicDataInterface;
    timeDiffView: TimeDiffInterface;
    spaceView: PublicDataInterface;
    arithmeticView: PublicDataInterface;
    drawTypeView: PublicDataInterface;
}

interface PublicDataInterface {
    name: string;
    isShow: boolean;
    dataList: DateListInterface;
}

interface DateListInterface {
    currentItem: DateItemInterface|DateItemInterface[];
    isMultiple?: boolean;
    multipleValueList?: string[];
    dataList: DateItemInterface[];
}

interface DateItemInterface {
    name: string|number;
    value: string|number;
}

interface TimeDiffInterface {
    name: string;
    isShow: boolean;
    isHistoryTime: string;
    timeValue: TimeInterface;
}

interface TimeInterface {
    timeDiffValue: string[];
    timePoint: string;
}

/**
 * 绘图数据初始化格式
 */
interface DrawInfo {
    "inclination": DrawInfoItem;
    "sedimentation": DrawInfoItem;
    "waterLevel": DrawInfoItem;
    "strain": DrawInfoItem;
    "axialForce": DrawInfoItem;
}

interface DrawInfoItem {
    indexsList: DateItemInterface[];
    default: string[];
}

interface ChildRightCompTran {
    index: ShowTypeKeyNoTime;
    value: string|string[];
    item: PublicDataInterface;
}


type ShowTypeKey = 'nameView' | 'stationView' | 'indexsView' | 'timeDiffView' | 'spaceView' | 'arithmeticView' | 'drawTypeView';
type ShowTypeKeyNoTime = 'nameView' | 'stationView' | 'indexsView' | 'spaceView' | 'arithmeticView' | 'drawTypeView';
type IndexsKeys = 'inclination' | 'sedimentation' | 'waterLevel' | 'strain' | 'axialForce';
// type IndexsKeys = 'voice' | 'video' | 'upvibration' | 'bottompolarization' | 'deformation' | 'environmental' | 'strain';