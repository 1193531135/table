<template>
  <div class="bgcdiv">
    <div class="tit_text">
      <i
        class="el-icon-s-tools"
        @click="showlist"
        :style="showlistbtn ? 'color:black' : ''"
      ></i>
      <span>Table</span>
    </div>
    <div>table</div>
    <div class="user">
      <img class="img1" :src="headeimg" />
      <div class="username">{{ username }}</div>
      <div class="exit" @click="signOut">
        <p class="swicth_1">Logout</p>
        <i class="el-icon-switch-button"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: ["btnshow"],
  data() {
    return {
      headeimg: require("../../../assets/default_head.jpg"),
    };
  },
  computed: {
    showlistbtn() {
      return this.btnshow;
    },
    username() {
      return this.$store.state.username;
    },
  },
  methods: {
    signOut() {
      this.$confirm("Are you sure?", "hint", { type: "warning" })
        .then(() => {
          this.$request("/manage/user/logout", {}, (res) => {
            if (res.data.code === 200) {
              localStorage.clear()
              this.$router.push("/login");
            }
          });
        })
        .catch(() => {});
    },
    showlist() {
      this.$emit("clickbtn");
    },
  },
  created() {
    let username = localStorage.getItem("username");
    if (username) {
      this.$store.commit("modifyData", { name: "username", newdata: username });
    }
  },
};
</script>

<style scoped>
.el-icon-switch-button {
  display: none;
}
.el-icon-s-tools {
  display: none;
}

.bgcdiv {
  /* background-color: rgb(42, 121, 178); */
  height: 48px;
  width: 100%;
  padding: 0 50px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.bgcdiv > div {
  color: white;
  line-height: 65px;
}
.img1 {
  height: 24px;
  width: 24px;
  display: block;
  float: left;
  border-radius: 50%;
  padding: 10px 0;
}
.user {
  display: flex;
  align-items: center;
  /* width: 200px; */
  font-size: 14px;
}
.user > div {
  float: left;
}
.exit {
  margin-left: 20px;
  cursor: pointer;
}
.el-icon-switch-button:active {
  color: red;
}

.username {
  margin-left: 15px;
}
</style>