<template>
<div v-if="categories && products">
	<content>
		<h2 class="category-title">{{ categories.items[0].name }} ({{ products.total_count }})</h2>
		<div class="sidebar">
			<div class="filtered-box">
				<h2 class="heading">Filtered by</h2>
				<!-- add filter here -->
				
				<p class="clear-button">Clear all</p>
			</div>
			<div class="category-box">
				<div class="types">
					<h2 class="heading">Types</h2>
					<!-- add types here -->
					
				</div>
				<div class="features">
					<h2 class="heading">Features</h2>
					<!-- add features here -->
					<color-filter v-if="colorOptions.length > 0" :options="colorOptions" @updateColorFilter="updateColorFilter" />
					<size-filter v-if="sizeOptions.length > 0" :options="sizeOptions" @updateSizeFilter="updateSizeFilter" />
				</div>
				<div class="brands">
					<h2 class="heading">Brands</h2>
					<!-- add brands here -->
					
				</div>
				<div class="prices">
					<h2 class="heading">Price</h2>
					<!-- add price here -->
					<price-filter v-if="priceOptions.length > 0" :options="priceOptions" @updatePriceFilter="updatePriceFilter" />
				</div>
			</div>
		</div>
		<div class="product-box">
			<div class="product-header" v-if="products.total_count > 0">
				<div class="product-sort">
					<label for="sort-select">Sort by:</label>
					<select id="sort-select" v-model="currentSort" @change="changeSort(currentSort)">
						<option v-for="option in sortOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
					</select>
				</div>
				<div class="paginator">
					<button @click="previousPage" :disabled="currentPage === 1">Previous</button>
					<span>{{ currentPage }}</span>
					<button @click="nextPage(products.page_info)" :disabled="currentPage === products.page_info.total_pages">Next</button>
				</div>
				<div class="product-show">
					<label for="show-select">Show:</label>
					<select id="show-select" v-model="pageSize" @change="changeSize(pageSize)">
						<option v-for="option in pageSizeOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
					</select>
					per page.
				</div>
			</div>
			<div class="product-content">
				<div class="product-category" v-if="products">
					<div class="product-container" v-for="product in products.items" :key="product.sku">
						<router-link :to="{ name: 'ProductPage', params: { sku: product.sku } }" class="router-link">
							<img :src="product.thumbnail.url" alt="Product Thumbnail">
							<p class="product-name">{{ product.name }}</p>
							<p class="product-price">{{ product.price_range.minimum_price.regular_price.value }} {{ product.price_range.minimum_price.regular_price.currency }}</p>
						</router-link>
					</div>
					<p v-if="products.items.total_count === 0">No products.</p>
				</div>
			</div>
		</div>
	</content>
</div>
<div v-else>
    Loading... <!-- or any other loading indicator you prefer -->
