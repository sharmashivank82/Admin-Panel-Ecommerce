import axios from "axios";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const token = localStorage.getItem('authToken');

class Product {

    async getProductList(data){
        try {

            const { limit, page } = data;
            let parseUrl = `?`;
            parseUrl = limit ? `${parseUrl}limit=${limit}&` : parseUrl ;
            parseUrl = page ? `${parseUrl}page=${page}&` : parseUrl ;

            const config = {
                method: 'get',
                url: `${SERVER_URL}/admin/product-list${parseUrl}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }

            const res = await axios(config);
            return res;
            
        } catch (err) {
            return err.response;
        }
    }

    async deleteProduct(data){
        try{

            const config = {
                method: 'delete',
                url: `${SERVER_URL}/admin/product`,
                data,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }

            const res = await axios(config);
            return res;

        } catch (err) {
            return err.response;
        }
    }

    async createProduct(data){
        try{

            const config = {
                method: 'post',
                url: `${SERVER_URL}/admin/product`,
                data,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }

            const res = await axios(config);
            return res;

        } catch (err) {
            return err.response;
        }
    }

    async updateProduct(data){
        try{

            const config = {
                method: 'put',
                url: `${SERVER_URL}/admin/product`,
                data,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }

            const res = await axios(config);
            return res;

        } catch (err) {
            return err.response;
        }
    }

}

// eslint-disable-next-line
export default new Product();