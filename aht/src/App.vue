<template>
  <div class="pageSizing" id="html-body">
    <TheHeader />
    <router-view></router-view>
    <TheFooter />
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";

export default {
  name: 'App',
  components: {
    TheHeader,
    TheFooter
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.blue-button {
  background-color: #3EB2FB;
}

.blue-button:hover {
  background-color: #159BEF;
}

.widget-product-grid .product-item .product-image-photo {
  position: absolute;
  object-fit: cover;
  width: calc(100% + 1px);
  height: auto;
  left: -1px;
  top: 50%;
  transform: translateY(-50%);
}

.widget-product-grid .product-item-details {
  padding: 16px;
  background: #fff;
}

.widget-product-grid .product-item-link {
  color: #111;
  font-family: 'Montserrat';
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 18px;
  text-align: left;
  display: block;
  text-decoration: none;
}

.widget-product-grid .product-reviews-summary,
.widget-product-grid .price-label,
.widget-product-grid .product-item-inner {
  display: none;
}

.widget-product-grid .price {
  color: #000;
  font-family: 'Montserrat';
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 24px;
  padding: 0;
  border: none;
}

.widget-product-grid .price-box.price-final_price {
  display: flex;
  align-items: end;
}

.widget-product-grid .old-price .price {
  color: #BBBBBB;
  font-family: 'Montserrat';
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 19px;
  text-decoration: line-through;
  margin-right: 8px;
}

.widget-product-grid .old-price + .normal-price .price {
  color: #D0021B;
}

.widget-product-grid .price-container {
  display: flex;
}

.widget-product-grid .product-item-info {
  box-shadow: 2px 2px 8px 0 rgba(0,0,0,.2);
  top: 0;
  transition: all 0.2s linear;
  position: relative;
}

.widget-product-grid .product-item-info:hover {
  top: -8px;
}

.widget-product-grid {
  margin: 0 0 0 2px;
}

.widget-product-grid .product-item .product-image-container span.product-image-wrapper {
    padding-bottom: 100%;
    display: block;
    position: relative;
    overflow: hidden;
}

@media only screen and (min-width: 1024px) {
  .widget-product-grid .product-item-info {
    box-shadow: none;
  }

  .widget-product-grid .product-item-details {
    padding: 12px 0 2px;
  }

  .widget-product-grid .product-item-link {
    margin-bottom: 9px;
  }
}
</style>
