/// <reference path="publicInterface.d.ts" />

const defaultProjectSet:any[] = [
    {
        name: '基础变形',
        value: 'deformation',
        isshow: true,
    },
    {
        name: '塔筒振动',
        value: 'upvibration',
        isshow: true,
    },
    {
        name: '应变监测',
        value: 'strain',
        isshow: true,
    },
    {
        name: '叶轮振动',
        value: 'wheelvibration',
        isshow: false,
    },
    {
        name: '塔筒载荷',
        value: 'bottompolarization',
        isshow: false,
    },
    {
        name: '锚索应力',
        value: 'anchorforce',
        isshow: false,
    },
    {
        name: '螺栓应力',
        value: 'boltforce',
        isshow: false,
    },
    {
        name: '钢筋应力',
        value: 'rebarforce',
        isshow: false,
    },
    {
        name: '缝隙开度',
        value: 'gap',
        isshow: false,
    },
]


export {
    defaultProjectSet, 
};