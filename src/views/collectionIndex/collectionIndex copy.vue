<template>
    <div class="collectionIndex">
        <div class="collectionIndexView">
            <div class="collectionIndex-left">
                <p class="collectionIndex-left-title">
                    快捷导航
                </p>
                <div class="collectionIndex-left-main">
                    <div class="collectionIndex-left-main-flex">
                        <div class="flexItem" v-for="(item, index) in navLeftProps" :key="index">
                            <quick-nav :nav-model-data="item" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="collectionIndex-left">
                <p class="collectionIndex-left-title">
                    安全报警
                </p>
                <div class="collectionIndex-left-main">
                    <div class="collectionIndex-left-main-flex">
                        <div class="flexItem felxItem-alarm" v-for="(item, index) in navAlarmData" :key="index">
                            <alarming-nav :alarming-data="item" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="collectionIndex-left">
                <p class="collectionIndex-left-title">
                    项目基本信息
                </p>
                <div class="collectionIndex-left-main">
                    <div class="collectionIndex-left-main-table">
                        <el-table
                            :data="tableData"
                            :show-header="false"
                            border
                            style="width: 100%; height: 220px;">
                            <el-table-column
                            prop="name"
                            label="日期"
                            width="100"
                            >
                            </el-table-column>
                            <el-table-column
                            prop="address"
                            label="姓名"
                            >
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
        </div>
        <div class="collectionIndexView">
            <div class="collectionIndex-chartView">
                <p class="collectionIndex-left-title hasNoBorder">
                    设备异常统计
                </p>
                <div class="collectionIndex-chart" id="errorTotalChartContent">

                </div>
            </div>

            <div class="collectionIndex-chartView">
                <p class="collectionIndex-left-title hasNoBorder">
                    数据报警统计
                </p>
                <div class="collectionIndex-chart" id="alarmingTotalChartContent">

                </div>
            </div>
        </div>

        <div class="collectionIndexView">
            <div class="collectionIndex-chartView collectionIndex-chartView-bottom">
                <p class="collectionIndex-left-title hasNoBorder">
                    设备状态统计
                </p>
                <div class="collectionIndex-chart" id="statusTotalChartContent">

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import G2 from '@antv/g2';
import quickNav from '@/components/collectionIndexComponents/quickNavModel';
import alarmingNav from '@/components/collectionIndexComponents/alarmingModel';
export default {
    data () {
        return {
            navLeftProps: [
                {
                    name: '项目列表',
                    imgUrl: require('@/assets/imagesIcons/projectList.png')
                },{
                    name: '项目监测',
                    imgUrl: require('@/assets/imagesIcons/watching.png')                
                },{
                    name: '监测配置',
                    imgUrl: require('@/assets/imagesIcons/projectSetting.png')
                },{
                    name: '采集配置',
                    imgUrl: require('@/assets/imagesIcons/collectSetting.png')
                },{
                    name: '预警查询',
                    imgUrl: require('@/assets/imagesIcons/alarmingList.png')
                },{
                    name: '数据查询',
                    imgUrl: require('@/assets/imagesIcons/dataList.png')
                },{
                    name: '用户管理',
                    imgUrl: require('@/assets/imagesIcons/userCenter.png')
                },{
                    name: '系统设置',
                    imgUrl: require('@/assets/imagesIcons/stytemSetting.png')
                }
            ],
            navAlarmData: [
                {
                    name: '设备异常数量',
                    value: 5
                },
                {
                    name: '数据报警',
                    value: 1
                },{
                    name: '触发报警',
                    value: 3
                },{
                    name: '环境报警',
                    value: 2
                }
            ],
             tableData: [{
                date: '2016-05-02',
                name: '项目名称',
                address: '江苏如东风电场'
            }, {
                date: '2016-05-04',
                name: '项目地址',
                address: '江苏省南通市如东县'
            }, {
                date: '2016-05-01',
                name: '项目起始时间',
                address: '2019-01-01'
            }, {
                date: '2016-05-03',
                name: '项目状态',
                address: '已审批'
            }]
        }
    },
    components: {
        quickNav: quickNav,
        alarmingNav: alarmingNav
    },
    mounted () {
        // 绘制左侧折线图
        this.drawLeftChart('alarmingTotalChartContent');
        this.drawLeftChart('errorTotalChartContent');
        this.drawLeftChart('statusTotalChartContent');
    },
    methods: {
        drawLeftChart (chartsIdFromHtml) {
            let data = [
                { year: '2019-01', value: 3 },
                { year: '2019-02', value: 4 },
                { year: '2019-03', value: 3.5 },
                { year: '2019-04', value: 5 },
                { year: '2019-05', value: 4.9 },
                { year: '2019-06', value: 6 },
                { year: '2019-07', value: 7 },
                { year: '2019-08', value: 9 },
                { year: '2019-09', value: 13 },
                { year: '2019-10', value: 9 },
                { year: '2019-11', value: 13 },
                { year: '2019-12', value: 9 },
            ];
            data.forEach((item) => {
                item.value = Math.ceil(Math.random() * 10)
            })
            let chart = new G2.Chart({
                container: chartsIdFromHtml,
                forceFit: true,
                height: 350,
                padding: [30, 30, 30, 30]
            });
            chart.source(data);
            chart.scale('value', {
                min: 0
            });
            chart.scale('year', {
                range: [ 0, 1 ]
            });
            chart.tooltip({
                crosshairs: {
                    type: 'line'
                }
            });
            chart.line().position('year*value');
            chart.point().position('year*value')
                .size(4)
                .shape('circle')
                .style({
                    stroke: '#fff',
                    lineWidth: 1
                });
            chart.render();
        },
    }
}
</script>

