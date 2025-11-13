<template>
  <div class="card">
    <span class="comment-name">{{ username }}</span>
    <span class="comment-content">{{ content }}</span>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  comment: {
    type: Object,
    required: true,
  },
  default: () => ({
    username: "默认用户",
    content: "默认评论",
  }),
});
const { username, content } = props.comment;
</script>
<style scoped>
.card {
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  border-bottom: #cdd0d6 solid 1px;
}

.comment-name {
  font-weight: bold;
  margin-right: 10px;
  font-size: 16px;
  margin-bottom: 5px;
}

.comment-content {
  color: #666;
  font-size: 12px;
}
</style>
