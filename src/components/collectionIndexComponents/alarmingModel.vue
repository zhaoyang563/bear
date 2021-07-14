<template>
    <div class="alarmingModel">
        <p class="alarmingModel-name">
            {{ alarmingData.name }}
        </p>
        <p class="alarmingModel-value">
            {{ alarmingData.value }}
        </p>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
    data () {
        return {

        }
    },
    props: {
        alarmingData: Object
    }
})
</script>>

<style lang="less" scoped>
@mainAsideBgColor: #edf1f5;
@borderRadius: 4px;

.alarmingModel {
    width: 100%;
    height: 100%;
    color: #666;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    border-radius: @borderRadius;
    background-color: @mainAsideBgColor;
    box-sizing: border-box;
    padding: 10px 20px;
    cursor: pointer;
    .alarmingModel-name {
        flex: 0 0 30%;
        height: 30%;
        font-size: 20px;
        text-align: left;
        box-sizing: border-box;
        // padding-left: 20px;
    }
    .alarmingModel-value {
        flex: 1;
        font-size: 28px;
        text-align: left;
        box-sizing: border-box;
        padding-top: 20px;
        color: #555;
    }
}
</style>