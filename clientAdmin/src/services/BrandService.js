import axios from 'axios';

const httpService = axios.create({
    baseURL: 'http://localhost:3000/'
})

export default class BrandService {

	getBrands() {
        return httpService.get('brands').then(res => res).then(d => d.data);
    }

	getBrand(id) {
        return httpService.get(`brands/${id}`).then(res => res).then(d => d.data);
    }

	saveBrand(data) {
        return httpService.post('brands',data).then(res => res).then(d => d.data);
    }

	updateBrand(data, id) {
        return httpService.patch(`brands/${id}`,data).then(res => res).then(d => d.data);
    }

	deleteBrand(id) {
        return httpService.delete(`brands/${id}`).then(res => res).then(d => d.data);
    }
    
}