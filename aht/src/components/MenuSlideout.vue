<template>
  <div class="menu-slideout">
    <div class="icon">
      <img src="../assets/menu_icon.svg" alt="">
    </div>
    <div class="menu-slideout-content">
      <ul class="lv1">
        <li v-for="item in menu" :key="item">
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
    
<script>
  import gql from 'graphql-tag'
  
  export default {
    name: "MenuSlideout",
    data() {
      return {
        menu: ''
      };
    },
    apollo: {
      menu: gql`query {
        categoryList(filters: {ids: {in: ["2"]}}) {
          children_count
          children {
            id
            level
            name
            url_path
            url_key
            children {
              id
              level
              name
              url_path
              url_key
            }
          }
        }
      }`
    },
    updated: function () {
    }
  }
</script>

<style>
.menu-slideout .icon img {
  width: auto;
  height: 24px;
}
</style>
