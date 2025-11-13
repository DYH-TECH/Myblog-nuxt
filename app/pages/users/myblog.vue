<template>
  <div class="content">
    <h2>我的博客</h2>
    <div class="blog-main">
      <div class="input-box">
        <input type="text" placeholder="请输入关键词" class="searchborder" />
        <div class="tips">一共{{ bloglist.length }}条博客</div>
      </div>
      <div class="bloglist">
        <div class="nonetips" v-if="bloglist.length === 0">暂无博客</div>
        <MyBlogCard
          v-for="(items, index) in bloglist"
          :key="index"
          :blog="items"
          @delete="handleDelete"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Blog } from "~/types/Blog";
const blognumber = 10;
const form = ref({
  keyword: "",
  date: "",
});
const onSubmit = () => {
  console.log("submit!");
};
// const bloglist = ref<Blog[]>([
//   {
//     blog_id: 1,
//     title: "博客标题",
//     author: "作者",
//     publish_date: "2022-01-01",
//     summary: "博客摘要",
//   },
// ]);
const bloglist = ref([]);
onMounted(async () => {
  const token = localStorage.getItem("token");

  const { data } = await $fetch("/api/getmybloglist", {
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (Array.isArray(data)) {
    console.log("我的", data);
    bloglist.value = data || [];
  } else {
    return;
  }
});

const handleDelete = async (blog_id: number) => {
  try {
    const token = localStorage.getItem("token");
    const res = await $fetch(`/api/deleteblog/${blog_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("删除请求结果：", res);
    if (res.code === 200) {
      // 本地更新博客列表
      bloglist.value = bloglist.value.filter(
        (blog: Blog) => blog.blog_id !== blog_id
      );
      alert("删除成功");
    } else {
      alert(res.message || "删除失败");
    }
  } catch (err) {
    console.error("删除请求失败：", err);
    alert("删除出错");
  }
};
</script>
<style scoped>
.content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.blog-main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.input-box {
  width: 90%;
  box-sizing: border-box;
  height: 100px;
  background-color: #ffffff;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
  display: flex;
  flex-direction: row;
  padding: 10px 20px;
  flex-direction: column;
}
.searchborder {
  height: 35px;
  width: 60%;
  background-color: #e5eaf3;
  border: none;
  border-radius: 6px;
  margin: 10px 0;
  padding: 0 20px;
  font-size: 14px;
  color: #333333;
}
.bloglist {
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}
.tips {
  font-size: 13px;
  color: #999999;
}
</style>
