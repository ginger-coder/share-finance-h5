<!-- eslint-disable vue/max-attributes-per-line -->
<!--
  功能：初始化功能描述
  作者：bianxiaokai
  时间：2024年05月15日 16:31:52
-->
<template>
    <div class="footer">
        <van-tabbar route>
            <van-tabbar-item replace to="/" icon="home-o">服务大厅</van-tabbar-item>
            <van-tabbar-item
                replace
                to="/center"
                icon="friends-o"
                :badge="store.state.count.passed_count"
            >
                企业中心
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
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
</script>
<style scoped lang="scss">
.footer {
    width: 100%;
    height: 50px;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 9;
}
</style>
