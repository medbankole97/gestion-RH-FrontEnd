import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/store/authStore"; // Corriger le chemin si nécessaire

// Importer les composants
import Login from '@/components/Login.vue';
// import Navbar from '@/components/Navbar.vue';
import UserList from '@/components/user/UserList.vue';
import UserAdd from '@/components/user/UserAdd.vue';
import UserEdit from '@/components/user/UserEdit.vue';
import UserDetail from '@/components/user/UserDetail.vue'

import TypeleaveList from '@/components/typeLeave/TypeleaveList.vue';
import TypeleaveAdd from '@/components/typeLeave/TypeleaveAdd.vue';
import TypeleaveEdit from '@/components/typeLeave/TypeleaveEdit.vue';
import TypeleaveDetall from '@/components/typeLeave/TypeleaveDetall.vue';

import RequestleaveList from '@/components/requestleave/RequestleaveList.vue';
import RequestleaveAdd from '@/components/requestleave/RequestleaveAdd.vue';
import RequestleaveEdit from '@/components/requestleave/RequestleaveEdit.vue';
import RequestleaveDetail from '@/components/requestleave/RequestleaveDetail.vue';

import TimetrackingList from '@/components/timetracking/TimetrackingList.vue';
import TimetrackingAdd from '@/components/timetracking/TimetrackingAdd.vue';
import TimetrackingEdit from '@/components/timetracking/TimetrackingEdit.vue';
import TimetrackingDetail from '@/components/timetracking/TimetrackingDetail.vue';

const routes = [
    {
        path: "/",
        name: 'login',
        component: Login,
    },
    // Section utilisateur
    {
        path: "/user",
        name: 'list-user',
        component: UserList,
        meta: { requiresAuth: true },
    },
    {
        path: "/user/new",
        name: 'ajout-user',
        component: UserAdd,
        meta: { requiresAuth: true },
    },
    {
        path: "/user/edit/:id",
        name: 'modifier-user',
        component: UserEdit,
        meta: { requiresAuth: true },
    },
    {
        path: "/show/:id",
        name: 'detail-user',
        component: UserDetail,
        meta: { requiresAuth: true },
    },
    // Section type de congé
    {
        path: "/type-leave",
        name: 'list-type-leave',
        component: TypeleaveList,
        meta: { requiresAuth: true },
    },
    {
        path: "/type-leave/new",
        name: 'ajout-type-leave',
        component: TypeleaveAdd,
        meta: { requiresAuth: true },
    },
    {
        path: "/type-leave/edit/:id",
        name: 'modifier-type-leave',
        component: TypeleaveEdit,
        meta: { requiresAuth: true },
    },
    {
        path: "/show/:id",
        name: 'detail-typeleave',
        component: TypeleaveDetall,
        meta: { requiresAuth: true },
    },
    // Section demande de congé
    {
        path: "/request-leave",
        name: 'list-request-leave',
        component: RequestleaveList,
        meta: { requiresAuth: true },
    },
    {
        path: "/request-leave/new",
        name: 'ajout-request-leave',
        component: RequestleaveAdd,
        meta: { requiresAuth: true },
    },
    {
        path: "/request-leave/edit/:id",
        name: 'modifier-request-leave',
        component: RequestleaveEdit,
        meta: { requiresAuth: true },
    },
    {
        path: "/show/:id",
        name: 'detail-requestleave',
        component: RequestleaveDetail,
        meta: { requiresAuth: true },
    },
    // Section suivi de temps
    {
        path: "/timetracking",
        name: 'list-timetracking',
        component: TimetrackingList,
        meta: { requiresAuth: true },
    },
    {
        path: "/timetracking/new",
        name: 'ajout-timetracking',
        component: TimetrackingAdd,
        meta: { requiresAuth: true },
    },
    {
        path: "/timetracking/edit/:id",
        name: 'modifier-timetracking',
        component: TimetrackingEdit,
        meta: { requiresAuth: true },
    },
    {
        path: "/show/:id",
        name: 'detail-timetracking',
        component: TimetrackingDetail,
        meta: { requiresAuth: true },
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

// Vérification de l'authentification avant chaque route
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        next("/"); // Rediriger vers la page de login si non authentifié
    } else {
        next();
    }
});

export default router;
