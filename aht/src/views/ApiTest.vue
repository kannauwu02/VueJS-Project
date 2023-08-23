<template>
    <div v-for="category in categories" :key="category.id">
		<h2>{{ category.name }}</h2>
	</div>
</template>
<script>
import axios from 'axios'
export default {
	name: "CategoryPage",
	data() {
		return {
			categories: []
		};
	},
    methods: { 
        async getCategoryGraphQL() {
			let query = 
				`{
					categories(filters: {}, pageSize: 20, currentPage: 1) {
						items {
							id
							name
						}
					}
				}`
			try {
				var res = await axios({
					method: 'POST',
                    url: 'https://magentoapi.merket.io/graphql',
					headers: {
						'Content-Type': 'application/json',
                        // 'Access-Control-Allow-Origin': '*',
					},
					data: query
				});
				this.categories = res.data.categories.items;
			} catch (error) {
				console.log(error);
			}
		},
    },
    created() {
		// Call getCategory when the component is created
		this.getCategoryGraphQL();
	},
}
</script>