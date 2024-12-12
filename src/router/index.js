import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import CreateCardPage from "@/views/CreateCardPage.vue";
import EditCardPage from "@/views/EditCardPage.vue";
import LoginPage from "@/views/LoginPage.vue";
import RegisterPage from "@/views/RegisterPage.vue";
import BookDetails from "@/views/BookDetails.vue";

const routes = [
  { path: "/", name: "Home", component: HomePage },
  { path: "/create", name: "CreateCard", component: CreateCardPage },
  { path: "/edit/:id", name: "EditCard", component: EditCardPage },
  { path: "/book/:id", name: "BookDetails", component: BookDetails },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/register', name: 'Register', component: RegisterPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});



export default router;
