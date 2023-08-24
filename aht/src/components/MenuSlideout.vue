<template>
  <div class="menu-slideout">
    <div class="icon">
      <img src="../assets/menu_icon.svg" alt="">
    </div>
    <div class="menu-slideout-content">
      <div class="menu-lv1" v-for="items in menu" :key="items">
        <template v-if='items.children'>
          <div v-for="item in items.children" :key="item">
            <p>{{ item.name }}</p>
            <template v-if='item.children'>
              <div class="menu-lv2"  v-for="subItem in item.children" :key="subItem">
                <p>{{ subItem.name }}</p>
              </div>
            </template>
          </div>
        </template>
      </div>
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
        menu: categoryList(filters: {ids: {in: ["2"]}}) {
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
  height: 14px;
}

.menu-slideout ul {
  margin: 0;
}

.menu-slideout-content {
  position: absolute;
  bottom: 0;
  width: 100%;
  left: 100%;
}
</style>
