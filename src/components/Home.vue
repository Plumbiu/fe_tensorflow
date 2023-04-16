<script setup lang="ts">
import { ref } from 'vue'
const fnTable = [
  {
    label: '图像识别',
    finish: true,
  },
  {
    label: '手势识别',
    finish: true,
  },
  {
    label: '语义推测',
    finish: true,
  },
  {
    label: '语音识别',
    finish: false,
  },
  {
    label: '文字识别',
    finish: false,
  },
  {
    label: '姿态识别',
    finish: false,
  },
  {
    label: '静态图片动态化',
    finish: false,
  },
]
</script>

<template>
  <div aria-label="A complete example of page header">
    <ElPageHeader>
      <template #breadcrumb>
        <ElBreadcrumb separator=">">
          <el-breadcrumbItem :to="{ path: '/' }"> 首页 </el-breadcrumbItem>
        </ElBreadcrumb>
      </template>
      <template #content>
        <div class="flex items-center">
          <ElAvatar
            class="mr-3"
            :size="32"
            src="https://plumbiu.github.io/blogImg/QQavatar.jpg"
          />
          <span class="text-lg font-600 mr-3">Plumbiu</span>
          <el-tag>fe-coder</el-tag>
        </div>
      </template>
      <template #extra>
        <div class="flex items-center">
          <ElButton>
            <a href="https://github.com/Plumbiu" class="text-[#333]">github</a>
          </ElButton>
          <ElButton type="primary" class="ml-2">
            <a href="https://blog.plumbiu.club/" class="text-[#eee]">博客</a>
          </ElButton>
        </div>
      </template>

      <ElDescriptions :column="3" size="small" class="mt-4">
        <ElDescriptionsItem label="Username">Plumbiu</ElDescriptionsItem>
        <ElDescriptionsItem label="Age">20</ElDescriptionsItem>
        <ElDescriptionsItem label="Telephone"
          >18668961630</ElDescriptionsItem
        >
        <ElDescriptionsItem label="Place">Hangzhou</ElDescriptionsItem>
        <ElDescriptionsItem label="Remarks">
          <el-tag size="small">杭州电子科技大学</el-tag>
        </ElDescriptionsItem>
        <ElDescriptionsItem label="Motto"
          >good good study, day day up
        </ElDescriptionsItem>
      </ElDescriptions>
    </ElPageHeader>
  </div>
  <ElCard class="mt-[50px]">
    <template #header>
      <div class="flex items-end">
        <span class="text-[25px]">本项目基于 Tensorflow 开发</span>
        <ElButton type="primary" text>开源地址</ElButton>
      </div>
    </template>
    <ElTable :data="fnTable" stripe border>
      <ElTableColumn center prop="label" label="功能"></ElTableColumn>
      <ElTableColumn prop="finish" label="是否完善">
        <template #default="scope">
          <ElTag v-if="scope.row.finish" type="success">√</ElTag>
          <ElTag v-else type="success">×</ElTag>
        </template>
      </ElTableColumn>
    </ElTable>
  </ElCard>
</template>
