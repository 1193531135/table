<template>
    <div class="check-box-con">
        <div class="box" @mousedown.stop="moduleData = !moduleData">
            <svg
                v-show="moduleData"
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
</template>

<script>
export default {
    props:['module'],
    computed:{
        moduleData: {
            get() {
                return this.module;
            },
            set(val) {
                this.$emit("update:module", val);
            },
        },
    }
};
</script>

<style scoped>
.check-box-con {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
.box {
    width: 20px;
    height: 20px;
    box-sizing: border-box;
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    cursor: pointer;
}
</style>