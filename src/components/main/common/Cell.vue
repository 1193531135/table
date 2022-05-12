<template>
    <div @mousedown="down">
        <div
            class="cell-editor"
            v-show="showState || rowHoverState"
            :style="firstData && 'align-items:flex-start'"
        >
            <input
                v-if="cellType === 'input'"
                type="text"
                class="table-input"
                v-model="moduleData"
            />
            <Select
                v-if="cellType === 'select'"
                :name="rowData.rowName"
                :showState="showState"
                :module.sync="moduleData"
            ></Select>
            <SelectS
                v-if="cellType === 'selects'"
                :name="rowData.rowName"
                :showState="showState"
                :module.sync="moduleData"
            ></SelectS>
            <CheckBox
                v-if="cellType === 'checkbox'"
                :name="rowData.rowName"
                :module.sync="moduleData"
            ></CheckBox>
        </div>
        <div class="cell-show" v-show="!showState && !rowHoverState">
            <div class="cell-show-input" v-if="type === 'input'">
                {{ moduleData }}
            </div>
            <div class="cell-show-select" v-if="type === 'select'">
                <span
                    v-show="moduleData"
                    class="sign"
                    :style="
                        $IdMapValue(rowData.rowName, moduleData).bgc &&
                        `background-color:${
                            $IdMapValue(rowData.rowName, moduleData).bgc
                        }`
                    "
                    >{{ $IdMapValue(rowData.rowName, moduleData).label }}</span
                >
            </div>
            <div
                class="cell-show-select"
                v-if="type === 'selects'"
                v-show="moduleData"
            >
                <span
                    v-for="item in moduleData.split(',')"
                    :key="item"
                    class="sign"
                    :style="
                        $IdMapValue(rowData.rowName, item).bgc &&
                        `background-color:${
                            $IdMapValue(rowData.rowName, item).bgc
                        }`
                    "
                    >{{ $IdMapValue(rowData.rowName, item).label }}</span
                >
            </div>
            <div
                class="cell-show-checkbox"
                v-if="type === 'checkbox'"
                v-show="moduleData"
            >
                <div class="box">
                    <svg
                        width="17.6"
                        height="17.6"
                        viewBox="0 0 16 16"
                        class="flex-none"
                        style="shape-rendering: geometricprecision"
                    >
                        <path
                            fill-rule="evenodd"
                            fill="rgb(32, 201, 51)"
                            d="M5.944 12.305a1.031 1.031 0 0 0 1.433-.009l5.272-5.181A1.483 1.483 0 0 0 12.661 5a1.468 1.468 0 0 0-2.109.025L7.008 8.701a.465.465 0 0 1-.685-.01l-.587-.641A1.42 1.42 0 0 0 3.661 8a1.473 1.473 0 0 0 .017 2.106l2.266 2.199z"
                        ></path>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Select from "./Select.vue";
import SelectS from "./Selects.vue";
import CheckBox from "./CheckBox.vue";
export default {
    components: { Select, SelectS, CheckBox },
    props: ["data", "editorState", "type", "downFunc", "rowData", "firstData",'rowHover'],
    computed: {
        moduleData: {
            get() {
                return this.data;
            },
            set(val) {
                this.$emit("update:data", val);
            },
        },
        showState() {
            return this.editorState;
        },
        cellType() {
            return this.type;
        },
        rowHoverState(){
            return this.rowHover
        }
    },
    methods: {
        down() {
            this.downFunc(this.rowData.rowId, this.rowData.rowName);
        },
        IdMapValue() {},
    },
};
</script>

<style scoped>
.table-input {
    border: none;
    outline: none;
    padding: 0;
    font-size: 13px;
    width: 100%;
    background-color: rgba(0, 0, 0, 0);
    padding: 6px;
    box-sizing: border-box;
}
.cell-editor {
    /* background-color: white; */
}
.cell-editor > input {
    height: 100%;
}
.cell-editor,
.cell-show {
    flex: 1;
    max-width: 100%;
    text-align: left;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
}
.cell-show {
    padding: 0 6px;
}
.cell-show-input {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.cell-show-select {
    overflow: hidden;
    width: 100%;
    white-space: nowrap;
}
.cell-show-checkbox {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
}
.box {
    width: 20px;
    height: 20px;
    box-sizing: border-box;
    border: 2px solid rgba(0, 0, 0, 0);
    border-radius: 3px;
    cursor: pointer;
}
.sign {
    padding: 0 8px;
    background-color: rgba(0, 0, 0, 0.2);
    line-height: 18px;
    border-radius: 1000px;
    margin-right: 4px;
}
</style>