import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

export const getAll = () => {
  return axios.get(baseUrl).then(response => response.data)
}

export const createNew = (newPerson) => {
  return axios.post(baseUrl, newPerson).then(response => response.data)
}

export const removePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

export const updatePerson = (id, updatedPerson) => {
    return axios.put(`${baseUrl}/${id}`, updatedPerson).then(response => response.data)
  }
  