<template>
  <teleport to="body">
    <div class="modal">
      <div class="modal-card">
        <div class="comment-close" @click="$emit('close')">
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
              d="m7 7l10 10M7 17L17 7"
            ></path>
          </svg>
        </div>

        <div class="modal-content">
          <div class="blog-header">
            <span>{{ blog.author }}</span>
            <span>{{ blog.publish_date }}</span>
          </div>
          <div class="blog-content">
            <div class="blog-title">{{ blog.title }}</div>
            <div class="blog-content">{{ blog.content }}</div>
          </div>
        </div>
        <div class="modal-comment" v-if="iscomment">
          <span>评论</span>
          <div class="comment-list">
            <CommentCard
              v-for="(items, index) in commentlist"
              :key="index"
              :comment="items"
            />
          </div>
          <div class="publishcomment">
            <el-input
              v-model="comment"
              :rows="1"
              type="textarea"
              placeholder="请输入内容"
            />
            <el-button @click="publishComment">发布</el-button>
          </div>
        </div>
        <div class="footer">
          <el-button @click="toggleLikes"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              class="like-icon"
              :class="{ active: hasliked }"
            >
              <path
                :class="{ active: hasliked }"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                data-swindex="0"
                d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"
              ></path>
            </svg>
          </el-button>
          <el-button @click="iscomment = !iscomment">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="m11 19l-2.293 2.293A1 1 0 0 1 7 20.586V19H3.5A1.5 1.5 0 0 1 2 17.5v-12A1.5 1.5 0 0 1 3.5 4h17A1.5 1.5 0 0 1 22 5.5v12a1.5 1.5 0 0 1-1.5 1.5z"
              ></path>
            </svg>
          </el-button>
        </div>
      </div>
    </div>
  </teleport>
</template>
<script setup lang="ts">
import { Comment, ref } from "vue";
import type { Blog } from "~/types/Blog";
defineEmits(["close"]);
const showModal = ref(false);
const toggleModal = () => {
  showModal.value = !showModal.value;
};

const props = defineProps<{ blog?: Blog }>();

const blog = computed(
  () =>
    props.blog ?? {
      blog_id: "0",
      author: "默认作者",
      title: "默认标题",
      content: "默认内容",
      summary: "默认摘要",
      publish_date: "默认日期",
    }
);
//以下是点赞功能
const hasliked = ref(false);
//先判断有没有登录,假如登录了就判断有没有点赞
onMounted(async () => {
  console.log(blog.value.blog_id);
  if (localStorage.getItem("token")) {
    try {
      const result = await $fetch("/api/hasliked", {
        method: "GET",
        params: {
          user_id: localStorage.getItem("user_id"),
          blog_id: blog.value.blog_id,
        },
      });

      //console.log(result);
      if (result.liked) {
        hasliked.value = true;
        // console.log(hasliked.value);
      } else {
        hasliked.value = false;
      }
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }
});

const toggleLikes = async () => {
  try {
    if (!hasliked.value) {
      const result = await $fetch("/api/like", {
        method: "POST",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: {
          user_id: localStorage.getItem("user_id"),
          blog_id: blog.value.blog_id,
        },
      });
      // console.log(result);
      if (result.code === 200) {
        hasliked.value = true;
      } else {
        hasliked.value = false;
      }
    } else {
      const result = await $fetch("/api/unlike", {
        method: "POST",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: {
          user_id: localStorage.getItem("user_id"),
          blog_id: blog.value.blog_id,
        },
      });
      // console.log(result);
      if (result.code === 200) {
        hasliked.value = false;
      } else {
        hasliked.value = true;
      }
    }
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

//以下是评论功能
const iscomment = ref(false);
const comment = ref("");
const commentlist = ref([]);
onMounted(async () => {
  const { data } = await $fetch("/api/comment/list", {
    method: "GET",
    params: {
      blog_id: blog.value.blog_id,
    },
  });
  commentlist.value = data;
  console.log(commentlist.value);
});
const publishComment = async () => {
  const result = await $fetch("/api/comment/add", {
    method: "POST",
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: {
      blog_id: blog.value.blog_id,
      user_id: localStorage.getItem("user_id"),
      content: comment.value,
    },
  });
  console.log(result);
};
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
.modal-card {
  padding: 20px;
  min-width: 50vw;

  max-width: 60vw;
  min-height: 60vh;
  max-height: 80vh;
  display: flex; /* 新增 */
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  padding-right: 0;
  position: relative;
  box-sizing: border-box;
}
.modal-content {
  overflow-y: auto;
  /* max-width: 60vw; */
  width: 100%;
  display: flex; /* 新增 */
  flex-direction: column; /* 垂直排列内容 */
  padding-right: 20px;
  position: relative; /* 新增 */
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
  height: 100%;
  font-size: 15px;
  line-height: 1.6;
  color: #555;
  white-space: pre-wrap; /* 保留换行 */
  margin-bottom: 1.2rem;
}

.blog-content .blog-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.footer {
  display: flex;
  justify-content: space-between; /* 按钮靠右，如果想居中可以改成 center */
  gap: 10px; /* 按钮间距 */
  width: 100%;
  margin-top: auto; /* 自动推到底部 */
  left: 0;
  bottom: 10px;
  position: absolute;
  box-sizing: border-box;
  background-color: white;
  padding: 0 10px;
}
.like-button {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #333;
}
.like-button:hover {
  color: #f56c6c;
}
.like-count {
  margin-left: 5px;
  font-size: 14px;
  color: #333;
}
.like-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  color: #333;
  vertical-align: middle;
  margin-right: 5px;
}
.active {
  fill: #f56c6c;
  color: #f56c6c;
}
.modal-comment {
  margin-top: 10px;
  font-size: 18px;
  font-weight: 600;
  color: #333;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
}
.comment-close {
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
  color: #999;
}
.comment-close:hover {
  color: #333;
}
.comment-list {
  margin-top: 10px;
  overflow-y: scroll;
  border: 1px solid #eee;
  border-radius: 5px;
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  flex: 1;
  margin-bottom: 60px;
}
.comment-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.publishcomment {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  position: absolute;
  bottom: 20px;
  background-color: #fff;
}
.publish-comment .el-input {
  width: 80%;
}
.publish-comment .el-button {
  width: 20%;
}
.comment-list {
  display: flex;
  flex-direction: column;
  height: 100%;
  border: none;
  overflow-y: auto;
}
</style>
