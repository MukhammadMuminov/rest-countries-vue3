import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import ShowCountry from './view/ShowCountry.vue'
import ViewCountries from './view/ViewCountries.vue'

const queryClient = new QueryClient()
const pinia = createPinia()
const router = createRouter({
    history: createWebHistory('/'),
    routes: [
        {
                path: "/",
                name: 'ViewCountries',
                component: ViewCountries,
        },
        {
                path: '/ShowCountry/:name',
                name: 'ShowCountry',
                component: ShowCountry,
        },
    ]  
})

createApp(App)
    .use(VueQueryPlugin, { queryClient })
    .provide('queryClient', queryClient)
    .use(router)
    .use(pinia)
    .mount('#app')