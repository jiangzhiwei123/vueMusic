<template>
    <songs-list :title='title' :img='bgImg' :list='SongsList'></songs-list>
</template>

<script>
import SongsList from '@/components/songsList'
import {getCdInfo} from '@/api'
export default {
    data(){
        return{
            SongsList:[],
            title:'',
            bgImg:''
        }
    },
    created(){
        this.getCdInfoList()
    },
    methods: {
        getCdInfoList(){
            getCdInfo().then(res=>{
                console.log(res)
                this.title = res.data.cdlist[0].dissname
                this.bgImg = res.data.cdlist[0].logo
                this.SongsList = this.aditSongs(res.data.cdlist[0].songlist)
            })
        },
        // 创建一个方法处理数据
        aditSongs(list){
            let nList = [];
            for(var i=0;i<list.length;i++){
                let item = {
                    //不完全
                    //id
                    id:list[i].songid,
                    //歌曲名
                    name:list[i].songname,
                    //歌手姓名
                    singer:list[i].singer,
                    //专辑名
                    album:list[i].albumname,
                    // 专辑封面
                    img:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${list[i].albummid}.jpg?max_age=2592000`,
                    // 歌曲时长
                    interval:list[i].interval,
                    // 播放器地址
                    // http://113.215.13.168/amobile.music.tc.qq.com/C400000H2jfM21Wl7c.m4a?guid=1153486605&vkey=650151367B1E476B0029171A759BBFCC671998FC56DE7EA196AE26735B11561809B83B506EA9EEC1B67F43EF46BD33428B911E4266F28900&uin=0&fromtag=38
                    // 歌曲mid
                    songmid:list[i].songmid
                }
                nList.push(item)
            }
            return nList
        }
    },  
    components:{
        SongsList,
    }
}
</script>

<style lang="less" scoped>
   
</style>


