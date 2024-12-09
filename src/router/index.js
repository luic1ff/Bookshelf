import { createRouter, createWebHistory } from "vue-router";
import { useLoadingStore } from '@/stores/loadingStore';
import HomePage from "@/views/HomePage.vue";
import CreateCardPage from "@/views/CreateCardPage.vue";
import EditCardPage from "@/views/EditCardPage.vue";
import LoginPage from "@/views/LoginPage.vue";
import RegisterPage from "@/views/RegisterPage.vue";

const routes = [
  { path: "/", name: "Home", component: HomePage },
  { path: "/create", name: "CreateCard", component: CreateCardPage },
  { path: "/edit/:id", name: "EditCard", component: EditCardPage },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/register', name: 'Register', component: RegisterPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const loadingStore = useLoadingStore();
  loadingStore.startLoading();
  next();
});

router.afterEach(() => {
  const loadingStore = useLoadingStore();
  setTimeout(() => {
    loadingStore.stopLoading();
  }, 1000);
});

export default router;
