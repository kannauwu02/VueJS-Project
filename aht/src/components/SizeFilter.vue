<template>
    <div class="filter" v-if="options.length > 0">
        <h3>Size</h3>
        <ul>
            <li v-for="option in options" :key="option.value">
            <label>
                <input
                type="checkbox"
                :value="option.value"
                v-model="selectedSize"
                @change="updateFilters"
                />
                {{ option.label }}
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
    },
    data() {
      return {
        selectedSize: [],
      };
    },
    methods: {
      updateFilters() {
        this.$emit('updateSizeFilter', this.selectedSize);
      },
    },
  };
</script>
<style scoped>
ul, ol, li {
  list-style-type: none;
  padding: 0;
}

.filter {
    text-align: left;
}
</style>