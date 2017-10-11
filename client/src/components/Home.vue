<template>
  <div class="hello">
    <header>
      <span>Vue.js PWA Todos App</span>
      <div class="text-right" style="margin-top:-27px" v-if="cekLogin">
        Selamat Datang <strong>{{ name }}</strong> ! -
        <router-link :to="{ name: 'Dashboard', params: {} }">
          <button type="button" class="btn btn-primary">Home</button>
        </router-link>
        <button class="btn btn-success text-right" type="button" name="button" data-toggle="modal" data-target="#newTodo"> Add Todo </button>
        <button type="button" class="btn btn-warning" @click="doLogout">Logout</button>
      </div>
      <!-- Modal New Todo -->
      <div class="modal fade" id="newTodo" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog modal-md" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title" id="myModalLabel">New Todo Form</h4>
            </div>
            <form class="">
            <div class="modal-body">
                <b style="color:black;">Task Title :</b><br>
                <input type="text"  name="title" value="" class="form-control" v-model="newTodo.tugas" autofocus> <br>
                <b style="color:black;">Description :</b><br>
                <textarea type="text"  name="desc" value="" class="form-control" v-model="newTodo.desc"></textarea><br>
                <b style="color:black;">Tag(s) : separate by comma</b><br>
                <div class="input-group">
                  <span class="input-group-addon">#</span>
                  <input type="text"  name="tags" value="" class="form-control" v-model="newTodo.tags">
                </div>


            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-primary new-todo" @click="addTodo"  data-dismiss="modal">Post New Task</button>
            </div>
            </form>
          </div>
        </div>
      </div>
      <!--  Modal New Todo-->
    </header>
    <main>
      <router-view :allTodos="allTodos" @removeMe="removeMe" @spliceMe="spliceAja" @tambahMe="tambahAja"></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      cekLogin: localStorage.getItem('token'),
      name: localStorage.getItem('username'),
      allTodos: [],
      userid: localStorage.getItem('id'),
      newTodo: {
        tugas: '',
        desc: '',
        tags: '',
        authorid: localStorage.getItem('id')
      }
    }
  },
  methods: {
    doLogout () {
      localStorage.clear()
      this.cekLogin = ''
      this.name = ''
      this.$router.push('/')
    },
    statusLogin () {
      this.cekLogin = localStorage.getItem('token')
      this.name = localStorage.getItem('username')
    },
    cekStatusLogin () {
      if(!localStorage.getItem('token')){
        this.$router.push('/')
      }
    },
    getAllTodos () {
      var self = this
      this.$axios.get('todos', {
        headers:{
          id: self.userid
        }
      })
      .then(({data}) => {
        self.allTodos = data
      })
    },
    addTodo(){
      var self = this
      this.$axios.post('todos', this.newTodo)
      .then(result => {
        this.allTodos.unshift(result.data)
        var defaultData = {
          tugas: '',
          desc: '',
          tags: '',
          authorid: localStorage.getItem('id')
        }
        this.newTodo = defaultData
      })
    },
    removeMe (idx) {
      this.allTodos.splice(idx, 1)
    },
    spliceAja (idx) {
      this.allTodos.splice(idx, 1)
    },
    tambahAja (data) {
      this.allTodos.unshift(data)
    }
  },
  created () {
    this.cekStatusLogin()
    this.getAllTodos()
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
