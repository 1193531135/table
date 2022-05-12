<template>
  <div>
    <div class="conta" :style="'height:' + hei + 'px'">
      <div class="conta2">
        <div class="header">Table System</div>
        <div class="input">
          <input placeholder="account" v-model="account" />
        </div>
        <div class="input">
          <input
            placeholder="password"
            v-model="password"
            @keyup.enter="login"
            type="password"
          />
        </div>
        <el-button class="btn" type="primary" @click="login">Login</el-button>
        <!-- <div class="end-con">
          <div @click="$router.push('/register')">Register</div>
        </div> -->
      </div>
      <!-- <div class="mobile_c">
                <div class="mobile_c_title">后台管理系统</div>
                <p style="height:1rem"></p>
                <div class="input2">
                    <input placeholder="账号" v-model="account"/>
                </div>
                <div class="input2">
                    <input  placeholder="密码" v-model="password" type="password"/>
                </div>
                <p style="height:3rem"></p>
                <el-button class="btn" type="primary" @click="login">登录</el-button>
            </div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      account: null,
      password: null,
    };
  },
  computed:{
    hei(){
      return this.$store.state.hei
    }
  },
  methods: {
    login() {
      this.localDown('123')
      this.$router.push(this.$store.state.defineNowPath)
      //一段请求
      // if (!this.account || !this.password) {
      //   return this.$message({
      //     message: "Account password cannot be empty",
      //     type: "warning",
      //   });
      // }
      // this.$request(
      //   "/manage/user/login",
      //   {
      //     username: this.account,
      //     password: this.$md5(this.password),
      //   },
      //   (res) => {
      //     if (res.data.code === 200) {
      //       this.$message({ message: res.data.message, type: "success" });
      //       this.localDown(res.data.data.token);
      //       localStorage.setItem("username", res.data.data.userName);
      //       this.$store.commit("modifyData", {
      //         name: "username",
      //         newdata: res.data.data.userName,
      //       });
      //       this.$router.push(this.$store.state.defineNowPath);
      //     }
      //   //   else{
      //   //       this.$message({message:res.data.message,type:'warning'})
      //   //   }
      //   }
      // );
      // let loading = this.$loading()
      // setTimeout(() => {
      //     loading.close()
      //     //成功后把回调token存入store
      //     let token = 123
      //     this.$store.commit('modifyData',{name:'token',newdata:token})
      //     //需要页面缓存的调用该函数
      //     this.localDown(token)
      //     //token在store中存在的时候，可以跳转到主页面
      //     this.$router.push(this.$store.state.defineNowPath)
      // },800)
    },
    change(val){
      console.log(val)
    },
    localDown(token) {
      localStorage.setItem("token", token);
    },
  },
  created() {
  },
};
</script>
<style scoped>
.conta {
  background-color: rgba(50, 65, 87);
  height: 500px;
  width: 100%;
}
@media screen and (max-width: 769px) {
  .conta2 {
    display: none;
  }
  .mobile_c {
    background-color: white;
    width: 70%;
    height: 16rem;
    border-radius: 15px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -10rem 0 0 -35%;
  }
  .mobile_c_title {
    position: absolute;
    width: 100%;
    top: -2rem;
    color: white;
  }
  .input2 {
    width: 80%;
    margin: auto;
    height: 3rem;
    line-height: 3rem;
  }
  .input2 > input {
    /* border:none; */
    outline: none;
    width: 100%;
    height: 1.7rem;
    /* line-height: 1.7rem; */
    font-size: 0.8rem;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 5px;
    padding-left: 0.4rem;
    box-sizing: border-box;
  }
  .input2 > input:focus {
    /* border: 1px solid rgb(102,177,255); */
    border: 1px solid red;
  }
  .btn {
    width: 100%;
    border-radius: 0;
    box-sizing: border-box;
  }
}
@media screen and (min-width: 769px) {
  .mobile_c {
    display: none;
  }
  .conta2 {
    width: 380px;
    height: 240px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -150px 0 0 -190px;
    background-color: white;
    border-radius: 5px;
    box-sizing: border-box;
    padding: 40px 0 0 0;
  }
  .header {
    position: absolute;
    top: -80px;
    width: 100%;
    text-align: center;
    color: white;
    font-size: 30px;
  }
  .input {
    width: 80%;
    margin: auto;
    height: 35px;
    margin-bottom: 20px;
  }
  .input input {
    width: 100%;
    height: 33px;
    box-sizing: border-box;
    outline: none;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 5px;
    padding: 0 15px;
  }
  .input input:focus {
    border: 1px solid rgb(102, 177, 255) !important;
  }
  .input input:hover {
    border-color: rgba(0, 0, 0, 0.3);
  }
  .input input::-webkit-input-placeholder {
    color: rgba(0, 0, 0, 0.2);
  }
  .btn {
    width: 80%;
    height: 37px;
    color: white;
  }
  .end-con {
      color: #409EFF;
      font-size: 12px;
      display: flex;
      flex-direction: row-reverse;
      width: 80%;
      margin: auto;
      margin-top: 10px;
  }
  .end-con > div{
      cursor: pointer;
  }
}
</style>