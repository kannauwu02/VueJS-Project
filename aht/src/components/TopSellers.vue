<template>
  <div class="top-sellers-block">
    <div v-for="item in topSellers.items" :key="item">
      <div v-html="item.content"></div>
    </div>
  </div>
</template>

<script>
  import gql from 'graphql-tag'

  const $ = window.$

  export default {
    name: "TopSellers",
    data() {
      return {
        topSellers: ''
      };
    },
    apollo: {
      topSellers: gql`query {
        topSellers: cmsBlocks(identifiers: ["top-sellers"]) {
          items {
            content
          }
        },
      }`,
    },
    updated: function () {
      if ( $(window).width() >= 1024 ) {
        if (document.querySelector('.top-sellers .slick-slider')) {
          $('.top-sellers .widget-product-grid').slick('unslick');
        }
      } else {
        if (!document.querySelector('.top-sellers .slick-slider')) {
          $('.top-sellers .widget-product-grid').slick({
            dots: false,
            arrows: true,
            infinite: false,
            speed: 300,
            slidesToShow: 2,
            slidesToScroll: 1,
            responsive: [

              {
                breakpoint: 767,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
            ]
          });
        }
      }

      $(window).on('resize', function() {
        if ( $(window).width() >= 1024 ) {
          if (document.querySelector('.top-sellers .slick-slider')) {
            $('.top-sellers .widget-product-grid').slick('unslick');
          }
        } else {
          if (!document.querySelector('.top-sellers .slick-slider')) {
            $('.top-sellers .widget-product-grid').slick({
              dots: false,
              arrows: true,
              infinite: false,
              speed: 300,
              slidesToShow: 2,
              slidesToScroll: 1,
              responsive: [

                {
                  breakpoint: 767,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
              ]
            });
          }
        }
      });
    }
  }
</script>

<style>
.top-sellers {
  padding: 24px 0;
}

.top-sellers h3,
.top-sellers p {
  margin: 0;
}

.top-sellers h3 {
  color: #222;
  font-family: 'Oswald';
  font-size: 28px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 34px;
  text-align: left;
  text-transform: uppercase;
  padding-left: 10px;
  margin-bottom: 19px;
}

.top-sellers .slick-next:after,
.top-sellers .slick-prev:after {
  background-repeat: no-repeat;
  background-size: contain;
  width: 38px;
  height: 38px;
  content: '';
  display: block;
  margin: auto;
}

.top-sellers .slick-next,
.top-sellers .slick-prev {
  right: 0;
  left: auto;
  top: -36px;
  width: 38px;
  height: 38px;
  z-index: 1;
}

.top-sellers .slick-prev {
  right: 56px;
}

.top-sellers .slick-next {
  right: 10px;
}

.top-sellers .slick-prev:after {
  background-image: url('../assets/Arrow_left_active_icon.png');
}

.top-sellers .slick-next:after {
  background-image: url('../assets/Arrow_right_active_icon.png');
}

.top-sellers .slick-prev.slick-disabled:after {
  background-image: url('../assets/Arrow_left_icon_white.png');
}

.top-sellers .slick-next.slick-disabled:after {
  background-image: url('../assets/Arrow_right_icon_white.png');
}

.top-sellers .slick-arrow:before {
  display: none;
}

.top-sellers .product-item .product-image-container span.product-image-wrapper {
    padding-bottom: 100%;
    display: block;
    position: relative;
    overflow: hidden;
}

.top-sellers .slick-list {
  padding: 0 30% 0 0 !important;
}

.top-sellers .product-item.slick-slide {
  padding: 10px 8px;
}

.widget-product-grid .product-item .product-image-photo {
  position: absolute;
  object-fit: cover;
  width: 100%;
  height: auto;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}

.widget-product-grid .product-item-details {
  padding: 16px;
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

.top-sellers p a {
  border-radius: 27px;
  background-color: #3EB2FB;
  color: #fff;
  font-family: 'Montserrat';
  font-size: 15px;
  font-weight: bold;
  letter-spacing: 0;
  line-height: 13px;
  padding: 20px 40px;
  margin: 19px auto 0;
  width: max-content;
  display: block;
  text-decoration: none;
}

@media only screen and (min-width: 768px) {
  .top-sellers .slick-list {
    padding: 0 12% 0 0 !important;
  }
}

@media only screen and (min-width: 1024px) {
  .top-sellers h3 {
    font-size: 42px;
    padding-left: 0;
    margin-bottom: 38px;
  }

  .top-sellers {
    max-width: 1280;
    padding: 64px 20px;
  }

  .widget-product-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 40px 20px;
  }

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