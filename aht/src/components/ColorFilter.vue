<template>
    <div class="filter" v-if="options.length > 0" >
        <h3>Color</h3>
        <ul>
            <li v-for="option in options" :key="option.value">
                <label>
                    <input
                    type="checkbox"
                    :value="option.value"
                    v-model="selectedColors"
                    @change="updateColorFilter"
                    />
                    {{ option.label }} ({{ count }})
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
        options: Array,
        count: String,
        
    },
    data() {
        return {
            selectedColors: [],
        };
    },
    methods: {
        updateColorFilter() {
            this.$emit('updateColorFilter', this.selectedColors);
        },
    },
    watch: {
        selectedColors: {
            handler() {
                this.updateColorFilter();
            },
            deep: true,
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