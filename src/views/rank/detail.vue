<template>
    <rank-list :songsName="songsName" :rankList="rankList" :img="img"></rank-list>
</template>

<script>
import RankList from '@/components/rankList'
import {getRankInfo} from '@/api'
export default {
    components:{
        RankList
    },
    data(){
        return{
            rankList:[],
            img:'',
            songsName:''
        }
    },
    created() {
        this.getRankInfoData()
    },
    methods: {
        getRankInfoData(){
            // console.log(res.data)
            getRankInfo(this.$route.params.id).then(res=>{
                this.rankList = this.editRankData(res.songlist);
                this.img = res.topinfo.pic_v12;
                this.songsName = res.topinfo.ListName
                console.log(this.rankList)
            })
        },
        // 处理数据
        editRankData(list){
            let nList = []
            for(var i=0;i<list.length;i++){
                let item = {
                    // id
                    id:list[i].data.songid,
                    // 歌曲名
                    name:list[i].data.songname,
                    // 歌手姓名
                    singer:list[i].data.singer,
                    // 专辑封面
                    img:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${list[i].data.albummid}.jpg?max_age=2592000`,
                    // 专辑名
                    albumname:list[i].data.albumname,
                    // 歌曲时长
                    interval:list[i].data.interval,
                    // 歌曲id
                    songmid:list[i].data.songmid,
                }
                nList.push(item)
            }
            return nList
        }
    }
}
</script>

<style lang="less" scoped>
    .aaa{
        width: 100%;
        height: 100%;
    }
</style>

