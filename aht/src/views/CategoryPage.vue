<template>
<div v-if="categories && products">
	<content>
		<h2 class="category-title">{{ categories.items[0].name }}</h2>
		<div class="sidebar">
			<div class="filtered-box">
				<h2 class="heading">FILTERED BY</h2>
				<!-- add filter here -->
				<div v-if="colorOption" class="filtered-category">
					<img src="../assets/close_icon.png" @click="unselectColor"> Color: {{ colorOption }}	
				</div>
				<div v-if="sizeOption" class="filtered-category">
					<img src="../assets/close_icon.png" @click="unselectSize"> Size: {{ sizeOption }}	
				</div>
				<div v-if="priceOption" class="filtered-category">
					<img src="../assets/close_icon.png" @click="unselectPrice"> Price: {{ priceOption }}$	
				</div>
				
				<p class="clear-button" @click="unselectAll">Clear all</p>
			</div>
			<div class="category-box">
				<div class="category">
					<h2 class="heading">TYPES</h2>
					<!-- add types here -->
					
				</div>
				<div class="category">
					<h2 class="heading">FEATURES</h2>
					<!-- add features here -->
					<div class="filter" data-content-type="text">
						<h3>COLOR</h3>
						<div v-for="aggregation in products.aggregations" :key="aggregation.count">
							<div v-if="aggregation.attribute_code == 'colour'">
								<p class="filter-text" v-for="option in aggregation.options" :key="option.value" @click="selectColor(option.label)">
									{{ option.label }} ({{ option.count }})
								</p>
							</div>
						</div>
					</div>
					<div class="filter" data-content-type="text">
						<h3>SIZE</h3>
						<div v-for="aggregation in products.aggregations" :key="aggregation.count">
							<div v-if="aggregation.attribute_code == 'size'">
								<p class="filter-text" v-for="option in aggregation.options" :key="option.value" @click="selectSize(option.label)">
									{{ option.label }} ({{ option.count }})
								</p>
							</div>
						</div>
					</div>
				</div>
				<div class="category">
					<h2 class="heading">BRANDS</h2>
					<!-- add brands here -->
					
				</div>
				<div class="category">
					<h2 class="heading">PRICE</h2>
					<!-- add price here -->
					<div class="filter" data-content-type="text">
						<!-- <h3>Price</h3> -->
						<div v-for="aggregation in products.aggregations" :key="aggregation.count">
							<div v-if="aggregation.attribute_code == 'price'">
								<p class="filter-text" v-for="option in aggregation.options" :key="option.value" @click="selectPrice(option.label)">
									{{ option.label }}$ ({{ option.count }})
								</p>
							</div>
						</div>
					</div>
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
						<a :href="'/product/' + product.sku" class="router-link"	>
							<img :src="product.thumbnail.url" alt="Product Thumbnail">
							<p class="product-name">{{ product.name }}</p>
							<p class="product-price">{{ product.price_range.minimum_price.regular_price.value }} {{ product.price_range.minimum_price.regular_price.currency }}</p>
						</a>
					</div>
					<p v-if="products.items.total_count === 0">No products.</p>
				</div>
			</div>
			<div class="product-footer" v-if="products.total_count > 0">
				<div class="paginator">
					<button @click="previousPage" :disabled="currentPage === 1">Previous</button>
					<span>{{ currentPage }}</span>
					<button @click="nextPage(products.page_info)" :disabled="currentPage === products.page_info.total_pages">Next</button>
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
	// import { useRoute } from 'vue-router';
	import { GET_CATEGORIES } from '@/grapql/query_category';
	import { GET_PRODUCT_FILTER } from '@/grapql/query_product';
	const $ = window.$

	export default {
		name: "CategoryPage",
		props: {
			id: String, // Declare the id prop
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
				colorOption: '',
				sizeOption: '',
				priceOption: '',
			};
		},
		apollo: {
			products: {
				query: GET_PRODUCT_FILTER,
				variables() {
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
						// Use the name parameter from the route
						id: this.id,
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
					return {
						// Use the name parameter from the route
						id: this.id,	
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
			selectColor(option) {
				this.colorOption = option;
			},
			selectPrice(option) {
				this.priceOption = option;
			},
			selectSize(option) {
				this.sizeOption = option;
			},
			unselectColor() {
				this.colorOption = '';
			},
			unselectSize() {
				this.sizeOption = '';
			},
			unselectPrice() {
				this.priceOption = '';
			},
			unselectAll() {
				this.unselectColor();
				this.unselectSize();
				this.unselectPrice();
			},
		},
		updated() {
			// Unbind previous click event handlers
			$('.category h2').off('click');

			// Attach new click event handler
			$('.category h2').click(function () {
				$(this).siblings('[data-content-type="text"]').slideToggle();
				$(this).toggleClass('active');
			});
		}
	}
</script>
<style scoped>
content {
	display: flex;
	flex-wrap: wrap;
	/* align-items: center; */
	justify-content: center;
	width: 100%;
	margin-bottom: 64px;
}

.category-title {
	width: 100%;
	color: #8AD038;
	font-family: Oswald;
	font-size: 42px;
	font-weight: 500;
	letter-spacing: 0;
	line-height: 34px;
	text-align: center;
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
	width: 18%;
	
}

.filtered-box {
	padding-left: 15px;
	box-sizing: border-box;
	height: fit-content;
	border: 1px solid #EEEEEE;
	border-radius: 5px;
	background-color: #FFFFFF;
	box-shadow: 2px 2px 10px 0 rgba(0,0,0,0.08);
}

.filtered-box .filtered-category {
	display: flex;
	text-align: left;
	color: #4A4A4A;
	font-family: Montserrat;
	font-size: 16px;
	letter-spacing: 0;
	line-height: 26px;
	align-items: center;
}

.filtered-box .filtered-category img {
	width: 16px;
	height: 16px;
	margin-right: 6px;
}

.filtered-box h2 {
	font-weight: 500;
	padding: 20px 0 17px;
	color: #000000;
	font-family: Oswald;
	letter-spacing: 0.5px;
	line-height: 17px;
	display: flex;
	justify-content: space-between;
}

.category {
	border-top: 1px solid #EBEBEB;
	text-align: left;
	margin: 0 15px;
}


.category:first-child {
  border: none;
}

.category h2 {
	font-weight: 500;
	padding: 20px 0 17px;
	color: #000000;
	font-family: Oswald;
	letter-spacing: 0.5px;
	line-height: 17px;
	display: flex;
	justify-content: space-between;
}

.category h2:after {
  content: '';
  width: 14px;
  height: 14px;
  background-image: url('../assets/plus-footer-icon.jpg');
  display: block;
  background-size: contain;
}

.category h2.active:after {
	background-image: url('../assets/minus-footer-icon.jpg');
}

.category [data-content-type="text"] {
	display: none;
	padding-bottom: 10px;
	margin-top: -5px;
}

.filter-text {
	color: #4A4A4A;
	font-family: Montserrat;
	font-size: 16px;
	letter-spacing: 0;
	line-height: 26px;
	cursor: pointer;
	transition: background-color 0.3s;
}

.filter-text:hover {
  background-color: #f0f0f0;
}

.clear-button{
	height: 22px;
	width: fit-content;
	color: #000000;
	font-family: Montserrat;
	font-size: 16px;
	letter-spacing: 0;
	line-height: 22px;
	cursor: pointer;
	text-decoration: underline;
}

.filter {
    text-align: left;
}

.filter h3 {
	color: #000000;
	font-family: Oswald;
	letter-spacing: 0.5px;
	line-height: 17px;
}

.category-box {
	/* padding-left: 15px; */
	margin-top: 16px;
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

select {
	height: 40px;
}

.product-sort {
	display: flex;
}

.product-show {
	display: flex;
	align-items: center;
}

.product-box {
	margin-left: 40px;
	width: 58%;
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
	column-gap: 21px;
}

.product-container {
	flex: 0 0 calc(15%);
	margin: 5px;
}

img {
	width: 224px;
	height: 224px;
}

.product-name {
	font-size: 20px;
	text-decoration: none;
	font-family: Montserrat;
	color: #111111;
	font-weight: 500;
	letter-spacing: 0;
	line-height: 18px;
}

.product-price {
	color: #D0021B;
	font-family: Montserrat;
	font-size: 20px;
	font-weight: 500;
	letter-spacing: 0;
	line-height: 24px;
}

.product-footer {
	margin-top: 48px;
}
</style>