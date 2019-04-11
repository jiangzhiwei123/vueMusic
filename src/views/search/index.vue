<template>
    <div>
        <div class="searchInput">
            <span class="icon-search"></span>
            <input type="text" placeholder="搜索歌曲、歌手" class="searchBox">
        </div> 
        <div class="hotSearch" :data="list">
            <p>热门搜索</p>
            <scroll class="search-content">
                <div>
                    <ul class="hotBox">
                        <li class="hotSong" v-for="(item,index) in list" :key="index"><span>{{item.k}}</span></li>
                    </ul>
                </div>
            </scroll>
        </div>
    </div>
</template>

<script>
import {getHotKey} from '@/api'
import Scroll from '@/components/scroll'
export default {
    data () {
        return {
            list:[]
        }
    },
    components: {
        Scroll
    },
    created() {
        this.getHotKeyData()
    },
    methods: {
        getHotKeyData(){
            getHotKey().then(res=>{
                console.log(res)
                this.list = this.editSearch(res.data.hotkey)
            })
        },
        // 处理数据
        editSearch(list){
            let nList = [];
            for(var i=0;i<list.length;i++){
                if(i<10){
                    nList.push(list[i])
                }
            }
            return nList
        }
    },
}
</script>

<style lang="less" scoped>
    // @import '~@/common/iconfont/iconfont.css';
    @import "~@/common/less/variable.less";
    @import "~@/common/less/icon.less";
    .searchInput{
        text-align: center;
        background: #333;
        width: 85%;
        height: 44px;
        border-radius: 5px;
        margin:0 auto;
        line-height: 44px;
        text-align: left;
        margin-top: 25px;
        .icon-search{
            font-size:@font-size-large-x;
            color:@color-background;
            vertical-align: middle;
            margin-left: 10px;
        }
        .searchBox{
            border:none;
            background:#333; 
            outline: none;
            vertical-align: middle;
            color:@color-text-l ;
        }
    }
    .hotSearch{
        position: fixed;
        width: 100%;
        top:140px;
        bottom:0;
        p{
            color:@color-text-l;
            margin-bottom: 20px;
            margin-top: 40px;
            margin-left: 7.5%;
        }
        .search-content{
            overflow: hidden;
            height: 100%;
            div{
            .hotBox{
            margin-left: 7.5%;
            .hotSong{
                background: #333;
                color:@color-text-d;
                padding: 5px 8px;
                line-height: 25px;
                border-radius: 5px;
                display: inline-block;
                margin: 0 20px 20px 0;
            } 
        }
        }
        }
    }
    
    
</style>

