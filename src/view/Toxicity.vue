<script setup lang="ts">
import { ref } from 'vue'
import {
  IToxicityTypeMap,
  SpanMethodProps,
  IPredictions,
  IContentList,
} from './toxicity.type'
import initialContentList from './toxicity.json'

const loading = ref<boolean>(false)
const sentences = ref<string>('')
const contentlist = ref<IContentList[]>(initialContentList)
const submit = async () => {
  loading.value = true
  const model = await toxicity.load(0.9)
  const predictions = await model.classify([sentences.value])
  contentlist.value.unshift(
    ...predictions.map((item: IPredictions) => {
      const toxicityTypeMap: IToxicityTypeMap = {
        identity_attack: '人身攻击',
        insult: '侮辱',
        obscene: '淫秽',
        severe_toxicity: '剧毒的',
        sexual_explicit: '露骨',
        threat: '威胁',
        toxicity: '带毒的',
      }
      const warm = +(item.results[0].probabilities[0] * 100).toFixed(2)
      const cold = (100 - warm).toFixed(2)
      return {
        text: sentences.value,
        label: toxicityTypeMap[item.label],
        warm: warm + '%',
        cold: cold + '%',
        match: item.results[0].match ?? 'unkown',
      }
    })
  )
  sentences.value = ''
  loading.value = false
}
const objectSpanMethod = ({ rowIndex, columnIndex }: SpanMethodProps) => {
  if (!columnIndex) {
    if (!(rowIndex % 7)) {
      return [7, 1]
    }
    return [0, 0]
  }
}
</script>

<template>
  <ElBreadcrumb separator=">">
    <ElBreadcrumbItem :to="{ path: '/' }">首页</ElBreadcrumbItem>
    <ElBreadcrumbItem><a href="/">文字语义</a></ElBreadcrumbItem>
  </ElBreadcrumb>
  <ElEmpty v-if="!contentlist.length" :image-size="200" />
  <ElTable
    class="my-[25px] mx-[0]"
    v-else
    v-loading="loading"
    border
    max-height="650"
    :span-method="objectSpanMethod"
    :data="contentlist"
    stripe
  >
    <ElTableColumn prop="text" label="文本" width="200" align="center" />
    <ElTableColumn prop="label" label="类型" />
    <ElTableColumn prop="warm" label="积极" />
    <ElTableColumn prop="cold" label="消极" />
    <ElTableColumn prop="match" label="恶意" />
  </ElTable>
  <div class="flex mx-auto mt-[50px] w-1/3">
    <ElInput
      class="px-[15px] py-[0]"
      v-model="sentences"
      @keydown.enter="submit"
      placeholder="请输入文字..."
    />
    <ElButton type="primary" @click="submit">submit</ElButton>
  </div>
</template>

