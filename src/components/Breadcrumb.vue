<template>
  <emqx-breadcrumb separator="/">
    <transition-group name="breadcrumb" mode="out-in">
    <emqx-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
      <span v-if="item.redirect==='noRedirect'|| index === levelList.length-1" class="no-redirect">{{ $t(`${item.meta.title}`) }}</span>
      <a v-else @click.prevent="onHandleLink(item)">{{ $t(`${item.meta.title}`) }}</a>
    </emqx-breadcrumb-item>
  </transition-group>
  </emqx-breadcrumb>
</template>


<script lang="ts">
import { defineComponent, onBeforeMount, ref, watch, reactive, toRefs } from 'vue'
export default defineComponent({
  name: 'Breadcrumb'
})
</script>

<script lang="ts" setup>
import { useRoute, useRouter, RouteLocationMatched } from 'vue-router'

const $route = useRoute()
const $router = useRouter()
// const levelList = ref(<any>[])
const state = reactive({
  levelList: [] as Array<any>,
  // levelList:[] as Array<RouteLocationMatched>
})
const { levelList } = toRefs(state)


onBeforeMount(() => {
  getBreadcrumbs()
})

watch(() => $route.path, () => {
  getBreadcrumbs()
}, { immediate: false })

const getBreadcrumbs = () => {
  const { fullPath, matched } = $route
  let new_matched = matched.filter(item => item.meta && item.meta.title)
  /**
   * fixed 返回上级面包屑且路由含有动态参数时找不到路由的问题
   * 1. 进入页面时，标记 & 保存当前路由的fullpath（包含了路由参数）
   * 2. 存储上一次匹配的路由，即进入页面前的面包屑
   * 3. 对比上一次面包屑列表，如当前路由匹配的列表长度比较大，即进入新页面，则合并 2 步骤的列表 和 当前路由（1已记录fullpath）；否则为返回面包屑上一级，则使用当前页面匹配到的列表
   */
  const current_route = {
    ...new_matched[new_matched.length - 1],
    fullPath: fullPath
  }
  new_matched[new_matched.length - 1] = current_route // 标记fullpath

  const formMatched = state.levelList // 存储上一次的 matched list
  if(formMatched.length < new_matched.length) {
    formMatched.push(current_route)
    state.levelList = formMatched
  } else {
    state.levelList = new_matched
  }
}

// 面包屑点击
const onHandleLink = (item:any) => {
  const { redirect, path, fullPath } = item
  if (redirect) {
    $router.push(redirect)
    return
  }
  console.log('onHandleLink:::', item, $route);
  const to_path = fullPath ? fullPath : path
  $router.push(to_path)
}
</script>

<style lang="scss" scoped>
.nav-breadcrumb {
  height: 32px;
  background: #fff;
  line-height: 32px;
  border-bottom: 1px solid #e4e7ed;
  padding: 0 20px;
}
</style>
