import axios from "axios";

axios.defaults.baseURL = 'https://pixabay.com/api';

const apiKey = '38524305-622add03b446e56a9366d3fee'


export const getImages = async(query, page = 1) => {
        const response = await axios.get('/', {
            params: {
                key: apiKey,
                q: query,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                per_page: 12,
                page: page
            }
        })
        return response.data
}