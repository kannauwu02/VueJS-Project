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
			</div>
			<div class="brands">
				<h2 class="heading">Brands</h2>
				<!-- add brands here -->
			</div>
			<div class="price">
				<h2 class="heading">Price</h2>
				<!-- add price here -->
			</div>
		</div>
	</div>
	<div class="product-box">
		<div class="paginator">
			<!-- page -->
		</div>
		<div class="product-content">
			<!-- v-for here for product lists -->
			<div class="product-container">
				<img src="https://lh3.googleusercontent.com/a/AAcHTtesfsMyGystqOyV9PLVfB9wNQtxTTfan--M5PnZ9Y53vSQ=s288-c-no">
				<p class="product-name">ProductName</p>
				<p class="product-price">100$</p>
			</div>
			<div class="product-container">
				<img src="https://lh3.googleusercontent.com/a/AAcHTtesfsMyGystqOyV9PLVfB9wNQtxTTfan--M5PnZ9Y53vSQ=s288-c-no">
				<p class="product-name">ProductName</p>
				<p class="product-price">100$</p>
			</div>
			<div class="product-container">
				<img src="https://lh3.googleusercontent.com/a/AAcHTtesfsMyGystqOyV9PLVfB9wNQtxTTfan--M5PnZ9Y53vSQ=s288-c-no">
				<p class="product-name">ProductName</p>
				<p class="product-price">100$</p>
			</div>
			<div class="product-container">
				<img src="https://lh3.googleusercontent.com/a/AAcHTtesfsMyGystqOyV9PLVfB9wNQtxTTfan--M5PnZ9Y53vSQ=s288-c-no">
				<p class="product-name">ProductName</p>
				<p class="product-price">100$</p>
			</div>
			<div class="product-container">
				<img src="https://lh3.googleusercontent.com/a/AAcHTtesfsMyGystqOyV9PLVfB9wNQtxTTfan--M5PnZ9Y53vSQ=s288-c-no">
				<p class="product-name">ProductName</p>
				<p class="product-price">100$</p>
			</div>
		</div>
	</div>
</content>
</template>
<script>
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
	font-size: 14px;
	letter-spacing: 0;
	line-height: 22px;
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

.product-content {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
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