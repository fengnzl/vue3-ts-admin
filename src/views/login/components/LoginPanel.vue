<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" stretch>
      <el-tab-pane>
        <template #label>
          <span class="custom-tabs-label">
            <el-icon>
              <User />
            </el-icon>
            <span>账号登陆</span>
          </span>
        </template>
        <LoginAccount ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <span class="custom-tabs-label">
            <el-icon>
              <Iphone />
            </el-icon>
            <span>验证码登陆</span>
          </span>
        </template>
        <LoginPhone />
      </el-tab-pane>
    </el-tabs>

    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button type="primary" class="login-btn" @click="handleLoginClick">立即登陆</el-button>
  </div>

</template>

<script setup lang="ts">
import { Iphone, User } from '@element-plus/icons-vue'
import LoginAccount from './LoginAccount.vue'
import LoginPhone from './LoginPhone.vue'
const isKeepPassword = ref(true)

// https://cn.vuejs.org/guide/typescript/composition-api.html#typing-component-template-refs
const accountRef = ref<InstanceType<typeof LoginAccount> | null>(null)
const handleLoginClick = () => {
  console.log('立即登陆')
  accountRef.value?.loginAction()
}
</script>

<style lang='scss' scoped>
.login-panel {
  margin-bottom: 150px;
  width: 320px;

  .title {
    text-align: center;
  }

  .account-control {
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
