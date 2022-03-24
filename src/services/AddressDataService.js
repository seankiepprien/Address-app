import http from "../http-common";

class AddressDataService {
    getAll() {
        return http.get("/addresses");
    }
    get(id) {
        return http.get(`/addresses/${id}`);
    }
    create(data) {
        return http.post("/addresses", data);
    }
    update(id, data) {
        return http.put(`/addresses/${id}`, data);
    }
    delete(id) {
        return http.delete(`/addresses/${id}`);
    }
    deleteAll() {
        return http.delete(`/addresses`)
    }
    findByName(name) {
        return http.get(`/addresses?name=${name}`)
    }
}
export default new AddressDataService()