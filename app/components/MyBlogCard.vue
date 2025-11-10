<template>
  <div class="blog-card">
    <div class="blog-card-author">
      <span>{{ blog.author }}</span>
    </div>
    <div class="blog-card-date">
      <span>{{ blog.publish_date }}</span>
    </div>
    <div class="blog-card-title">
      <span>{{ blog.title }}</span>
    </div>
    <div class="blog-card-sumary">
      <span>{{ blog.summary }}</span>
    </div>
    <div class="blog-card-footer">
      <modal :blog="blog" />
    </div>
    <div class="delete-btn">
      <el-button type="danger" @click="$emit('delete', blog.blog_id)"
        >删除</el-button
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Blog } from "~/types/Blog";
defineEmits(["delete"]);
const props = defineProps({
  blog: {
    type: Object,
    require: true,
  },
  default: () => ({
    blog_id: 0,
    author: "默认作者",
    title: "默认标题",
    content: "默认内容",
    sumary: "默认摘要",
    publishDate: "默认日期",
  }),
});
const blog = props.blog as Blog;
</script>
<style scoped>
.blog-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  border: 1px solid #d4d7de;
  border-radius: 7px;
  margin-bottom: 20px;
  width: 100%;
  padding: 20px 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  box-sizing: border-box;
  position: relative;
}
.blog-card:hover {
  background-color: #f5f5f5;
  border-radius: 7px;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
  transform: translateY(-4px);
}
.blog-card-author {
  font-size: 18px;
}
.blog-card-date {
  font-size: 10px;
  color: #999;
}
.blog-card-title {
  font-size: 22px;
  font-weight: bold;
  margin: 0 0 10px 0;
}
.blog-card-sumary {
  font-size: 16px;
  color: #666;
  margin-bottom: 50px;
}
.blog-card-footer {
  display: flex;
  justify-content: space-between;
}
.delete-btn {
  position: absolute;
  right: 20px;
  bottom: 20px;
}
</style>
