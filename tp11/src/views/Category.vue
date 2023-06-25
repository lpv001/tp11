<template>
  <header>
    <p>Admin dashboard</p>
    <p>លេខមួយ.com</p>
  </header>
  <main>
    <div class="left-bar">
      <li @click="redirect('/category')">Category</li>
      <li @click="redirect('/subcategory')">Subcategory</li>
      <li @click="redirect('/product')">Product</li>
    </div>
    <div class="right-side">
      <div class="action">
        <p>Category</p>
        <button @click="open_category">Add new</button>
      </div>
      <!-- HTML Code: Place this code in the document's body (between the 'body' tags) where the table should appear -->
      <table class="GeneratedTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Image url</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category in categories" :key="category">
            <td>{{category.category_name}}</td>
            <td></td>
            <td></td>
            <td>
              <button @click="delete_category(category._id)">Delete</button>
              <button @click="open_edit_category(category._id, category.category_name)">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- Codes by Quackit.com -->
    </div>
    <div class="adding" id="add">
      <h2>Add new Category</h2>
      <div class="input-field">
        <input v-model="category_name" type="text" placeholder="Category">
        <!-- <input type="text" placeholder="Description">
        <input type="text" placeholder="Price"> -->
      </div>
      <div class="button-container">
        <button @click="close_category">Cancel</button>
        <button @click="add_new">Create</button>
      </div>
    </div>
    <div class="adding" id="edit">
      <h2>Add new Category</h2>
      <div class="input-field">
        <input v-model="new_category_name" type="text" placeholder="New Category">
      </div>
      <div class="button-container">
        <button @click="close_edit_category">Cancel</button>
        <button @click="edit_new">Create</button>
      </div>
    </div>
  </main>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

header {
  width: 100%;
  height: 80px;
  border-bottom: 2px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 32px;
  position: fixed;
  z-index: 999;
  padding: 0 40px;
}

main {
  position: fixed;
  top: 80px;
  display: flex;
}

main .left-bar {
  width: 300px;
  border-right: 2px solid black;
  height: calc(100vh - 80px);
}

main .left-bar li {
  list-style: none;
  border-bottom: 1px solid black;
  padding: 10px;
  text-align: center;
}

main .right-side {
  width: calc(100vw - 300px);
  margin-bottom: 20px;
}

main .right-side .action {
  display: flex;
  justify-content: space-between;
}

main .right-side .action p {
  font-size: 18px;
}

main .right-side .action button {
  width: 120px;
  height: 30px;
  border: 1px solid black;
}

main .right-side .GeneratedTable{
  width: 100%;
  padding: 0 20px;
}

main .right-side .GeneratedTable th{
  text-align: start;
  font-weight: 700;
}

main .right-side .GeneratedTable button{
  width: 90px;
  border: none;
  margin-right: 10px;
  border-radius: 5px;
  cursor: pointer;
}

main .adding{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-80%);
  display: none;
  flex-direction: column;
  padding: 20px;
  width: 400px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  background: #fff;
  text-align: center;
  gap: 40px;
  z-index: 999;
}

main .adding .input-field{
  display: flex;
  flex-direction: column;
  gap: 20px;
}

main .adding .input-field input{
  padding: 0 10px;
}

main .adding .button-container{
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

</style>


<script>
import axios from 'axios'

export default {
  name: 'category',
  data(){
    return {
      category_name: '',
      new_category_name: '',
      categories: [],
      _id: ''
    }
  },
  methods: {
        redirect(path){
      this.$router.push(path)
    }
    ,
    open_category (){
      document.getElementById('add').style.display = "flex"
    },
    close_category (){
      document.getElementById('add').style.display = "none"
    },
    open_edit_category (id, name){
      document.getElementById('edit').style.display = "flex"
      this.new_category_name = name
      this._id = id
    },
    close_edit_category (){
      document.getElementById('edit').style.display = "none"
    },
    add_new(){
      const data = {category_name: this.category_name}
      axios.post('http://localhost:3000/api/v1/category/create_category', data)
        .then((response) => {
          if(response.status === 200){
            alert('created successfully')
          }else{
            alert('create failed')
          }
          this.category_name = ''
          this.close_category()
          this.remount()
        })
    },
    edit_new(){
      const data = {category_name: this.new_category_name, _id: this._id}
      axios.put('http://localhost:3000/api/v1/category/update_category', data)
      .then((response) => {
        if (response.status === 200){
          alert('edit successfully')
        }else{
          alert('edit failled')
        }
        this.new_category_name = ''
        this.close_edit_category()
        this.remount()
      })
    },
    delete_category(_id){
      const data = {_id: _id}
      axios.delete('http://localhost:3000/api/v1/category/delete_category', {data: data})
        .then((response) => {
            alert('delete successfully')
            this.remount()
        })
    },
    remount(){
      axios.get('http://localhost:3000/api/v1/category/get_categories')
        .then((response) => {
          this.categories = response.data
        })
    }
  },
  mounted(){
      axios.get('http://localhost:3000/api/v1/category/get_categories')
        .then((response) => {
          this.categories = response.data
        })
  }
}
</script>