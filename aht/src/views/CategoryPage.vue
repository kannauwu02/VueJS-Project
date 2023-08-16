<template>
    <p>{{ msg }}</p>
    <div>
        <router-link to="/">HomePage</router-link>
        <router-link to="/CategoryPage">CategoryPage</router-link>
        <router-link to="/ProductPage">ProductPage</router-link>
    </div>
</template>
<script>
    export default {
      name: "CategoryPage",
      data() {
        return {
          msg: "Category"
        };
      },
    }
</script>