<!--
  功能：初始化功能描述
  作者：bianxiaokai
  时间：2024年05月10日 20:43:05
-->
<template>
    <div class="pdf-container flex-col">
        <div class="pdf-box">
            <iframe :src="fileURL" width="100%" frameborder="0"></iframe>
        </div>
        <fin-button submit-text="提交协议" class="submit" @click="onNext" />
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { useAppStore } from '@/store';
import { useRoute, useRouter } from 'vue-router';
import api from '@/api';
import { showSuccessToast } from 'vant';
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

let falg = true;
const onNext = () => {
    if (falg) {
        falg = false;
        api.applyBackletterSubmitProtocol({
            applyno: route.query.applyno
        })
            .then(() => {
                showSuccessToast('提交成功');
                setTimeout(() => {
                    falg = true;
                    router.replace('/');
                }, 1000);
            })
            .catch(() => {
                falg = true;
            });
    }
};
const fileURL = ref('');
const initFile = () => {
    // VITE_APP_FILEPATH
    api.applyBackletterQueryProtocol({
        applyno: route.query.applyno
    }).then(res => {
        fileURL.value = import.meta.env.VITE_APP_FILEPATH + res.data.protocol_file;
    });
};
onMounted(() => {
    initFile();
});
</script>
<style scoped lang="scss">
.pdf-container {
    height: calc(100% - 120px);
    position: relative;
    .pdf-box {
        padding-bottom: 10px;
        overflow-y: auto;
        flex: 1;
        iframe {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
