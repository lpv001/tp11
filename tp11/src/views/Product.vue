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
        <button @click="open_subcategory">Add new</button>
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
          <tr v-for="product in products" :key="product">
            <td>{{product.product_name}}</td>
            <td>{{product.description}}</td>
            <td>{{product.product_image}}</td>
            <td>
              <button @click="delete_subcategory(product._id)">Delete</button>
              <button @click="open_edit_subcategory(product._id, product.product_name, product.product_image, product.description, product.price, product.sub_category_id)">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- Codes by Quackit.com -->
    </div>
    <div class="adding" id="add">
      <h2>Add new Product</h2>
      <div class="image_field">
        <input type="file" @change=handle_image />
        <img v-if="priviewImage" :src="priviewImage" alt="preview" />
        <img v-if="priviewImage === null" :src="'../../public/image.png'">
      </div>
      <div class="input-field">
        <input v-model="product_name" type="text" placeholder="Product name">
        <input v-model="image" type="text" placeholder="Image">
        <input v-model="sub_id" type="text" placeholder="SubCategory ID">
        <input v-model="description" type="text" placeholder="Description">
        <input v-model="price" type="text" placeholder="Price">
      </div>
      <div class="button-container">
        <button @click="close_subcategory">Cancel</button>
        <button @click="add_new">Create</button>
      </div>
    </div>
    <div class="adding" id="edit">
      <h2>Add new Category</h2>
      <div class="image_field">
        <input type="file" @change=handle_image />
        <!-- <img v-if="priviewImage" :src="priviewImage" alt="preview" /> -->
        <img src="../../public/image.png">
      </div>
      <div class="input-field">
        <input v-model="product_name" type="text" placeholder="Product name">
        <input v-model="image" type="text" placeholder="Image">
        <input v-model="sub_id" type="text" placeholder="SubCategory ID">
        <input v-model="description" type="text" placeholder="Description">
        <input v-model="price" type="text" placeholder="Price">
      </div>
      <div class="button-container">
        <button @click="close_edit_subcategory">Cancel</button>
        <button @click="edit_new">Create</button>
      </div>
    </div>
  </main>
</template>

<style>

.image_field{
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  position: relative;
}

.image_field input{
  position: absolute;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  height: fit-content;
  outline: none;
  opacity: 0;
}

.image_field img{
  border: 2px solid black;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  object-fit: cover;
}

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
  transform: translate(-50%,-50%);
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
      product_name: '',
      image: '',
      priviewImage: null,
      sub_id: '',
      description: '',
      price: '',
      products: [],
      _id: ''
    }
  },
  methods: {
    redirect(path){
      this.$router.push(path)
    },
    handle_image(e){
      const file = e.target.files[0]
      this.priviewImage = URL.createObjectURL(file)
      this.image = file.name
    },
    open_subcategory (){
      document.getElementById('add').style.display = "flex"
    },
    close_subcategory (){
      document.getElementById('add').style.display = "none"
    },
    open_edit_subcategory (id, product_name, product_image, description, price, sub_id){
      document.getElementById('edit').style.display = "flex"
      this.product_name = product_name
      this.image = product_image
      this.description = description
      this.price = price
      this._id = id
      this.sub_id = sub_id
    },
    close_edit_subcategory (){
      document.getElementById('edit').style.display = "none"
    },
    add_new(){
      const data = {
          product_name: this.product_name,
          product_image: this.image,
          sub_category_id: this.sub_id,
          description: this.description,
          price: this.price
        }

      const formData = new FormData();
      formData.append("image", this.priviewImage);

      axios
        .post("http://localhost:3000/api/v1/image/test_image", formData)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      
      axios.post('http://localhost:3000/api/v1/product/create_product', data)
        .then((response) => {
          if(response.status === 200){
            alert('created successfully')
          }else{
            alert('create failed')
          }
          this.category_name = ''
          this.close_subcategory()
          this.remount()
        })
    },
    edit_new(){
      const data = {
          _id: this._id,
          product_name: this.product_name,
          product_image: this.image,
          sub_category_id: this.sub_id,
          description: this.description,
          price: this.price
        }
      axios.put('http://localhost:3000/api/v1/product/update_product', data)
      .then((response) => {
        if (response.status === 200){
          alert('edit successfully')
        }else{
          alert('edit failled')
        }
        this.new_subcategory_name = ''
        this.close_edit_subcategory()
        this.remount()
      })
    },
    delete_subcategory(_id){
      const data = {_id: _id}
      axios.delete('http://localhost:3000/api/v1/product/delete_product', {data: data})
        .then((response) => {
            alert('delete successfully')
            this.remount()
        })
    },
    remount(){
      axios.get('http://localhost:3000/api/v1/product/get_products')
        .then((response) => {
          this.products = response.data
        })
    }
  },
  mounted(){
      axios.get('http://localhost:3000/api/v1/product/get_products')
        .then((response) => {
          this.products = response.data
          console.log(response.data)
        })
  }
}
</script>