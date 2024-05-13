<!--
  功能：项目详情
  作者：bianxiaokai
  时间：2024年04月26日 15:50:49
-->
<template>
    <div class="container bg-color">
        <fin-card :is-icon="true">
            <van-cell-group style="background: transparent">
                <van-cell title="项目名称" :value="infoData.names" />
                <van-cell title="招标人名称" :value="infoData.tenderer_name" />
                <van-cell title="招标单位" :value="infoData.tenderer_unit" />
                <van-cell title="招标人地址" :value="infoData.tenderer_address" />
                <van-cell title="招标人联系方式" :value="infoData.tenderer_tel" />
                <van-cell title="招标编号" :value="infoData.tenderer_no" />
                <van-cell title="保证金金额" :value="moneyFormat(infoData.margin_amount)" />
                <van-cell title="开标日期" :value="timeFormat(infoData.date_bid_opening)" />
                <van-cell title="招标文件" @click="handleDownload(infoData.bidding_document)">
                    <template #right-icon>
                        <van-icon name="column" class="icon-pdf" size="20" />
                    </template>
                </van-cell>
            </van-cell-group>
        </fin-card>
    </div>
</template>
vue
<script setup>
import { ref, reactive, onMounted } from 'vue';
import { showImagePreview } from 'vant';
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
const infoData = ref({});
onMounted(() => {
    //console.log('3.-组件挂载到页面之后执行-------onMounted')
    const id = route.query.id;
    init(id);
});
const init = id => {
    api.getProjectInfo({ projno: id }).then(res => {
        infoData.value = res.data?.info;
    });
};
const handleDownload = file => {};
</script>
<style scoped lang="scss">
.container {
    height: 100%;
    overflow-y: auto;
    position: relative;
    z-index: 2;
    padding: 18px 16px;
    .icon-pdf {
        display: flex;
        align-items: center;
    }
    :deep(.van-cell) {
        background: transparent;
    }
}
</style>
