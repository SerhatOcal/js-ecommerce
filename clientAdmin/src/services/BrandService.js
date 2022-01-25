import axios from 'axios';

export default class BrandService {

	getBrands() {
        return axios.get('http://localhost:3000/brands').then(res => res).then(d => d.data);
    }

	getBrand(id) {
        return axios.get('http://localhost:3000/brands',id).then(res => res).then(d => d.data);
    }

	saveBrands(data) {
        return axios.post('http://localhost:3000/brands',data).then(res => res).then(d => d.data);
    }

	deleteBrands(id) {
        return axios.delete(`http://localhost:3000/brands/${id}`).then(res => res).then(d => d.data);
    }

    
}