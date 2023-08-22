<script>
import { gql, useQuery } from '@apollo/client';

const GET_DOGS = gql`
  query GetDogs {
    dogs {
      id
      breed
    }
  }
`;
</script>
<template>
    <p>{{ msg }}</p>
    <p>{{ world }}</p>
    <div>
        <router-link to="/">HomePage</router-link>
        <router-link to="/CategoryPage">CategoryPage</router-link>
        <router-link to="/ProductPage">ProductPage</router-link>
    </div>
</template>
<script>
  import gql from 'graphql-tag';
  export default {
    name: "HomePage",
    data() {
      return {
        msg: "Home",
      };
    },
    apollo: {
      world: gql`query {
        cmsPage(id: 2) {
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
        }
      }`
    }
  }
</script>