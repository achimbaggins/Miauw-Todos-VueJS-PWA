<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4 col-md-offset-4">
        <img src="../assets/logo.png" alt="Miauw Todos" style="margin-bottom:-60px">
        <h4>Please Login Here</h4>
        <div class="list-group">
          <label>Username</label>
          <input type="text" name="userLogin" value="" placeholder="username" class="form-control" v-model="login.username">
          <label>Password</label>
          <input type="password" name="passLogin" value="" placeholder="*****" class="form-control"  v-model="login.password">
          <br>
          <button class="btn btn-warning" type="button" name="button" v-on:click="doLogin"> Login </button>

          <button class="btn btn-defaut text-right" type="button" name="button" data-toggle="modal" data-target="#myRegister"> Register Here </button>
        </div>
      </div>
    </div>
    <div class="row">
      <!-- Modal Register -->
      <div class="modal fade" id="myRegister" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog modal-sm" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title" id="myModalLabel">Register Form</h4>
            </div>
            <div class="modal-body">
                <label>Username :</label><br>
                <input type="text"  name="userRegister" value="" class="form-control" v-model="register.username"><br>
                <label>Password :</label><br>
                <input type="password"  name="passRegister" value="" class="form-control" v-model="register.password"><br>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-primary" @click="doRegister">Daftarin Saya</button>
            </div>
          </div>
        </div>
      </div>
      <!--  Modal Register-->
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      login: {
        username: '',
        password: ''
      },
      register: {
        username: '',
        password: ''
      },
      registermsg: false
    }
  },
  methods: {
    doLogin(){
      var self = this
      this.$axios.post('/signin', self.login)
      .then(get => {
        console.log('======', get.data);
        if(get.data !== 'username tidak ditemukan' && get.data !== 'password salah'){
          localStorage.clear()
          localStorage.setItem('token', get.data.token)
          localStorage.setItem('id', get.data.id)
          localStorage.setItem('username', get.data.username)
          this.$emit('setStatus')
          this.$swal(
            'Login Sukses!',
            'Welcome Home Guys!',
            'success'
          )
          this.$router.push('/home')
        } else {
          this.$swal(
            'Login Gagal!',
            'Ada kesalahan pada username atau password!',
            'error'
          )
          this.$router.push('/')
        }
      })
    },
    doLogout() {
      localStorage.clear()
      this.$router.push('/')
    },
    doRegister() {
      var self = this
      this.$axios.post('/signup', self.register)
      .then(get=> {
        this.$swal(
          'Registrasi Sukses!',
          'Silahkan login untuk memulai pengalaman baru!',
          'success'
        )
        this.$router.push('/')
      })
    },
    cekStatusLogin () {
      if(localStorage.getItem('token')){
        this.$router.push('/home')
      }
    }
  },
  created () {
    this.cekStatusLogin()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}
</style>
