<template>
  <el-row class="content">
    <el-col :xs="24" :sm="{span: 6, offset:9}">
      <span class="title">欢迎登录</span>
      <el-row>
        <el-input 
          v-model="account"
          placeholder="账号"
          type="text">
        </el-input>
        <el-input
          v-model="password"
          placeholder="密码"
          type="password"
          @keyup.enter.native="loginToDo">
        </el-input>
        <el-button type="primary"  @click="loginToDo">登录</el-button>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import md5 from 'md5';
export default {
  data() {
    return {
      account: '',
      password: '',
    };
  },
  methods: {
    loginToDo() {
      const TOKEN_KEY = 'demo-token';
      const obj = {
        name: this.account,
        password: md5(this.password),
      };
      this.$http.post('/auth/user', obj)
        .then(res => {
          if(res.data.success) {
            sessionStorage.setItem(TOKEN_KEY, res.data.token);
            this.$message({
              type: 'success',
              message: '登录成功！',
            });
            this.$router.push('/todolist');
          } else {
            this.$message.error(res.data.info);
            sessionStorage.setItem(TOKEN_KEY, null);
          }
        })
        .catch(_err => {
          this.$message.error('请求错误！');
          sessionStorage.setItem(TOKEN_KEY, null);
        });
    },
  },
};
</script>

<style lang="stylus" scoped>
  .el-row.content
    padding: 16px
  .title
    font-size: 28px
  .el-input
    margin: 12px 0
  .el-button
    width: 100%
    margin-top: 12px
</style>
