<!--
  功能：申请记录
  作者：bianxiaokai
  时间：2024年04月24日 10:51:35
-->
<template>
    <div class="container bg-color">
        <div class="history-box">
            <div v-for="item in list" :key="item" class="history-item">
                <div class="messsage-time">2023年5月23日 下午13:24</div>
                <div class="message-box">
                    <div class="message-title flex-row align-center">
                        <img src="@/assets/images/center/icon-message.png" alt="" />
                        申请消息
                    </div>
                    <div class="message-content">
                        温馨提醒：您于2023年12月12日申请的金融商业贷产品已通过线上初审，请联系银行。
                    </div>
                </div>
            </div>
        </div>
        <footer-view />
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useAppStore } from '@/store';
import { useRoute, useRouter } from 'vue-router';
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
const list = ref([1, 2, 3, 6, 7, 8]);
const data = reactive({});
onMounted(() => {
    //console.log('3.-组件挂载到页面之后执行-------onMounted')
});
</script>
<style scoped lang="scss">
.container {
    height: 100%;
    overflow-y: auto;
    position: relative;
    z-index: 2;
    .history-box {
        padding: 16px;
        .history-item {
            margin-bottom: 16px;
            .messsage-time {
                padding: 20px 0;
                text-align: center;
                font-weight: 400;
                font-size: 13px;
                color: #a3a3a3;
            }
            .message-box {
                background: linear-gradient(180deg, #f3f1ff 0%, rgba(255, 255, 255, 0.9) 100%);
                box-shadow: 0px 2px 4px 0px rgba(53, 110, 253, 0.05);
                border-radius: 8px;
                border: 1px solid #ffffff;
                padding: 16px;
                .message-title {
                    img {
                        width: 24px;
                        height: 24px;
                        margin-right: 8px;
                    }
                    font-weight: 500;
                    font-size: 16px;
                    color: #222222;
                }
                .message-content {
                    padding-top: 13px;
                    font-weight: 400;
                    font-size: 14px;
                    color: #999999;
                }
            }
        }
    }
}
</style>
