<template>
  <div>
    <router-link to="/">HomePage</router-link>
    <router-link to="/CategoryPage">CategoryPage</router-link>
    <router-link to="/ProductPage">ProductPage</router-link>
  </div>
  <p v-html="home.content"></p>
</template>
<script>
  import gql from 'graphql-tag';

  export default {
    name: "HomePage",
    data() {
      return {
        msg: "Home",
        home: '',
        config: ''
      };
    },
    apollo: {
      home: gql`query {
        home: cmsPage(identifier: "home") {
          content
        },
      }`,
    },
  }
</script>