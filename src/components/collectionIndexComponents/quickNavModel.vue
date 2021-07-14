<template>
    <div class="quickNavModel">
        <p class="quickNavModel-imgView">
            <img :src="navModelData.imgUrl" 
            :width="navModelData.imgSize || 40" 
            :height="navModelData.imgSize || 40" 
            alt="">
        </p>
        <p class="quickNavModel-title">
            {{ navModelData.name }}
        </p>
    </div>
</template>

<script>
export default {
    data () {
        return {
            // navModelData: {
            //     imgUrl: require('@/assets/logo.png'),
            //     imgSize: 48
            // }
        }
    },
    props: {
        navModelData: Object,
    }
}
</script>

<style lang="less" scoped>
@mainAsideBgColor: #edf1f5;
@borderRadius: 4px;
* {
    margin: 0;
    padding: 0;
}
.quickNavModel {
    width: 100%;
    height: 100%;
    color: #666;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    border-radius: @borderRadius;
    cursor: pointer;
    .quickNavModel-imgView {
        width: 100%;
        flex: 0 0 80%;
        height: 80%;
        position: relative;
        background-color: @mainAsideBgColor;
        border-radius: 6px;
        img {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
    }
    .quickNavModel-title {
        flex: 1;
        font-size: 20px;
    }
}
</style>