/**
 * Loại bỏ các trường có giá trị null, undefined, chuỗi rỗng hoặc mảng rỗng
 * @param {Object} data - Đối tượng dữ liệu cần xử lý
 * @returns {Object} - Đối tượng đã được lọc
 */
export const filterEmptyValues = (data) => {
    return Object.entries(data).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            if (!(Array.isArray(value) && value.length === 0)) {
                acc[key] = value;
            }
        }
        return acc;
    }, {});
};

/**
 * Xử lý dữ liệu: xóa khoảng trắng đầu và chuyển đổi các trường cụ thể thành chữ hoa
 * @param {Object} data - Đối tượng dữ liệu cần xử lý
 * @param {Array} upperCaseFields - Danh sách các trường cần chuyển thành chữ hoa
 * @returns {Object} - Đối tượng đã được xử lý
 */
export const formatFormData = (data, upperCaseFields) => {
    return Object.entries(data).reduce((acc, [key, value]) => {
        // Xóa khoảng trắng đầu và cuối nếu là chuỗi
        if (typeof value === 'string') {
            acc[key] = value.trim();
        } else {
            acc[key] = value;
        }

        // Chuyển các trường chỉ định thành chữ viết hoa
        if (upperCaseFields.includes(key) && acc[key]) {
            acc[key] = acc[key].toUpperCase();
        }

        return acc;
    }, {});
};

/**
 * Xử lý dữ liệu form đầy đủ: lọc giá trị trống, chuẩn hóa dữ liệu
 * @param {Object} data - Đối tượng dữ liệu cần xử lý
 * @param {Array} upperCaseFields - Danh sách các trường cần chuyển thành chữ hoa
 * @returns {Object} - Đối tượng đã được xử lý hoàn chỉnh
 */
export const processFormData = (data, upperCaseFields) => {
    const filteredData = filterEmptyValues(data);
    return formatFormData(filteredData, upperCaseFields);
};
