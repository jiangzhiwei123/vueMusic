<template>
    <div class="scrollBox">
       <scroll class="rankScroll" :data="rankList">
            <div>
                <div class="rankList" v-for="(item,index) in rankList" :key="index"  @click="toRankDetail(item)">
                <img  class="rankImg" :src="item.picUrl">
                <ul class="songBox">
                    <li v-for="(item1,index1) in item.songList" :key="index1">{{index1+1+"  "+item1.songname+"---"+item1.singername}}</li>
                </ul>
            </div>
            </div>
       </scroll>
       <!-- 路由组件显示 -->
       <transition name="slide">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import {getRankList} from '@/api'
import Scroll from '@/components/scroll'
export default {
    data(){
        return{
            rankList:[],
        }
    },
    components:{
        Scroll
    },
    created() {
        this.getRankListData()
    },
    methods: {
        getRankListData(){
            getRankList().then(res=>{
                console.log(res)
                this.rankList = res.data.topList

            })
        },
        toRankDetail(tId){
            this.$router.push({path:`/rank/${tId.id}`})
            console.log(tId.id)
        }
    }


}
</script>

<style lang="less" scoped>
   @import '~@/common/less/variable';
   .scrollBox{
       position: fixed;
       top:110px;
       bottom: 0;
       width: 100%;
       .rankScroll{
           height: 100%;
           overflow: hidden;
            .rankList{
                width: 85%;
                height: 88px;
                margin:0 auto;
                background: @color-highlight-background;
                display: flex;
                margin-top: 20px;
                margin-bottom: 20px;
            .rankImg{
                height: 88px;
                width: 88px;
            }
            .songBox{
                flex:1;
                display: flex;
                width: 160px;
                flex-direction:column;
                box-sizing: border-box;
                padding: 10px 16px;
                li{
                    color:@color-text-d  ;
                    flex:1;
                    font-size: @font-size-medium ;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    margin:3px 0;
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

