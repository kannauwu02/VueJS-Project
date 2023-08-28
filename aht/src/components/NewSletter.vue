<template>
  <div class="newsletter-bar">
    <div v-for="item in newsletter.items" :key="item">
      <div v-html="item.content"></div>
    </div>
    <input type="text" placeholder="Enter your email address…">
    <div class="text">
        <p>Subscribe</p>
    </div>
  </div>
</template>

<script>
  import gql from 'graphql-tag'
  export default {
    name: "TheFooter",
    data() {
      return {
        newsletter: ''
      };
    },
    apollo: {
      newsletter: gql`query {
        newsletter: cmsBlocks(identifiers: ["newsletter"]) {
          items {
            content
          }
        },
      }`,
    },
    updated: function () {
    }
  }
</script>