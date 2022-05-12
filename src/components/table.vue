<template>
    <div class="all">
        <div class="table-con">
            <div class="table">
                <!-- 表头 -->
                <div
                    class="table-header-con table-row"
                    :style="`${
                        allCheck ? 'background-color:hsl(0,0%,88%)' : ''
                    }`"
                >
                    <div
                        class="table-header cell"
                        style="width: 67px; padding-left: 0; padding-right: 0"
                    >
                        <div style="width: 12px"></div>
                        <div
                            :class="`checkbox ${
                                allCheck ? 'checkbox-checkout' : ''
                            }`"
                            @click="allCheckFunc"
                        ></div>
                    </div>
                    <div
                        class="table-header-item"
                        v-for="(headName, index) in Object.keys(headData)"
                        :key="headName"
                    >
                        <div
                            class="table-header cell"
                            :style="`width:${widthControl[headName]}px`"
                        >
                            <div class="table-header-name">
                                {{ headData[headName].name || headName }}
                            </div>
                        </div>
                        <div
                            class="drag-line-con"
                            @mousedown="(e) => MonitorMove(index, e.clientX)"
                        >
                            <div
                                class="drag-line"
                                :style="
                                    resizeHandleState[index] && 'display:block'
                                "
                            ></div>
                        </div>
                    </div>
                    <div class="table-header-end">
                        <div
                            class="table-header cell"
                            style="
                                justify-content: center;
                                font-size: 23px;
                                width: 92px;
                                background-color: rgb(245, 245, 245);
                            "
                        >
                            +
                        </div>
                        <div
                            class="table-header cell"
                            style="
                                flex: 1;
                                background-color: rgb(251, 251, 251);
                                min-width: 62px;
                            "
                        ></div>
                    </div>
                </div>
                <div class="table-sroll-area">
                    <!-- 表数据 -->
                    <div class="tableAll" ref="tableAll">
                        <div
                            v-for="(item, index) in tableData"
                            :key="item.table_computer_id"
                            class="table-row"
                            @mouseover="rowHover(item.table_computer_id)"
                            :style="`${
                                rowHoverState[item.table_computer_id]
                                    ? 'background-color: hsla(0,0%,100%,0.5);'
                                    : ''
                            } ${
                                rowCheckState[item.table_computer_id]
                                    ? 'background-color:rgb(240, 247, 255);'
                                    : ''
                            }`"
                        >
                            <!-- 左侧功能栏 -->
                            <div class="cell" style="padding: 0">
                                <div
                                    class="left-list-item1"
                                    style="width: 34px"
                                >
                                    <div
                                        v-show="
                                            !rowHoverState[
                                                item.table_computer_id
                                            ] &&
                                            !rowCheckState[
                                                item.table_computer_id
                                            ]
                                        "
                                        style="width: 100%"
                                    >
                                        {{ index + 1 }}
                                    </div>
                                    <div
                                        v-show="
                                            rowHoverState[
                                                item.table_computer_id
                                            ] ||
                                            rowCheckState[
                                                item.table_computer_id
                                            ]
                                        "
                                        class="drag-handle"
                                    ></div>
                                    <div
                                        :class="`checkbox ${
                                            rowCheckState[
                                                item.table_computer_id
                                            ]
                                                ? 'checkbox-checkout'
                                                : ''
                                        }`"
                                        v-show="
                                            rowHoverState[
                                                item.table_computer_id
                                            ] ||
                                            rowCheckState[
                                                item.table_computer_id
                                            ]
                                        "
                                        @click="
                                            rowCheckState[
                                                item.table_computer_id
                                            ] =
                                                !rowCheckState[
                                                    item.table_computer_id
                                                ]
                                        "
                                    ></div>
                                </div>
                                <div style="width: 8px"></div>
                                <div
                                    class="left-list-item2"
                                    style="width: 25px"
                                ></div>
                            </div>
                            <cell
                                :firstData="index === 0"
                                :class="`cell ${
                                    focusControl[item.table_computer_id][name]
                                        ? 'cell-focus'
                                        : ''
                                }`"
                                :style="`width:${widthControl[name]}px`"
                                v-for="name in $cutArray(
                                    Object.keys(item),
                                    'table_computer_id'
                                )"
                                :key="name"
                                :rowData="{
                                    rowId: item.table_computer_id,
                                    rowName: name,
                                }"
                                :downFunc="EditorCellState"
                                :data.sync="item[name]"
                                :editorState="
                                    focusControl[item.table_computer_id][name]
                                "
                                :type="headData[name].type"
                                :rowHover="
                                    rowHoverState[item.table_computer_id] &&
                                    headData[name].type === 'checkbox'
                                "
                            >
                            </cell>
                        </div>
                    </div>
                    <!-- 表尾 -->
                    <div class="table-end-con table-row">
                        <div
                            class="table-end-item cell"
                            style="
                                width: 67px;
                                padding-left: 0;
                                padding-right: 0;
                            "
                        >
                            <div class="add-row-btn" @click="addRow">+</div>
                        </div>
                        <div
                            class="cell"
                            v-for="item in Object.keys(headData)"
                            :key="item"
                            :style="`width:${widthControl[item]}px`"
                        ></div>
                    </div>
                    <p style="height: 132px"></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import cell from "./main/common/Cell.vue";
export default {
    components: { cell },
    data() {
        return {
            // 表的列排序以headData为准
            headData: {},
            widthControl: {},
            focusControl: {},
            tableData: [],
            count: 1,
            // 行被选中的状态控制
            rowCheckState: {},
            // 行的hover状态控制
            rowHoverState: {},
            // 表头宽度调整的按钮显隐控制
            resizeHandleState: [],
            remenberLocalX: null,
            resizeState: "no",
        };
    },
    watch: {
        // 用来判定是否有resize选中
        resizeHandleState: {
            handler(val) {
                let a = "no";
                val.some((item, index) => {
                    if (item) {
                        a = index;
                    }
                });
                this.resizeState = a;
            },
            deep: true,
        },
    },
    computed: {
        allCheck() {
            let state = true;
            for (let item in this.rowCheckState) {
                if (!this.rowCheckState[item]) {
                    state = false;
                    break;
                }
            }
            return state;
        },
    },
    methods: {
        rowHover(id) {
            Object.keys(this.rowHoverState).some(
                (item) => (this.rowHoverState[item] = false)
            );
            this.rowHoverState[id] = true;
        },
        MonitorMove(index, x) {
            this.$set(this.resizeHandleState, index, true);
            this.remenberLocalX = x;
        },
        allCheckFunc() {
            let state = false;
            Object.keys(this.rowCheckState).some((item) => {
                if (this.rowCheckState[item] === false) {
                    state = true;
                }
            });
            Object.keys(this.rowCheckState).some((item) => {
                this.rowCheckState[item] = state;
            });
        },
        EditorCellState(id, name) {
            // 全部重置
            Object.keys(this.focusControl).some((item) => {
                Object.keys(this.focusControl[item]).some((item2) => {
                    this.focusControl[item][item2] = false;
                });
            });
            if (id) {
                this.$set(this.focusControl[id], name, true);
            }
            this.$forceUpdate();
        },
        // 新增行 || 初始化行
        addRow(row) {
            row = row || {};
            let obj = {};
            // 设定行数据设定唯一id
            obj.table_computer_id = this.count;
            // 初始化行的状态管理对象
            this.focusControl[this.count] = {};
            // 初始化行的check状态
            this.$set(this.rowCheckState, this.count, false);
            // 初始化行的hover状态
            this.$set(this.rowHoverState, this.count, false);
            // 初始化对象参数
            Object.keys(this.headData).some((item2) => {
                // 插入数据，若未传参设置为空
                obj[item2] = row[item2] || "";
                if (item2 != "table_computer_id") {
                    // cell加入状态管理,index不加入
                    this.focusControl[obj.table_computer_id][item2] = false;
                }
            });
            // 数据插入table
            this.tableData.push(obj);
            this.count++;
        },
    },
    async created() {
        let tableAllData = this.$store.state.tableAllData["table1"];
        this.headData = tableAllData.headKey;
        // await new Promise((resolve) => {
        //     this.$request(
        //         "/base/Exercise/",
        //         {},
        //         (res) => {
        //             let obj = {};
        //             res.data.fields.some((item) => {
        //                 obj[item.name] = item;
        //             });
        //             this.headData = obj;
        //             resolve()
        //         },
        //         "get"
        //     );
        // });
        Object.keys(this.headData).some((item) => {
            // 初始化行的宽度
            this.widthControl[item] = this.headData[item].width || 250;
            // 加入宽度resize显隐控制状态
            this.resizeHandleState.push(false);
            // 全局化option
            let type = this.headData[item].type;
            if (type === "select" || type === "selects") {
                this.$store.commit("modifyData", {
                    name: "selectOptions",
                    newdata: {
                        ...this.$store.state.selectOptions,
                        [item]: this.headData[item].options,
                    },
                });
            }
        });
        // 初始化 table 表
        // 初始化table之后，生成cell的选中状态管理
        let tableData = tableAllData.tableData;
        tableData.some((item) => {
            this.addRow(item);
        });
    },
    mounted() {
        document.documentElement.onmouseup = () => {
            // 松左键，拖拽宽度结束清除状态
            this.resizeHandleState.some((item, index) => {
                this.$set(this.resizeHandleState, index, false);
            });
        };
        // 做左右拖拽的计算
        document.documentElement.onmousemove = (e) => {
            //有被选中的resize handle
            if (this.resizeState != "no") {
                let keys = Object.keys(this.headData);
                let difference = e.clientX - this.remenberLocalX;
                if (
                    // 设定最小为60
                    (difference > 0 &&
                        this.widthControl[keys[this.resizeState + 1]] <= 60) ||
                    (difference < 0 &&
                        this.widthControl[keys[this.resizeState]] <= 60) ||
                    // 防止单次大距离突破
                    this.widthControl[keys[this.resizeState]] + difference <
                        60 ||
                    this.widthControl[keys[this.resizeState + 1]] - difference <
                        60
                ) {
                    return true;
                }
                this.widthControl[keys[this.resizeState]] += difference;
                this.widthControl[keys[this.resizeState + 1]] -= difference;
                this.remenberLocalX = e.clientX;
                this.$forceUpdate();
            }
        };
        // 监听全局点击，来重置table的选中
        document.documentElement.onclick = (e) => {
            let state = false;
            // -2除去底部的document和html节点
            for (let i = 0; i < e.path.length - 2; i++) {
                if (e.path[i].className === "table-row") {
                    state = true;
                }
            }
            if (state) {
                // console.log("return");
                return true;
            } else {
                // console.log("重置");
                // 全部重置
                Object.keys(this.focusControl).some((item) => {
                    Object.keys(this.focusControl[item]).some((item2) => {
                        this.focusControl[item][item2] = false;
                    });
                });
                this.$forceUpdate();
            }
        };
        this.$sortable.create(this.$refs.tableAll, {
            animation: 200,
            handle: ".drag-handle",
            forceFallback: true,
            onEnd: (evt) => {
                // 循环获取内容lable值返回arrary
                const item = this.tableData[evt.oldIndex];
                this.tableData.splice(evt.oldIndex, 1);
                this.tableData.splice(evt.newIndex, 0, item);
            },
        });
    },
};
</script>

<style scoped>
* {
    user-select: none;
}
.all {
    height: 100%;
    width: 100%;
}
.table-con {
    display: flex;
    height: 100%;
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
}
.table {
    display: flex;
    flex: 1;
    flex-direction: column;
    height: 100%;
}
.table-sroll-area {
    flex: 1;
    overflow-y: auto;
    /* width: inherit; */
}
.tableAll {
    width: 100%;
}
.table-row {
    display: flex;
    background-color: white;
    width: fit-content;
    border-right: 1px solid hsl(0, 0%, 82%);
    box-sizing: border-box;
}
.table-header-con {
    min-width: 100%;
    background-color: hsla(0, 0%, 100%, 0.5);
    border-right: none;
}
.drag-line-con {
    width: 12px;
    height: 31px;
    position: absolute;
    right: -6px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 20;
    cursor: ew-resize;
}
.drag-line-con > .drag-line {
    width: 3px;
    height: 26px;
    background-color: #2d7ff9;
    display: none;
}
.drag-line-con:hover > .drag-line {
    display: block;
}
.left-list-item1 {
    display: flex;
    align-items: center;
}
.drag-handle {
    width: 12px;
    height: 31px;
    background-image: url("../assets/drag_handle.png");
    background-repeat: no-repeat;
    background-position: 2px 2px;
    cursor: grab;
}
.checkbox {
    border: 1px solid #95a0a6;
    background-color: white;
    width: 12px;
    height: 12px;
    border-radius: 2px;
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;
}
.checkbox:after {
    box-sizing: content-box;
    content: "";
    border: 1px solid #fff;
    border-left: 0;
    border-top: 0;
    height: 7px;
    left: 4px;
    position: absolute;
    top: 1px;
    /* transform: rotate(45deg) scaleY(0); */
    width: 3px;
    transition: transform 0.15s ease-in 0.05s;
    transform-origin: center;
    transform: rotate(45deg) scaleY(1);
}
.checkbox-checkout {
    background-color: #2d7ff9;
    border-color: #2d7ff9;
}
/* 选中表尾的除了第三个 */
.table-end-con > .cell:nth-of-type(n+4),
.table-end-con > .cell:nth-of-type(1),
.table-end-con > .cell:nth-of-type(2),
/* 选中表头的第一个和第二个 */
.table-header-con > .table-header-item:nth-of-type(2) >.cell,
.table-header-con >.cell:nth-of-type(1),
/* 选中表数据中 第一个和第二个取消左侧框 */
.tableAll .table-row .cell:nth-of-type(1),
.tableAll .table-row .cell:nth-of-type(2) {
    border-left: none;
}
.table-header-item {
    display: flex;
    position: relative;
}
.cell {
    height: 32px;
    border-bottom: 1px solid hsl(0, 0%, 82%);
    border-left: 1px solid hsl(202, 10%, 88%);
    display: flex;
    align-items: center;
    font-size: 13px;
    color: #111111;
    user-select: none;
    box-sizing: border-box;
    position: relative;
}
.cell-focus {
    box-shadow: 0 0 0 2px #2d7ff9 !important;
    border-radius: 1px;
    z-index: 10;
}
.table-header {
    padding: 0 6px;
    padding-top: 2px;
    height: 31px;
}
.table-header-end {
    display: flex;
    flex: 1;
}
.table-end-con {
    /* width: 100%; */
}
.add-row-btn {
    width: 34px;
    font-size: 20px;
    height: 100%;
    line-height: 31px;
    cursor: pointer;
}
.add-row-btn:hover {
    background-color: rgb(240, 243, 245);
}
</style>