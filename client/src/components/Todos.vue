<template lang="html">
  <div class="container">
    <h1>My Miauw Todos App</h1>
    <router-link :to="{ name: 'Dashboard', params: {} }">
      <button type="button" class="btn btn-primary">Home</button>
    </router-link>
    <button class="btn btn-success text-right" type="button" name="button" data-toggle="modal" data-target="#newTodo"> Add Todo </button>
    <button type="button" class="btn btn-warning" @click="doLogout">Logout</button>

    <div class="row">
      <div class="col-md-3 text-left" v-for="(todo, index) in allTodos">

        <div class="panel panel-primary" v-if="todo.status">
          <div class="panel-heading">
            <h3 class="panel-title">{{ todo.tugas }}</h3>
          </div>
          <div class="panel-body">
            <b>Deskripsi Tugas: </b><br>
            {{ todo.desc }}
            <hr>
            <b>Dibuat pada: </b>
              {{moment(todo.createdAt).format('dddd, YYYY-MM-DD')}}, by: <b>{{todo.author.username}}</b><br>
              <button type="button" class="btn btn-primary" @click="updateStatus(todo)">Done</button>
              <button type="button" class="btn btn-success" data-toggle="modal" data-target="#upTodo" @click="forUpdate(index, todo._id)">Edit</button>
              <button type="button" class="btn btn-danger" @click="removeMe(index, todo._id)">Delete</button>

          </div>
        </div>

        <div class="panel panel-danger" v-else>
          <div class="panel-heading">
            <h3 class="panel-title">{{ todo.tugas }}</h3>
          </div>
          <div class="panel-body">
            <b>Deskripsi Tugas: </b><br>
            {{ todo.desc }}
            <hr>
              <b>Dibuat pada: </b>
              {{moment(todo.createdAt).format('dddd, YYYY-MM-DD')}}, by: <b>{{todo.author.username}}</b><br>
              <button type="button" class="btn btn-danger" @click="updateStatus(todo)">Undone</button>
              <button type="button" class="btn btn-success" data-toggle="modal" data-target="#upTodo" @click="forUpdate(index, todo._id)">Edit</button>
              <button type="button" class="btn btn-danger" @click="removeMe(index, todo._id)">Delete</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Update Todo -->
    <div class="modal fade" id="upTodo" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog modal-md" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">Update Todo Form</h4>
          </div>
          <form class="">
          <div class="modal-body">
              <b style="color:black;">Task Title :</b><br>
              <input type="text"  name="title" value="" class="form-control" v-model="editTodo.tugas" autofocus> <br>
              <b style="color:black;">Description :</b><br>
              <textarea type="text"  name="desc" value="" class="form-control" v-model="editTodo.desc"></textarea><br>
              <b style="color:black;">Tag(s) : separate by comma</b><br>
              <div class="input-group">
                <span class="input-group-addon">#</span>
                <input type="text"  name="tags" value="" class="form-control" v-model="editTodo.tags">
              </div>


          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary new-todo" @click="updateTodo(editTodo._id)"  data-dismiss="modal">Update Task</button>
          </div>
          </form>
        </div>
      </div>
    </div>
    <!--  Modal Update Todo-->
  </div>
</template>

<script>
export default {
  props: ['allTodos'],
  data () {
    return {
      editTodo: ''
    }
  },
  methods: {
    updateStatus (data) {
      var statusBaru = !data.status
      data.status = statusBaru
      this.$axios.put(`todos/${data._id}/status`, {status: statusBaru})
      .then(result => {
      })
    },
    removeMe (idx, id) {
      if(window.confirm("Yakin mau hapus catatan tugas ini?")){
        this.$axios.delete(`todos/${id}`)
        .then(()=>{
          this.$emit('removeMe', idx)
          this.$swal(
            'Deleted!',
            'Your todo has been deleted.',
            'success'
          )
        })
      }
    },
    forUpdate(index, id){
      var self = this
      this.$axios.get(`todos/${id}`)
      .then(result => {
        self.editTodo = result.data[0]
        this.$emit('spliceMe', index)
      })
    },
    updateTodo(id){
      this.$axios.put(`todos/${id}`, this.editTodo)
      .then(result => {
        this.$emit('tambahMe', result.data)
      })
    }
  }
}
</script>

<style lang="css">
</style>
