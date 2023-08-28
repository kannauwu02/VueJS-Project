<template>
    <div class="filter" v-if="options.length > 0">
        <h3>Price</h3>
        <ul>
            <li v-for="option in options" :key="option.value">
            <label>
                <input
                type="checkbox"
                :value="option.value"
                v-model="selectedPrice"
                @change="updateFilters"
                />
                {{ option.label }}$ ({{ count }})
            </label>
            </li>
        </ul>
    </div>
    <div v-else>
        Loading... <!-- or any other loading indicator you prefer -->
    </div>
</template>
  
<script>
  export default {
    props: {
      options: Array, // Aggregation options for color
      count: String,
    },
    data() {
      return {
        selectedPrice: [],
      };
    },
    methods: {
      updateFilters() {
        this.$emit('updatePriceFilter', this.selectedPrice);
      },
    },
  };
</script>
<style>
ul, ol, li {
  list-style-type: none;
  padding: 0;
}

.filter {
    text-align: left;
}
</style>