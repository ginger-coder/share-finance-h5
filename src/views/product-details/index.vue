<!--
  功能：产品详情
  作者：bianxiaokai
  时间：2024年04月24日 15:28:13
-->
<template>
    <div class="container">
        <fin-card class="bank align-center justify-between">
            <div class="bank-name-box">
                <div class="bank-name">{{ data.bankTablerInfo.names }}</div>
                <div class="bank-no">{{ data.bankTablerInfo.mobile }}</div>
            </div>
            <div class="bank-icon">
                <img src="" alt="" />
            </div>
        </fin-card>
        <fin-card class="project-summary" :is-icon="true" title="产品概况">
            <div class="summary-box">
                <div class="summary-top align-center justify-between">
                    <div class="sum-header">
                        <div class="sum-title">{{ data.info.names }}</div>
                        <div class="sum-desc">
                            <span>投标应答</span>
                            <van-divider vertical :hairline="false" />
                            <span>独立性保函</span>
                        </div>
                    </div>
                    <div class="sum-money">
                        {{ moneyFormat(data.info.minimum_amount) }}
                        <span class="sum-money-tip">起</span>
                    </div>
                </div>
                <van-divider />
                <div class="summary-bottom justify-between align-center">
                    <div class="summary-desc-item">
                        <div class="summary-desc-item-title sdi-money">
                            {{ guarantee_amount_range }}
                        </div>
                        <div class="summary-desc-item-tip">保函金额</div>
                    </div>
                    <div class="summary-desc-item">
                        <div class="summary-desc-item-title">{{ time_limit_range }}</div>
                        <div class="summary-desc-item-tip">保函期限</div>
                    </div>
                    <div class="summary-desc-item">
                        <div class="summary-desc-item-title">5%</div>
                        <div class="summary-desc-item-tip">服务费比例</div>
                    </div>
                </div>
            </div>
        </fin-card>
        <fin-card class="product-info" :is-icon="true" title="产品详情">
            <div class="product-content">
                <div class="product-item">
                    <div class="product-item-title">产品简介</div>
                    <div class="product-item-content">{{ data.info.summary }}</div>
                </div>
                <div class="product-item">
                    <div class="product-item-title">适用客户</div>
                    <div class="product-item-content">{{ data.info.applicable_customer }}</div>
                </div>
                <div class="product-item">
                    <div class="product-item-title">申请条件</div>
                    <div class="product-item-content">{{ data.info.application_conditions }}</div>
                </div>
                <div class="product-item">
                    <div class="product-item-title">申请流程</div>
                    <div class="product-item-content">{{ data.info.application_process }}</div>
                </div>
                <div class="product-item">
                    <div class="product-item-title">提交材料</div>
                    <div class="product-item-content">{{ data.info.submit_materials }}</div>
                </div>
            </div>
        </fin-card>
        <fin-card class="product-info" :is-icon="true" title="材料信息">
            <div class="product-content">
                <div class="product-item">
                    <!-- <div class="product-item-title">基础信息类</div> -->
                    <div class="product-item-tag-content">
                        <van-tag
                            v-for="(item, index) in data.info.materials"
                            :key="index"
                            class="pro-tag"
                            color="rgba(244,242,249,0.65)"
                            text-color="#1E1771"
                            @click="downloadFile(item)"
                        >
                            {{ getFileName(item) }}
                        </van-tag>
                    </div>
                </div>
            </div>
        </fin-card>
        <fin-button submit-text="提交申请" @click="handleSubmit" />
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { useAppStore } from '@/store';
import { useRoute, useRouter } from 'vue-router';
import api from '@/api';
import { moneyFormat, getFileName, downloadFile } from '@/utils';
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

// eslint-disable-next-line camelcase
const guarantee_amount_range = computed(() => {
    if (data.value.info.guarantee_amount_min) {
        return (
            data.value.info.guarantee_amount_min +
            '~' +
            data.value.info.guarantee_amount_max +
            '万元'
        );
    }
    return '-';
});
// eslint-disable-next-line camelcase
const time_limit_range = computed(() => {
    if (data.value.info.time_limit_min) {
        return data.value.info.time_limit_min + '~' + data.value.info.time_limit_max + '个月';
    }
    return '-';
});
/**
 * 数据部分
 */
let data = ref({
    bankTablerInfo: {},
    info: {}
});
const init = () => {
    api.getProductInfo({ prodno: route.query.prodno }).then(res => {
        data.value = res.data;
    });
};
const handleSubmit = () => {
    router.push('/product-apply?prodno=' + data.value.prodno);
};
onMounted(() => {
    init();
});
</script>
<style scoped lang="scss">
.container {
    padding: 18px 16px;
    min-height: 100%;
    background: linear-gradient(180deg, #3728cb 0%, #f4f2f9 14.7%);
    background-attachment: fixed;
    .summary-box {
        padding: 16px;
        background: rgba(244, 242, 249, 0.65);
        border-radius: 6px;
        .sum-title {
            font-weight: 600;
            font-size: 14px;
            color: #333333;
            margin-bottom: 8px;
        }
        .sum-desc {
            font-weight: 400;
            font-size: 12px;
            color: #666666;
        }
        .sum-money {
            font-weight: 600;
            font-size: 20px;
            color: #f03033;
            padding: 2px 8px 2px 26px;
            background: rgba(255, 223, 224, 0.5);
            background: linear-gradient(118deg, transparent 20px, rgba(255, 223, 224, 0.5) 0) top
                left;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
            position: relative;
            &::before {
                content: '';
                position: absolute;
                top: 0;
                left: 7px;
                width: 4px;
                height: 27px;
                transform: skew(-28deg);
                background: rgba(255, 223, 224, 0.5);
            }
        }
        .sum-money-tip {
            font-weight: 400;
            font-size: 12px;
        }
        .summary-desc-item-title {
            font-weight: 600;
            font-size: 14px;
            color: #222222;
            &.sdi-money {
                font-weight: 600;
                font-size: 14px;
                color: #3526c9;
            }
        }
        .summary-desc-item-tip {
            font-weight: 400;
            font-size: 12px;
            color: #8082a3;
        }
    }
    .bank {
        padding: 18px 16px;
        .bank-name-box {
            .bank-name {
                font-weight: 600;
                font-size: 18px;
                color: #222222;
                margin-bottom: 5px;
            }
            .bank-no {
                font-weight: 400;
                font-size: 13px;
                color: #666666;
            }
        }
    }
    .product-info {
        .product-item {
            margin-bottom: 8px;
            display: flex;
            justify-content: space-between;
            .product-item-title {
                width: 24%;
                font-weight: 500;
                font-size: 13px;
                color: #333333;
            }
            .product-item-content {
                width: 70%;
                font-weight: 400;
                font-size: 13px;
                color: #666666;
                text-align: right;
            }
            .product-item-tag-content {
                display: flex;
                flex-wrap: wrap;
                width: 100%;
            }
            .pro-tag {
                margin-left: 5px;
                margin-bottom: 5px;
            }
        }
    }
}
</style>
