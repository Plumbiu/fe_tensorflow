<script lang="ts" setup>
import HeaderMenu from './components/HeaderMenu.vue'
</script>

<template>
  <ElContainer class="text-center h-[100vh]">
    <ElHeader
      class="flex justify-around items-center
      color-white text-[40px] font-bold h-[80px] leading-[80px] bg-[#077791]"
      >
      <span>深度学习</span>
      <HeaderMenu />
    </ElHeader>
    <ElMain class="px-[200px] py-[25px]">
      <RouterView />
    </ElMain>
  </ElContainer>
</template>
