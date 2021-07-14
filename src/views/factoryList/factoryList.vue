<template>
    <div class="box">
        <div class="btn">
            <el-button type="primary" @click="newAdd">新增厂家</el-button>
        </div>
        <div class="list">
            <el-table
                :data="factoryList"
                border
                style="width: 100%">
                <el-table-column
                    prop="factoryName"
                    label="传感器厂家名称"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="factoryId"
                    label="传感器厂家自定义编号"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="操作"
                    align="center">
                    <template slot-scope="scope">
                        <el-button @click="modify(scope.row.id)" type="text" size="small">修改</el-button>
                        <el-button @click="deleteFactory(scope.row.id)" type="danger" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog :title="dialogTitle" :visible.sync="addFactoryDialog" width="500px">
            <el-form :model="factoryForm">
                <el-form-item label="传感器厂家名称：" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="factoryForm.factoryName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="传感器厂家自定义编号：" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="factoryForm.factoryId" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addFactoryDialog = false">取 消</el-button>
                <el-button type="primary" @click="submitData">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data(){
        return{
            factoryList:[
                {
                    factoryName:'第一家',
                    factoryId:'abc123'
                }
            ],
            addFactoryDialog:false,
            dialogTitle:'新增传感器厂家',
            factoryForm:{
                factoryName:'',
                factoryId:''
            },
            formLabelWidth:'180px',
            id:''
        }
    },
    mounted(){
        this.getFactoryList()
    },
    methods:{
        // 获取厂家列表
        getFactoryList(){
            let url = '/found/factory/selectFactoryMessage'
            this.$axios.post(url).then(res => {
                if(res.data.status == 2000){
                    this.factoryList = res.data.body
                }else{
                    this.$message.error(res.data.msg)
                }
            })
        },
        // 新增按钮
        newAdd(){
            this.dialogTitle = '新增传感器厂家'
            this.addFactoryDialog = true
            this.factoryForm.factoryName = ''
            this.factoryForm.factoryId = ''
        },
        // 修改厂家信息
        modify(id){
            this.dialogTitle = '修改厂家信息'
            this.addFactoryDialog = true
            this.id = id
            let arr = this.factoryList
            for(let i = 0; i < arr.length; i++){
                if(arr[i].id == id){
                    this.factoryForm.factoryName = arr[i].factoryName
                    this.factoryForm.factoryId = arr[i].factoryId
                }
            }
        },
        // 提交数据
        submitData(){
            let obj = {}
            let url = ''
            let msg = ''
            if(this.dialogTitle == '新增传感器厂家'){
                obj = {
                    factoryName:this.factoryForm.factoryName,
                    factoryId:this.factoryForm.factoryId
                }
                url = '/found/factory/addFactoryMessage'
                msg = '新增成功'
            }else if(this.dialogTitle == '修改厂家信息'){
                obj = {
                    id:this.id,
                    factoryName:this.factoryForm.factoryName,
                    factoryId:this.factoryForm.factoryId
                }
                url = '/found/factory/updateFactoryMessage'
                msg = '修改成功'
            }
            this.$axios.post(url,obj).then(res => {
                if(res.data.status == 2000){
                    this.$message.success(msg)
                    this.getFactoryList()
                    this.addFactoryDialog = false
                }else{
                    this.$message.error(res.data.msg)
                }
            })
        },
        // 删除厂家
        deleteFactory(id){
            let url = '/found/factory/deleteFactoryMessage?id='
            this.$confirm('确认删除该厂家？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.post(url+id).then(res => {
                    if(res.data.status == 2000){
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getFactoryList()
                    }else {
                        this.$message({
                            type: 'success',
                            message: res.data.msg
                        });
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        }
    }
}
</script>
<style scoped>
    .btn{
        text-align: left;
        margin-bottom:20px;
    }
    .el-dialog .el-form-item{
        width: 90%;
    }
</style>