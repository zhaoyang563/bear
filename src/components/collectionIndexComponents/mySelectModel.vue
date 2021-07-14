<template>
<div class="mainView-topView-flex-p">
    <div class="mainView-topView-left-p">
        <div class="mySelectTop" @click.stop="changeToastStatus">
            <i :class="illusoryDeviceList.iconClass"></i>
            <span>{{ illusoryDeviceList.current == null?'无':illusoryDeviceList.current.name }}</span>
        </div>
        <transition name="myTransitionFade">
            <div class="mySelectMain" v-show="illusoryDeviceList.isShowToast">
                <ul class="mySelectMain-ul">
                    <li class="mySelectMain-li"
                        :class="device.isChecked?'mySelectMain-li-active':''"
                        v-for="(device,index) in illusoryDeviceList.list" 
                        :key="index"
                        @click="changeCurrent(device)">
                        {{ device.name }}</li>
                </ul>
            </div>
        </transition>
    </div>
</div>
</template>

<script>
export default {
    data () {
        return {
            
        }
    },
    props: {
        illusoryDeviceList: Object,
    },
    methods: {
        // 改变当前选中项目
        changeCurrent (item) {
            this.illusoryDeviceList.list.forEach(element => {
                element.isChecked = false;
            });
            item.isChecked = true;
            this.illusoryDeviceList.current = item;
            // 处理完之后不显示弹出层
            this.illusoryDeviceList.isShowToast = false;

            // 提醒上层更新操作
            this.$emit('dataChange');
        },
        // 改变弹出选择层
        changeToastStatus() {
            this.illusoryDeviceList.isShowToast = 
                !this.illusoryDeviceList.isShowToast;
        },
    }
}
</script>

<style lang="less" scoped>
@mainAsideBgColor: #edf1f5;
@headerHeight: 70px;
@borderRadius: 4px;
* {
    margin: 0;
    padding: 0;
}
.mainView-topView-flex-p {
    flex: 0 0 180px;
    width: 180px;
    height: 100%;
    // border-right: 1px dashed #999;
    span {
        display: inline-block;
        height: 100%;
        line-height: @headerHeight;
        margin-right: 15px;
    }
    .mainView-topView-left-p {
        position: relative;
        width: 100%;
        height: 100%;
        top: 0;
        bottom: 0;
        .mySelectTop {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            display: flex;
            justify-content: space-around;
            align-items: center;
            font-size: 18px;
            cursor: pointer;
        }
        .mySelectMain {
            position: absolute;
            top: 110%;
            // left: 30px;
            background-color: #999999;
            border-radius: 5px;
            padding: 15px 30px;
            z-index: 2020;
            .mySelectMain-ul {
                width: 100%;
                padding: 0;
                list-style: none;
                .mySelectMain-li {
                    width: 100%;
                    padding: 10px 0;
                    color: #000;
                    border-bottom: 1px solid #999;
                    cursor: pointer;
                }
                .mySelectMain-li:hover {
                    color: #ffffff;
                    background-color: blueviolet;
                }
                .mySelectMain-li-active {
                    color: #ffffff;
                    background-color: blueviolet;
                }
            }
        }
    }
}
</style>