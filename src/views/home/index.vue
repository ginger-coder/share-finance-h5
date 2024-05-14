<!--
    功能：首页
    作者：bianxiaokai
    时间：2024年04月23日 09:19:17
-->
<template>
    <div class="container flex-col">
        <div class="banner">
            <div class="banner-title">服务大厅</div>
            <div class="banner-tip">共建安全可信的产业金融生态圈</div>
            <div v-if="false" class="message-btn" @click="router.push('/message')">我的消息</div>
        </div>
        <div class="content flex_1">
            <div class="header flex-row justify-between">
                <div class="type-menu flex-row align-center justify-between">
                    <div class="type-item active">推荐</div>
                    <div class="type-item">时间</div>
                </div>
                <van-dropdown-menu class="list-menu flex-row align-center justify-between">
                    <van-dropdown-item v-model="typeValue" :options="moneyOption" />
                    <van-dropdown-item v-model="moneyValue" :options="typeOption" />
                </van-dropdown-menu>
            </div>
            <div v-if="dataList.length" class="scroll-box">
                <fin-project-card v-for="item in dataList" :key="item.prodno" :data="item" />
            </div>
            <van-empty v-else description="暂无数据" />
        </div>
        <footer-view />
        <div class="badge-box" @click="router.push('/center')">
            <img src="@/assets/images/index/icon-index-center.png" alt="" />
            <van-badge :content="store.state.count.passed_count" max="99" class="badge" />
        </div>
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

const typeValue = ref(1);
const moneyValue = ref('a');
const moneyOption = ref([
    { text: '全部', value: 0 },
    { text: '新款商', value: 1 },
    { text: '活动商品', value: 2 }
]);
const typeOption = ref([
    { text: '默认', value: 'a' },
    { text: '好评排', value: 'b' },
    { text: '销量排序', value: 'c' }
]);

const dataList = ref([]);
const initList = () => {
    api.getProductList().then(res => {
        dataList.value = res.data.lists;
    });
};

onMounted(() => {
    //console.log('3.-组件挂载到页面之后执行-------onMounted')
    initList();
});
</script>
<style scoped lang="scss">
.container {
    position: relative;
    height: 100%;
    overflow: hidden;
    .badge-box {
        position: fixed;
        bottom: 122px;
        left: 0;
        width: 56px;
        height: 56px;
        z-index: 10;
        img {
            width: 100%;
        }
        .badge {
            position: absolute;
            right: 10px;
            top: 8px;
        }
    }
    .banner {
        width: 100%;
        height: 284px;
        background: url('@/assets/images/index/icon-index-bg.png') no-repeat;
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
        .message-btn {
            position: fixed;
            right: 0;
            top: 25px;
            width: 25px;
            height: 80px;
            background: linear-gradient(180deg, #d6d7ff 0%, #8587ff 100%);
            box-shadow: 0px 2px 6px 0px rgba(23, 67, 215, 0.17);
            border-radius: 6px 0px 0px 6px;
            border: 1px solid rgba(255, 255, 255, 0.35);
            font-weight: 600;
            font-size: 12px;
            color: #ffffff;
            text-align: center;
            padding-top: 7px;
            z-index: 10;
        }
    }
    .content {
        padding: 0 16px;
        margin-top: -153px;
        position: relative;
        z-index: 2;
        overflow: hidden;
        .scroll-box {
            border-radius: 12px;
            height: calc(100% - 52px);
            overflow-y: auto;
            padding-bottom: 32px;
        }
        .header {
            padding: 12px 20px;
            background: #fff;
            border-radius: 12px;
            margin-bottom: 12px;
            .type-menu {
                width: 70px;
                .type-item {
                    color: #666;
                    font-size: 14px;
                    font-family: PingFangSC-Semibold;
                    font-weight: 600;
                    &.active {
                        color: #222222;
                    }
                }
            }
            :deep(.van-dropdown-menu__bar) {
                width: 100%;
                background: none;
                box-shadow: none;
                justify-content: space-between;
            }
            :deep(.van-dropdown-menu__item) {
                background: #f5f5f5;
                border-radius: 4px;
                padding: 0 2px;
                box-sizing: border-box;
                flex: none !important;
                margin-right: 10px;
                &:nth-last-of-type(1) {
                    margin-right: inherit;
                }
            }
            :deep(.van-ellipsis) {
                font-weight: 400;
                font-size: 13px;
                color: #666666;
            }
            :deep(.van-dropdown-menu__title:after) {
                position: absolute;
                width: 0;
                height: 0;
                border-left: 4px solid transparent;
                border-top: 4px solid transparent;
                border-bottom: 4px solid transparent;
                border-right: 4px solid #c7c7c7; /* 修改颜色和边框宽度以调整箭头大小和样式 */
                bottom: -3px;
                right: 0;
                transform: rotate(225deg);
                top: inherit;
            }
            :deep(.van-dropdown-menu__title--down:after) {
                margin: inherit !important;
            }
            .list-menu {
                .list-item {
                    position: relative;
                    height: 28px;
                    background: #f5f5f5;
                    border-radius: 4px;
                    padding: 0 17px 0 8px;
                    font-weight: 400;
                    font-size: 13px;
                    color: #666666;
                    .triangle {
                        position: absolute;
                        width: 0;
                        height: 0;
                        border-left: 4px solid transparent;
                        border-top: 4px solid transparent;
                        border-bottom: 4px solid transparent;
                        border-right: 4px solid #c7c7c7; /* 修改颜色和边框宽度以调整箭头大小和样式 */
                        bottom: 3px;
                        right: 0;
                        transform: rotate(225deg);
                    }
                }
            }
        }
    }
}
</style>
