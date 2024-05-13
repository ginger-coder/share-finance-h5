<!--
  功能：通用Card
  作者：bianxiaokai
  时间：2024年04月24日 10:40:48
-->
<template>
    <div :class="['card', props.isIcon ? 'card-icon' : '']">
        <div v-if="props.title.length" class="title">{{ props.title }}</div>
        <slot></slot>
    </div>
</template>
<script setup>
const props = defineProps({
    isIcon: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: ''
    }
});
</script>
<style scoped lang="scss">
.card {
    width: 100%;
    background: #ffffff;
    border-radius: 12px;
    margin-bottom: 12px;
    padding: 20px 16px 16px;
    &.card-icon {
        background-image: url('@/assets/images/center/icon-question.png');
        background-repeat: no-repeat;
        background-size: 16px 16px;
        background-position: 10px 10px;
    }
    .title {
        padding: 6px 0 12px;
        font-weight: 600;
        font-size: 16px;
        color: #222222;
    }
}
</style>
