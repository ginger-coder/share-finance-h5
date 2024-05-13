<!--
  功能：企业详情
  作者：bianxiaokai
  时间：2024年04月26日 08:52:09
-->
<template>
    <div class="container bg-color">
        <fin-card :is-icon="true">
            <div class="info-item justify-between align-center">
                <div class="info-item-title">企业名称</div>
                <div class="info-item-desc">海久六灵科技有限公司</div>
            </div>
            <div class="info-item justify-between align-center">
                <div class="info-item-title">统一社会信用代码</div>
                <div class="info-item-desc">11511624MB1214334B</div>
            </div>
            <div class="info-item justify-between align-center">
                <div class="info-item-title">法人代表</div>
                <div class="info-item-desc">张三</div>
            </div>
            <div class="info-item justify-between align-center">
                <div class="info-item-title">法人身份证号</div>
                <div class="info-item-desc">142222199906125245</div>
            </div>
            <div class="info-item justify-between align-center">
                <div class="info-item-title">法人手机号</div>
                <div class="info-item-desc">18856525362</div>
            </div>
            <div class="info-item justify-between align-center">
                <div class="info-item-title">联系人</div>
                <div class="info-item-desc">张三</div>
            </div>
            <div class="info-item justify-between align-center">
                <div class="info-item-title">联系方式</div>
                <div class="info-item-desc">18856525362</div>
            </div>
            <div class="info-item justify-between align-center">
                <div class="info-item-title">联系方式</div>
                <div class="info-item-desc">18856525362</div>
            </div>
            <div class="info-item justify-between align-center">
                <div class="info-item-title">公司行业</div>
                <div class="info-item-desc">采矿业-煤炭-烟煤-烟煤</div>
            </div>
            <div class="info-item justify-between align-center">
                <div class="info-item-title">所属区域</div>
                <div class="info-item-desc">山西省-晋中市-榆次区</div>
            </div>
            <div class="info-item justify-between align-center">
                <div class="info-item-title">经营范围</div>
                <div class="info-item-desc">煤炭开采</div>
            </div>
            <div class="info-item justify-between align-center">
                <div class="info-item-title">企业简介</div>
                <div class="info-item-desc">
                    从事煤炭开采从事煤炭开采从事煤炭开采从事煤炭开采从事煤炭开采从事煤炭开采
                </div>
            </div>
        </fin-card>
        <fin-card :is-icon="true" title="证件">
            <div class="card-pic-box align-center justify-around">
                <div
                    class="card-pic-item flex-col justify-center align-center"
                    @click="imagePreview(0)"
                >
                    <van-image
                        width="75px"
                        height="54px"
                        fit="contain"
                        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
                    />
                    <div class="card-pic-tip">营业执照</div>
                </div>
                <div
                    class="card-pic-item flex-col justify-center align-center"
                    @click="imagePreview(1)"
                >
                    <van-image
                        width="75px"
                        height="54px"
                        fit="contain"
                        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
                    />
                    <div class="card-pic-tip">法人正面身份证</div>
                </div>
                <div
                    class="card-pic-item flex-col justify-center align-center"
                    @click="imagePreview(2)"
                >
                    <van-image
                        width="75px"
                        height="54px"
                        fit="contain"
                        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
                    />
                    <div class="card-pic-tip">法人背面身份证</div>
                </div>
            </div>
        </fin-card>
    </div>
</template>
vue
<script setup>
import { ref, reactive, onMounted } from 'vue';
import { showImagePreview } from 'vant';
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

const imagePreview = index => {
    showImagePreview({
        images: [
            'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
            'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
            'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'
        ],
        startPosition: index
    });
};

/**
 * 数据部分
 */
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
    padding: 18px 16px;
    .info-item {
        margin-bottom: 12px;
        .info-item-title {
            font-weight: 500;
            font-size: 13px;
            color: #333333;
        }
        .info-item-desc {
            font-weight: 400;
            font-size: 13px;
            color: #666666;
            max-width: 60%;
        }
    }
    .card-pic-item {
        width: 98px;
        height: 102px;
        background: rgba(244, 242, 249, 0.65);
        border-radius: 6px;
        padding: 12px 0;
        .card-pic-tip {
            font-weight: 500;
            font-size: 11px;
            color: #8082a3;
            padding: 10px 0;
        }
    }
}
</style>
