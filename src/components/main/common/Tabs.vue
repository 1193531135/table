<template>
    <div class="aaa">
        <div class="tab-con"></div>
        <div class="func-list"></div>
    </div>
</template>

<script>
export default {
    name: "Tabs",
    data() {
        return {};
    },
    computed: {},
    methods: {
    },
    created() {},
};
</script>

<style scoped>
.el-tabs__header {
    margin: 0;
}
.aaa {
    width: 100%;
    box-shadow: rgb(200 200 200) 0 2px 0 0;
}
.tab-con {
    height: 30px;
}
.func-list {
    height: 44px;
    background-color: white;
}
</style>