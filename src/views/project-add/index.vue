<!--
  功能：项目新增
  作者：bianxiaokai
  时间：2024年04月26日 15:57:51
-->
<template>
    <div class="container bg-color">
        <fin-card>
            <van-cell-group>
                <van-field
                    v-model="productParams.names"
                    label="项目名称"
                    required
                    placeholder="请输入项目名称"
                />
                <van-field
                    v-model="productParams.tenderer_name"
                    label="招标人名称"
                    required
                    placeholder="请输入招标人名称"
                />
                <van-field
                    v-model="productParams.tenderer_unit"
                    label="招标单位"
                    required
                    placeholder="请输入招标单位"
                />
                <van-field
                    v-model="productParams.tenderer_address"
                    label="招标人地址"
                    required
                    placeholder="请输入招标人地址"
                />
                <van-field
                    v-model="productParams.tenderer_tel"
                    label="联系方式"
                    type="tel"
                    required
                    placeholder="请输入招标人联系方式"
                />
                <van-field
                    v-model="productParams.tenderer_no"
                    label="招标编码"
                    required
                    placeholder="请输入招标编码"
                />
                <van-field
                    v-model="marginAmount"
                    label="保证金金额"
                    type="digit"
                    required
                    placeholder="请输入保证金金额"
                />
                <van-field
                    v-model="dateTime"
                    label="开标日期"
                    required
                    is-link
                    placeholder="请选择开标日期"
                    @click="handleOpenTime"
                />
                <van-uploader
                    :before-read="beforeRead"
                    accept=".pdf"
                    :after-read="afterRead"
                    :max-count="1"
                >
                    <van-field required label="招标文件" is-link placeholder="点击上传" />
                </van-uploader>
                <van-swipe-cell v-if="productParams.bidding_document">
                    <van-cell :border="false" :title="fileName" value="左滑删除" />
                    <template #right>
                        <van-button square type="danger" text="删除" @click="delFile" />
                    </template>
                </van-swipe-cell>
            </van-cell-group>
        </fin-card>
        <fin-button submit-text="确认" class="submit" @click="handleSave" />
        <fin-date-time-picker
            ref="popup"
            :values="dateTime"
            :show-picker="dateVisible"
            @change-value="dateVisible = false"
            @confirm="selectTime"
        />
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { showToast } from 'vant';
import { useRoute, useRouter } from 'vue-router';
import dayjs from 'dayjs';
import api from '@/api';
/**
 * 路由实例
 */
const router = useRouter();
defineProps({});
/**
 * 数据部分
 */
const productParams = reactive({
    // eslint-disable-next-line camelcase
    bidding_document: ''
});
// eslint-disable-next-line camelcase
const dateTime = ref('');
// eslint-disable-next-line camelcase
const marginAmount = ref('');
const dateVisible = ref(false);

const handleOpenTime = () => {
    dateVisible.value = true;
};
const selectTime = value => {
    dateTime.value = value;
    productParams.date_bid_opening = dayjs(value).unix();
};

const fileName = ref('');
const delFile = () => {
    fileName.value = '';
    // eslint-disable-next-line camelcase
    productParams.bidding_document = '';
};
const afterRead = file => {
    console.log('file', file);
};
const beforeRead = file => {
    let formData = new FormData(); // 为上传文件定义一个formData对象
    fileName.value = file.name; // 将选中的上传文件转化为二进制文件，显示在页面上
    formData.append('file', file);
    formData.append('filePath', 'tmp/pdf');
    api.uploadFile2path(formData).then(res => {
        // eslint-disable-next-line camelcase
        productParams.bidding_document = res.data.url_list[0] || '';
    });
};

const handleSave = () => {
    if (!productParams.names) {
        showToast('请输入项目名称');
        return false;
    }
    if (!productParams.tenderer_name) {
        showToast('请输入招标人名称');
        return false;
    }
    if (!productParams.tenderer_unit) {
        showToast('请输入招标单位');
        return false;
    }
    if (!productParams.tenderer_address) {
        showToast('请输入招标人地址');
        return false;
    }
    if (!productParams.tenderer_tel) {
        showToast('请输入招标人联系方式');
        return false;
    }
    if (!productParams.tenderer_no) {
        showToast('请输入招标编码');
        return false;
    }
    if (!marginAmount.value) {
        showToast('请输入保证金金额');
        return false;
    }
    if (!productParams.date_bid_opening) {
        showToast('请选择开标日期');
        return false;
    }
    if (!productParams.bidding_document) {
        showToast('请上传招标材料');
        return false;
    }
    productParams.margin_amount = marginAmount.value * 100;
    api.projectCreate(productParams).then(res => {
        if (res.code === 0) {
            showToast('创建成功');
            setTimeout(() => {
                router.push({
                    name: 'project-list'
                });
            }, 1000);
        } else {
            showToast(res.message);
        }
    });
};
</script>
<style scoped lang="scss">
.container {
    height: 100%;
    overflow-y: auto;
    position: relative;
    z-index: 2;
    padding: 18px 16px 60px;
    box-sizing: border-box;
    .submit {
        position: fixed;
        bottom: 12px;
        left: 16px;
        width: calc(100% - 32px);
    }
    :deep(.van-uploader) {
        width: 100%;
    }
    :deep(.van-uploader__wrapper) {
        width: 100%;
    }
    :deep(.van-uploader__input-wrapper) {
        width: 100%;
    }
}
</style>
