<template>
  <div class="index-index" v-html="home.content"></div>
</template>
<script>
  import gql from 'graphql-tag';
  const $ = window.$

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
        home: cmsPage(identifier: "home") {
          content
        },
      }`,
    },
    updated: function () {
      if (!document.querySelector('.home-content-slider .slick-slider')) {
        $('.home-content-slider .pagebuilder-column-line').slick({
          dots: true,
          arrows: false,
          infinite: true,
          speed: 300,
          slidesToShow: 1,
          slidesToScroll: 1,
        });
      }

      if ( $(window).width() >= 1024 ) {
        if (document.querySelector('.home-content-categories .slick-slider')) {
          $('.home-content-categories .pagebuilder-column-line').slick('unslick');
        }
      } else {
        if (!document.querySelector('.home-content-categories .slick-slider')) {
          $('.home-content-categories .pagebuilder-column-line').slick({
            dots: false,
            arrows: true,
            infinite: true,
            speed: 300,
            slidesToShow: 2,
            slidesToScroll: 2,
            rows: 2
          });
        }
      }

      $(window).on('resize', function() {
        if ( $(window).width() >= 1024 ) {
          if (document.querySelector('.home-content-categories .slick-slider')) {
            $('.home-content-categories .pagebuilder-column-line').slick('unslick');
          }
        } else {
          if (!document.querySelector('.home-content-categories .slick-slider')) {
            $('.home-content-categories .pagebuilder-column-line').slick({
              dots: false,
              arrows: true,
              infinite: true,
              speed: 300,
              slidesToShow: 2,
              slidesToScroll: 2,
              rows: 2
            });
          }
        }
      });
    },
  }
</script>

<style>
.index-index img {
  width: 100%;
}

.index-index .slick-dotted.slick-slider {
  margin: 0;
}

.home-content-slider {
  margin-bottom: 42px;
}

.home-content-slider .slick-dots li button {
  width: 10px;
  height: 10px;
  border: 2px solid #DDDDDD;
  border-radius: 50%;
  padding: 4px;
}

.home-content-slider .slick-dots li button:before {
  content: '';
  width: 100%;
  height: 100%;
}

.home-content-slider .slick-dots li {
  width: 12px;
  height: 12px;
}

.home-content-slider .slick-dots li.slick-active button {
  background: #9B9B9B;
  border: 2px solid #9B9B9B;
}

.home-content-slider .slick-dots {
  bottom: -22px;
}

.home-content-categories {
  padding: 0 12px;
}

.home-content-categories h3 {
  margin: 0;
  text-align: left;
  color: #000;
  font-family: 'Oswald';
  font-size: 28px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 34px;
  text-transform: uppercase;
}

/* Categories list */
.home-content-categories .pagebuilder-column {
  padding: 0 10px;
}

@media only screen and (min-width: 768px) {
  .home-content-slider .slick-dots {
    display: none !important;
  }
}
</style>