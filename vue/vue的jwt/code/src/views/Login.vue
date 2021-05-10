<template>
  <div class="login">
    <input type="text" v-model="username" />
    <button @click="login">登录</button>
  </div>
</template>

<script>
// import { login } from "../api/login";
export default {
  data() {
    return {
        username: ''
    };
  },
  created(){
    //   login('123')
    //   this.$store.dispatch('login','123').then( data => {
    //       console.log(data);
    //   })
  },
  methods: {
      login(){
          if(!this.username){
            console.log('用户名为空');
            return false
          }
        //   console.log(this.$route);
          this.$store.dispatch('login',this.username).then( res => {
            if (res.code === 0) {
                const path = this.$route.query.redirect || '/';
                this.$router.push(path)
            }
          })
      }
  }
};
</script>

<style></style>