</div>
</template>
<script>
	import { useRoute } from 'vue-router';
	import ColorFilter from "@/components/ColorFilter.vue";
	import PriceFilter from "@/components/PriceFilter.vue";
	import SizeFilter from "@/components/SizeFilter.vue";
	import { GET_CATEGORIES } from '@/grapql/query_category';
	import { GET_PRODUCT_FILTER } from '@/grapql/query_product';

	export default {
		name: "CategoryPage",
		components: {
			ColorFilter,
			PriceFilter,
			SizeFilter,
		},
		data() {
			return {
				pageSize: 4,
				currentPage: 1,
				sortOptions: [
					{ label: 'Default', value: 'default' },
					{ label: 'Name A-Z', value: 'name-asc' },
					{ label: 'Name Z-A', value: 'name-desc' },
					{ label: 'Price Ascending', value: 'price-asc' },
					{ label: 'Price Descending', value: 'price-desc' },
				],
				pageSizeOptions: [
					{ label: 4, value: 4 },
					{ label: 8, value: 8 },
					{ label: 12, value: 12 },
				],
				currentSort: 'default',
				colorOptions: [], // Initialize with empty array
				sizeOptions: [],
				priceOptions: [],
			};
		},
		apollo: {
			products: {
				query: GET_PRODUCT_FILTER,
				variables() {
					// const route = useRoute();
					const id = localStorage.getItem('categoryId');
					let sortOption = {};
					if (this.currentSort === 'name-asc') {
						sortOption = { name: 'ASC' };
					} else if (this.currentSort === 'price-asc') {
						sortOption = { price: 'ASC' };
					} else if (this.currentSort === 'name-desc') {
						sortOption = { name: 'DESC' };
					} else if (this.currentSort === 'price-desc') {
						sortOption = { price: 'DESC' };
					} else {
						sortOption = { relevance: 'ASC' };
					}
					
					return {
						id: id, // Use the name parameter from the route
						pageSize: this.pageSize,
						currentPage: this.currentPage,
						sort: sortOption
					};	
				},
				result(result) {
					if (!result.loading && !result.error) {
						// Check if the query has finished loading and has no errors
						console.log(result.data.products); // Access the query result here
					}
				},
			},
			categories: {
				query: GET_CATEGORIES,
				variables() {
					// const route = useRoute();
					const id = localStorage.getItem('categoryId');
					
					return {
						id: id, // Use the name parameter from the route	
					};
				},
				result(result) {
					if (!result.loading && !result.error) {
						// Check if the query has finished loading and has no errors
						console.log(result.data.categories); // Access the query result here
					}
				},
			},
			
		},
		
		methods: {
			getCategoryId(routeId) {
				// Check if the route parameter exists in local storage
				const storedId = localStorage.getItem('categoryId');

				// Use the stored value if available, otherwise use the route parameter
				return storedId || routeId;
			},
			extractAggregationOptions(attributeCode) {
				// Check if products is defined before extracting aggregations
				if (this.products) {
					const aggregation = this.products.aggregations.find(
						(agg) => agg.attribute_code === attributeCode
					);
					return aggregation ? aggregation.options : [];
				}
				return [];
			},
			// Function to change sorting option
			changeSort(option) {
				this.currentSort = option;
			},
			changeSize(option) {
				this.pageSize = option;
			},
			// Function to update pageSize and currentPage
			updatePagination(newPageSize, newCurrentPage) {
				this.pageSize = newPageSize;
				this.currentPage = newCurrentPage;
			},
			// Function to navigate to the previous page
			previousPage() {
				if (this.currentPage > 1) {
					this.updatePagination(this.pageSize, this.currentPage - 1);
				}
			},
			// Function to navigate to the next page
			nextPage(pageInfo) {
				if (this.currentPage < pageInfo.total_pages) {
					this.updatePagination(this.pageSize, this.currentPage + 1);
				}
			},
			
		},
		watch: {
			products: {
				deep: true,
				handler(newVal) {
					if (newVal.aggregations) {
						this.colorOptions = this.extractAggregationOptions('colour');
						this.sizeOptions = this.extractAggregationOptions('size');
						this.priceOptions = this.extractAggregationOptions('price');
					}
				},
			},
		},
		created() {
			const route = useRoute();
			// Store the route parameter in local storage
			localStorage.setItem('categoryId', route.params.id);
		},
	}
</script>
<style scoped>
content {
	display: flex;
	flex-wrap: wrap;
	/* align-items: center; */
	justify-content: center;
	width: 100%;
}

.category-title {
	width: 100%;
}

.router-link {
  text-decoration: none;
  color: #000000;
  text-align: left;
}

.sidebar{
	display: flex;
	flex-direction: column;
	column-gap: 15px;
	width: 15%;
	
}

.filtered-box {
	box-sizing: border-box;
	height: fit-content;
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

.product-sort {
	display: flex;
}

.product-show {
	display: flex;
}

.product-box {
	margin-left: 40px;
	width: 50%;
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

.product-category {
	display: flex;
	flex-wrap: wrap;
	justify-content: left;
	margin-top: 24px;
}

.product-container {
	flex: 0 0 calc(15% - 10px);
	margin: 5px;
}

img {
	width: 224px;
	height: 224px;
}

.product-name {
	font-size: 20px;
	text-decoration: none;
}

.product-price {
	color: #D0021B;
	font-size: 20px;
	font-weight: 500;
}
</style>