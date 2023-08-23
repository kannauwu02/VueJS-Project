<template>
    <div v-for="category in categories.items" :key="category.id">
		<h2>{{ category.name }}</h2>
	</div>
</template>
<script>
import { GET_CATEGORIES } from '@/graphql/queries';
export default {
	name: "CategoryPage",
	apollo: {
		categories: {
			query: GET_CATEGORIES,
		},
	},
};
</script>