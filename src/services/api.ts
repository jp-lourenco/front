import axios from 'axios';

export default axios.create({
  baseURL: 'https://bioma.estig.ipb.pt/api/v1/',
});
