<template>
    <div class="collectionIndex">
        <div class="report-detail">
            <div class="report-title">
                <el-col v-for="item in reportTableTopInfo" :key="item" :span='item.widthCol'>
                    <template v-if="item.children != null &&item.children.length>0">
                        <el-col v-for="child in item.children" :key="child" :span='child.widthCol'>
                            <div class="full-item">
                                {{child.value}}
                            </div>
                        </el-col>
                    </template>
                    <template v-else>
                        <div class="full-item text-center">
                            {{item.value}}
                        </div>
                    </template>
                </el-col> 

                <template v-if="reportType=='沉降测点'" >
                    <el-col :span='24'>
                        <el-col :span='2'>
                            <div class="table-item text-center">
                                测点编号
                            </div>
                        </el-col>
                        <el-col :span='6'>
                            <div class="text-center ax-flex">
                                <div class="clear-height">
                                    <p :style="{'width':'100%'}">沉降变化率(mm/d)</p>
                                </div>
                                <div class="clear-height">
                                    <div class="half-width-item">
                                    变化速率
                                    </div>
                                    <div class="half-width-item">
                                    累计变量
                                    </div>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span='5'>
                            <div class="table-item text-center">
                                初始高程(m)
                            </div>
                        </el-col>
                        <el-col :span='5'>
                            <div class="table-item text-center">
                                上次高程(m)
                            </div>
                        </el-col>
                        <el-col :span='5'>
                            <div class="table-item text-center">
                                本次高程(m)
                            </div>
                        </el-col>
                        <el-col :span='1'>
                            <div class="table-item text-center">
                                备注
                            </div>
                        </el-col>
                    </el-col>
                    <el-col :span='24' v-for="(item,index) in reportDetailData.reportContentList" :key="index">
                        <el-col :span='2'>
                            <div class="table-item text-center">
                                {{item.pointName}}
                            </div>
                        </el-col>
                        <el-col :span='3'>
                            <div class="table-item text-center">
                                {{item.variable}}
                            </div>
                        </el-col>
                        <el-col :span='3'>
                            <div class="table-item text-center">
                                {{item.sumVariable}}
                            </div>
                        </el-col>
                        <el-col :span='5'>
                            <div class="table-item text-center">
                                --
                            </div>
                        </el-col>
                        <el-col :span='5'>
                            <div class="table-item text-center">
                                --
                            </div>
                        </el-col>
                        <el-col :span='5'>
                            <div class="table-item text-center">
                                --
                            </div>
                        </el-col>
                        <el-col :span='1'>
                            <div class="table-item text-center">
                                
                            </div>
                        </el-col>
                    </el-col>
                </template>

                <template v-if="reportType=='水位测点'">
                    <el-col :span='24'>
                        <el-col :span='2'>
                            <div class="table-item text-center">
                                测点编号
                            </div>
                        </el-col>
                        <el-col :span='9'>
                            <div class="text-center ax-flex">
                                <div class="clear-height">
                                    <p :style="{'width':'100%'}">水位高程(m)</p>
                                </div>
                                <div class="clear-height">
                                    <el-col :span='8'>
                                        <div class="text-center ax-flex">
                                            <div class="clear-height">
                                                <p :style="{'width':'100%'}">初始(m)</p>
                                            </div>
                                        </div>
                                    </el-col>
                                    <el-col :span='8'>
                                        <div class="text-center ax-flex">
                                            <div class="clear-height">
                                                <p :style="{'width':'100%'}">上次(m)</p>
                                            </div>
                                        </div>
                                    </el-col>
                                    <el-col :span='8'>
                                        <div class="text-center ax-flex">
                                            <div class="clear-height">
                                                <p :style="{'width':'100%'}">本次(m)</p>
                                            </div>
                                        </div>
                                    </el-col>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span='6'>
                            <div class="table-item text-center">
                                本次变化量(mm/d)
                            </div>
                        </el-col>
                        <el-col :span='6'>
                            <div class="table-item text-center">
                                累计变化量(mm)
                            </div>
                        </el-col>
                        <el-col :span='1'>
                            <div class="table-item text-center">
                                备注
                            </div>
                        </el-col>
                    </el-col>
                    <el-col :span='24' v-for="(item,index) in reportDetailData.reportContentList" :key="index">
                        <el-col :span='2'>
                            <div class="table-item text-center">
                                {{item.pointName}}
                            </div>
                        </el-col>
                        <el-col :span='3'>
                            <div class="table-item text-center">
                                --
                            </div>
                        </el-col>
                        <el-col :span='3'>
                            <div class="table-item text-center">
                                --
                            </div>
                        </el-col>
                        <el-col :span='3'>
                            <div class="table-item text-center">
                                --
                            </div>
                        </el-col>
                        <el-col :span='6'>
                            <div class="table-item text-center">
                                {{item.variable}}
                            </div>
                        </el-col>
                        <el-col :span='6'>
                            <div class="table-item text-center">
                                {{item.sumVariable}}
                            </div>
                        </el-col>
                        <el-col :span='1'>
                            <div class="table-item text-center">
                                
                            </div>
                        </el-col>
                    </el-col>
                </template>

                <template v-if="reportType=='轴力测点'">
                    <el-col :span='24'>
                        <el-col :span='2'>
                            <div class="table-item text-center">
                                测点编号
                            </div>
                        </el-col>
                        <el-col :span='12'>
                            <div class="text-center ax-flex">
                                <div class="clear-height">
                                    <p :style="{'width':'100%'}">轴力值(kN)</p>
                                </div>
                                <div class="clear-height">
                                    <el-col :span='6'>
                                        <div class="text-center ax-flex">
                                            <div class="clear-height">
                                                <p :style="{'width':'100%'}">上次</p>
                                            </div>
                                        </div>
                                    </el-col>
                                    <el-col :span='6'>
                                        <div class="text-center ax-flex">
                                            <div class="clear-height">
                                                <p :style="{'width':'100%'}">本次</p>
                                            </div>
                                        </div>
                                    </el-col>
                                    <el-col :span='6'>
                                        <div class="text-center ax-flex">
                                            <div class="clear-height">
                                                <p :style="{'width':'100%'}">本次变化量</p>
                                            </div>
                                        </div>
                                    </el-col>
                                    <el-col :span='6'>
                                        <div class="text-center ax-flex">
                                            <div class="clear-height">
                                                <p :style="{'width':'100%'}">累计变化量</p>
                                            </div>
                                        </div>
                                    </el-col>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span='6'>
                            <div class="text-center ax-flex">
                                <div class="clear-height">
                                    <p :style="{'width':'100%'}">报警值(kN)</p>
                                </div>
                                <div class="clear-height">
                                    <el-col :span='12'>
                                        <div class="text-center ax-flex">
                                            <div class="clear-height">
                                                <p :style="{'width':'100%'}">最大值</p>
                                            </div>
                                        </div>
                                    </el-col>
                                    <el-col :span='12'>
                                        <div class="text-center ax-flex">
                                            <div class="clear-height">
                                                <p :style="{'width':'100%'}">最小值</p>
                                            </div>
                                        </div>
                                    </el-col>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span='3'>
                            <div class="table-item text-center">
                                位置
                            </div>
                        </el-col>
                        <el-col :span='1'>
                            <div class="table-item text-center">
                                备注
                            </div>
                        </el-col>
                    </el-col>
                    <el-col :span='24' v-for="(item,index) in reportDetailData.axialReportContentList" :key="index">
                        <el-col :span='2'>
                            <div class="table-item text-center">
                                {{item.pointName}}
                            </div>
                        </el-col>
                        <el-col :span='3'>
                            <div class="table-item text-center">
                                <!-- -- -->
                                {{item.lastElev}}
                            </div>
                        </el-col>
                        <el-col :span='3'>
                            <div class="table-item text-center">
                                <!-- ---- -->
                                {{item.finalElev}}
                            </div>
                        </el-col>
                        <el-col :span='3'>
                            <div class="table-item text-center">
                                {{item.variable}}
                            </div>
                        </el-col>
                        <el-col :span='3'>
                            <div class="table-item text-center">
                                {{item.sumVariable}}
                            </div>
                        </el-col>
                        <el-col :span='3'>
                            <div class="table-item text-center">
                                {{item.maximum}}
                            </div>
                        </el-col>
                        <el-col :span='3'>
                            <div class="table-item text-center">
                                {{item.minimum}}
                            </div>
                        </el-col>
                        <el-col :span='3'>
                            <div class="table-item text-center">
                                --
                            </div>
                        </el-col>
                        <el-col :span='1'>
                            <div class="table-item text-center">
                                
                            </div>
                        </el-col>
                    </el-col>
                </template>

                <template v-if="reportType=='应变测点'">
                    <el-col :span='24'>
                        <el-col :span='2'>
                            <div class="table-item text-center">
                                测点编号
                            </div>
                        </el-col>
                        <el-col :span='20'>
                            <div class="text-center ax-flex">
                                <div class="clear-height">
                                    <p :style="{'width':'100%'}">应变值(KN)</p>
                                </div>
                                <div class="clear-height">
                                    <el-col :span='6'>
                                        <div class="text-center ax-flex">
                                            <div class="clear-height">
                                                <p :style="{'width':'100%'}">上次</p>
                                            </div>
                                        </div>
                                    </el-col>
                                    <el-col :span='6'>
                                        <div class="text-center ax-flex">
                                            <div class="clear-height">
                                                <p :style="{'width':'100%'}">本次</p>
                                            </div>
                                        </div>
                                    </el-col>
                                    <el-col :span='6'>
                                        <div class="text-center ax-flex">
                                            <div class="clear-height">
                                                <p :style="{'width':'100%'}">本次变化量</p>
                                            </div>
                                        </div>
                                    </el-col>
                                    <el-col :span='6'>
                                        <div class="text-center ax-flex">
                                            <div class="clear-height">
                                                <p :style="{'width':'100%'}">累计变化量</p>
                                            </div>
                                        </div>
                                    </el-col>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span='2'>
                            <div class="table-item text-center">
                                备注
                            </div>
                        </el-col>
                    </el-col>
                    <el-col :span='24'>
                        <el-col :span='2'>
                            <div class="table-item text-center">
                                11
                            </div>
                        </el-col>
                        <el-col :span='5'>
                            <div class="table-item text-center">
                                11
                            </div>
                        </el-col>
                        <el-col :span='5'>
                            <div class="table-item text-center">
                                11
                            </div>
                        </el-col>
                        <el-col :span='5'>
                            <div class="table-item text-center">
                                11
                            </div>
                        </el-col>
                        <el-col :span='5'>
                            <div class="table-item text-center">
                                11
                            </div>
                        </el-col>
                        <el-col :span='2'>
                            <div class="table-item text-center">
                                11
                            </div>
                        </el-col>
                    </el-col>
                </template>

                <template v-if="reportType=='倾斜测点'">
                    <el-col :span='24'>
                        <el-col :span='2'>
                            <div class="table-item text-center">
                                测点编号
                            </div>
                        </el-col>
                        <el-col :span='2'>
                            <div class="table-item text-center">
                                深度
                            </div>
                        </el-col>
                        <el-col :span='10'>
                            <div class="text-center ax-flex">
                                <div class="clear-height">
                                    <p :style="{'width':'100%'}">累计位移量(mm)</p>
                                </div>
                                <div class="clear-height">
                                    <el-col :span='12'>
                                        <div class="text-center ax-flex">
                                            <div class="clear-height">
                                                <p :style="{'width':'100%'}">上次</p>
                                            </div>
                                        </div>
                                    </el-col>
                                    <el-col :span='12'>
                                        <div class="text-center ax-flex">
                                            <div class="clear-height">
                                                <p :style="{'width':'100%'}">本次</p>
                                            </div>
                                        </div>
                                    </el-col>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span='4'>
                            <div class="table-item text-center">
                                本次变量(mm)
                            </div>
                        </el-col>
                        <el-col :span='4'>
                            <div class="table-item text-center">
                               变化速率(mm)
                            </div>
                        </el-col>
                        <el-col :span='2'>
                            <div class="table-item text-center">
                                备注
                            </div>
                        </el-col>
                    </el-col>
                    <el-col :span='24' v-for="(item,index) in reportDetailData.inclineReportContentList" :key="index">
                        <el-col :span='2'>
                            <div class="table-item text-center">
                                {{item.pointName}}
                            </div>
                        </el-col>
                        <el-col :span='2'>
                            <div class="table-item text-center">
                                {{item.presentDepth}}
                            </div>
                        </el-col>
                        <el-col :span='5'>
                            <div class="table-item text-center">
                                {{item.lastSumVariable}}
                            </div>
                        </el-col>
                        <el-col :span='5'>
                            <div class="table-item text-center">
                                {{item.sumVariable}}
                            </div>
                        </el-col>
                        <el-col :span='4'>
                            <div class="table-item text-center">
                                {{item.variable}}
                            </div>
                        </el-col>
                        <el-col :span='4'>
                            <div class="table-item text-center">
                                {{item.finalElev}}
                            </div>
                        </el-col>
                        <el-col :span='2'>
                            <div class="table-item text-center">
                                
                            </div>
                        </el-col>
                    </el-col>
                </template>

                <el-col :span='24' v-for="(item,index) in reportDetailData.endData.accumulatedMaxDataList" :key="index">
                    <el-col :span='3'>
                        <div class="table-item text-center">
                            累计最大测点:
                        </div>
                    </el-col>
                    <el-col :span='3'>
                        <div class="table-item text-center">
                            {{item.accumulatedMaxPoint}}
                        </div>
                    </el-col>
                    <el-col :span='3'>
                        <div class="table-item text-center">
                            累计最大:
                        </div>
                    </el-col>
                    <el-col :span='3'>
                         <div class="table-item text-center">
                            {{item.accumulatedMax}}
                        </div>
                    </el-col>
                    <el-col :span='3'>
                         <div class="table-item text-center">
                            速率最大测点:
                        </div>
                    </el-col>
                    <el-col :span='3'>
                         <div class="table-item text-center">
                            {{reportDetailData.endData.rateMaxDataList[index] != null && reportDetailData.endData.rateMaxDataList[index].rateMaxPoint != undefined?
                            reportDetailData.endData.rateMaxDataList[index].rateMaxPoint:'--'}}
                        </div>
                    </el-col>
                    <el-col :span='3'>
                         <div class="table-item text-center">
                            速率最大:
                        </div>
                    </el-col>
                    <el-col :span='3'>
                         <div class="table-item text-center">
                            {{reportDetailData.endData.rateMaxDataList[index]!=null&&reportDetailData.endData.rateMaxDataList[index].rateMax!=undefined?
                            reportDetailData.endData.rateMaxDataList[index].rateMax:'--'}}
                        </div>
                    </el-col>
                </el-col>   
            </div>
        </div>
    </div>
