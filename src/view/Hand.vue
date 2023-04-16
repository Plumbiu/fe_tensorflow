<script setup lang="ts">
import { ref, watchEffect, onBeforeUnmount } from 'vue'
import { useUserMedia, useDevicesList } from '@vueuse/core'
// canvas 元素和画笔
let handnetOutput: HTMLCanvasElement
let handnetOutputCtx: CanvasRenderingContext2D
let model: any
let detector: any
let videoWidth: number
let videoHeight: number
// 获取当前设备的摄像头
const isInit = ref<boolean>(false)
const currentCamera = ref<string>()
const { videoInputs: cameras } = useDevicesList({
  requestPermissions: true,
  onUpdated() {
    if (!cameras.value.find(i => i.deviceId === currentCamera.value))
      currentCamera.value = cameras.value[0]?.deviceId
  },
})
// 获取页面的 video 标签
const video = ref<HTMLVideoElement>()
const { stream, enabled } = useUserMedia({
  constraints: { video: { deviceId: currentCamera.value } },
})
enabled.value = true
// 画点
function drawPoint(points: any[]) {
  points.forEach(({ x, y }: any) => {
    handnetOutputCtx.beginPath()
    handnetOutputCtx.arc(x, y, 5, 0, 2 * Math.PI)
    handnetOutputCtx.fillStyle = '#ff0000'
    handnetOutputCtx.fill()
  })
}
// 画线段
function drawPath(points: string | any[]) {
  const region = new Path2D()
  region.moveTo(points[0]?.x, points[0]?.y)
  for (let i = 1; i < points.length; i++) {
    const point = points[i]
    region.lineTo(point.x, point.y)
  }
  handnetOutputCtx.stroke(region)
}
async function loadCamera() {
  isInit.value = true
  // 获取 canvas 元素
  handnetOutput = document.getElementById('output') as HTMLCanvasElement
  handnetOutputCtx = handnetOutput.getContext('2d')!
  videoWidth = video.value?.videoWidth!
  videoHeight = video.value?.videoHeight!
  video.value!.width = videoWidth
  video.value!.height = videoHeight
  handnetOutput.width = videoWidth
  handnetOutput.height = videoHeight
  handnetOutputCtx.drawImage( video.value as CanvasImageSource, 0, 0, videoWidth, videoHeight)
  // 加载模型
  model = handPoseDetection.SupportedModels.MediaPipeHands
}
const detectHand = async () => {
  detector = await handPoseDetection.createDetector(model, {
    runtime: 'mediapipe',
    solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/hands',
  })
  // 返回的结果(包括手势的关键点)
  const hands = await detector.estimateHands(video.value, {
    flipHorizontal: false,
  })
  handnetOutputCtx.drawImage( video.value as CanvasImageSource, 0, 0, videoWidth, videoHeight)
  const rightPointList = hands[0]?.keypoints || []
  const leftPointList = hands[1]?.keypoints || []
  // 画出所有关键点
  drawPoint(rightPointList)
  drawPoint(leftPointList)
  // 画出路径
  drawPath(rightPointList)
  drawPath(leftPointList)
  requestAnimationFrame(() => detectHand())
}
// hooks
onBeforeUnmount(() => {
  enabled.value = false
})
watchEffect(() => {
  if (video.value) video.value.srcObject = stream.value!
})
</script>

<template>
  <ElBreadcrumb separator=">">
    <ElBreadcrumbItem :to="{ path: '/' }">首页</ElBreadcrumbItem>
    <ElBreadcrumbItem><a href="/">手势识别</a></ElBreadcrumbItem>
  </ElBreadcrumb>
  <div>
    <ElButton class="mr-[25px]" @click="loadCamera" :disabled="isInit">初始化</ElButton>
    <ElButton class="mr-[25px]" type="primary" @click="detectHand" :disabled="!isInit">开始</ElButton>
    <div class="flex justify-around text-center m-[25px]">
      <video ref="video" muted autoplay></video>
      <canvas id="output"></canvas>
    </div>
  </div>
</template>
