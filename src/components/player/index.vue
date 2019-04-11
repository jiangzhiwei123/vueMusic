<template>
    <div class="player"    v-if="playList.length>0">
        <!-- 播放页面全部 -->
        <transition >
            <div class="normal-player" v-show="fullScreen">
                <!-- 背景 模糊 -->
                <div class="background">
                    <img :src="currentSong.img" width="100%" height="100%">
                </div>
                <!-- 顶部 -->
                <div class="top">
                    <div class="back">
                        <i class="icon-back" @click="changeFull"></i>
                    </div>
                    <h1 class="title">{{currentSong.name}}</h1>
                    <h2 class="subtitle"><span v-for="(item,index) in currentSong.singer" :key="index">{{item.name}}</span></h2>
                </div>
                <!-- 中间cd部分 -->
                <div class="middle swiper-container">
                    <div class="swiper-wrapper">
                        <div class="middle-l swiper-slide" ref="middleL">
                            <div class="cd-wrapper" ref="cdWrapper">
                                <div class="cd" :class="cdState">
                                    <img class="image" :src="currentSong.img">
                                </div>
                            </div>
                            <!-- 一条歌词滚动 -->
                            <div class="playing-lyric-wrapper">
                                <div class="playing-lyric">{{playingLyc}}</div>
                            </div>
                        </div>
                        <!-- 歌词滚动 -->
                        <scroll class="middle-r swiper-slide" ref="lyriclist">
                            <div class="lyric-wrapper">
                                <div>
                                    <p class="text" ref="lyricLine"></p>
                                </div>
                            </div>
                        </scroll>
                    </div>
                </div>
                <div class="bottom">
                    <div class="dot-wrapper">
                        <span class="dot"></span>
                    </div>
                    <div class="progress-wrapper">
                        <span class="time time-l"></span>
                        <!-- 播放进度条 -->
                        <div class="progress-bar-wrapper">

                        </div>
                        <span class="time time-r"></span>
                    </div> 
                    <div class="operators">
                        <div class="icon i-left">
                            <i class="modeStyle"></i>
                        </div>
                        <div class="icon i-left" @click="prev">
                            <i class="icon-prev"></i>
                        </div>
                        <div class="icon i-center" @click="changeStart ">
                            <i :class="btnState"></i>
                        </div>
                        <div class="icon i-right" @click="next">
                            <i class="icon-next"></i>
                        </div>
                        <div class="icon i-right">
                            <i class="icon-not-favorite"></i>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <transition >
            <div class="mini-player" v-show="!fullScreen" @click="changeBigFull">
                <div class="icon">
                    <img :src="currentSong.img" alt="" width="40" height="40" class="cdState">
                </div>
                <div class="text">
                    <h2 class="name">{{currentSong.name}}</h2>
                    <p class="desc"><span v-for="(item,index) in currentSong.singer" :key="index">{{item.name}}</span></p>
                </div>
                <div class="control">
                    <i class="miniState"></i>
                </div>
                <div class="control">
                    <i class="icon-playlist"></i>
                </div>
            </div>
        </transition>
        <!-- h5音乐播放器 -->
        <audio :src="url" ref="audio"></audio>
    </div>
