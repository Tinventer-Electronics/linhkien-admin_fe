import axios from 'axios';
export const uploadFile = async (file) => {
    try {
        if (!file) {
            console.error('Không có file để upload');
            return null;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', import.meta.env.VITE_UPLOAD_PRESET);

        const api = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`;

        const res = await axios.post(api, formData);
        return res.data.secure_url;
    } catch (error) {
        console.error('Lỗi upload file:', error.message);
        console.error('Chi tiết lỗi:', error.response?.data || error);

        return null;
    }
};