</template>

<script>
import ReportInfo from '../../publicJs/reportInfo'
export default {
    data() {
        return {
            reportTableTopInfo: {},
            reportType: '4',
            reportDetailData: {}
        }
    },
    mounted() {
        console.log(this.$route)
        this.reportDetailData = JSON.parse(this.$route.query.context);
        this.reportType = this.$route.query.type
        console.log(this.reportDetailData)
        this.reportTableTopInfo = ReportInfo.tabelTopInfo;
        // 制作表头数据
        this.reportTableTopInfo.forEach(reportTopItem => {
            if(reportTopItem.name != '') {
                reportTopItem.value = this.reportDetailData.headData[reportTopItem.name]
            }else if(reportTopItem.children != null) {
                reportTopItem.children.forEach(childItem => {
                    if(childItem.name != '') {
                        childItem.value = this.reportDetailData.headData[childItem.name]
                    }
                })
            }
        })
    },
}
</script>
<style lang="less" scoped>
.collectionIndex * {
    font-size: 16px;
}
.grid-content {
    background-color: #fff;
    border-bottom: 1px solid #e2e2e2;
    height: 50px;
    line-height: 50px;
    border: 1px solid #e2e2e2;
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    box-sizing: border-box;
    padding: 0 15px;
    .item-view {
        width: 50%;
        text-align: left;
    }
}
.full-item {
    width: 100%;
    height: 50px;
    line-height: 50px;
    border: 1px solid #e2e2e2;
    border-top: none;
    background-color: #fff;
    text-align: left;
    box-sizing: border-box;
    padding: 0 16px;
}
.text-center {
    text-align: center;
}
.table-item {
    width: 100%;
    height: 50px;
    line-height: 50px;
    border: 1px solid #e2e2e2;
    border-top: none;
    background-color: #fff;
    text-align: center;
}
.ax-flex {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.clear-height {
    width: 100%;
    height: 25px;
    line-height: 25px;
    border: 1px solid #e2e2e2;
    border-top: none;
    background-color: #fff;
    text-align: center !important;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}
.half-width-item {
    width: 50%;
    height: 100%;
    background-color: #fff;
    text-align: center;
}
</style>

