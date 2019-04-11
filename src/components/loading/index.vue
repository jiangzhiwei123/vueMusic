<template>
    <div class="load">
        <img src="./loading.gif" alt="">
        <p v-text="title"></p>
    </div>
</template>

<script>
export default {
    // 给他传一个值
    props:{
        title:{
            type:String,
            default:"loading..."
        }
    }
}
</script>

<style lang="less" scoped>
    @import '~@/common/less/variable';
    .load{
        width: 100%;
        text-align: center;
        position: absolute;
        top:50%;
        margin-top: -50px;
        img{
            width: 30px;
            height: 30px;
        }
        p{
            line-height: 20px;
            color:@color-text-l;
            font-size: @font-size-small;
        }
    }
</style>

