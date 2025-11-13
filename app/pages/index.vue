<template>
  <div class="container">
    <div class="card-container">
      <h2>社区博客</h2>
      <BlogCard v-for="(items, index) in blog" :key="index" :blog="items" />
    </div>
  </div>
</template>
<script setup lang="ts">
import BlogCard from "~/components/BlogCard.vue";
import type { Blog } from "~/types/Blog";
// onMounted(() => {
//   const token = localStorage.getItem("token");
//   const username = localStorage.getItem("username");
//   console.log(token, username);
// });
// onMounted(() => {
//   const token = localStorage.getItem("token");
//   const username = localStorage.getItem("username");
//   const user_id = Number(localStorage.getItem("user_id"));
//   console.log(token, username, user_id);
//   console.log(typeof user_id);
// });
const bloglist = ref([
  {
    id: 1,
    title: "标题",
    summary: "摘要",
    content: "内容",
    author: "作者",
    publish_date: "2022-01-01",
  },
]);
const { data } = await useFetch("/api/getbloglist");
bloglist.value = data.value;

const blog = data.value.data;
// console.log(blog);
</script>
<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}
.card-container {
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
