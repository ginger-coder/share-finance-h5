<!--
  功能：登录
  作者：bianxiaokai
  时间：2024年05月10日 15:32:17
-->
<template>
    <van-form style="padding: 30px 0 40px" @submit="onLogin">
        <van-cell-group inset style="margin-bottom: 60px">
            <van-field
                v-model="loginParams.account"
                name="phone"
                type="tel"
                placeholder="请输入手机号"
            />
            <van-field v-model="loginParams.password" placeholder="请输入密码" type="password" />
            <div class="read-book align-center">
                <van-checkbox v-model="isRead" icon-size="14px" style="margin-right: 8px" />
                我已阅读并同意《用户协议》和《隐私政策》
            </div>
        </van-cell-group>
        <div style="margin: 16px">
            <van-button
                round
                block
                type="primary"
                native-type="submit"
                color="linear-gradient( 299deg, #3D2ED2 0%, #5C4CFD 100%)"
                :loading="isLoading"
                loading-text="登录中..."
                :disabled="isLoading"
            >
                登录
            </van-button>
        </div>
    </van-form>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { showToast, showSuccessToast } from 'vant';
import { useRoute, useRouter } from 'vue-router';
import { CacheToken, CacheUserInfo } from '@/constants';
import { setCache } from '@/utils/cache';
import api from '@/api';
defineProps({});
/**
 * 仓库
 */
// const store = useAppStore();
/**
 * 路由对象
 */
const route = useRoute();
/**
 * 路由实例
 */
const router = useRouter();
//console.log('1-开始创建组件-setup')
const loginParams = reactive({
    account: '',
    password: ''
});
const isRead = ref(false);
/**
 * 数据部分
 */
const isLoading = ref(false);
const onLogin = async () => {
    if (!isRead.value) {
        showToast('请勾选阅读并同意《用户协议》和《隐私政策》');
        return false;
    }
    isLoading.value = true;
    const res = await api.login({
        account: loginParams.account,
        password: loginParams.password
    });
    if (res) {
        showSuccessToast('登录成功');
        setCache(CacheToken, res.data, true);
        setTimeout(() => {
            isLoading.value = false;
            router.replace('/');
        }, 2000);
    } else {
        isLoading.value = false;
    }
};
</script>
<style scoped lang="scss">
.read-book {
    font-weight: 400;
    font-size: 12px;
    color: #7c7c7c;
    padding: var(--van-cell-vertical-padding) var(--van-cell-horizontal-padding);
}
</style>
