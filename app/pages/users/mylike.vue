<template>
  <div class="content">
    <h1>我的点赞</h1>
    <div v-if="blogs.length === 0">暂无点赞</div>
    <BlogCard v-for="(items, index) in blogs" :key="index" :blog="items" />
  </div>
</template>
<script setup lang="ts">
import type { Blog } from "~/types/Blog";
const blogs = ref([]);
onMounted(async () => {
  const result = await $fetch("/api/mylikelist", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    params: {
      user_id: Number(localStorage.getItem("user_id")),
    },
  });
  blogs.value = result.data;
  console.log(blogs.value);
});
</script>
<style scoped>
.content {
  padding: 20px 30px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>
