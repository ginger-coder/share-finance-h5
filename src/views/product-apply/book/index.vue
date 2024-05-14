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
                <div class="upload-card">
                    <div class="upload-card-title">上传材料</div>
                    <div class="upload-card-tip">支持上传文件为：pdf</div>
                    <div class="upload-card-button">立即上传</div>
                </div>
                <div class="upload-file-box">
                    <div class="upload-file-item">
                        <div class="upload-file-icon">
                            <img src="@/assets/images/icon-file.png" alt="" />
                        </div>
                        <div class="upload-file-content">
                            <div class="file-name">文件名称</div>
                            <div class="file-size">10M</div>
                        </div>
                        <div class="upload-file-delete">
                            <img src="@/assets/images/icon-delete.png" alt="" />
                        </div>
                    </div>
                </div>
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
        padding: 16px 0 12px;
        .upload-card {
            width: 100%;
            background: url(@/assets/images/icon-upload-bg.png) no-repeat;
            background-size: 100% auto;
            padding: 15px;
            .upload-card-title {
                font-weight: 500;
                font-size: 15px;
                color: #333333;
                margin-bottom: 2px;
            }
            .upload-card-tip {
                font-weight: 400;
                font-size: 11px;
                color: #999999;
                margin-bottom: 12px;
            }
            .upload-card-button {
                width: 72px;
                height: 25px;
                box-shadow: 0px 2px 8px 0px rgba(44, 104, 253, 0.2);
                border-radius: 15px;
                border: 1px solid #8082a3;
                line-height: 25px;
                text-align: center;
                font-weight: 500;
                font-size: 12px;
                color: #3526c9;
                text-shadow: 0px 2px 8px rgba(44, 104, 253, 0.2);
            }
        }
        .upload-file-box {
            .upload-file-item {
                background: rgba(244, 242, 249, 0.3);
                border-radius: 6px;
                border: 1px solid rgba(128, 130, 163, 0.2);
                padding: 12px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        }
    }
}
</style>
