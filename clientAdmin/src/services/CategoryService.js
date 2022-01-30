import axios from 'axios';

const httpService = axios.create({
    baseURL: 'http://localhost:3000/'
})

export default class CategoryService {

	getCategories() {
        return httpService.get('Categories').then(res => res).then(d => d.data);
    }

	getCategory(id) {
        return httpService.get(`Categories/${id}`).then(res => res).then(d => d.data);
    }

	saveCategory(data) {
        return httpService.post('Categories',data).then(res => res).then(d => d.data);
    }

	updateCategory(data, id) {
        return httpService.patch(`Categories/${id}`,data).then(res => res).then(d => d.data);
    }

    deleteCategory(id) {
        return httpService.delete(`Categories/${id}`).then(res => res).then(d => d.data);
    }
    
}