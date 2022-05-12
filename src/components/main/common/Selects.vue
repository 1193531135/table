<template>
    <div class="selects-con">
        <div class="selects-show-con">
            <div
                v-for="item in moduleData"
                :key="item"
                class="sign"
                :style="`background-color:${$IdMapValue(name, item).bgc}`"
                >
                    <div>{{ $IdMapValue(name, item).label }}</div>
                    <div class="sign-close" @click="clearSelected(item)">×</div>
                </div>
            <div class="pop-up-icon" @click="popShow = !popShow">+</div>
        </div>
        <div class="pop-up-list" v-if="popShow">
            <input type="text" placeholder="Find an option" v-model="search" />
            <div class="list-item-con">
                <!-- <div class="option-item" @click="selectData('')"></div> -->
                <div
                    v-for="item in clearOption(options)"
                    :key="item.id"
                    class="option-item"
                    @click="selectData(item.id)"
                >
                    <span
                        class="sign"
                        :style="item.bgc && `background-color:${item.bgc}`"
                        >{{ item.label }}</span
                    >
                </div>
                <div
                class="option-item2"
                    v-if="clearOption(options).length === 0"
                >
                    <span
                        style="background-color:rgba(0,0,0,0);color:rgba(0,0,0,0.4)"
                        >No results</span
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["showState", "module", "name"],
    data() {
        return {
            popShow: false,
            search: "",
        };
    },
    computed: {
        cellFocus() {
            return this.showState;
        },
        moduleData: {
            get() {
                return (this.module && this.module.split(",")) || [];
            },
            set(val) {
                this.$emit("update:module", val.toString());
            },
        },
        options() {
            let op = this.$store.state.selectOptions[this.name];
            let obj = [];
            op.some((item) => {
                if (item.label.indexOf(this.search) != -1) {
                    obj.push(item);
                }
            });
            return obj;
        },
    },
    methods: {
        selectData(val) {
            this.moduleData = [...this.moduleData,val]
            this.popShow = false;
        },
        clearOption(option){
            return option.filter(item => {
                let state = true
                b:for(let i of this.moduleData){
                    if(i == item.id){
                        state = false
                        break b;
                    }
                }
                return state
            })
        },
        clearSelected(name){
            this.moduleData = this.moduleData.filter(item => item != name)
        }
    },
    watch: {
        cellFocus(val) {
            // 取消选中后，弹窗也取消
            if (val === false) {
                this.popShow = false;
            }
        },
        popShow(val) {
            // 弹窗隐藏的话，搜索的数据也清掉
            if (val === false) {
                this.search = "";
            }
        },
    },
    created() {},
};
</script>

<style scoped>
.selects-con {
    width: calc(100% + 1px);
    min-height: calc(100% + 1px);
    display: flex;
    box-shadow: 0 0 0 2px #2d7ff9 !important;
    border-radius: 1px;
    z-index: 10;
    background-color: white;
    margin-left: -1px;
    align-items: center;
    position: relative;
}
.selects-show-con {
    display: flex;
    flex: 1;
    height: 100%;
    box-sizing: border-box;
    flex-wrap: wrap;
    overflow: hidden;
    padding: 2px;
    max-height: 48px;
    overflow-y: auto;
}
.selects-show-con .sign,.pop-up-icon{
    margin:2px;
    display: flex;
}
.sign-close{
    margin-left: 2px;
    font-size: 17px;
    color: #280b42;
    width: 15px;
    font-weight: 700;
    cursor: pointer;
    opacity: 0.5;
}
.sign-close:hover{
    color: black;
    font-weight: 800;
    opacity: 1;
}
.pop-up-icon {
    background-color: rgba(0, 0, 0, 0.05);
    width: 16px;
    justify-content: center;
    border-radius: 3px;
    color: rgb(17, 17, 17);
    font-weight: 800;
    cursor: pointer;
}
.pop-up-icon:hover{
    background-color: rgba(0, 0, 0, 0.1);
}
.pop-up-list {
    position: absolute;
    top: calc(100%);
    z-index: 20;
    background-color: white;
    border: 1px solid rgba(232, 237, 250);
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.3);
    border-radius: 2px;
    min-width: 168px;
    width: calc(100% - 2px);
    max-height: 252px;
}
.pop-up-list input {
    border: none;
    outline: none;
    width: 100%;
    padding: 0 6px;
    height: 32px;
    box-sizing: border-box;
}
.list-item-con {
    max-height: 220px;
    overflow-y: auto;
}
.option-item,.option-item2 {
    height: 37.5px;
    line-height: 37.5px;
    padding: 0 6px;
    display: flex;
    align-items: center;
}
.option-item:hover {
    background-color: rgb(242, 242, 242);
    cursor: pointer;
}
.sign {
    padding: 0 8px;
    background-color: rgba(0, 0, 0, 0.2);
    line-height: 18px;
    border-radius: 1000px;
}
</style>