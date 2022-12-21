<script setup lang="ts">
import Hello from 'components/Hello.vue'
</script>

<template>
  <div>
    <Hello></Hello>
    <el-button type="primary">hello</el-button>
    <router-link to="/">登陆</router-link>
    <router-link to="/main">首页</router-link>
    <router-view></router-view>
  </div>

</template>

<style scoped>
</style>
