<!-- eslint-disable vue/no-v-html -->
<!--
  功能：申请模块
  作者：bianxiaokai
  时间：2024年04月27日 10:01:41
-->
<template>
    <div class="container flex-col">
        <div class="banner">
            <div class="banner-title">申请</div>
            <div class="banner-tip">共建安全可信的产业金融生态圈</div>
        </div>
        <div class="content flex_1">
            <div class="header">
                <van-steps class="step-box" :active="activeStep" active-color="#3526c9">
                    <van-step v-for="item in stepList" :key="item.value">
                        <template #inactive-icon>
                            <div class="iconfont">
                                <div class="num">{{ item.value }}</div>
                            </div>
                        </template>
                        <template #active-icon>
                            <div class="iconfont active">
                                <div class="num">{{ item.value }}</div>
                            </div>
                        </template>
                        <template #finish-icon>
                            <div class="iconfont finish">
                                <div class="num">{{ item.value }}</div>
                            </div>
                        </template>
                        <div class="trace-info" v-html="item.label"></div>
                    </van-step>
                </van-steps>
            </div>
            <div class="content-box flex-col">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, watch } from 'vue';
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

const activeStep = ref(0);

watch(
    () => route.path,
    path => {
        if (path.indexOf('book') > -1) {
            activeStep.value = 0;
        } else if (path.indexOf('protocol') > -1) {
            activeStep.value = 1;
        }
    },
    { immediate: true }
);

//console.log('1-开始创建组件-setup')
/**
 * 数据部分
 */
const stepList = ref([
    {
        value: 1,
        label: '提交材料'
    },
    {
        value: 2,
        label: '提交协议'
    },
    {
        value: 3,
        label: '材料审核'
    },
    {
        value: 4,
        label: '开具通知'
    },
    {
        value: 5,
        label: '&nbsp;&nbsp;&nbsp;&nbsp;付款&nbsp;&nbsp;&nbsp;&nbsp;'
    },
    {
        value: 6,
        label: '保函下载'
    }
]);
onMounted(() => {
    //console.log('3.-组件挂载到页面之后执行-------onMounted')
});
</script>
<style scoped lang="scss">
.container {
    position: relative;
    height: 100%;
    min-height: 100%;
    overflow: hidden;
    .banner {
        width: 100%;
        height: 172px;
        background: url('@/assets/images/icon-application-bg.png') no-repeat;
        background-size: 100% auto;
        z-index: 1;
        padding: 0 16px;
        color: #ffffff;
        padding-top: 40px;
        background-position-y: -86px;
        box-sizing: border-box;
        .banner-title {
            font-size: 32px;
            color: #ffffff;
        }
        .banner-tip {
            font-weight: 500;
            font-size: 12px;
        }
    }
    .content {
        padding: 0 16px;
        margin-top: -46px;
        position: relative;
        z-index: 2;
        overflow: hidden;
        .content-box {
            background: #ffffff;
            box-shadow: inset 3px 3px 20px 0px rgba(53, 38, 201, 0.2);
            border-radius: 12px;
            min-height: calc(100% - 130px);
            height: calc(100% - 130px);
            padding: 16px;
            overflow-y: auto;
        }
        .header {
            padding: 12px 20px;
            background: linear-gradient(180deg, #eceaff 0%, #ffffff 100%);
            box-shadow: 0px 4px 6px 0px rgba(92, 76, 254, 0.15);
            border-radius: 12px;
            overflow-x: auto;
            .step-box {
                min-width: calc(100% + 100px);
                background: transparent !important;
                :deep(.van-step--horizontal:last-child:not(:first-child)) {
                    position: inherit !important;
                }
                :deep(.van-step--horizontal .van-step__circle-container) {
                    background: transparent !important;
                }
                :deep(.van-step--horizontal) {
                    flex: inherit !important;
                    display: flex;
                    justify-content: center;
                }
                :deep(.van-step--horizontal .van-step__title) {
                    transform: inherit !important;
                }
                :deep(.van-step--horizontal .van-step__circle-container) {
                    left: inherit !important;
                    top: 37px;
                }
                :deep(
                        .van-step--horizontal:last-child:not(:first-child)
                            .van-step__circle-container
                    ) {
                    right: inherit !important;
                }
                :deep(.van-steps__items) {
                    justify-content: space-between;
                }
                :deep(.van-step--horizontal .van-step__line) {
                    top: 33px;
                    left: 42px;
                    width: 37px;
                    height: 6px;
                    z-index: 2;
                    background: #f8f6fb;
                }
                :deep(.van-step--finish .van-step__circle) {
                    background-color: #3526c9 !important;
                }
                :deep(.van-step--finish .van-step__line) {
                    background-color: #3526c9 !important;
                }
                :deep(.van-step--finish) {
                    color: #3526c9 !important;
                }
                .trace-info {
                    margin-bottom: 20px;
                }
            }
            .iconfont {
                font-weight: 600;
                font-size: 14px;
                color: #ffffff;
                width: 30px;
                height: 30px;
                background: rgba(53, 38, 201, 0.12);
                position: relative;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                .num {
                    position: relative;
                    z-index: 1;
                }
                &::before {
                    content: '';
                    width: 22px;
                    height: 22px;
                    border-radius: 50%;
                    background: #8082a3;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    margin-left: -11px;
                    margin-top: -11px;
                }
                &.active,
                &.finish {
                    &::before {
                        background: #3526c9;
                    }
                }
            }
        }
    }
}
</style>
