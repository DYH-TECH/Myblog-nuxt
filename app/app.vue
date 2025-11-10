<template>
  <div id="app">
    <el-container class="container">
      <el-header class="head">
        <HeaderBar />
      </el-header>
      <el-main class="main">
        <NuxtPage></NuxtPage>
      </el-main>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import HeaderBar from "./components/HeaderBar.vue";
</script>
<style scoped>
.container {
  height: 100%;
  width: 100%;
}
.main {
  background-color: #fff;
  height: 100%;
  padding: 20px 0;
  padding-bottom: 0;
}
.head {
  padding: 0;
}
</style>
