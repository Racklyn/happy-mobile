import axios from 'axios'

const api = axios.create({
    baseURL: 'http://192.168.0.107:3333' //passando endereço da máquina, já que estamos executando no celular
})

export default api;