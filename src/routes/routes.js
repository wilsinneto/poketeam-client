import PokemonTeamViewDetails from '@/components/PokemonTeamViewDetails.vue';
import PokemonViewDetails from '@/components/PokemonViewDetails.vue';
import Home from "@/views/Home.vue";
import Pokemons from '@/views/Pokemons.vue';
import PokemonTeam from '@/views/PokemonTeam.vue';

export default [
  { path: '/', component: Home },
  { path: '/pokemons', component: Pokemons },
  { path: '/pokemon-team', component: PokemonTeam },
  { path: '/pokemon-view-details', component: PokemonViewDetails },
  { path: '/pokemon-team-view-details', component: PokemonTeamViewDetails },
  { path: "*", redirect: "/" }
]
