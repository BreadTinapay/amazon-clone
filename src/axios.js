import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:5001/clone-c221c/us-central1/api' // the cloud function API
})

export default instance;