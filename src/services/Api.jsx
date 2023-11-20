//import axios
import axios from 'axios';

const Api = axios.create({
  //set endpoint API
  baseURL: 'https://bale-api.anekaproject.com',

  //set header axios
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default Api;
