import Home from "@/components/Home.vue";
import Pokemons from '@/components/Pokemons.vue';
import PokemonTeam from '@/components/PokemonTeam.vue';

export default [
  { path: '/', component: Home },
  { path: '/pokemons', component: Pokemons },
  { path: '/pokemon-team', component: PokemonTeam },
  { path: "*", redirect: "/" }
]
