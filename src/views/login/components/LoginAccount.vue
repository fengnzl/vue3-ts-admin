<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ElForm } from 'element-plus';
import { rules } from '../config/AccountConfig'
const account = ref({
  name: '',
  password: ''
})
const formRef = ref<InstanceType<typeof ElForm> | null>(null)
const loginAction = () => {
  formRef.value?.validate(isValid => {
    if (isValid) {
      console.log('验证成功')
    }
  })
}

defineExpose({
  loginAction
})
</script>

<style lang='scss' scoped>

</style>
