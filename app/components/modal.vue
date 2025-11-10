<template>
  <span @click="toggleModal" style="color: #cdd0d6; font-size: 14px">
    点击查看</span
  >
  <teleport to="body">
    <div class="modal" v-if="showModal">
      <div class="modal-content">
        <div class="blog-header">
          <span>{{ blog.author }}</span>
          <span>{{ blog.publish_date }}</span>
        </div>
        <div class="blog-content">
          <div class="blog-title">{{ blog.title }}</div>
          <div class="blog-content">{{ blog.content }}</div>
        </div>
        <div class="footer">
          <el-button @click="toggleModal">关闭</el-button>
        </div>
      </div>
    </div>
  </teleport>
</template>
<script setup lang="ts">
import { ref } from "vue";
import type { Blog } from "~/types/Blog";
const showModal = ref(false);
const toggleModal = () => {
  showModal.value = !showModal.value;
};

const props = defineProps<{ blog?: Blog }>();

const blog = computed(
  () =>
    props.blog ?? {
      id: "0",
      author: "默认作者",
      title: "默认标题",
      content: "默认内容",
      summary: "默认摘要",
      publish_date: "默认日期",
    }
);
</script>
<style scoped>
.modal {
  position: absolute; /* 固定在视口 */
  top: 0;
  left: 0;
  width: 100vw; /* 覆盖整个屏幕宽度 */
  height: 100vh; /* 覆盖整个屏幕高度 */
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* 保证在最上层 */
}
.modal-content {
  background-color: white;
  padding: 20px;
  width: 50vw;
  min-height: 50vh;
  display: flex; /* 新增 */
  flex-direction: column; /* 垂直排列内容 */
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.blog-header {
  display: flex;
  justify-content: space-between; /* 作者在左，日期在右 */
  font-size: 14px;
  color: #888;
  border-bottom: 1px solid #eee; /* 分割线 */
  padding-bottom: 8px;
  margin-bottom: 12px;
}

.blog-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.blog-content .blog-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.blog-content .blog-content {
  font-size: 15px;
  line-height: 1.6;
  color: #555;
  white-space: pre-wrap; /* 保留换行 */
}
.footer {
  margin-top: auto; /* 自动占满剩余空间，把按钮推到底部 */
  display: flex;
  justify-content: flex-end; /* 按钮靠右，如果想居中可以改成 center */
  gap: 10px; /* 按钮间距 */
}
</style>