</template>
<script>
import Scroll from '@/components/scroll'
import { mapGetters,mapMutations} from 'vuex'
import {getkey,getLyric} from '@/api'
import {Base64} from 'js-base64'
import Lyric from 'lyric-parser'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'
// import 
export default {
    data() {
        return {
            url:'',
            isReady:false,
            lyric:{},
            // 当前播放的歌词
            playingLyc:''
        }
    },
     // 获取值
    computed: {
        // 根据播放状态判断是否旋转
        cdState(){
            return this.playing ? 'play':'pause'
        },
        // 根据播放状态来判断是暂停还是播放
        btnState(){
            return this.playing ? 'icon-pause':'icon-play'
        },
        ...mapGetters(['playList','currentIndex','currentSong','fullScreen','playing'])
    },
    mounted () {
        var banner = new Swiper(".middle",{
            
        })
    },
    updated () {
      this.aaa()  
    },
    components:{
        Scroll
    },
    methods: {
        aaa(){
            // console.log(this.playList)
        },
        //   改变全屏状态
        changeFull(){
            this.changeFullScreen(false)
        },
        // 点击晓得播放器改变全屏状态
        changeBigFull(){
            this.changeFullScreen(true)
        },
        //   改变播放状态 开始暂停
        changeStart(){
            this.lyric.togglePlay()
            this.changePlaying(!this.playing)
        },
        prev(){
            this.playingLyc=''
            let index = this.currentIndex-1
            if(index == -1){
                index = this.playList.length-1
            }
            this.changeCurrentIndex(index)
            if(!this.playing){
                this.changeStart()
            }
        },
        next(){
            this.playingLyc=''
            let index = this.currentIndex+1
            if(index == this.playList.length){
                index = 0;
            }
            this.changeCurrentIndex(index)
            if(!this.playing){
                this.changeStart()
            }
        },
        // 根据歌曲加载改变播放器的加载状态
        readState(){
            this.isReady = true
        },
        // 播放结束
        ended(){
            this.next()
        },
        // 获取歌词
        getLyricData(){
            this.lyric={},
            getLyric(this.currentSong.id).then((res)=>{
                // console.log(Base64.decode(res.lyric))
                this.lyric = new Lyric(Base64.decode(res.lyric),this.handler)
                // console.log(new Lyric(Base64.decode(res.lyric)))
                if(this.playing){
                    this.lyric.play() 
                }
            })
        },
        handler({lineNum,txt}){
            this.playingLyc = txt
            console.log(lineNum,txt)
        },
      ...mapMutations(['changeFullScreen','changePlaying','changeCurrentIndex'])
    },
    watch: {
        currentSong(newValue,oldValue){
            if(!newValue){
                return 
            }
            if(newValue==oldValue){
                return
            }
            // http://113.215.13.168/amobile.music.tc.qq.com/C400000H2jfM21Wl7c.m4a?guid=1153486605&vkey=650151367B1E476B0029171A759BBFCC671998FC56DE7EA196AE26735B11561809B83B506EA9EEC1B67F43EF46BD33428B911E4266F28900&uin=0&fromtag=38
            this.$nextTick(()=>{
                this.getLyricData()
            })
            getkey(newValue.songmid).then(res=>{
                console.log(res);
                this.url = `http://113.215.13.168/amobile.music.tc.qq.com/${res.data.items[0].filename}?guid=1153486605&vkey=${res.data.items[0].vkey}`
                //相当于settimeout
                this.$nextTick(()=>{
                    this.$refs.audio.play()
                })
                // console.log(this.url)
                // 异步操作
            })
        },
        // 监听playing的状态来控制h5播放器的暂停和播放
        playing(v){
            this.$nextTick(()=>{
                v?this.$refs.audio.play():this.$refs.audio.pause()
            })
        }
    },
    
}
</script>

