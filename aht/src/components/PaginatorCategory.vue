<template>
    <div class="paginator">
        <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
        <span>{{ currentPage }} / {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
</template>
  
<script>
    export default {
        name: "PaginatorCategory",
        props: {
            currentPage: Number,
            totalPages: Number,
        },
        methods: {
            prevPage() {
                this.$emit("page-change", this.currentPage - 1);
            },
            nextPage() {
                this.$emit("page-change", this.currentPage + 1);
            },
        },
    };
</script>
  