import axios from "axios";

/* pegando a url pra api */

const api = axios.create({
    baseURL:"https://viacep.com.br/ws/"
});

/*deixa esse arquivo exportável */
export default api;