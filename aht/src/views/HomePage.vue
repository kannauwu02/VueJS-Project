<script setup>
  import StoreConfig from '@/composables/store-config'
  import { ref, watch } from 'vue'

  const storeData = ref(StoreConfig)
  console.log(storeData);

  watch(storeData, (newStoreData) => {
    console.log(newStoreData)
  })

</script>

<template>
  
  <p>{{ config.base_static_url }}</p>
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
      }`,
      config: gql`query {
        config: storeConfig {
          base_static_url
        },
      }`,
    },
  }
</script>