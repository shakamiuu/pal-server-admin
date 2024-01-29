<template>
    <div class="bg">
        <link-form class="form"></link-form>
    </div>
</template>

<script lang="ts" setup>
import LinkForm from './components/link-form.vue';
</script>

<style lang="less" scoped>
.form {
    max-width: 350px;
    width: 80%;
    margin-right: 20%;
}
.bg {
    height: 100vh;
    width: 100vw;
    background-image: url('@/assets/image/login_bg.jpg');
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    display: flex;
    align-items: flex-end;
    justify-content: center;
}
</style>
