<template>
  <div id="app">
    <!-- 音乐播放器的头部 -->
    <Music-header></Music-header>
    <!-- 选项卡 -->
    <Tabs></Tabs> 
    <!-- 页面 -->
    <router-view></router-view>
    <!-- 音乐播放器 -->
    <player></player>
  </div>
</template>

<script>
import MusicHeader from '@/components/musicheader'
import Tabs from '@/components/tabs'
import Player from '@/components/player'
// 注册引入组件
export default {
  name: 'App',
  components:{
    MusicHeader,
    Tabs,
    Player
  }
}
</script>

<style lang="less">
  @import "~@/common/less/index.less";
</style>
