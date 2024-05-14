<!--
  功能：申请记录
  作者：bianxiaokai
  时间：2024年04月26日 17:14:32
-->
<template>
    <div class="container bg-color">
        <div v-if="dataList.length > 0" class="content-box">
            <fin-project-card v-for="item in dataList" :key="item" from="history" :data="item" />
        </div>
        <van-empty v-else description="暂无数据" />
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useAppStore } from '@/store';
import { useRoute, useRouter } from 'vue-router';
import api from '@/api';
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
const dataList = ref([]);

const initList = () => {
    api.getApplyBackletterList()
        .then(res => {
            dataList.value = res.data.lists;
        })
        .catch(err => {
            console.log(err);
        });
};
onMounted(() => {
    //console.log('3.-组件挂载到页面之后执行-------onMounted')
    initList();
});
</script>
<style scoped lang="scss">
.container {
    height: 100%;
    overflow-y: auto;
    position: relative;
    z-index: 2;
    padding: 18px 16px;
}
</style>
