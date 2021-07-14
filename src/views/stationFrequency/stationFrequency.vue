<template>
    <div class="box">
        <div class="title">
            当前页面：设置测点的采集频率
        </div>
        <div class="content">
            <div class="content_title">倾斜监测</div>
            <el-form :inline="true" :model="formInlineQx" class="demo-form-inline">
                <el-form-item label="当前测点：">
                    <el-select v-model="formInlineQx.currentPointId" placeholder="选择测点" @change="selectStationQx">
                        <el-option 
                            v-for="item in stationListQx"
                            :key="item.pointId"
                            :label="item.pointName" 
                            :value="item.pointId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="天数：">
                    <el-select v-model="formInlineQx.days" placeholder="选择天数">
                        <el-option 
                            v-for="item in dayList"
                            :key="item"
                            :label="item" 
                            :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="小时：">
                    <el-select v-model="formInlineQx.hours" placeholder="选择小时">
                        <el-option 
                            v-for="item in hourList"
                            :key="item"
                            :label="item" 
                            :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="分钟：">
                    <el-select v-model="formInlineQx.minutes" placeholder="选择分钟">
                        <el-option 
                            v-for="item in minuteList"
                            :key="item"
                            :label="item" 
                            :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item>
                    <el-button type="primary" size="max" @click="save">保存设置</el-button>
                </el-form-item> -->
            </el-form>
            <el-button type="primary" size="max" @click="submitData('倾斜监测')">保存设置</el-button>
        </div>
        <div class="content">
            <div class="content_title">水位监测</div>
            <el-form :inline="true" :model="formInlineSw" class="demo-form-inline">
                <el-form-item label="当前测点：">
                    <el-select v-model="formInlineSw.currentPointId" placeholder="选择测点" @change="selectStationSw">
                        <el-option 
                            v-for="item in stationListSw"
                            :key="item.pointId"
                            :label="item.pointName" 
                            :value="item.pointId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="天数：">
                    <el-select v-model="formInlineSw.days" placeholder="选择天数">
                        <el-option 
                            v-for="item in dayList"
                            :key="item"
                            :label="item" 
                            :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="小时：">
                    <el-select v-model="formInlineSw.hours" placeholder="选择小时">
                        <el-option 
                            v-for="item in hourList"
                            :key="item"
                            :label="item" 
                            :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="分钟：">
                    <el-select v-model="formInlineSw.minutes" placeholder="选择分钟">
                        <el-option 
                            v-for="item in minuteList"
                            :key="item"
                            :label="item" 
                            :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item>
                    <el-button type="primary" size="max" @click="save">保存设置</el-button>
                </el-form-item> -->
            </el-form>
            <el-button type="primary" size="max" @click="submitData('水位监测')">保存设置</el-button>
        </div>
        <div class="content">
            <div class="content_title">轴力监测</div>
            <el-form :inline="true" :model="formInlineZl" class="demo-form-inline">
                <el-form-item label="当前测点：">
                    <el-select v-model="formInlineZl.currentPointId" placeholder="选择测点" @change="selectStationZl">
                        <el-option 
                            v-for="item in stationListZl"
                            :key="item.pointId"
                            :label="item.pointName" 
                            :value="item.pointId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="天数：">
                    <el-select v-model="formInlineZl.days" placeholder="选择天数">
                        <el-option 
                            v-for="item in dayList"
                            :key="item"
                            :label="item" 
                            :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="小时：">
                    <el-select v-model="formInlineZl.hours" placeholder="选择小时">
                        <el-option 
                            v-for="item in hourList"
                            :key="item"
                            :label="item" 
                            :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="分钟：">
                    <el-select v-model="formInlineZl.minutes" placeholder="选择分钟">
                        <el-option 
                            v-for="item in minuteList"
                            :key="item"
                            :label="item" 
                            :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item>
                    <el-button type="primary" size="max" @click="save">保存设置</el-button>
                </el-form-item> -->
            </el-form>
            <el-button type="primary" size="max" @click="submitData('轴力监测')">保存设置</el-button>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                stationListQx:[],
                stationListSw:[],
                stationListZl:[],
                stationList:[],
                dayList:[],
                hourList:[],
                minuteList:[],
                formInlineQx: {
                    currentPointId:'all',
                    days: '00',
                    hours: '00',
                    minutes:'00'
                },
                formInlineSw: {
                    currentPointId:'all',
                    days: '00',
                    hours: '00',
                    minutes:'00'
                },
                formInlineZl: {
                    currentPointId:'all',
                    days: '00',
                    hours: '00',
                    minutes:'00'
                },
                currentType:'',   //当前测点类型
            }
        },
        mounted(){
            this.getAllStation()
            this.dayList = this.getArr(10)
            this.hourList = this.getArr(23)
            this.minuteList = this.getArr(59)
        },
        methods:{
            // 测点选择器选中值变化
            selectStationQx(value){
                this.formInlineQx.currentPointId = value
                let cmd = ''
                for(let i = 0; i < this.stationListQx.length;i++){
                    if(this.stationListQx[i].pointId == value){
                        cmd = this.stationListQx[i].cmd
                    }
                }
                let arr = cmd.split(",")
                console.log(arr)
                this.formInlineQx.days = arr[1]
                this.formInlineQx.hours = arr[2]
                this.formInlineQx.minutes = arr[3]
            },
            selectStationSw(value){
                this.formInlineSw.currentPointId = value
                let cmd = ''
                for(let i = 0; i < this.stationListSw.length;i++){
                    if(this.stationListSw[i].pointId == value){
                        cmd = this.stationListSw[i].cmd
                    }
                }
                let arr = cmd.split(",")
                this.formInlineSw.days = arr[1]
                this.formInlineSw.hours = arr[2]
                this.formInlineSw.minutes = arr[3]
            },
            selectStationZl(value){
                this.formInlineZl.currentPointId = value
                let cmd = ''
                for(let i = 0; i < this.stationListZl.length;i++){
                    if(this.stationListZl[i].pointId == value){
                        cmd = this.stationListZl[i].cmd
                    }
                }
                let arr = cmd.split(",")
                this.formInlineZl.days = arr[1]
                this.formInlineZl.hours = arr[2]
                this.formInlineZl.minutes = arr[3]
            },
            // 生成数组
            getArr(num){
                var arr = new Array();
                for(var i=0;i<num+1;i++){
                    if(i < 10){
                        arr.push('0'+i)
                    }else{
                        arr.push(i);
                    }
                    
                }
                return arr
            },
            // 保存
            save(){
                if(this.formInline.currentPointId == ''){
                    this.$message.error('请选择测点')
                    return
                }else{
                    this.submitData()
                }
                
            },
            // 封装数据并发送
            submitData(type){
                let obj = {}
                let url = ''
                switch(type){
                    case '水位监测':
                        if(this.formInlineSw.days == '--' || this.formInlineSw.hours == '--' || this.formInlineSw.minutes == '--'){
                            this.$message.error('请选择正确的时间')
                            return
                        }
                        url = this.formInlineSw.currentPointId == 'all' ? '/found/water_level/changeCmd' : '/found/water_level/updateWaterPoint';
                        let arrSw = this.stationListSw
                        let newArrSw = []
                        for(let i = 1; i < arrSw.length; i++){
                            newArrSw.push(arrSw[i].pointId)
                        }
                        console.log(newArrSw)
                        obj = {
                            cmd:','+this.formInlineSw.days+','+this.formInlineSw.hours+','+this.formInlineSw.minutes,
                            id:this.formInlineSw.currentPointId == 'all' ? newArrSw : this.formInlineSw.currentPointId,
                            timeStatus:1
                        };
                        break;
                    case '倾斜监测':
                        if(this.formInlineQx.days == '--' || this.formInlineQx.hours == '--' || this.formInlineQx.minutes == '--'){
                            this.$message.error('请选择正确的时间')
                            return
                        }
                        url = this.formInlineQx.currentPointId == 'all' ? '/found/incline/changeCmd' : '/found/incline/updateInclinePoint';
                        let arrQx = this.stationListQx
                        let newArrQx = []
                        for(let i = 1; i < arrQx.length; i++){
                            newArrQx.push(arrQx[i].pointId)
                        }
                        console.log(newArrQx)
                        obj = {
                            cmd:','+this.formInlineQx.days+','+this.formInlineQx.hours+','+this.formInlineQx.minutes,
                            id:this.formInlineQx.currentPointId == 'all' ? newArrQx : this.formInlineQx.currentPointId,
                            timeStatus:1
                        };
                        break;
                    case '轴力监测':
                        if(this.formInlineZl.days == '--' || this.formInlineZl.hours == '--' || this.formInlineZl.minutes == '--'){
                            this.$message.error('请选择正确的时间')
                            return
                        }
                        url = this.formInlineZl.currentPointId == 'all' ? '/found/axial/changeCmd' : '/found/axial/updateAxialPoint';
                        let arrZl = this.stationListZl
                        let newArrZl = []
                        for(let i = 1; i < arrZl.length; i++){
                            newArrZl.push(arrZl[i].pointId)
                        }
                        console.log(newArrZl)
                        obj = {
                            cmd:','+this.formInlineZl.days+','+this.formInlineZl.hours+','+this.formInlineZl.minutes,
                            id:this.formInlineZl.currentPointId == 'all' ? newArrZl : this.formInlineZl.currentPointId,
                            timeStatus:1
                        };
                        break;
                }
                this.$axios.post(url,obj).then(res => {
                    if(res.data.status == 2000){
                        this.$message.success('保存成功')
                        // 保存成功后重新获取测点的数据并回显
                        this.getAllStation()
                        
                    }
                })
            },
            // 判断所有的测点的cmd是否相同，相同就显示第一个的，不相同显示--
            setAllcmd(arr){
                let all = {
                    pointName:'所有',
                    cmd:'',
                    pointId:'all'
                }
                let first = arr[0].cmd
                var everyResult = arr.every(function(item) {
                    return item.cmd == first;
                });
                console.log(everyResult)
                if(everyResult == true){
                    all.cmd = first
                }else{
                    all.cmd = '--,--,--,--'
                }
                // console.log(all)
                return all
            },
            // 获取所有测点
            getAllStation(){
                let subprojectIdArr = [247,224,225]
                let url = '/found/pc/map/selectChatDTO?subprojectId='
                let promiseArr = []
                subprojectIdArr.map(item => {
                    let x = this.$axios.get(url+item)
                    promiseArr.push(x)
                })
                // res.data.body
                let stationArr = []
                Promise.all(promiseArr)
                .then(resd => {
                    for(let i = 0 ; i < resd.length; i++){
                        if(resd[i].data.status == 2000){
                            this.stationListQx = resd[0].data.body
                            this.stationListSw = resd[1].data.body
                            this.stationListZl = resd[2].data.body
                        }
                    }
                    for(let i = 0; i < this.stationListQx.length;i++){

                    }
                    this.stationListQx.unshift(this.setAllcmd(this.stationListQx))
                    this.stationListSw.unshift(this.setAllcmd(this.stationListSw))
                    this.stationListZl.unshift(this.setAllcmd(this.stationListZl))
                    console.log(this.stationListQx)
                    console.log(this.stationListSw)
                    console.log(this.stationListZl)
                    // 如果有选中的就设置选中的
                    if(this.formInlineQx.currentPointId){
                        this.selectStationQx(this.formInlineQx.currentPointId)
                    }
                    if(this.formInlineSw.currentPointId){
                        this.selectStationSw(this.formInlineSw.currentPointId)
                    }
                    if(this.formInlineZl.currentPointId){
                        this.selectStationZl(this.formInlineZl.currentPointId)
                    }
                    
                })
            },
        }
    }
    
</script>
<style scoped>
    .title{
        height:70px;
        line-height:70px;
        color:#fff;
        font-size:20px;
        text-align:left;
        padding-left:30px;
        box-shadow: inset 0 0 10px rgb(255 255 255 / 80%);
    }
    .content{
        margin-top: 50px;
        padding: 30px 0;
        border: 1px solid #ccc;
        position: relative;
        color: #fff;
    }
    .content_title{
        width: 100px;
        height: 50px;
        font-size: 20px;
        line-height: 50px;
        background: #07122d;
        /* background: #ff0000; */
        position: absolute;
        top: -25px;
        left: 30px;
    }
    .el-form {
        display: flex;
        justify-content: space-around;
    }
    .el-button{
        width: 40%;
    }
</style>