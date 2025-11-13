<template>
  <div class="content">
    <div class="login-container">
      <div class="login-form">
        <h2>登录</h2>
        <form>
          <div class="form-group">
            <label for="username">用户名</label>
            <input
              type="text"
              id="username"
              name="username"
              v-model="userform.username"
              required
            />
          </div>
          <div class="form-group">
            <label for="password">密码</label>
            <input
              type="password"
              id="password"
              name="password"
              v-model="userform.password"
              required
            />
          </div>
          <button type="button" class="login-btn" @click="handlelogin">
            登录
          </button>
        </form>
      </div>
      <div class="tips">
        <p>没有账号？<NuxtLink to="/register">立即注册</NuxtLink></p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import type { useUserLogReg } from "~/types/user";
import type { useLoginResponse } from "~/types/logintype";
const router = useRouter();
const userform = ref<useUserLogReg>({
  username: "",
  password: "",
});
const handlelogin = async () => {
  try {
    const res = await $fetch<useLoginResponse>("/api/login", {
      method: "POST",
      body: {
        username: userform.value.username,
        password: userform.value.password,
      },
    });

    // 根据后端返回结构调整
    if (res.code === 200) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("user_id", res.data.user_id.toString()); // 将用户ID存储在本地存储中
      router.push("/");
      alert("登录成功");
    } else {
      alert(res.msg || "登录失败");
    }
  } catch (err) {
    console.error("登录请求出错：", err);
  }
};
</script>
<style scoped>
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.login-container {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 45%;
  min-width: 300px;
  height: 500px;
  transition: width 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.tips {
  margin-top: 20px;
  text-align: center;
}

.login-form {
  width: 0%;
  min-width: 400px;
  margin: 0 auto;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
}
.login-btn {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  margin-top: 50px;
}

.login-btn:hover {
  background-color: #0056b3;
}
</style>
