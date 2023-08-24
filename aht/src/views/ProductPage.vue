<template>
  <div>
    <div class="container" v-if="product">
      <div class="group">
        <div class="product">
          <div class="product_image">
            <div class="list_image">
              <div class="image_item" :class="{ selected: index === currentImage }"
                v-for="(image, index) in product.images" :key="index" @click="Change(index)">
                <img :src="image" alt="" srcset="">
              </div>
            </div>
            <div class="image_current">
              <button class="prev left button_slide" @click="changeImage(-1)" :disabled="currentImage === 0">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M20 26L10 16L20 6" stroke="#426686" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button>
              <div class="skeleton_image">
                <img :src="product.images[currentImage]" alt="">
              </div>
              <button class="next right button_slide" @click="changeImage(1)"
                :disabled="currentImage === product.images.length - 1">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M12 6L22 16L12 26" stroke="#426686" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button>
            </div>
          </div>
          <div class="product_information">
            <span class="rating">
              <svg class="star" v-for="starIndex in 5" :key="starIndex" xmlns="http://www.w3.org/2000/svg" width="16"
                height="16" viewBox="0 0 24 24">
                <path :style="'fill: ' + (starIndex <= rating ? 'orange' : '#F1F0E8') + ';'"
                  d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
              </svg>
              <a class="reviews" href="">Reviews</a>
            </span>
            <h1 class="product_name">{{ product.name }}</h1>
            <span class="price">${{ product.price }}</span>
            <div class="variants">
              <div class="colour">
                <label for="colour">Colour</label> <br>
                <select name="colour" id="colour" class="seclect_opt">
                  <option value="red">red</option>
                  <option value="black">black</option>
                  <option value="white">white</option>
                </select>
              </div>
              <div class="size">
                <label for="size">Size</label> <br>
                <select name="size" id="size" class="seclect_opt">
                  <option value="red">red</option>
                  <option value="black">black</option>
                  <option value="white">white</option>
                </select>
              </div>
            </div>
            <div class="add_cart">
              <div class="quantity">
                <button class="minus" @click="changeQuantity(-1)" :disabled="quantity === 1">-</button>
                <input type="number" min="1" :value="quantity" @input="checkQuanti">
                <button class="add" @click="changeQuantity(1)">+</button>
              </div>
              <button class="add_to-cart" @click="addCart" :disabled="quantity > product.stock">{{ text_button }}</button>
            </div>
            <div class="why_choose">
              <div class="condition_item">Best price guaranteed</div>
              <div class="condition_item">Best price guaranteed</div>
              <div class="condition_item">Best price guaranteed</div>
              <div class="condition_item">Best price guaranteed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>
<script>
import { useRoute } from 'vue-router';
import { GET_PRODUCT } from '@/grapql/query_product';
export default {
  name: "ProductPage",
  data() {
    return {
      currentImage: 0,
      quantity: 1,
      text_button: '',
      rating: 0
    };
  },
  watch: {
    quantity(quantity) {
      this.updateButton(quantity)
    }
  },
  apollo: {
    products: {
      query: GET_PRODUCT,
      variables() {
        const route = useRoute();
        return {
          sku: route.params.sku, // Use the SKU parameter from the route
        };
      },
      result(result) {
        if (!result.loading && !result.error) {
          // Check if the query has finished loading and has no errors
          console.log(result.data.products); // Access the query result here
        }
      },
    },
  },
  methods: {
    // Change(index) {
    //   this.currentImage = index
    //   this.product.images[index]
    // },
    // changeImage(step) {
    //   const newIndex = this.currentImage + step;
    //   if (newIndex >= 0 && newIndex < this.product.images.length) {
    //     this.currentImage = newIndex;
    //   }
    // },
    // changeQuantity(step) {
    //   const quanti = this.quantity + step
    //   this.quantity = quanti;
    // },
    // checkQuanti(event) {
    //   const inputValue = event.target.value;
    //   this.quantity = parseInt(inputValue, 10);
    // },
    // updateButton(quantity) {
    //   if (quantity > this.product.stock) {
    //     this.text_button = 'Sold out'
    //   } else {
    //     this.text_button = 'Add to card'
    //   }
    // },
    // addCart() {
    //   console.log(this.quantity)
    // },
    // updateStar(rating) {
    //   this.rating = parseInt(rating, 10)
    // }
  }
}
</script>
<style>
.container {
  margin: 0 80px;
}

.seclect_opt {
  height: 48px;
  border-color: #e4e1e1;
  border-radius: 4px;
}

.reviews {
  padding-left: 4px;
  text-transform: capitalize;
  text-decoration: underline;
  font-size: 14px;
  color: grey;
}

.star {
  padding: 0 4px;
}

.group {
  box-shadow: 0 0 50px rgb(180, 179, 179);
  padding: 24px;
}

.product_name {
  text-transform: uppercase;
  margin-bottom: 32px;
  margin-top: 0;
}

.price {
  font-size: 30px;
  font-weight: 600;
  display: block;
  padding-bottom: 24px;
  border-bottom: 1px solid #e4e1e1;
}

.quantity {
  border: 1px solid #e4e1e1;
  border-radius: 4px;
}

.quantity button {
  height: 100%;
  width: 48px;
  padding: 0;
}

.right {
  right: 0;
}

.add_to-cart {
  padding: 0;
  flex-basis: 0;
  flex-grow: 1;
  border-radius: 4px;
  background-color: #7DCE13;
  border: none;
  font-size: 18px;
  font-weight: 600;
  color: white;
}

.left {
  left: 0;
}

.variants {
  display: flex;
  margin-top: 24px;
  gap: 16px;
  margin-bottom: 16px;
}

.variants>div {
  width: 50%;
}

.variants label {
  font-size: 16px;
  font-weight: 600;
}

.product {
  display: flex;
}

.product_image {
  display: flex;
  width: 50%;
}

.add_cart {
  display: flex;
  height: 48px;
  gap: 16px;
}

.product_information {
  text-align: left;
  margin-left: 24px;
  width: 50%;
}

.rating {
  padding-bottom: 6px;
  display: inline-block;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  max-width: 48px;
  border-radius: unset;
  border: none;
  text-align: center;
  padding: 0;
  height: 100%;
  -moz-appearance: textfield;
}

.why_choose {
  display: grid;
  grid-template-columns: repeat(2, auto);
  margin-top: 16px;
  padding: 24px 24px;
  border-radius: 4px;
  background-color: #F1F0E8;
}

select {
  width: 100%;
}

input:focus,
select {
  outline: none;
}

.minus,
.add {
  border: none;
  border-radius: unset;
  background-color: transparent;
}

.image_item {
  box-sizing: border-box;
  width: 80px;
  height: 80px;
  margin-bottom: 16px;
}

.skeleton_image {
  width: 100%;
  height: 0;
  position: relative;
  padding-bottom: 100%;
}

.image_item.selected {
  border: 1px solid black;
}

.image_item:last-child {
  margin-bottom: 0;
}

.image_item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image_current {
  margin-left: 24px;
  position: relative;
  width: 100%;
}

.skeleton_image img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  left: 0;
  top: 0;
}

.button_slide {
  position: absolute;
  z-index: 10;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  font-size: 30px;
}
</style>