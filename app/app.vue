<template>
  <div>
    <ul>
      <li><nuxt-link to="/">home</nuxt-link></li>
      <li><nuxt-link to="/about">about</nuxt-link></li>
    </ul>

    <NuxtPage />
  </div>
</template>
<script setup lang="ts">
const user = useCurrentUser();
</script>
<style scoped></style>
