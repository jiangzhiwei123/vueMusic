<template>
    <div class="m-header">
        <div class="logo"></div>
        <div class="text">Water Music</div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
    @import '~@/common/less/variable.less';
    .m-header{
        height: 44px;
        text-align: center;
        color:@color-theme;
        font-size: @font-size-large;
        .logo{
            background: url("./logo.png") 0 0 no-repeat;
            background-size: 100% 100%;
            display: inline-block;
            width: 30px;
            height: 30px;
            vertical-align: top;
            margin-top: 2px;
        }
        .text{
            display: inline-block;
            line-height: 44px;
        }
    }
</style>