<style lang="less" scoped>
@import "~@/common/less/variable.less";
  .player {
    .normal-player{
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom:0;
      z-index:150;
      background: @color-background;
      .background {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        opacity: 0.6;
        filter: blur(20px); 
      }

      .top {
        position: relative;
        margin-bottom: 25px;

        .back {
          position: absolute;
          top: 0;
          left: 6px;
          z-index: 50;

          .icon-back {
            display: block;
            padding: 9px;
            font-size: @font-size-large-x;
            color: @color-theme;
            transform: rotate(-90deg);
          }
        }

        .title {
          width: 70%;
          margin: 0 auto;
          line-height: 40px;
          text-align: center;
          font-size: @font-size-large;
          color: @color-text;
        }

        .subtitle {
          line-height: 20px;
          text-align: center;
          font-size: @font-size-medium;
          color: @color-text;
        }
      }

      .middle {
        position: fixed;
        width: 100%;
        top: 80px;
        bottom: 170px;
        white-space: nowrap;
        font-size: 0;

        .middle-l {
          display: inline-block;
          vertical-align: top;
          position: relative;
          width: 100%;
          height: 0;
          padding-top: 80%;

          .cd-wrapper {
            position: absolute;
            left: 10%;
            top: 0;
            width: 80%;
            height: 100%;

            .cd {
              width: 100%;
              height: 100%;
              box-sizing: border-box;
              border: 10px solid rgba(255, 255, 255, 0.1);
              border-radius: 50%;

              &.play {
                animation: rotate 20s linear infinite; 
              }

              &.pause {
                animation-play-state: paused;
              }

              .image {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                border-radius: 50%;
              }
            }
          }

          .playing-lyric-wrapper {
            width: 80%;
            margin: 30px auto 0 auto;
            overflow: hidden;
            text-align: center;

            .playing-lyric {
              height: 20px;
              line-height: 20px;
              font-size: @font-size-medium;
             color: @color-text-l;
            }
          }
        }

        .middle-r {
          display: inline-block;
          vertical-align: top;
          width: 100%;
          height: 100%;
          overflow: hidden;

          .lyric-wrapper {
            width: 80%;
            margin: 0 auto;
            overflow: hidden;
            text-align: center;

            .text {
              line-height: 32px;
              color: @color-text-l;
              font-size: @font-size-medium;

              &.current {
                color: @color-text;
              }
            }
          }
        }
      }

      .bottom {
        position: absolute;
        bottom: 50px;
        width: 100%;

        .dot-wrapper {
          text-align: center;
          font-size: 0;

          .dot {
            display: inline-block;
            vertical-align: middle;
            margin: 0 4px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: @color-text-l;
 
            &.active {
              width: 20px;
              border-radius: 5px;
              background: @color-text-ll;
            }
          }
        }

        .progress-wrapper {
          display: flex; 
          align-items: center;
          width: 80%;
          margin: 0px auto;
          padding: 10px 0;

          .time {
            color: @color-text;
            font-size: @font-size-small;
            flex: 0 0 30px;
            line-height: 30px;
            width: 30px;

            &.time-l {
              text-align: left;
            }

            &.time-r {
              text-align: right;
            }
          }

          .progress-bar-wrapper {
            flex: 1;
          }
        }

        .operators {
          display: flex;
          align-items: center;

          .icon {
            flex: 1;
            color: @color-theme;
            &.disable {
            color: @color-theme-d;
            }
            i {
              font-size: 30px;
            }
          }

          .i-left {
            text-align: right;
          }

          .i-center {
            padding: 0 20px;
            text-align: center;
            i {
          font-size: 40px;
        }
          }

          .i-right {
            text-align: left;
          }

          .icon-favorite {
            color: @color-sub-theme;

            &.normal-enter-active,
          &.normal-leave-active {
            transition: all 0.4s;
          }
          }

        }

      }

      .top,
      .bottom {
        transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);

        &.normal-enter,
        &.normal-leave-to {
          opacity: 0;
          .top {transform: translate3d(0, -100px, 0)};
          .bottom {transform: translate3d(0, 100px, 0)};
        }
      }

    }

    .mini-player {
      display: flex;
      align-items: center;
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 180;
      width: 100%;
      height: 60px;

      background: @color-highlight-background;
      &.mini-enter-active,
      &.mini-leave-active {
        transition: all 0.4s;
      }

      &.mini-enter,
      &.mini-leave-to {
        opacity: 0;
      }

      .icon {
        flex: 0 0 40px;
        width: 40px;
        padding: 0 10px 0 20px;
        img {
          border-radius: 50%;
        }
      }

      .text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;
        line-height: 20px;
        overflow: hidden;
        .name {
          margin-bottom: 2px;
          font-size: @font-size-medium;
          color: @color-text;
        }
        .desc { 
          font-size: @font-size-small;
            color: @color-text-d;
        }
      }

      .control {
        flex: 0 0 30px;
        width: 30px;
        padding: 0 10px;

        .icon-play-mini,
        .icon-pause-mini,
        .icon-playlist {
          font-size: 30px;
          color: @color-theme-d;
        }

        .icon-mini {
          font-size: 32px;
          position: absolute;
          left: 0;
          top: 0;
        }
      }
    }
  }
    &.play {
      animation: rotate 10s linear infinite;
    }

    &.pause {
      animation-play-state: paused;
    }

  @keyframes rotate {
    0% {
      transform: rotate(0);
    }

    100% {
      transform: rotate(360deg);
    }
  }
</style>
