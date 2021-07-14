
module.exports = {
    testjs: function () {
        console.log('测试外部js的导入是否正确')
    },
     // 提示消息函数
     showmessage (vm ,text, state) {
        vm.$message({
            type: state, // 成功消息提示样式
            message: text,
            duration: 3000, // 三秒显示
            showClose: true, // 可关闭
            offset: 0, // 顶部偏移量 没啥作用其实
        });
    },
    // 换算时间
    timeapple (time, type) {
        let timeoffer = new Date(time)
        let y = timeoffer.getFullYear()
        let m = timeoffer.getUTCMonth() < 9 ? '0' + (timeoffer.getUTCMonth() + 1) : (timeoffer.getUTCMonth() + 1)
        let d = timeoffer.getUTCDate() < 10 ? '0' + timeoffer.getUTCDate() : timeoffer.getUTCDate()
        if(type == 'all') {
            d = timeoffer.getDate() < 10 ? '0' + timeoffer.getDate() : timeoffer.getDate()
            m = timeoffer.getMonth() < 9 ? '0' + (timeoffer.getMonth() + 1) : (timeoffer.getMonth() + 1)
        }
        let h = timeoffer.getHours() < 10 ? '0' + timeoffer.getHours() : timeoffer.getHours()
        let min = timeoffer.getMinutes() < 10 ? '0' + timeoffer.getMinutes() : timeoffer.getMinutes()
        let s = timeoffer.getSeconds() < 10 ? '0' + timeoffer.getSeconds() : timeoffer.getSeconds()
        if(type == 'y') {
            return y
        }
        else if(type == 'md'){
            return m + '.' + d
        }
        else if (type == 'hmins') {
            return h + ':' + min + ':' + s
        }
        else if (type == 'hmin') {
            return h + ':' + min
        }
        else if (type == 'ymd') {
            return y + '.' + m + '.' + d
        }
        else if(type == 'all') {
            return y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + s
        }
    },
    // today make timeangle
    makeTimeAngle(time) {
        let today = new Date(time);
        console.log(today)
        let timeZero = 
            new Date(today.getFullYear(),today.getMonth(),today.getDate()).getTime();
        let timeTorm = new Date(today.getFullYear(),today.getMonth(),today.getDate()+1).getTime() - 1000;
        let sss = [timeZero,timeTorm];
        console.log(sss)
        return sss;
    },
    // json转换成get请求params
    Json2Params (data) {
        let params = '?'
        let list = []
        for(let item in data) {
            let str = item + '=' + data[item]
            list.push(str)
        }
        params = params + list.join('&')
        return params
    },
    // 制作数据
    makedata (area, xname, yname,formulaid, data, step) {
        console.log("近来设置数据")
        // console.log(xname, yname, step)
        // console.log(data)
        var functionlist = [
            {},
            function (R, a) {
                return R * Math.sin(a)
            }
        ]
        // step 步数
        let middledata = []
        if(area == 'top') {
            for(let i = 0; i < data.length; i=i+step){
                let middledataitem = []
                let timetype  = 'hmins'
                if(data.length > 20) {
                    timetype = 'hmin'
                }
                let date = (i == 0 || timeapple(data[i].createTime, 'ymd') !== timeapple(data[i-1].createTime, 'ymd')? timeapple(data[i].createTime, 'ymd') : timeapple(data[i].createTime, timetype))
                // console.log(new Date(data[i].createTime))
                // console.log(data[i].createTime)
                middledataitem.push(data[i].createTime)
                if(formulaid && formulaid > 0) {
                    data[i][yname] = functionlist[formulaid](this.currentradius, data[i][yname])
                }
                middledataitem.push(data[i][yname])
                middledata.push(middledataitem)
            }
            // middledata[0][0] = '2019-2-5'
        }else {
            for(let j = 0; j < data.length; j=j+step){
                let middledataitem = []
                if(data[j][xname] < 0) {
                    middledataitem.push(360+data[j][xname])
                }else {
                    middledataitem.push(data[j][xname])
                }
                middledataitem.push(data[j][yname])
                middledata.push(middledataitem)
            }
        }
        console.log(middledata)
        return middledata
    },
    // response status check and show message
    responseBack(pointer,responseObj,bakeMethod = null) {
        console.log(responseObj)
        console.log(responseObj.responseStatus)
        console.log(responseObj.responseStatus == 'success')
        if(responseObj.responseStatus != 'success') {
            console.log('responseObj.responseStatus')
            // show its fail request.
            pointer.$message({
                type: 'warning', // 成功消息提示样式
                // message: responseObj.data.message,
                message: responseObj.msg,
                duration: 2000, // 三秒显示
                showClose: true, // 可关闭
                offset: 0, // 顶部偏移量 没啥作用其实
            });
            // return;
        }else {
            console.log('----------------------')
            if(bakeMethod != null) {
                bakeMethod();
            }
        }
        // if success. show message and use backMethod
        // show its fail request.
        // pointer.$message({
        //     type: null, // 成功消息提示样式
        //     message: responseObj.msg,
        //     duration: 2000, // 三秒显示
        //     showClose: true, // 可关闭
        //     offset: 0, // 顶部偏移量 没啥作用其实
        // });
        
    },
    /**
     * get location info
     */
    getLocationInfo(vm,key) {
        if(localStorage.getItem(key) == null && key == 'userLoginInfo') {
            // is mean not login
            showmessage(vm,'请先登录','warning');
            vm.$router.push({
                name: 'LoginPage'
            })
            return null;
        }else {
            return JSON.parse(localStorage.getItem(key));
        }
    },
}