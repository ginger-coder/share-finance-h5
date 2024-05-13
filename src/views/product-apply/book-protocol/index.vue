<!--
  功能：初始化功能描述
  作者：bianxiaokai
  时间：2024年05月10日 20:43:05
-->
<template>
    <div class="pdf-container flex-column">
        <div class="pdf-box">这是协议</div>
        <fin-button submit-text="发起申请" class="submit" @click="onNext" />
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useAppStore } from '@/store';
import { useRoute, useRouter } from 'vue-router';
defineProps({});
/**
 * 仓库
 */
const store = useAppStore();
/**
 * 路由对象
 */
const route = useRoute();
/**
 * 路由实例
 */
const router = useRouter();
//console.log('1-开始创建组件-setup')
/**
 * 数据部分
 */
const onNext = () => {};
onMounted(() => {
    //console.log('3.-组件挂载到页面之后执行-------onMounted')
});
</script>
<style scoped lang="scss">
.pdf-container {
    flex: 1;
    position: relative;
    .pdf-box {
        height: calc(100% - 40px);
        overflow-y: auto;
        flex: 1;
    }
}
</style>
