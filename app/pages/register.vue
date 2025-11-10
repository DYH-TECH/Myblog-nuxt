<template>
  <div class="content">
    <div class="login-container">
      <div class="login-form">
        <h2>注册</h2>
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
          <button type="submit" class="register-btn" @click="handleRegister">
            注册
          </button>
        </form>
      </div>
      <div class="tips">
        <p>已有账号？<NuxtLink to="/login">立即登录</NuxtLink></p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { useUserLogReg } from "~/types/user";
const userform = ref<useUserLogReg>({
  username: "",
  password: "",
});
const handleRegister = () => {
  $fetch("/api/register", {
    method: "POST",
    body: userform.value,
  })
    .then((res) => {
      alert("注册成功");
      console.log(res);
    })
    .catch((err) => {
      alert("注册失败");
      console.log(err);
    });
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
.register-btn {
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

.register-btn:hover {
  background-color: #0056b3;
}
</style>
