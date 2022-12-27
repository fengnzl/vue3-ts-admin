<template>
  <div class="login">
    <LoginPanel />
  </div>
</template>

<script setup lang="ts">
import LoginPanel from './components/LoginPanel.vue'

</script>

<style lang='scss' scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-image: url('../../assets/image/login-bg.svg');
}
</style>
