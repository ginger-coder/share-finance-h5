<!--
  功能：企业中心
  作者：bianxiaokai
  时间：2024年04月23日 16:52:37
-->
<template>
    <div class="container">
        <div class="header flex-col align-center">
            <van-image
                width="64"
                height="64"
                lazy-load
                round
                src="@/assets/images/center/icon-center-default.png"
                class="company-logo"
            />
            <div class="company-name">我是企业名称</div>
        </div>
        <div class="content">
            <div class="prject-menu-box flex-row justify-around align-center">
                <div class="menu-item">
                    <div class="menu-data">{{ store.state.count.proj_num }}</div>
                    <div class="menu-tip">项目总数</div>
                </div>
                <div class="menu-item">
                    <div class="menu-data">{{ store.state.count.pending_review_count }}</div>
                    <div class="menu-tip">待审核申请</div>
                </div>
                <div class="menu-item">
                    <div class="menu-data">{{ store.state.count.passed_count }}</div>
                    <div class="menu-tip">已通过申请</div>
                </div>
            </div>
            <div
                class="content-list-box flex-row justify-around align-center"
                @click="router.push('/project-list')"
            >
                <div class="content-list-item project-item">
                    <div class="list-item-icon">
                        <img src="@/assets/images/center/icon-center-project.png" alt="" />
                    </div>
                    <div class="list-item-title">项目管理</div>
                    <div class="list-item-tip">管理项目信息</div>
                </div>
                <div
                    class="content-list-item history-item"
                    @click="router.push('/application-list')"
                >
                    <div class="list-item-icon">
                        <img src="@/assets/images/center/icon-center-history.png" alt="" />
                    </div>
                    <div class="list-item-title">申请记录</div>
                    <div class="list-item-tip">查看申请反馈</div>
                </div>
            </div>
        </div>
        <footer-view />
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
onMounted(() => {
    //console.log('3.-组件挂载到页面之后执行-------onMounted')
});
</script>
<style scoped lang="scss">
.container {
    min-height: 100%;
    position: relative;
    .header {
        height: calc(316px - 80px);
        background: url('@/assets/images/center/icon-center-bg.png') no-repeat;
        background-size: 100% auto;
        background-position-y: -80px;
        box-sizing: border-box;
        padding-top: 34px;
        .company-logo {
            margin-bottom: 17px;
        }
        .company-name {
            font-weight: 500;
            font-size: 18px;
            color: #ffffff;
        }
    }
    .content {
        width: 100%;
        position: relative;
        z-index: 1;
        padding: 0 16px;
        margin-top: -75px;
        .prject-menu-box {
            width: 100%;
            height: 94px;
            background: url('@/assets/images/center/icon-center-menu-bg.png') no-repeat;
            background-size: 100% 100%;
            padding: 0 10px;
            .menu-item {
                text-align: center;
                .menu-data {
                    font-weight: 600;
                    font-size: 20px;
                    color: #000000;
                }
                .menu-tip {
                    font-weight: 400;
                    font-size: 12px;
                    color: #1e1771;
                }
            }
        }
        .content-list-box {
            padding-top: 15px;
            .content-list-item {
                width: 158px;
                height: 94px;

                border-radius: 12px;
                color: #ffffff;
                padding: 8px 17px;
                &.project-item {
                    background: linear-gradient(295deg, #513fff 0%, #7161f5 100%);
                    box-shadow: 0px 2px 4px 0px rgba(94, 96, 255, 0.5);
                }
                &.history-item {
                    background: linear-gradient(295deg, #5387fa 0%, #4a94ff 100%);
                    box-shadow: 0px 2px 4px 0px rgba(103, 154, 251, 0.5);
                }

                .list-item-icon {
                    width: 32px;
                    height: 32px;
                    margin-bottom: 4px;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .list-item-title {
                    font-weight: 600;
                    font-size: 16px;
                }
                .list-item-tip {
                    font-weight: 500;
                    font-size: 10px;
                }
            }
        }
    }
}
</style>
