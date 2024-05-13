<!--
  功能：登录/注册
  作者：bianxiaokai
  时间：2024年05月10日 10:55:20
-->
<template>
    <div class="container">
        <div class="login-box-header">
            <div class="login-box-header-title">Hello</div>
            <div class="login-box-header-desc">欢迎登录</div>
        </div>
        <div class="login-box-body">
            <div class="login-card">
                <div class="login-card-header justify-between">
                    <div
                        class="login-card-header-item login-left align-center justify-center"
                        :class="isLoginForm ? 'login-active' : 'login-initive'"
                        @click="handleFormChange('login')"
                    >
                        登录
                    </div>
                    <div
                        class="login-card-header-item login-right align-center justify-center"
                        :class="!isLoginForm ? 'login-active' : 'login-initive'"
                        @click="handleFormChange('register')"
                    >
                        注册
                    </div>
                </div>
                <div class="login-card-body">
                    <router-view />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
defineProps({});
/**
 * 仓库
 */

/**
 * 路由对象
 */
const route = useRoute();
/**
 * 路由实例
 */
const router = useRouter();
//console.log('1-开始创建组件-setup')

const isLoginForm = ref(true);
const handleFormChange = path => {
    isLoginForm.value = !isLoginForm.value;
    router.push('/auth/' + path);
};

/**
 * 数据部分
 */
onMounted(() => {
    //console.log('3.-组件挂载到页面之后执行-------onMounted')
    isLoginForm.value = route.path.indexOf('register') > -1 ? false : true;
});
</script>
<style scoped lang="scss">
:deep(.van-field__control) {
    width: inherit !important;
    flex: 1;
}
.container {
    min-height: 100%;
    background: linear-gradient(180deg, #3526c9 0%, #4d3de4 31%, #5d4dff 100%);
    box-sizing: border-box;
    padding: 15px;
    .login-box-header {
        padding: 35px 0 45px;
        .login-box-header-title {
            font-weight: 600;
            font-size: 35px;
            color: #ffffff;
        }
        .login-box-header-desc {
            font-weight: 400;
            font-size: 20px;
            color: #dcdcdc;
        }
    }
    .login-box-body {
        .login-card {
            width: 100%;
            border-radius: 18px;
            background: rgb(109, 122, 229);
            // background: linear-gradient(90deg, #ffffff 0%, rgb(108, 130, 228) 100%);
            .login-card-header {
                width: 100%;
                height: 50px;
                position: relative;
                &::before {
                    content: '';
                    width: 30px;
                    height: 30px;
                    background: #fff;
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    margin-left: -15px;
                }
                .login-card-header-item {
                    width: 50%;
                    font-weight: 500;
                    font-size: 15px;
                    color: #fff;
                    position: relative;
                    &.login-left {
                        border-top-left-radius: 18px;
                        border-top-right-radius: 23px;
                        border-bottom-left-radius: 18px;
                        &::after {
                            content: '';
                            width: 50px;
                            height: 50px;
                            position: absolute;
                            bottom: -30px;
                            left: 0;
                        }
                    }
                    &.login-right {
                        border-top-right-radius: 18px;
                        border-top-left-radius: 23px;
                        border-bottom-left-radius: 18px;

                        &::after {
                            content: '';
                            width: 50px;
                            height: 50px;
                            position: absolute;
                            bottom: -30px;
                            right: 0;
                        }
                    }
                    &.login-initive {
                        background: rgb(109, 122, 229);
                        color: #fff;
                        border-bottom-right-radius: 23px;
                        z-index: 1;
                    }
                    &.login-active {
                        background: #fff;
                        color: rgb(109, 122, 229);
                        z-index: 0;
                        &::after {
                            background: #fff;
                        }
                    }
                }
            }
            .login-card-body {
                position: relative;
                border-radius: 18px;
                background: #fff;
                margin-top: -1px;
                z-index: 1;
            }
        }
    }
}
</style>
