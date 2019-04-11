<template>
    <scroll class="list-view" ref="listView" :listenScroll=true :probeType=3 @scroll="scroll">
        <!-- 左侧歌手 -->
        <ul>
            <li class="list-group" ref="lists" v-for="(item,index) in singers" :key="index">
                <h2 class="list-group-title">{{item.title}}</h2>
                <ul>
                    <li class="list-group-item" v-for="(item1,index) in item.list" :key="index"  @click="toDetail(item1)">
                        <img class="avatar" :src="item1.img">
                        <span class="name" v-text="item1.name"></span>
                    </li>
                </ul>
            </li>
        </ul>
        <!-- 右侧快速定位 -->
        <div class="list-shortcut">
            <ul>
                <li class="item" v-for="(item,index) in cutList" :data-index="index" @touchstart="onTouchStart" :key="index" :class="{'current':currentIndex == index}">{{item}}</li>
            </ul>
        </div>
        <transition name="slide">
            <router-view></router-view>
        </transition>
    </scroll>
</template>

<script>
import Scroll from '@/components/scroll';
export default {
    // 传一个值
    props:{
        singers:{
            type:Array,
            default:[],
        }
    },
    components:{
        Scroll
    },
    
    data(){
        return{
            scrollY:0,
            listHeight:[],
            currentIndex:0,
            touch:{}
        }
    },
    updated() {
        this.getHeight();
    },
    // 检测y轴方向移动
    watch: {
        scrollY(v){
            // 在最顶部的时候,索引是热门
            if(v>0){
                this.currentIndex = 0
            }
            // 在中间的时候去循环每个数据 然后比较
            for(var i=0;i<this.listHeight.length;i++){
                let h1 = this.listHeight[i];
                let h2 = this.listHeight[i+1];
                if(-v>=h1 && -v<h2){
                    this.currentIndex=i
                    return
                }
            }
            // 在买最底部的时候
            this.currentIndex = this.listHeight.length-1;
        }
    },
    methods: {
        // 跳转到子路由
        toDetail(item){
            // console.log(this.singers)
            this.$router.push({path:`/singer/${item.id}`})
            // console.log(item.id)
        },
        onTouchStart(ev){
            console.log(ev)
            let vIndex = ev.target.attributes['data-index'].value;
            this.touch.y = ev.touches[0].pageY
            this.touch.index = vIndex
            // 调用scroll方法
            this.scrollTo(vIndex)
        },
        scrollTo(index){
            this.scrollY = -this.listHeight[index];
            this.$refs.listView.scrollToElement(this.$refs.lists[index],0)
        },
        scroll(obj){
            //console.log(obj)
            this.scrollY = obj.y;
        },
        // 获取list中每个list的高度
        getHeight(){
            let lists = this.$refs.lists;
            let h = 0;
            this.listHeight.push(0)
            for(var i=0;i<lists.length;i++){
                h += lists[i].clientHeight;
                this.listHeight.push(h)
            }
            // console.log(this.listHeight)
        },
    },
    computed: {
        cutList(){
            let arr = [];
            for(let a in this.singers){
                arr.push(this.singers[a].title.substring(0,1))
            }
            return arr;
        }
    },
}
</script>

<style lang="less" scoped>
    @import "~@/common/less/variable";
    .list-view{
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: @color-background;
        .list-group{
            padding-bottom: 30px;
            .list-group-title{
                height: 30px;
                line-height: 30px;
                padding-left: 20px;
                font-size: @font-size-small ;
                color:@color-text-l;
                background: @color-highlight-background;
            }
            ul{
                .list-group-item {
                    display: flex;
                    align-items: center;
                    padding: 20px 0 0 30px;
                    .avatar {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    }
                    .name {
                    margin-left: 20px;
                    color: @color-text-l;
                    font-size: @font-size-medium;
                    
                    }
                }
            }
        }
        .list-shortcut {
            position: absolute;
            z-index: 30px;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 20px;
            padding: 20px 0;
            border-radius: 10px;
            text-align: center;
            background: @color-background-d;
            font-family: Helvetica;
            .item {
                padding: 3px;
                line-height: 1;
                color: @color-text-l;
                font-size: @font-size-small;
                &.current {
                color: @color-theme;
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