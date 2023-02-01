import Home from "@/components/Home.vue";
import Pokemons from '@/components/Pokemons.vue';

export default [
  { path: '/', component: Home },
  { path: '/pokemons', component: Pokemons },
  { path: "*", redirect: "/" }
]
