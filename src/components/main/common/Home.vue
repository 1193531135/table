<template>
    <div class="main">
        <div style="background-color: rgb(229, 46, 77)">
            <headers :btnshow="showlistbtn" @clickbtn="showlist"></headers>
            <tabs></tabs>
        </div>
        <div class="body-con">
            <div class="body">
                <div class="list">
                    <list @clickbtn="showlistbtn = false" :style="`width:${listW}px`"></list>
                    <div class="drag-con">
                        <div class="drag-line"></div>
                    </div>
                </div>
                <div class="nowpage">
                    <router-view />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import headers from "./Header.vue";
import list from "./List.vue";
import tabs from "./Tabs.vue";
export default {
    name: "Home",
    components: { headers, list, tabs },
    data() {
        return {
            hei: null,
            showlistbtn: false,
            listW:180
        };
    },
    methods: {
        showlist() {
            this.showlistbtn = !this.showlistbtn;
        },
    },
    created() {
        this.hei = this.$store.state.hei - 80; //get page height
        if (this.$store.state.wid < 769) {
            this.hei =
                this.$store.state.hei - (this.$store.state.wid / 20) * 3.4;
        }
        let path = this.$route.path;
        this.$store.state.allDom.some((item) => {
            if (item.path === path) {
                this.$store.commit("modifyData", {
                    name: "showDom",
                    newdata: [item],
                });
                return true;
            }
        });
        // 赋值初始化文件
        let js = require("../../../table");
        this.$store.commit("modifyData", {
            name: "tableAllData",
            newdata: js,
        });
        // 获取图片公共地址
        // this.$request(
        //     "/manage/file/baseUrl",
        //     {},
        //     (res) => {
        //         if (res.data.code === 200) {
        //             this.$store.commit("modifyData", {
        //                 name: "publicAddress",
        //                 newdata: res.data.data,
        //             });
        //         }
        //     },
        //     "post",
        //     true
        // );
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.swicth_home_1 {
    height: 15px;
    width: 100%;
}
.body-con{
    position: relative;
    width: 100%;
    flex: 1;
}
.body{
    display: flex;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    /* background: rgba(77,77,77,0.3); */
}
.main {
    background-color: rgb(238, 238, 238);
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}
.vertical_wall {
    width: 0.7%;
    height: 500px;
    min-width: 15px;
}
.list{
    order: -1;
    display: flex;
    border-top: 2px solid rgba(0, 0, 0, 0);
    box-shadow: white -180px 0px 0px 0px;
}
.drag-con{
    width: 6px;
    margin-left: -4px;
    display: flex;
    flex-direction: row-reverse;
}
.drag-line{
    width: 2px;
    background: rgba(77,77,77,0.3);
    height: 100%;
}
.nowpage {
    flex: 1;
    /* min-width: 1300px; */
    border-top: 2px solid rgba(0, 0, 0, 0);
    overflow: hidden;
}
.movecon {
    display: none;
    overflow: auto;
}
</style>
