import { api } from './api-helper';

export async function findAllPokemons () {
  return await api.request({
    method: 'GET',
    url: '/find-all-pokemons'
  })
  .catch(function (error) {
    if (error.response) {
      return {
        data: error.response.data,
        status: error.response.status
      }
    } else if (error.request) {
      return error.request
    } else {
      return error.message
    }
  })
}

export async function createPokemon (data) {
  return await api.request({
    method: 'POST',
    url: '/create-pokemon',
    data
  })
  .catch(function (error) {
    if (error.response) {
      return {
        data: error.response.data,
        status: error.response.status
      }
    } else if (error.request) {
      return error.request
    } else {
      return error.message
    }
  })
}

