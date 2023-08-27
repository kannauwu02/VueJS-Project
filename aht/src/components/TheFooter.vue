<template>
  <footer>
    <div v-for="item in footer.items" :key="item">
      <div v-html="item.content"></div>
    </div>
  </footer>
</template>

<script>
  import gql from 'graphql-tag'
  const $ = window.$

  export default {
    name: "TheFooter",
    data() {
      return {
        footer: ''
      };
    },
    apollo: {
      footer: gql`query {
        footer: cmsBlocks(identifiers: ["footer"]) {
          items {
            content
          }
        },
      }`,
    },
    updated: function () {
      console.log(123)
      $('.accordion h4').click(function(){
        console.log(123)
        $(this).siblings('[data-content-type="text"]').slideToggle();
      });
    }
  }
</script>

<style>
footer p,
footer h4 {
  margin: 0;
}

footer h4 {
  color: #000;
  font-family: 'Oswald';
  font-size: 15px;
  letter-spacing: 0.5px;
  line-height: 17px;
}

footer .footer-top .pagebuilder-column-line {
  display: flex;
  flex-direction: column;
}

.footer-payment {
  order: -1;
  padding: 0 20px;
}

.footer-payment h4 {
  margin-bottom: 28px;
}

.footer-payment img {
  max-height: 24px;
}

footer img {
  width: auto;
  margin: 0 24px;
}
</style>
