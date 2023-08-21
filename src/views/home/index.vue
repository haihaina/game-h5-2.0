<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const goLogin = () => {
  router.push('/login')
}
</script>
<template>
  <div>
    首页
  </div>
  <!-- 去登录 -->
  <!-- <router-link to="/login">去登录</router-link> -->
  <van-button type="success" @click="goLogin">去登录</van-button>
</template>