<template>
  <div>
    <router-link to="/">HomePage</router-link>
    <router-link to="/CategoryPage">CategoryPage</router-link>
    <router-link to="/ProductPage">ProductPage</router-link>
  </div>
  <div v-for="item in product.items" :key="item">
    <ProductInfor :product="item" />
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { GET_PRODUCT } from '@/grapql/query_product';
import ProductInfor from '@/components/Product_infor.vue';

export default {
  name: "ProductPage",
  data() {
    return {
      product: ''
    };
  },
  components: {
    ProductInfor,
  },
  apollo: {
    product: {
      query: GET_PRODUCT,
      variables() {
        const route = useRoute();
        return {
          sku: route.params.sku,
        };
      },
    },
  }
}
</script>

<style></style>
