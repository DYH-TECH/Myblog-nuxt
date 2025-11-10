<template>
  <header class="header-bar">
    <div class="header-container">
      <!-- 左侧 LOGO -->
      <div class="logo">
        <NuxtLink to="/">MyBlog</NuxtLink>
      </div>

      <!-- 右侧按钮 -->
      <div class="actions">
        <nav class="nav-links">
          <NuxtLink to="/" class="nav-item" exact-active-class="active">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M10 4a4 4 0 1 0 0 8a4 4 0 0 0 0-8M4 8a6 6 0 1 1 12 0A6 6 0 0 1 4 8m12.828-4.243a1 1 0 0 1 1.415 0a6 6 0 0 1 0 8.486a1 1 0 1 1-1.415-1.415a4 4 0 0 0 0-5.656a1 1 0 0 1 0-1.415m.702 13a1 1 0 0 1 1.212-.727c1.328.332 2.169 1.18 2.652 2.148c.468.935.606 1.98.606 2.822a1 1 0 1 1-2 0c0-.657-.112-1.363-.394-1.928c-.267-.533-.677-.934-1.349-1.102a1 1 0 0 1-.727-1.212zM6.5 18C5.24 18 4 19.213 4 21a1 1 0 1 1-2 0c0-2.632 1.893-5 4.5-5h7c2.607 0 4.5 2.368 4.5 5a1 1 0 1 1-2 0c0-1.787-1.24-3-2.5-3z"
              ></path>
            </svg>
            社区</NuxtLink
          >
          <NuxtLink to="/users" class="nav-item" active-class="active">
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
                stroke-width="2"
                data-swindex="0"
                d="M19 21a7 7 0 1 0-14 0m7-10a4 4 0 1 1 0-8a4 4 0 0 1 0 8"
              ></path>
            </svg>
            我的</NuxtLink
          >
          <NuxtLink
            to="/login"
            class="nav-item"
            active-class="active"
            v-if="!isLogin"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M6.641 9.828H1a1 1 0 1 1 0-2h5.641l-1.12-1.12a1 1 0 0 1 1.413-1.415L9.763 8.12a.997.997 0 0 1 0 1.415l-2.829 2.828A1 1 0 0 1 5.52 10.95zM13 0a1 1 0 0 1 1 1v16a1 1 0 0 1-2 0V1a1 1 0 0 1 1-1"
              ></path>
            </svg>
            登录</NuxtLink
          >
          <el-button class="nav-item" v-if="isLogin" @click="logout">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M7 6a1 1 0 0 0 0-2H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h2a1 1 0 0 0 0-2H6V6Zm13.82 5.42l-2.82-4a1 1 0 0 0-1.39-.24a1 1 0 0 0-.24 1.4L18.09 11H10a1 1 0 0 0 0 2h8l-1.8 2.4a1 1 0 0 0 .2 1.4a1 1 0 0 0 .6.2a1 1 0 0 0 .8-.4l3-4a1 1 0 0 0 .02-1.18"
              ></path>
            </svg>
            退出
          </el-button>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const router = useRouter();
const isLogin = ref(false);
const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  isLogin.value = false;
  alert("退出成功");
  router.push("/");
};
onMounted(() => {
  if (localStorage.getItem("token")) {
    isLogin.value = true;
  }
});
const goLogin = () => {
  router.push("/login");
};

const goRegister = () => {
  router.push("/register");
};
</script>

<style scoped>
.header-bar {
  background-color: #fff;
  border-bottom: 1px solid #eee;
  padding: 0.8rem 1rem;
  position: sticky;
  height: 100%;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
}

.header-container {
  max-width: 1100px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo a {
  font-weight: 700;
  font-size: 20px;
  text-decoration: none;
  color: #333;
  letter-spacing: 0.5px;
}

.nav-links {
  display: flex;
  gap: 1.2rem;
}

.nav-item {
  color: #666;
  text-decoration: none;
  transition: color 0.2s;
  font-size: 18px;
  font-weight: 500;
  padding: 0.3rem 0.6rem;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 2px;
}

.nav-item:hover {
  /* color: #000; */
  background-color: #cdd0d6;
  border-radius: 5px;
}

.active {
  color: #fff;
  font-weight: 600;
  background-color: #303133;
  border-radius: 5px;
}

.actions {
  display: flex;
  gap: 0.5rem;
}
</style>
