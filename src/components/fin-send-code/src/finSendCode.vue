<!--
  功能：发送验证码
  作者：bianxiaokai
  时间：2024年05月10日 15:57:04
-->
<template>
    <div class="send-code-box">
        <span v-show="!isCountDown" class="get-code" @click="onSendCode">获取验证码</span>
        <van-count-down
            v-show="isCountDown"
            ref="countDown"
            :time="props.time"
            :auto-start="false"
            :format="props.format"
            @finish="onFinish"
        />
    </div>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps({
    time: {
        type: Number,
        default: 60000
    },
    format: {
        type: String,
        default: 'mm:ss'
    }
});
const emit = defineEmits(['on-finish']);
//console.log('1-开始创建组件-setup')
/**
 * 数据部分
 */
const countDown = ref(null);
const isCountDown = ref(false);
const start = () => {
    countDown.value.start();
};
const reset = () => {
    countDown.value.reset();
};
const onSendCode = () => {
    isCountDown.value = true;
    start();
};
const onFinish = () => {
    reset();
    isCountDown.value = false;
    emit('on-finish');
};
</script>
<style scoped lang="scss">
.get-code {
    font-weight: 400;
    font-size: 12px;
    color: #3526c9;
}
</style>
