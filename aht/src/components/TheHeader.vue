<template>
  <div v-if="$apollo.queries.headerTop.loading">Loading...</div>
  <div class="header-desktop">
    <div class="header-top-bar-wrapper desktop-item" v-for="item in headerTop.items" :key="item">
      <div v-html="item.content"></div>
    </div>
  </div>
  <div class="header-mobile">
    <div class="header-top-bar-wrapper mobile-item" v-for="item in headerTop.items" :key="item">
      <div v-html="item.content"></div>
    </div>
    <div class="header-items">
      <div class="menu">
        <MenuSlideout />
      </div>
      <div class="phone">
        <img src="../assets/phone-icon@1x.svg" alt="">
      </div>
      <div class="logo">
        <img :src="config.base_media_url + 'logo/' + config.header_logo_src" alt="">
      </div>
      <div class="search">
        <div class="icon">
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import gql from 'graphql-tag'
import MenuSlideout from "@/components/MenuSlideout.vue"

const $ = window.$

export default {
  name: "TheHeader",
  components: {
    MenuSlideout
  },
  data() {
    return {
      config: '',
      headerTop: '',
      hedaerContact: ''
    };
  },
  apollo: {
    config: gql`query {
        config: storeConfig {
          base_media_url,
          header_logo_src
        },
      }`,
    headerTop: gql`query {
        headerTop: cmsBlocks(identifiers: ["header-top-bar"]) {
          items {
            content
          }
        },
      }`,
    headerContact: gql`query {
        headerContact: cmsBlocks(identifiers: ["header-contact"]) {
          items {
            content
          }
        },
      }`,
  },
  updated: function () {
    if (!document.querySelector('.header-top-bar-wrapper.mobile-item .slick-slider')) {
      $('.header-top-bar-wrapper.mobile-item .pagebuilder-column-line').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
      });

    }
  }
}
</script>

<style>
body {
  margin: 0;
}

body #app {
  font-family: 'Nunito Sans', sans-serif;
  margin: 0;
}

.header-items {
  background: #333;
  display: flex;
}

.logo img {
  height: 36px;
  width: auto;
}

.desktop-item,
img.pagebuilder-mobile-hidden {
  display: none;
}

img {
  width: 100%;
}

.header-top-bar-wrapper {
  margin: 0 auto;
  max-width: 1186px;
}

.mobile-item {
  padding: 12px 45px;
}

.header-top-bar-wrapper.desktop-item .pagebuilder-column-line {
  display: flex;
  justify-content: space-between;
}

.header-top-bar-wrapper .pagebuilder-column {
  display: flex;
  justify-content: center;
  align-items: center;
}

.header-top-bar-wrapper p {
  margin: 0;
  color: #8C9199;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 16px;
}

.header-top-bar-wrapper img {
  max-height: 20px;
}

.header-top-bar-wrapper figure {
  margin: 0 10px 0 0;
}

.header-top-bar-wrapper .slick-arrow:before {
  display: none;
}

.header-top-bar-wrapper .slick-prev:after,
.header-top-bar-wrapper .slick-next:after {
  background-repeat: no-repeat;
  background-size: contain;
  width: 9px;
  height: 15px;
  content: '';
  display: block;
  margin: auto;
}

.header-top-bar-wrapper .slick-prev:after {
  background-image: url('../assets/arrow_left_icon.png');
}

.header-top-bar-wrapper .slick-next:after {
  background-image: url('../assets/arrow_right_icon.png');
}


@media only screen and (min-width: 768px) {
  img.pagebuilder-mobile-hidden {
    display: block;
  }

  img.pagebuilder-mobile-only {
    display: none;
  }
}

@media only screen and (min-width: 1024px) {
  .desktop-item {
    display: block;
  }

  .mobile-item {
    display: none;
  }
}
</style>
