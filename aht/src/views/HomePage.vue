<template>
    <p>{{ msg }}</p>
    <p v-html="home.content"></p>
    <p>{{ ping }}</p>
    <div>
        <router-link to="/">HomePage</router-link>
        <router-link to="/CategoryPage">CategoryPage</router-link>
        <router-link to="/ProductPage">ProductPage</router-link>
        <router-link to="/ApiTest">ApiTest</router-link>
    </div>
</template>
<script>
  import gql from 'graphql-tag';
  export default {
    name: "HomePage",
    data() {
      return {
        msg: "Home",
        ping: '',
        home: ''
      };
    },
    apollo: {
      home: gql`query {
        home: cmsPage(id: 2) {
          content
          content_heading
          identifier
          meta_description
          meta_keywords
          meta_title
          page_layout
          relative_url
          title
          type
          url_key
        },
      }`
    },
  }
</script>