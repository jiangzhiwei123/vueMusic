<template>
   <div>
        <div class="singer">
            <Singer-list :singers="singerList"></Singer-list>
        </div>
        <!-- loading -->
        <div class="loading">
            <loading :title="title" v-show="isLoading"></loading>
        </div>
   </div>
</template>

<script>
import {getSingerList} from '@/api/'
import SingerList from  '@/components/singList'
import Loading from '@/components/loading'
// import Scroll from '@/components/scroll';
// A-Z开头排序 每一个字母相同的放在一起 生成一个热门排序
export default {
    data(){
        return{
            singerList:[],
            isLoading:true,
            title:"加载中"
        }
    },
    // 钩子函数
    created(){
        this.getSList();
        this.isLoading = false;
    },
    components:{
        SingerList,
        Loading
    },
    methods: {
        getSList(){
            getSingerList().then(res =>{
                console.log(res)
                this.singerList = this.newSingerList(res.data.list);   
            })
        },
        newSingerList(list){
            // 对象
            let nList = {
                hot:{
                    title:"热门",
                    list:[],
                },
            }
            // https://y.gtimg.cn/music/photo_new/T001R150x150M000004V53Ga0bV65j.jpg?max_age=2592000
            list.forEach((item,index) => {
                if(index<10){
                    nList.hot.list.push({
                        id:item.Fsinger_mid,
                        name:item.Fsinger_name,
                        img:`https://y.gtimg.cn/music/photo_new/T001R150x150M000${item.Fsinger_mid}.jpg?max_age=2592000`
                    })
                }
                // 定义一个首字母分类 如果里面有 就往里面传一个对象 如果没有就新增一个
                let key = item.Findex;
                if(!nList[key]){
                    nList[key] = {
                        title:key,
                        list:[]
                    }
                }else{
                    nList[key].list.push({
                        id:item.Fsinger_mid,
                        name:item.Fsinger_name,
                        img:`https://y.gtimg.cn/music/photo_new/T001R150x150M000${item.Fsinger_mid}.jpg?max_age=2592000`
                    })
                }

            });
            // 把这个对象排序成有序的数组
            let hot = [];
            let other = [];
            for(let i in nList){
                if(nList[i].title.match(/[a-zA-Z]/)){
                    other.push(nList[i])
                }else if(nList[i].title=="热门"){
                    hot.push(nList[i])
                }
            }
            other.sort((a,b)=>{
                return a.title.charCodeAt(0)-b.title.charCodeAt(0)
            })
            // console.log(hot.concat(other))
            return hot.concat(other)
        }
    },
}
</script>

<style lang="less" scoped>
    .singer{
        position: fixed;
        top:88px;
        bottom: 0;
        width: 100%; 
    }
</style>

