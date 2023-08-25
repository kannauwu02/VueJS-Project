<template>
    <div class="filter" v-if="options.length > 0" v-cloak>
        <h3>Color</h3>
        <ul>
            <li v-for="option in options" :key="option.value">
                <label>
                    <input
                    type="checkbox"
                    :value="option.value"
                    v-model="selectedColors"
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
            selectedColors: [],
        };
    },
    methods: {
        updateFilters() {
            this.$emit('updateColorFilter', this.selectedColors);
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