<!--
  功能：登录
  作者：bianxiaokai
  时间：2024年05月10日 15:32:17
-->
<template>
    <van-form style="padding: 30px 0 40px" @submit="onRegister">
        <van-cell-group inset @submit="onRegister">
            <van-field
                v-model="loginParams.account"
                name="phone"
                type="tel"
                placeholder="请输入手机号"
            />
            <van-field v-model="loginParams.password" placeholder="请输入密码" type="password" />
            <van-field
                v-model="loginParams.repassword"
                placeholder="请再次输入密码"
                type="password"
            />
            <van-field v-model="loginParams.names" placeholder="企业名称" />
            <van-field v-model="loginParams.code" clearable center placeholder="请输入短信验证码">
                <template #button>
                    <fin-send-code
                        ref="sendCodeEl"
                        :mobile="loginParams.account"
                        @on-finish="onFinish"
                    />
                </template>
            </van-field>
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
                loading-text="注册中..."
                :disabled="isLoading"
            >
                注册
            </van-button>
        </div>
        <div class="justify-center login-content">
            <span class="login-text">已有账号？</span>
            <span class="login-text" @click="router.push('/auth/login')">去登录</span>
        </div>
    </van-form>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { showToast, showSuccessToast } from 'vant';
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
/**
 * 数据部分
 */
const loginParams = reactive({
    account: '',
    password: '',
    repassword: '',
    names: '',
    code: ''
});

const onFinish = () => {
    api.sendSMS({
        phone: loginParams.account
    });
};

const isRead = ref(false);
const isLoading = ref(false);
const onRegister = () => {
    if (loginParams.repassword !== loginParams.password) {
        showToast('两次密码不一致');
        return false;
    }
    if (!isRead.value) {
        showToast('请勾选阅读并同意《用户协议》和《隐私政策》');
        return false;
    }
    if (!loginParams.code) {
        showToast('请输入短信验证码');
        return false;
    }
    isLoading.value = true;
    api.register(loginParams)
        .then(() => {
            showSuccessToast('注册成功，去登录吧');
            setTimeout(() => {
                isLoading.value = false;
                router.replace('/auth/login');
            }, 2000);
        })
        .catch(() => {
            isLoading.value = false;
        });
};
</script>
<style scoped lang="scss">
.get-code {
    font-weight: 400;
    font-size: 12px;
    color: #3526c9;
}
.read-book {
    font-weight: 400;
    font-size: 12px;
    color: #7c7c7c;
    padding: var(--van-cell-vertical-padding) var(--van-cell-horizontal-padding);
}
.login-content {
    font-weight: 500;
    font-size: 12px;
    color: #3526c9;
    padding: 0 0 20px;
}
</style>
