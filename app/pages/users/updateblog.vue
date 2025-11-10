<template>
  <div class="content">
    <!-- 这里放发布博客的表单内容 -->
    <div class="updatecard">
      <h3>发布博客</h3>
      <div class="blogtitle">
        <label for="titleinput">标题 </label>
        <input
          type="text"
          class="titleinput"
          id="titleinput"
          name="titleinput"
          placeholder="请输入标题"
          v-model="blog.title"
        />
      </div>
      <div class="blogsumary">
        <label for="sumaryinput">摘要 </label>
        <input
          type="text"
          class="sumaryinput"
          id="sumaryinput"
          name="sumaryinput"
          placeholder="请输入摘要"
          v-model="blog.summary"
        />
      </div>
      <div class="blogcontent">
        <label for="contentinput">内容 </label>
        <textarea
          class="contentinput"
          id="contentinput"
          name="contentinput"
          placeholder="请输入内容"
          v-model="blog.content"
        ></textarea>
      </div>
      <button class="submitbutton" @click="submit">发布</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Blog } from "~/types/Blog";
import type { useUpdateResponse } from "~/types/logintype";
const blog = ref<Blog>({
  blog_id: 1,
  title: "",
  content: "",
  summary: "",
  author: "",
  publish_date: "",
});
const submit = async () => {
  blog.value.publish_date = new Date().toLocaleDateString();
  // 这里写提交博客的逻辑
  const token = localStorage.getItem("token");
  const author = localStorage.getItem("username");
  const res = await $fetch("/api/updateblog", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: {
      title: blog.value.title,
      content: blog.value.content,
      summary: blog.value.summary,
      author: author,
    },
  }).then((res) => {
    if (res.code === 200) {
      // 提交成功
      console.log(res);
    }
  });
  alert("提交成功");
};
</script>

<style scoped>
.content {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
}
.updatecard {
  width: 100%;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px 30px;
  box-sizing: border-box;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}
.blogtitle {
  display: flex;
  flex-direction: column;
}
.titleinput {
  width: 100%;
  height: 35px;
  border-radius: 5px;
  border: 1px solid #f0f2f5;
  padding: 0 10px;
  box-sizing: border-box;
  margin-top: 10px;
  background-color: #f0f2f5;
}
.sumaryinput {
  width: 100%;
  height: 45px;
  border-radius: 5px;
  border: 1px solid #f0f2f5;
  padding: 0 10px;
  box-sizing: border-box;
  margin-top: 10px;
  background-color: #f0f2f5;
}
.contentinput {
  width: 100%;
  height: 200px;
  border-radius: 5px;
  border: 1px solid #f0f2f5;
  padding: 10px;
  box-sizing: border-box;
  margin-top: 10px;
  background-color: #f0f2f5;
}
.submitbutton {
  width: 100%;
  height: 40px;
  border-radius: 5px;
  border: none;
  background-color: #141414;
  color: #fff;
  font-size: 16px;
  margin-top: 20px;
  cursor: pointer;
}
.submitbutton:hover {
  background-color: #636466;
}
</style>
