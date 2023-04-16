<script setup lang="ts">
</script>

<template>
  <ElMenu
    class="b-b-0 h-[80px]"
    default-active="toxicity"
    mode="horizontal"
    background-color="#077791"
    text-color="#ccc"
    active-text-color="#ffd04b"
    router
  >
    <ElMenuItem index="/toxicity">文字语义</ElMenuItem>
    <ElMenuItem index="/mobilenet">图像识别</ElMenuItem>
    <ElMenuItem index="/hand">手势识别</ElMenuItem>
    <ElMenuItem index="/">首页</ElMenuItem>
  </ElMenu>
</template>
