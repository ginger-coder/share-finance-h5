<!--
  功能：材料
  作者：bianxiaokai
  时间：2024年04月28日 11:47:04
-->
<template>
    <div class="book-container flex-column">
        <van-field
            v-model="projectLabel"
            is-link
            readonly
            placeholder="请选择要关联的项目"
            @click="showPicker = true"
        />
        <div class="upload-box">
            <div class="upload-title align-center">申请材料</div>
            <div class="upload-content">
                <van-uploader v-model="fileList" multiple :max-count="2" />
            </div>
        </div>
        <div class="footer-box">
            <fin-button submit-text="发起申请" class="submit" @click="onNext" />
        </div>
        <van-popup v-model:show="showPicker" round position="bottom">
            <van-picker
                :columns-field-names="customFieldName"
                :columns="columns"
                @cancel="showPicker = false"
                @confirm="onConfirm"
            />
        </van-popup>
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

//  上传
const fileList = ref([]);

const columns = ref([]);
const showPicker = ref(false);
const projectValue = ref('');
const projectLabel = ref('');
const onConfirm = value => {
    showPicker.value = false;
    projectValue.value = value.selectedOptions[0].projno;
    projectLabel.value = value.selectedOptions[0].names;
};
const onNext = () => {
    router.push('/product-apply/protocol');
};
const customFieldName = {
    text: 'names',
    value: 'projno'
};
const initProjectList = () => {
    api.getOptionProjectList().then(res => {
        columns.value = res.data.lists;
    });
};
onMounted(() => {
    initProjectList();
});
</script>
<style scoped lang="scss">
.book-container {
    flex: 1;
    position: relative;
    .footer-box {
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
    }
}
.upload-box {
    padding: 16px;
    .upload-title {
        font-weight: 600;
        font-size: 16px;
        color: #2c3041;
        &::before {
            content: '';
            display: block;
            width: 4px;
            height: 15px;
            background: linear-gradient(180deg, #654ee6 0%, #3526c9 100%);
            box-shadow: 0px 2px 4px 0px rgba(53, 38, 201, 0.5);
            border-radius: 2px;
            margin-right: 10px;
        }
    }
    .upload-content {
        padding-top: 16px;
    }
}
</style>