<style lang="less" scoped>
@mainAsideBgColor: #5CACEE;
// @mainAsideBgColor: #edf1f5;
.collectionIndex {
    width: 100%;
    // height: 100%;
    .collectionIndexView {
        color: #fff;
        display: flex;
        justify-content: space-between;
        flex-wrap: nowrap;
        .collectionIndex-left {
            width: 32%;
            // height: 500px;
            background-color: #fff;
            border-radius: 4px;
            height: auto;
            .collectionIndex-left-title {
                width: 100%;
                height: 50px;
                line-height: 50px;
                color: #333;
                text-align: left;
                font-size: 22px;
                box-sizing: border-box;
                padding-left: 30px;
                border-bottom: 1px solid #999;
            }
            .collectionIndex-left-main {
                width: 100%;
                margin-top: 20px;
                .collectionIndex-left-main-flex {
                    width: 100%;
                    box-sizing: border-box;
                    padding: 30px;
                    padding-top: 0;
                    padding-bottom: 10px;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    .flexItem {
                        width: 23%;
                        height: 100px;
                        margin-bottom: 20px;
                    }
                    .felxItem-alarm {
                        width: 48%;
                    }
                }
                .collectionIndex-left-main-table {
                    width: 100%;
                    box-sizing: border-box;
                    padding: 30px;
                    padding-top: 0;
                    padding-bottom: 10px;
                    .el-table_1_column_2 {
                        background-color: @mainAsideBgColor;
                    }
                }
            }
        }
        .collectionIndex-chartView {
            width: 48%;
            background-color: #fff;
            margin-top: 30px;
            .collectionIndex-left-title {
                width: 100%;
                height: 50px;
                line-height: 50px;
                color: #333;
                text-align: left;
                font-size: 22px;
                box-sizing: border-box;
                padding-left: 30px;
                border-bottom: 1px solid #999;
            }
            .hasNoBorder {
                border-bottom: none; 
            }
            .collectionIndex-chart {
                width: 100%;
                height: 350px;
                box-sizing: border-box;
            }
        }
        .collectionIndex-chartView-bottom {
            width: 100% !important;
        }
    }
}
</style>