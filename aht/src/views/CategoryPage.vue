<template>
<content>
    <!-- <p> 
      Chat with bot (He's free!):
      <input @keyup.enter="getAnswer" v-model="question" /> 
    </p>  -->
    <!-- <img :src="msg"> -->
    <!-- <p>{{ msg }}</p>
    <div>
        <router-link to="/">HomePage</router-link>
        <router-link to="/CategoryPage">CategoryPage</router-link>
        <router-link to="/ProductPage">ProductPage</router-link>
    </div> -->
	<div class="sidebar">
		<div class="filtered-box">
			<h2 class="heading">Filtered by</h2>
			<!-- add filter here -->
			<div v-if="selectedCategory" class="filtered-category">
				<p>Types: {{ selectedCategory }}</p>
				<button class="remove-filter" @click="unselectCategory">X</button>
			</div>
			<div v-if="selectedBrand" class="filtered-category">
				<p>Brand: {{ selectedBrand }}</p>
				<button class="remove-filter" @click="unselectBrand">X</button>
			</div>
			<p class="clear-button" @click="unselectAll">Clear all</p>
		</div>
		<div class="category-box">
			<div class="types">
				<h2 class="heading">Types</h2>
				<!-- add types here -->
				<div class="dropdown">
					<button class="dropdown-button" @click="toggleDropdown">Select a category</button>
					<div class="dropdown-content" v-show="showDropdown">
						<p v-for="(category, index) in uniqueCategories" :key="index" @click="selectCategory(category)">{{ category }}</p>
					</div>
				</div>
			</div>
			<div class="brands">
				<h2 class="heading">Brands</h2>
				<!-- add brands here -->
				<div class="dropdown">
					<button class="dropdown-button" @click="toggleDropdown">Select a brand</button>
					<div class="dropdown-content" v-show="showDropdown">
						<p v-for="(brand, index) in uniqueBrand" :key="index" @click="selectBrand(brand)">{{ brand }}</p>
					</div>
				</div>
			</div>
			<div class="price">
				<h2 class="heading">Price</h2>
				<!-- add price here -->
				<div v-for="category in categories" :key="category.id">
					<h2>{{ category.name }}</h2>
					<!-- Display other category data here -->
				</div>
			</div>
		</div>
	</div>
	<div class="product-box">
		<div class="paginator">
			<!-- page -->
			<PaginatorCategory
				:current-page="currentPage"
				:total-pages="totalPages"
				@page-change="handlePageChange"
			/>
		</div>
		<div class="product-content">
			<div class="product-container" v-for="product in displayedProducts" :key="product.id">
				<img :src="product.thumbnail" alt="Product Thumbnail">
				<p class="product-name">{{ product.title }}</p>
				<p class="product-price">{{ product.price }}$</p>
			</div>
		</div>
	</div>
</content>
</template>
<!-- <script>
    export default {
		name: "CategoryPage",
		data() {
			return {
			msg: '',
			question: '',
			};
		},
		// watch: { 
		// // whenever question changes, this function will run
		//     question(newQuestion) { 
		//       if (newQuestion.includes('?')) { 
		//           this.getAnswer() 
		//       } 
		//     }
		// },
		methods: { 
			async getAnswer() { 
				this.msg = 'Thinking...' 
				try { 
					// let self = this
					let res = await fetch('https://robomatic-ai.p.rapidapi.com/api', {
					method: 'POST',
					headers: {
						'content-type': 'application/x-www-form-urlencoded',
						'X-RapidAPI-Key': '9f4c7fccd7mshfd7a4b0c82a81ccp19924ajsn7f621b022fb8',
						'X-RapidAPI-Host': 'robomatic-ai.p.rapidapi.com'
					},
					body: new URLSearchParams({
						in: this.question,
						op: 'in',
						cbot: '1',
						SessionID: 'RapidAPI1',
						cbid: '1',
						key: 'RHMN5hnQ4wTYZBGCF3dfxzypt68rVP',
						ChatSource: 'RapidAPI',
						duration: '1'
					})
					});
					const response = await res.json();
					this.msg = response.out;
					

				} catch (error) { 
				this.msg = 'Error! Could not reach the API. ' + error 
				} 
			} 
		}
    }
</script> -->
<script>
	import PaginatorCategory from "@/components/PaginatorCategory.vue";
	import { gql } from 'graphql-tag';

	const GET_CATEGORIES = gql`
	query GetCategories {
		categories(filters: {}, pageSize: 20, currentPage: 1) {
			items {
				id
				name
				# Other fields you need
			}
		}
	}
	`;
	export default {
		name: "CategoryPage",
		apollo: {
			categories: {
			query: GET_CATEGORIES,
			// Other Apollo options here if needed
			},
		},
		components: {
			PaginatorCategory,
		},
		data() {
			return {
				products: [],
				msg: '',
				itemsPerPage: 8,
				currentPage: 1,
				showDropdown: false,
				selectedCategory: '',
				selectedBrand: ''
			};
		},
		computed: {
			totalPages() {
				return Math.ceil(this.products.length / this.itemsPerPage);
			},
			displayedProducts() {
				const startIndex = (this.currentPage - 1) * this.itemsPerPage;
				const endIndex = startIndex + this.itemsPerPage;
				return this.products.slice(startIndex, endIndex);
			},
			uniqueCategories() {
				// Extract unique category names from products array
				const categoriesSet = new Set();
				this.products.forEach((product) => {
					categoriesSet.add(product.category);
				});
				return Array.from(categoriesSet);
			},
			uniqueBrand() {
				// Extract unique category names from products array
				const brandSet = new Set();
				this.products.forEach((product) => {
					brandSet.add(product.brand);
				});
				return Array.from(brandSet);
			},
		},
		methods: { 
			async getCategory() { 
				
				try { 
					const res = await fetch('https://dummyjson.com/products')
					const response = await res.json();
					this.products = response.products;

				} catch (error) { 
					this.msg = 'Error! Could not reach the API. ' + error 
				} 
			},
			handlePageChange(newPage) {
				this.currentPage = newPage;
			},
			toggleDropdown() {
				this.showDropdown = !this.showDropdown;
			},
			selectCategory(category) {
				this.selectedCategory = category;
				this.showDropdown = false; // Close the dropdown after selecting a category
				// Perform actions based on the selected category if needed
			},
			selectBrand(brand) {
				this.selectedBrand = brand;
				this.showDropdown = false;
			},
			unselectCategory() {
				this.selectedCategory = '';
			},
			unselectBrand() {
				this.selectedBrand = '';
			},
			unselectAll() {
				this.unselectCategory();
				this.unselectBrand();
			}
		},
		created() {
			// Call getCategory when the component is created
			this.getCategory();
		},
	}
</script>
<style scoped>
content {
	display: flex;
}

.sidebar{
	display: flex;
	flex-direction: column;
	column-gap: 15px;
}

.filtered-box {
	box-sizing: border-box;
	height: fit-content;
	width: 244px;
	border: 1px solid #EEEEEE;
	border-radius: 5px;
	background-color: #FFFFFF;
	box-shadow: 2px 2px 10px 0 rgba(0,0,0,0.08);
}

.heading {
	height: fit-content;
	width: fit-content;
	color: #000000;
	font-family: Oswald;
	letter-spacing: 0.5px;
	line-height: 17px;
}

.clear-button{
	height: 22px;
	width: 56px;
	color: #000000;
	font-family: Montserrat;
	font-size: 16px;
	letter-spacing: 0;
	line-height: 22px;
	cursor: pointer;
	text-decoration: underline;
}

.category-box {
	box-sizing: border-box;
	height: fit-content;
	width: 244px;
	border: 1px solid #EEEEEE;
	border-radius: 5px;
	background-color: #FFFFFF;
	box-shadow: 2px 2px 10px 0 rgba(0,0,0,0.08);
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-button, .remove-filter {
  padding: 10px;
  border: 1px solid #ccc;
  cursor: pointer;
  background-color: #f9f9f9;
}

/* .dropdown-content {
  position: absolute;
  z-index: 1;
  background-color: white;
  border: 1px solid #ccc;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  display: none;
} */

.dropdown-content p {
  padding: 8px 12px;
  margin: 0;
  cursor: pointer;
  transition: background-color 0.3s;
}

.dropdown-content p:hover {
  background-color: #f0f0f0;
}

.product-content {
	display: flex;
	flex-wrap: wrap;
	justify-content: left;
}

.product-container {
	flex: 0 0 calc(25% - 10px);
	margin: 5px;
}

img {
	width: 224px;
	height: 224px;
}

.product-name {
	font-size: 20px;
}

.product-price {
	color: #D0021B;
	font-size: 20px;
	font-weight: 500;
}
</style>