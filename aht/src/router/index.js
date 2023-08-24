import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import CategoryPage from "@/views/CategoryPage.vue";
import ProductPage from "@/views/ProductPage.vue";
import ApiTest from "@/views/ApiTest.vue";

const router = createRouter({
  mode: "hash",
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "HomePage",
      component: HomePage,
    },
    {
      path: "/category/:name",
      name: "CategoryPage",
      component: CategoryPage,
    },
    {
      path: "/product/:sku",
      name: "ProductPage",
      component: ProductPage,
    },
    {
      path: "/ApiTest",
      name: "ApiTest",
      component: ApiTest,
    },
  ],
});

export default router;