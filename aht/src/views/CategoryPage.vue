<template>
  <div>
    <ul>
      <li v-for="category in categories" :key="category.url_key">
        <router-link :to="`/category/${category.url_key}`">{{ category.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>

import { GET_CATEGORIES } from '@/graphql/queries';

export default {
  apollo: {
    categories: {
      query: GET_CATEGORIES,
    },
  },
};
</script>