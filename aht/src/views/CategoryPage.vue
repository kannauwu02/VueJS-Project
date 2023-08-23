<template>
<content>
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
					<button class="dropdown-button" @click="toggleDropdownCategory">Select a category</button>
					<div class="dropdown-content" v-show="showDropdownCategory">
						<p v-for="(category, index) in uniqueCategories" :key="index" @click="selectCategory(category)">{{ category }}</p>
					</div>
				</div>
			</div>
			<div class="brands">
				<h2 class="heading">Brands</h2>
				<!-- add brands here -->
				<div class="dropdown">
					<button class="dropdown-button" @click="toggleDropdownBrand">Select a brand</button>
					<div class="dropdown-content" v-show="showDropdownBrand">
						<p v-for="(brand, index) in uniqueBrand" :key="index" @click="selectBrand(brand)">{{ brand }}</p>
					</div>
				</div>
			</div>
			<div class="price">
				<h2 class="heading">Price</h2>
				<!-- add price here -->
				<div v-for="category in categories.items" :key="category.id">
					<h2>{{ category.name }}</h2>
					<!-- Display other category data here -->
				</div>
			</div>
		</div>
	</div>
	<div class="product-box">
		<div class="product-header">
			<div class="product-sort">
				<div class="product-sort">
					<label for="sort-select">Sort by:</label>
					<select id="sort-select" v-model="selectedSortOption" @change="sortProducts">
						<option v-for="option in sortOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
					</select>
				</div>
			</div>
			<div class="paginator">
				<!-- page -->
				<PaginatorCategory
					:current-page="currentPage"
					:total-pages="totalPages"
					@page-change="handlePageChange"
				/>
			</div>
		</div>
		<div class="product-content">
			<div class="product-container" v-for="product in displayedProducts" :key="product.id">
				<img :src="product.thumbnail" alt="Product Thumbnail">
				<p class="product-name">{{ product.title }}</p>
				<p class="product-price">{{ product.price }}$</p>
			</div>
			<p v-if="displayedProducts.length === 0">No products match the filter.</p>
		</div>
	</div>
</content>
</template>
<script>
	import PaginatorCategory from "@/components/PaginatorCategory.vue";
	import { GET_CATEGORIES } from '@/graphql/queries';

	export default {
		name: "CategoryPage",
		apollo: {
			categories: {
				query: GET_CATEGORIES,
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
				showDropdownBrand: false,
				showDropdownCategory: false,
				selectedCategory: '',
				selectedBrand: '',
				sortOptions: [
					{ label: 'Default', value: 'default' },
					{ label: 'Name A-Z', value: 'name-asc' },
					{ label: 'Name Z-A', value: 'name-desc' },
					{ label: 'Price Ascending', value: 'price-asc' },
					{ label: 'Price Descending', value: 'price-desc' },
				],
				selectedSortOption: 'default',
			};
		},
		computed: {
			totalPages() {
				// Calculate the total number of pages based on filtered products
				const filteredProducts = this.products.filter(product => {
					const categoryMatch = !this.selectedCategory || product.category === this.selectedCategory;
					const brandMatch = !this.selectedBrand || product.brand === this.selectedBrand;
					return categoryMatch && brandMatch;
				});
				
				return Math.ceil(filteredProducts.length / this.itemsPerPage);
			},
			displayedProducts() {
				// Apply filters
				let filteredProducts = this.products;
				if (this.selectedCategory) {
					filteredProducts = filteredProducts.filter(product => product.category === this.selectedCategory);
				}
				if (this.selectedBrand) {
					filteredProducts = filteredProducts.filter(product => product.brand === this.selectedBrand);
				}
				
				const startIndex = (this.currentPage - 1) * this.itemsPerPage;
				const endIndex = startIndex + this.itemsPerPage;
				return filteredProducts.slice(startIndex, endIndex);
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
		watch: {
			selectedCategory: 'resetCurrentPage',
			selectedBrand: 'resetCurrentPage',
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

			sortProducts() {
				// Clone the products array to avoid mutating the original data
				let sortedProducts = [...this.products];

				switch (this.selectedSortOption) {
				case 'name-asc':
					sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
					break;
				case 'name-desc':
					sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
					break;
				case 'price-asc':
					sortedProducts.sort((a, b) => a.price - b.price);
					break;
				case 'price-desc':
					sortedProducts.sort((a, b) => b.price - a.price);
					break;
				default:
					break;
				}
				// Set the sorted products as the new products
				this.products = sortedProducts
			},
			handlePageChange(newPage) {
				this.currentPage = newPage;
			},
			toggleDropdownBrand() {
				this.showDropdownBrand = !this.showDropdownBrand;
			},
			toggleDropdownCategory() {
				this.showDropdownCategory = !this.showDropdownCategory;
			},
			selectCategory(category) {
				this.selectedCategory = category;
				// this.showDropdownCategory = false;
			},
			selectBrand(brand) {
				this.selectedBrand = brand;
				// this.showDropdownBrand = false;
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
			},
			resetCurrentPage() {
				this.currentPage = 1;
			},
		},
		created() {
			// Call getCategory when the component is created
			this.getCategory();
			// this.getCategoryGraphQL();
			// Create a copy of the original unsorted products
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

.dropdown-content {
  /* position: absolute; */
  /* z-index: 1; */
  /* background-color: white; */
  /* border: 1px solid #ccc; */
  /* width: 100%; */
  max-height: 200px;
  overflow-y: auto;
  /* display: none; */
}

.dropdown-content p {
  padding: 8px 12px;
  margin: 0;
  cursor: pointer;
  transition: background-color 0.3s;
}

.dropdown-content p:hover {
  background-color: #f0f0f0;
}

.product-header {
	display: flex;
	justify-content: space-between;
	padding: 0 20px 0 20px;
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