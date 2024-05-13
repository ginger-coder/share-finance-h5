<!--
  功能：项目列表
  作者：bianxiaokai
  时间：2024年04月26日 14:14:10
-->
<template>
    <div class="container bg-color">
        <fin-card
            v-for="(item, index) in list"
            :key="index"
            class="project-item"
            @click="handleRouteInfo(item.projno)"
        >
            <div class="title align-center">
                <div class="title-icon">
                    <img src="@/assets/images/icon-project-tip.png" alt="" />
                </div>
                {{ item.names }}
            </div>
            <div class="project-content">
                <div class="project-content-item align-center flex-row">
                    <div class="project-content-item-name">招标编号：</div>
                    <div class="project-content-item-name">{{ item.tenderer_no }}</div>
                </div>
                <div class="project-content-item align-center flex-row">
                    <div class="project-content-item-name">保证金金额：</div>
                    <div class="project-content-item-name">
                        {{ moneyFormat(item.margin_amount) }}
                    </div>
                </div>
                <div class="project-content-item align-center flex-row">
                    <div class="project-content-item-name">招标单位：</div>
                    <div class="project-content-item-name">{{ item.tenderer_unit }}</div>
                </div>
                <div class="project-content-item align-center flex-row">
                    <div class="project-content-item-name">开标日期：</div>
                    <div class="project-content-item-name">
                        {{ timeFormat(item.date_bid_opening) }}
                    </div>
                </div>
            </div>
        </fin-card>
        <fin-button submit-text="新增项目" @click="router.push('/project-add')" class="submit" />
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import dayjs from 'dayjs';
import { useAppStore } from '@/store';
import { useRoute, useRouter } from 'vue-router';
import api from '@/api';
import { moneyFormat, timeFormat } from '@/utils';
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

const handleRouteInfo = id => {
    router.push('/project-info?id=' + id);
};

const list = ref([]);
const init = () => {
    api.getProjectPageList().then(res => {
        list.value = res.data.lists;
    });
};

onMounted(() => {
    init();
});
</script>
<style scoped lang="scss">
.container {
    height: 100%;
    overflow-y: auto;
    position: relative;
    z-index: 2;
    padding: 18px 16px;
    .project-item {
        .title {
            font-weight: 600;
            font-size: 15px;
            color: #222222;
            margin-bottom: 16px;
            .title-icon {
                width: 16px;
                height: 15px;
                margin-right: 10px;
                img {
                    width: 100%;
                }
            }
        }
        .project-content {
            background: rgba(244, 242, 249, 0.65);
            border-radius: 6px;
            padding: 12px 12px 6px;
            .project-content-item {
                font-weight: 400;
                font-size: 12px;
                color: #666666;
                margin-bottom: 6px;
            }
        }
    }
}
</style>
