import axios from 'axios'

const url = '/api/peps'

const getAll = () => {
  return axios.get(url).then(response => response.data)
}

const create = (phoneAdded) => {
  return axios.post(url, phoneAdded).then(response => response.data)
}

const update = (id, toUpdate) => {
  const request = axios.put(`${url}/${id}`, toUpdate)
  return request.then(response => response.data)
}

const del = (phoneDel) => { 
  return axios.delete(phoneDel).then(response => response.data)
}

export default { getAll, create, del, update }