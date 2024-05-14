<!--
  功能：产品卡片
  作者：bianxiaokai
  时间：2024年04月26日 17:22:44
-->
<template>
    <fin-card class="card-item">
        <div
            class="card-title flex-row align-center"
            @click="router.push('/product-details?prodno=' + props.data.prodno)"
        >
            <div class="card-title-box flex-row align-center flex_1">
                <div class="title-tip flex-row align-center justify-center">保函</div>
                <van-text-ellipsis class="title-text flex_1" :content="props.data.names" />
            </div>
            <div class="card-title-money">
                <span class="card-money">{{ props.data.minimum_amount }}</span>
                <span class="card-tip">起</span>
            </div>
        </div>
        <div class="card-center-box flex-row align-center justify-between">
            <div class="card-center-left flex-row align-center justify-between">
                <div class="card-center-money flex-col">
                    <span class="card-center-tip">保函金额</span>
                    <span class="card-center-text">{{ guarantee_amount_range }}</span>
                </div>
                <van-divider vertical :hairline="false" />
                <div class="card-center-time flex-col">
                    <span class="card-center-tip">保函期限</span>
                    <span class="card-center-text">{{ time_limit_range }}</span>
                </div>
            </div>
            <div
                v-if="props.from == 'home'"
                class="card-center-submit flex-col align-center justify-center"
                @click="router.push('/product-apply?prodno=' + props.data.prodno)"
            >
                立即申请
            </div>
            <div v-if="props.from == 'history'" class="card-status">
                <img src="@/assets/images/icon-pass.png" alt="" />
            </div>
        </div>
        <div class="card-footer-box flex-row justify-between align-center">
            <span class="card-footer-time">最近申请时间：2024.04.07</span>
            <span class="card-footer-company">{{ props.data.names }}</span>
        </div>
        <div v-if="props.from == 'history'" class="card-iback-box" @click="onBackOrder">
            <div class="iback-btn">撤销</div>
        </div>
    </fin-card>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { useAppStore } from '@/store';
import { useRoute, useRouter } from 'vue-router';
const props = defineProps({
    data: {
        type: Object,
        default: () => {
            return {};
        }
    },
    from: {
        type: String,
        default: 'home'
    }
});

const onBackOrder = () => {
    // 撤销
};

// eslint-disable-next-line camelcase
const guarantee_amount_range = computed(() => {
    if (props.data.guarantee_amount_min) {
        return props.data.guarantee_amount_min + '~' + props.data.guarantee_amount_max + '万元';
    }
    return '-';
});
// eslint-disable-next-line camelcase
const time_limit_range = computed(() => {
    if (props.data.time_limit_min) {
        return props.data.time_limit_min + '~' + props.data.time_limit_max + '个月';
    }
    return '-';
});
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
const data = reactive({});
onMounted(() => {
    //console.log('3.-组件挂载到页面之后执行-------onMounted')
});
</script>
<style scoped lang="scss">
.card-item {
    .card-title {
        margin-bottom: 18px;
        .card-title-box {
            .title-tip {
                width: 36px;
                height: 17px;
                background: rgba(53, 38, 201, 0.5);
                border-radius: 4px;
                font-weight: 400;
                font-size: 12px;
                margin-right: 10px;
                color: #ffffff;
            }
            .title-text {
                font-weight: 600;
                font-size: 15px;
                color: #222222;
            }
        }
        .card-title-money {
            color: #f03033;
            .card-money {
                font-weight: 600;
                font-size: 20px;
                margin-right: 2px;
            }
            .card-tip {
                font-weight: 400;
                font-size: 12px;
            }
        }
    }
    .card-center-box {
        background: rgba(244, 242, 249, 0.65);
        border-radius: 6px;
        padding: 10px 12px 9px;
        .card-center-left {
            .card-center-tip {
                font-weight: 400;
                font-size: 12px;
                color: #666666;
                margin-bottom: 4px;
            }
            .card-center-text {
                font-weight: 600;
                font-size: 12px;
                color: #3526c9;
            }
        }
        .card-status {
            width: 48px;
            height: 41px;
            img {
                width: 100%;
            }
        }
        .card-center-submit {
            width: 76px;
            height: 26px;
            background: linear-gradient(180deg, #654ee6 0%, #3526c9 100%);
            box-shadow: 0px 2px 4px 0px rgba(53, 38, 201, 0.5);
            border-radius: 18px;
            font-weight: 500;
            font-size: 13px;
            color: #ffffff;
        }
    }
    .card-iback-box {
        padding: 12px 0 0;
        display: flex;
        justify-content: flex-end;
        .iback-btn {
            width: 76px;
            height: 26px;
            background: linear-gradient(180deg, #654ee6 0%, #3526c9 100%);
            box-shadow: 0px 2px 4px 0px rgba(53, 38, 201, 0.5);
            border-radius: 18px;
            font-weight: 500;
            font-size: 13px;
            color: #ffffff;
            text-align: center;
            line-height: 26px;
        }
    }

    .card-footer-box {
        padding-top: 10px;
        font-weight: 400;
        font-size: 12px;
        color: #666666;
    }
}
</style>
