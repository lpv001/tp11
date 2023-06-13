<template>
  <header>លេខមួយ.com</header>
  <main>
    <div class="sidebar">
      <!-- <div class="category">
        <p>Phone</p>
        <ul>
          <li>iPhone</li>
          <li>Samsung</li>
          <li>LG</li>
        </ul>
      </div>
      <div class="category">
        <p>Phone</p>
        <ul>
          <li>iPhone</li>
          <li>Samsung</li>
          <li>LG</li>
        </ul>
      </div>
      <div class="category">
        <p>Phone</p>
        <ul>
          <li>iPhone</li>
          <li>Samsung</li>
          <li>LG</li>
        </ul>
      </div> -->
      <div class="category" v-for="category in categories" :key="category">
        <p>{{category.category_name}}</p>
        <ul>
          <li v-for="subcategory in category.subcategories" :key="subcategory">
            <span @click="find_with_sub_category(subcategory._id)">{{subcategory.subcategory_name}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="items">
      <div class="box" v-for="product in products" :key="product">
        <img src="../../public/img.png" />
        <h3>{{ product.product_name }}</h3>
        <p>{{ product.description }}</p>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";
export default {
  name: "homepage",
  data() {
    return {
      categories: [],
      products: []
    };
  },
  methods: {
    async find_with_sub_category(subcategory_id){
      let response_products = await axios.get("http://localhost:3000/api/v1/subcategory/find_by_subcategory_id/"+subcategory_id)
      this.products = []
      response_products.data[0].products.forEach((data) => {
        this.products.push(data)
      })
    }
  },
  async mounted() {
    let response_products = await axios.get(
      "http://localhost:3000/api/v1/product/get_products"
    );
    response_products.data.forEach((data) => {
      this.products.push(data);
    });

    let reponse_categories = await axios.get(
      "http://localhost:3000/api/v1/category/get_categories"
    );
    reponse_categories.data.forEach((data) => {
      this.categories.push(data);
    });

  },
};
</script>



<style>
header {
  width: 100%;
  height: 80px;
  background: #000;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  position: fixed;
  z-index: 999;
}
main {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  top: 80px;
}
main .sidebar {
  padding: 10px;
  height: calc(100vh - 80px);
  width: 180px;
  border: 1px solid black;
  position: fixed;
  top: 80px;
  left: 0;
}
main .sidebar .category {
  margin-bottom: 20px;
}
main .sidebar .category p {
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
}
main .sidebar .category ul {
  margin-left: 15px;
}
main .sidebar .category ul li {
  cursor: pointer;
}
main .items {
  position: relative;
  left: 180px;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  width: calc(100% - 180px);
}
main .items .box {
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 230px;
  width: 220px;
}
</style>

