export const apiEndpoint = {
    auth: {
        login: '/auth/login',
        register: '/auth/register',
        refreshToken: '/auth/refresh-token',
    },
    product: {
        getAll: '/product',
        create: '/product/add-new-product',
        update: '/product',
        delete: '/product',
    },
    supplier: {
        getAll: '/supplier/get-suppliers',
        create: '/supplier/add-supplier',
        update: '/supplier/update-supplier/:id',
        delete: '/supplier/delete-supplier/:id',
    },
    category: {
        getAll: '/category/get-categories',
        getById: '/category/get-category/:id',
        create: '/category/add-category',
        update: '/category/update-category/:id',
        delete: '/category/delete-category/:id',
    },
};
