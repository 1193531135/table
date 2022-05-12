<template>
    <div class="select-con">
        <div @click="popShow = !popShow" class="select-show-con">
            <div class="text-show">
                <span
                v-show="moduleData"
                    class="sign"
                    :style="
                        `background-color:${$IdMapValue(name, moduleData).bgc}`
                    "
                    >{{ $IdMapValue(name, moduleData).label }}</span
                >
            </div>
            <div class="pop-up-icon">▼</div>
        </div>
        <div class="pop-up-list" v-if="popShow">
            <input type="text" placeholder="Find an option" v-model="search" />
            <div class="list-item-con">
                <div class="option-item" @click="selectData('')"></div>
                <div
                    v-for="item in options"
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
                return this.module;
            },
            set(val) {
                this.$emit("update:module", val);
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
            this.moduleData = val;
            this.popShow = false;
        },
    },
    watch: {
        cellFocus(val) {
            if (val === false) {
                this.popShow = false;
            }
        },
        popShow(val) {
            if (val === false) {
                this.search = "";
            }
        },
    },
    created() {},
};
</script>

<style scoped>
.select-con {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    background-color: white;
}
.select-show-con {
    display: flex;
    cursor: pointer;
    padding:6px;
    flex: 1;
    height: 100%;
    box-sizing: border-box;
    align-items: center;
}
.select-show-con .text-show {
    flex: 1;
}
.pop-up-icon {
    transform: scale(0.7);
}
.pop-up-list {
    position: absolute;
    top: 30px;
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
.option-item {
    height: 37.5px;
    line-height: 37.5px;
    padding: 0 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
}
.option-item:hover {
    background-color: rgb(242, 242, 242);
}
.sign {
    padding: 0 8px;
    background-color: rgba(0, 0, 0, 0.2);
    line-height: 18px;
    border-radius: 1000px;
}
</style>