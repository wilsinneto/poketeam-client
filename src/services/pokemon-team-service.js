import { api } from './api-helper';

export async function findPokemonTeam(name) {
  return await api.request({
    method: 'GET',
    url: `/find-pokemon-team/${name}`
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
  });
}

export async function findAllPokemonTeam() {
  return await api.request({
    method: 'GET',
    url: '/find-all-pokemon-team'
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
  });
}

export async function removePokemonTeam(id) {
  return await api.request({
    method: 'DELETE',
    url: '/remove-pokemon-team/' + id,
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
  });
}

export async function createPokemonTeam(data) {
  return await api.request({
    method: 'POST',
    url: '/create-pokemon-team',
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
  });

}