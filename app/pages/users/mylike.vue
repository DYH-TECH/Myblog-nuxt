<template>
  <div class="content">
    <h1>我的点赞</h1>
    <BlogCard v-for="(items, index) in blogs" :key="index" :blog="items" />
  </div>
</template>
<script setup lang="ts">
import type { Blog } from "~/types/Blog";
const blogs = ref<Blog[]>([
  {
    blog_id: 1,
    title: "博客标题1",
    summary: "博客摘要1",
    author: "作者1",
    publish_date: "2022-01-01",
    like_count: 1,
  },
  {
    blog_id: 2,
    title: "博客标题2",
    summary: "博客摘要2",
    author: "作者2",
    publish_date: "2022-01-02",
    like_count: 2,
  },
  {
    blog_id: 3,
    title: "博客标题3",
    summary: "博客摘要3",
    author: "作者3",
    publish_date: "2022-01-03",
    like_count: 3,
  },
]);
</script>
<style scoped>
.content {
  padding: 20px 30px;
}
</style>
