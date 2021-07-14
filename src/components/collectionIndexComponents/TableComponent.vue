<template>
  <div class="tableView">
    <el-table
        ref="multipleTable"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            prop="id"
            label="传感器Id"
        >
        </el-table-column>
        <el-table-column
            prop="name"
            label="传感器名称"
        >
        </el-table-column>
        <el-table-column
            prop="groupName"
            label="所属测点名称">
        </el-table-column>
        <el-table-column
            prop="isThisGroup"
            label="是否本测点">
        </el-table-column>
        <!-- <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                size="mini"
                @click="showIsChangeSensorInfo(row)">查看本传感器</el-button>
            </template>
        </el-table-column> -->
    </el-table>
    <div class="tableBtnView">
        <el-button @click="beforeMultipleSetSensorsToStation">批量设置选中传感器到测点</el-button>
    </div>
    <!-- 提示信息 -->
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        :center="true"
        :modal="false"
        width="30%"
    >
        <span>当前所选传感器存在于其他测点中，是否确定移入本测点</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancelShowDialog">取 消</el-button>
            <el-button type="primary" @click="multipleSetSensorsToStation">确 定</el-button>
        </span>
    </el-dialog>
    <div v-if="isChangeSensorInfo">
        <change-sensorInfo
            :currentPhysical='physical'
            @closeCurrentpage="hideIsChangeSensorInfo"
            ></change-sensorInfo>
    </div>
  </div>
</template>

<script>
// 引入传感器组件
// import ChangeSensorInfo from './ChangeSensorInfo'
export default {
    props: [
        'tableData',
        'physical'
    ],
    data () {
        return {
            currentMulitipleDataList: [], // 选中的传感器数组
            dialogVisible: false, // 显示弹出层
            isChangeSensorInfo: false, // 显示修改传感器窗口
        }
    },
    components: {
        // ChangeSensorInfo
    },
    methods: {
        handleEdit (key, value) {
            console.log(key)
            console.log(value)
            this.$emit('changeTableData', key, value)
        },
        handleDelete (key, value) {
            this.$emit('removeItemTableData', key, value)
        },
        /**
         * 多选传感器
         */
        handleSelectionChange(rows) {
            // console.log(rows)
            // 1.0 设置当前选中的传感器到data上
            this.currentMulitipleDataList = rows;
        },
        /**
         * 批量设置传感器到测点
         */
        multipleSetSensorsToStation() {
            this.$emit('sensorlistStation', this.currentMulitipleDataList);
            this.dialogVisible = false;
        },
        /**
         * 点击设置传感器到测点的时候判断所选中是否存在不同groupId的传感器
         */
        beforeMultipleSetSensorsToStation() {
            this.currentMulitipleDataList.forEach((item) => {
                if (item.isThisGroup == '否' && item.groupId != null) {
                    this.dialogVisible = true;
                    return;
                }
            })
            this.multipleSetSensorsToStation();
        },
        cancelShowDialog() {
            this.dialogVisible = false;
        },
        /**
         * 控制显示传感器修改窗口
         */
        showIsChangeSensorInfo(row) {
            this.isChangeSensorInfo = true;
            console.log(row)
        },
        /**
         * 控制隐藏传感器修改窗口
         */
        hideIsChangeSensorInfo() {
            this.isChangeSensorInfo = false;
        },
    }
}
</script>

<style scoped>
.tableView {
    width: 100%;
}
.tableView >>> .has-gutter .cell {
    font-size: 20px;
    font-weight: normal;
    color: #333;
}
.tableView >>> .el-table__body .cell {
    font-size: 18px;
    font-weight: normal;
    color: #666;
}
.tableBtnView {
    text-align: left;
    margin-top: 30px;
}
</style>

