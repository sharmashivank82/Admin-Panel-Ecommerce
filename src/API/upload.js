import axios from "axios";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const token = localStorage.getItem('authToken');

class Upload {

    async uploadPhoto(fileInput) {
        try {
            var formdata = new FormData();
            formdata.append("file", fileInput);

            const config = {
                method: 'POST',
                url: `${SERVER_URL}/admin/uploads`,
                data: formdata,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            }

            const res = await axios(config);
            return res;

        } catch (error) {
            console.log(error);
            return error
        }
    }
}

// eslint-disable-next-line
export default new Upload();