import axios from "axios";

const instance = axios.create({
    baseURL: '' // the cloud function API
})

export default instance;