<!--
  功能：loading
  作者：bianxiaokai
  时间：2024年05月15日 17:06:51
-->
<template>
    <van-overlay :show="isShow" z-index="999" @click="isShow">
        <div class="wrapper" @click.stop>
            <van-loading size="24px" vertical>{{ loadingText }}</van-loading>
        </div>
    </van-overlay>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { useAppStore } from '@/store';
import { useRoute, useRouter } from 'vue-router';
const props = defineProps({
    // 传入的显影状态
    show: {
        type: Boolean,
        default: false
    },
    text: {
        type: String,
        default: '加载中...'
    }
});

const isShow = computed(() => props.show);
const loadingText = computed(() => props.text);
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
const data = reactive({});

onMounted(() => {
    //console.log('3.-组件挂载到页面之后执行-------onMounted')
});
</script>
<style scoped lang="scss">
.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}
</style>
