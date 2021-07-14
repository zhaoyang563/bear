<template>
    <div class="upLoad">
        <div class="upLoad1">
            <el-upload
            class="upload-demo"
            :action="url1"
            :on-change="handleChange1"
            :file-list="fileList1"
            :on-success="success"
            :before-upload="beforeAvatarUpload1">
            <el-button size="small" type="primary">点击上传创建数据导入</el-button>
            <div slot="tip" class="el-upload__tip">只能上传.txt文件</div>
            </el-upload>
        </div>
        <div class="upLoad2">
            <el-upload
            class="upload-demo"
            :action="url2"
            :on-change="handleChange2"
            :file-list="fileList2"
            :on-success="success"
            :before-upload="beforeAvatarUpload2">
            <el-button size="small" type="primary">点击上传采集卡入库</el-button>
            <div slot="tip" class="el-upload__tip">只能上传.xlsx文件</div>
            </el-upload>
        </div>
        <div class="upLoad3">
            <el-dropdown @command="handleCommand">
                <span style="cursor: pointer;color: #409EFF;">
                    选中的厂家：{{currentFactory.factoryName}}<i class="el-icon-arrow-down el-icon--right" style="font-size:12px"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                        v-for="(factoryItem,factoryIndex) in factoryList"
                        :key="factoryIndex"
                        :command='factoryItem'>
                        {{factoryItem.factoryName}}
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>  
            <el-upload
            class="upload-demo"
            :action="url3"
            :on-change="handleChange3"
            :file-list="fileList3"
            :on-success="success"
            :data='userId'
            name="formulaFile"
            :before-upload="beforeAvatarUpload3">
            <el-button size="small" type="primary">点击上传计算公式</el-button>
            <div slot="tip" class="el-upload__tip">只能上传.xlsx文件</div>
            </el-upload>
        </div>
        <div class="upLoad4">
            <el-upload
            class="upload-demo"
            :action="url4"
            :on-change="handleChange4"
            :file-list="fileList4"
            :on-success="success"
            :before-upload="beforeAvatarUpload4">
            <el-button size="small" type="primary">点击上传报表</el-button>
            <div slot="tip" class="el-upload__tip">只能上传.xlsx或.xls文件</div>
            </el-upload>
        </div>
    </div>    
</template>
<script>
export default {
    data(){
        return{
            url1:this.$axios.defaults.baseURL+'found/pc/data/importExcel',
            url2:this.$axios.defaults.baseURL+'found/pc/traffic/importTrafficCard',
            url3:this.$axios.defaults.baseURL+'found/factory/uploadFormulaExcel',
            url4:this.$axios.defaults.baseURL+'found/report/upload',
            fileList1:[],
            fileList2:[],
            fileList3:[],
            fileList4:[],
            userId:{
                userId:'',
                factoryId:''
            },
            factoryList:[],
            currentFactory:{
                factoryName:'请选择厂家',
                factoryId:''
            }
        }
    },
    mounted(){
        this.getFactoryList()
        let userInfoForLocal = localStorage.getItem('userLoginInfo')
        userInfoForLocal = JSON.parse(userInfoForLocal)
        this.userId.userId = userInfoForLocal.id
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
        // 下拉框选中事件
        handleCommand(command){
            console.log(command)
            this.currentFactory = command
            this.userId.factoryId = command.factoryId
        },
        handleChange1(file, fileList) {
            let res = this.getSuffix(file)
            if(res == 'txt'){
                // this.fileList = fileList.slice(-3);
                this.fileList = fileList
            }
        },
        // 上传之前的校验文件类型
        beforeAvatarUpload1(file) {
            let res = this.getSuffix(file)
            const isTxt = res === 'txt'
            if(!isTxt){
                this.$message.error('只能上传后缀为.txt的文件')
            }
            return isTxt
        },
        handleChange2(file, fileList) {
            let res = this.getSuffix(file)
            if(res == 'xlsx'){
                // this.fileList = fileList.slice(-3);
                this.fileList = fileList
            }
        },
        // 上传之前的校验文件类型
        beforeAvatarUpload2(file) {
            let res = this.getSuffix(file)
            const isTxt = res === 'xlsx'
            if(!isTxt){
                this.$message.error('只能上传后缀为.xlsx的文件')
            }
            return isTxt
        },
        handleChange3(file, fileList) {
            let res = this.getSuffix(file)
            if(res == 'xlsx'){
                // this.fileList = fileList.slice(-3);
                this.fileList = fileList
            }
        },
        // 上传之前的校验文件类型
        beforeAvatarUpload3(file) {
            let res = this.getSuffix(file)
            const isTxt = res === 'xlsx'
            if(!isTxt){
                this.$message.error('只能上传后缀为.xlsx的文件')
            }
            return isTxt
        },
        handleChange4(file, fileList) {
            let res = this.getSuffix(file)
            if(res == 'xlsx' || res == 'xls'){
                // this.fileList = fileList.slice(-3);
                this.fileList = fileList
            }
        },
        // 上传之前的校验文件类型
        beforeAvatarUpload4(file) {
            let res = this.getSuffix(file)
            const isTxt = (res === 'xlsx' || res === 'xls')
            if(!isTxt){
                this.$message.error('只能上传后缀为.xlsx或.xls的文件')
            }
            return isTxt
        },
        // 上传成功的钩子
        success(response, file, fileList){
            console.log(response, file, fileList)
            if(response.status == 2000){
                this.$message.success('上传成功')
            }else{
                this.$message.error(response.msg)
            }
        },
        // 获取上传文件的后缀
        getSuffix(file){
            let str = file.name
            let res = str.split('.')[1]
            return res
        }
    }
}
</script>
<style scoped>
    .upLoad{
        display: flex;
        height: 100%;
        justify-content: space-around;
        flex-wrap: wrap;
    }
    .upLoad > div{
        width: 45%;
        height: 45%;
        /* background: #ccc; */
        box-shadow: 0 2px 16px #ccc, 0 0 1px #ccc, 0 0 1px #ccc;  

        position: relative
    }
    .upLoad .upload-demo{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .upLoad1{
        /* width: 200px; */
    }
    .el-dropdown{
        top:30%;
        font-size: 16px;
    }
</style>