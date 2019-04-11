<template>
    <singer-list :singerList="singerList" :img="img" :songsName="songsName"></singer-list>
</template>

<script>
import SingerList from '@/components/singerList'
import {getSingerInfo} from '@/api'
export default {
    data () {
        return {
            singerList:[],
            img:'',
            songsName:'',
            imgSrc:'',
            songmid:''
        }
    },
    components: {
        SingerList
    },
    created() {
        this.getSingerInfoData()
    },
    methods: {
        getSingerInfoData(){
            getSingerInfo(this.$route.params.id).then((res)=>{
                // console.log(res)
                this.songsName = res.data.singer_name
                this.imgSrc=res.data.singer_mid
                this.img = `https://y.gtimg.cn/music/photo_new/T001R150x150M000${this.imgSrc}.jpg?max_age=2592000`
                this.singerList = this.editData(res.data.list)
                // console.log(this.img)
                // console.log(this.imgSrc)
            })
        },
        // 创建一个处理数据的方法
        editData(list){
            let nList = []
            for(var i=0;i<list.length;i++){
                let item = {
                    //不完全
                    id:list[i].musicData.songid,
                    //歌曲名
                    name:list[i].musicData.songname,
                    //歌手姓名
                    singer:list[i].musicData.singer,
                    //专辑名
                    album:list[i].musicData.albumname,
                    // 专辑封面
                    img:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${list[i].musicData.albummid}.jpg?max_age=2592000`,
                    // 歌曲时长
                    interval:list[i].musicData.interval,
                    // 播放器地址
                    // http://113.215.13.168/amobile.music.tc.qq.com/C400000H2jfM21Wl7c.m4a?guid=1153486605&vkey=650151367B1E476B0029171A759BBFCC671998FC56DE7EA196AE26735B11561809B83B506EA9EEC1B67F43EF46BD33428B911E4266F28900&uin=0&fromtag=38
                    // 歌曲mid
                    songmid:list[i].musicData.songmid
                }
                nList.push(item)
            }
            return nList
        }
    }
}
</script>

<style>

</style>
