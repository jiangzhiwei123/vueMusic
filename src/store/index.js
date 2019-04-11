import Vue from 'vue'
import Vuex from 'vuex'
// 全局使用
Vue.use(Vuex)
//Store S一定要记得大写 
export default new Vuex.Store({
    //状态
    state:{
        //是否在播放 Boolean
        playing:false,
        //播放是否全屏 Boolean
        fullScreen:false,
        //播放列表
        playList:[],
        //当前播放歌曲在播放列表中的索引
        currentIndex:-1,
        //播放模式 顺序0 随机1 单曲2
        mode:0 
    },
    // 获取
    getters: {
        playing:state => state.playing,
        fullScreen:state => state.fullScreen,
        playList:state => state.playList,
        // 当前播放所在的索引
        currentIndex:state => state.currentIndex,
        mode:state => state.mode,
        //当前播放的歌曲
        currentSong:state => {
            return state.playList[state.currentIndex] 
        }
    },
    // 改变状态
    mutations:{
        // ...展开运算符
        // 改变是否播放的状态
        changePlaying(state,playing){
            state.playing = playing
        },
        // 改变是否全屏播放
        changeFullScreen(state,fullScreen){
            state.fullScreen = fullScreen
        },
        // 改变播放列表
        changePlayList(state,playList){
            state.playList = [...playList]
        },
        // 改变播放的歌曲
        changeCurrentIndex(state,currentIndex){
            state.currentIndex = currentIndex
        },
        // 改变播放的模式
        changeMode(state,mode){
            state.mode = mode
        }      
    },
    // 异步操作
    actions:{
        //添加歌曲
        // 1.改变播放状态 -- 播放
        // 2.把播放器设置成全屏
        // 3.添加播放列表
        // 4.播放哪一首
        addPlayer({commit},{list,index}){
            commit('changePlaying',true)
            commit('changeFullScreen',true)
            commit('changePlayList',list)
            commit('changeCurrentIndex',index)
        },
        // 删除歌曲
        delSong({commit},song){
            let index = 0 ;
            let playList = state.playList;
            for(let i=0;i<playList.length;i++){
                if(playList[i].id == song.id){
                    index = i;
                }
            }
            playList.splice(index,1)
            // 如果是最后一首的话 则播放倒数第一首
            if(state.currentIndex == playList.length){
                currentIndex--
            }   
            commit('changePlaying',true)
            commit('changePlayList',playList)
            commit('changeCurrentIndex',currentIndex)
        },
        // 清空播放列表
        clearPlayList({commit}){
            commit('changePlaying',false)
            commit('changePlayList',[])
            commit('changeCurrentIndex',-1)
        }
    }
})
     