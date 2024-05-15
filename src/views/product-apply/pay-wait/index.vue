<!--
  功能：支付等待
  作者：bianxiaokai
  时间：2024年05月15日 14:19:11
-->
<template>
    <div class="pay-container">
        <div class="defalut-content">
            <van-empty
                :image="require('@/assets/images/icon-wait-pay.png')"
                image-size="120"
                description="付款请联系工作人员进行付款，付款后即可进行保函下载"
            />
        </div>
        <div class="footer-content">联系电话：0353-562356</div>
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
const data = reactive({});
onMounted(() => {});
</script>
<style scoped lang="scss">
.pay-container {
    height: calc(100% - 120px);
    position: relative;
    .footer-content {
        width: 152px;
        height: 18px;
        font-family:
            PingFangSC,
            PingFang SC;
        font-weight: 400;
        font-size: 13px;
        color: #8082a3;
        line-height: 18px;
        text-align: center;

        position: absolute;
        bottom: 20px;
        left: 50%;
        margin-left: -76px;
    }
}
</style>
