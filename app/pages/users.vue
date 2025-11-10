<template>
  <div class="container">
    <el-container class="el-container">
      <el-aside width="250px" class="left-aside">
        <div class="route-list">
          <NuxtLink to="/users/myblog" class="route-item" active-class="active">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                data-swindex="0"
                d="M2 11.4c0-1.158.242-1.4 1.4-1.4h17.2c1.158 0 1.4.242 1.4 1.4v1.2c0 1.158-.242 1.4-1.4 1.4H3.4C2.242 14 2 13.758 2 12.6zm0-8C2 2.242 2.242 2 3.4 2h17.2c1.158 0 1.4.242 1.4 1.4v1.2c0 1.158-.242 1.4-1.4 1.4H3.4C2.242 6 2 5.758 2 4.6zm0 16c0-1.158.242-1.4 1.4-1.4h17.2c1.158 0 1.4.242 1.4 1.4v1.2c0 1.158-.242 1.4-1.4 1.4H3.4C2.242 22 2 21.758 2 20.6z"
                color="currentColor"
              ></path>
            </svg>
            我的博客</NuxtLink
          >
          <NuxtLink
            to="/users/updateblog"
            class="route-item"
            active-class="active"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M19.822 9.729H18.73a1.113 1.113 0 0 1-1.093-1.094A5.636 5.636 0 0 0 12 3H8.636A5.636 5.636 0 0 0 3 8.635v6.73A5.636 5.636 0 0 0 8.636 21h6.729A5.636 5.636 0 0 0 21 15.364v-4.458a1.15 1.15 0 0 0-1.178-1.177M8.552 7.542h4.037c.589 0 1.093.504 1.093 1.093S13.178 9.73 12.59 9.73H8.55a1.113 1.113 0 0 1-1.093-1.094c0-.589.505-1.093 1.093-1.093m6.897 8.916H8.636a1.113 1.113 0 0 1-1.094-1.094c0-.589.505-1.093 1.094-1.093h6.813c.588 0 1.093.504 1.093 1.093s-.505 1.094-1.093 1.094"
              ></path>
            </svg>
            发布博客</NuxtLink
          >
          <NuxtLink to="/users/mylike" class="route-item" active-class="active">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="15.051740357478835"
              viewBox="0 0 1063 1000"
            >
              <path
                fill="currentColor"
                d="M1063 288v60q0 285-532 653Q0 634 0 348v-60Q0 161 80.5 81T287 1q81 0 134 30.5T531 130q58-68 111-98.5T775 1q126 0 207 80t81 207m-117 55v-50q0-58-39-113.5T812 118q-12-2-37-2q-53 0-83 19.5T620 204l-89 105l-89-105q-42-49-72-68.5T287 116q-24 0-37 2q-56 6-93.5 60T116 293v50q0 30 17 75q68 199 398 441q329-239 399-441q16-50 16-75"
              ></path>
            </svg>
            我的点赞</NuxtLink
          >
        </div>
      </el-aside>

      <el-main class="main">
        <!-- 子页面渲染位置 -->
        <NuxtPage />
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
.el-container {
  height: 100%;
}
.main {
  height: 100%;
  background-color: #f0f2f5;
}
.left-aside {
  border-right: 1px solid #f2f6fc;
  height: 100%;
  padding-top: 30px;
  display: flex;
  background-color: #fafcff;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.15);
}
.route-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.route-item {
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding-left: 30px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  box-sizing: border-box;
  transition: all 0.3s;
  text-decoration: none;
  color: #303133;
  display: flex;
  align-items: center;
  flex-direction: row;
  box-sizing: border-box;
  gap: 5px;
}
.route-item:hover {
  background-color: #f0f2f5;
  color: #303133;
}
.active {
  background-color: #f0f2f5;
  color: #303133;
}
</style>
