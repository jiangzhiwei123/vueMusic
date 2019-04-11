<template>
    <div>
        <div class="recommend">
            <scroll class="recommend-content" :data="songList">
                <div>
                    <!-- 轮播图 -->
                    <div class="swiper-container slide">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide" v-for="(item,index) in slider" :key="index">
                                <img :src="item.picUrl" width="100%">
                            </div>
                        </div>
                        <div class="swiper-pagination"></div>
                    </div> 
                    <!-- 热门歌单推荐 -->
                    <div class="recommendSheet">
                        <h2>热门歌单推荐</h2>
                        <!-- 歌单具体部分 -->
                        <ul>
                            <li v-for="(item,index) in songList" :key="index" @click="toDetail(item.listid)">
                                <div class="songImg">
                                    <img :src="item.pic">
                                </div>
                                <div class="songtext">
                                    <p>{{item.title}}</p>
                                    <p>{{item.tag}}</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </scroll>
        </div>
        <!-- loading -->
        <div class="loading">
            <loading :title="title" v-show="isLoading"></loading>
        </div>
        <!-- 路由配置的组件 transition效果在这里作用 -->
        <transition name="slide">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
// 引入swiper swiperSlide
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'
import {getRecommend,getRlist} from '@/api'
import Scroll from '@/components/scroll'
import Loading from '@/components/loading'
export default {
    data(){
        return{
            slider:[],
            songList:[],
            title:'加载中...',
            isLoading:true,
        }
    },
    // 注册
    components: {
        Swiper,
        Scroll,
        Loading
    },
    created () {
        this.getRecommendData()
        this.get()
    },
    methods: {
        getRecommendData(){
            getRecommend().then(res=>{
                console.log(res)
                this.slider = res.data.slider;
                this.isLoading = false;
            })
        },
        get(){
            getRlist().then(res=>{
                console.log(res)
                this.songList = res.result;
            })
        },
        toDetail(){
            this.$router.push({path:`/recommend/detail`})
        }
    },
    // 挂载的时候 实例化swiper
    mounted() {
        var slide = new Swiper('.slide',{
            pagination:{
                el:'.swiper-pagination',
            },
                observer:true,
                observeSlideChildren:true,
        })
    }
}
</script>
<style lang="less" scoped>
    @import '~@/common/less/variable';
    .recommend{
        position: fixed;
        width: 100%;
        top:88px;
        bottom:0;
        .recommend-content{
            height: 100%;
            overflow: hidden;
            .recommendSheet{
                h2{
                    height: 60px;
                    line-height: 60px;
                    text-align: center;
                    color:@color-theme ;
                }
                ul{
                    li{
                        margin-bottom: 25px;
                        display: flex;
                        .songImg{
                            margin-left: 24px;
                            img{
                                width: 70px;
                                height: 70px;
                            }
                        }
                        .songtext{
                            flex:1;
                            margin-left: 24px;
                            box-sizing: border-box;
                            padding: 12px 0;
                            font-size: 14px;
                            overflow: hidden;
                            p:nth-child(1){
                                margin-bottom: 20px;
                            }
                            p:nth-child(2){
                                color:@color-text-l;
                            }
                        }
                    }
                }
            }
        }
    }
     .slide-enter,.slide-leave-to{
        transform: translate3d(100%,0,0)
    }
    .slide-enter-active,.slide-leave-active{
        transition: all 0.5s;
    }
</style>

