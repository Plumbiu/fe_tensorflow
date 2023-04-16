<script setup lang="ts">
import { ref } from 'vue'
import { IMobileNet } from './mobileNet.type'
const file = ref('')
const imgURL = ref('')
const predictions = ref<IMobileNet[]>([])
const loading = ref<Boolean>(false)
const fileChangeHandler = async () => {
  loading.value = true
  const fileobj = (document.getElementById('imgIpt') as any).files[0]
  const img = document.getElementById('img')
  imgURL.value = window.webkitURL.createObjectURL(fileobj)
  const model = await mobilenet.load()
  predictions.value = (await model.classify(img)).map((item: IMobileNet) => {
    return {
      className: item.className,
      probability: (item.probability * 100).toFixed(3) + '%',
    }
  })
  loading.value = false
}
</script>

<template>
  <ElBreadcrumb separator=">">
    <ElBreadcrumbItem :to="{ path: '/' }">首页</ElBreadcrumbItem>
    <ElBreadcrumbItem><a href="/">图像识别</a></ElBreadcrumbItem>
  </ElBreadcrumb>
  <div class="flex justify-around items-center mx-[0] my-[25px]">
    <ElEmpty class="w-[500px] mr-[25px]" v-if="!imgURL" :image-size="200" />
    <img class="w-[500px] mr-[25px]" id="img" :src="imgURL" />
    <ElTable
      border
      max-height="650"
      :width="200"
      stripe
      :data="predictions"
      v-loading="loading"
    >
      <ElTableColumn prop="className" label="物品"></ElTableColumn>
      <ElTableColumn prop="probability" label="可能性"></ElTableColumn>
    </ElTable>
  </div>
  <div class="w-[400px] mx-auto">
    <ElInput id="imgIpt" type="file" v-model="file" @change="fileChangeHandler" />
  </div>
</template>
