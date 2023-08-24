<template>
    <div v-for="category in categories.items" :key="category.id">
		<router-link :to="{ name: 'CategoryPage', params: { name: category.name } }">
			<h2>{{ category.name }}</h2>
		</router-link>
	</div>
	<button @click="doSomethingWithNames">Do Something with Names</button>
</template>
<script>

import { GET_ALL_CATEGORIES } from '@/grapql/query_category';
export default {
	name: "CategoryPage",
	apollo: {
		categories: {
			query: GET_ALL_CATEGORIES,
			
		},
	},
	methods: {
		doSomethingWithNames() {
		// Access the names from the categories data here
		const categoryNames = this.categories.items.map(category => category.name);
		
		// You can now use categoryNames in your method
		console.log(categoryNames);
		
		// You can also access other properties like total_count if needed
		const totalCounts = this.categories.items.map(category => category.products.total_count);
		console.log(totalCounts);
		},
	},
};
</script>