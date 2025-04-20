export const apiEndpoint = {
    auth: {
        login: '/auth/login',
        register: '/auth/register',
        refreshToken: '/auth/refresh-token',
    },
    product: {
        getAll: '/product',
        getProductDetail: '/product/get-product-detail/:id',
        create: '/product/add-new-product',
        update: '/product/update-product/:id',
        delete: '/product/delete-product/:id',
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
    recruitment: {
        getAll: '/recruitment/get-all-recruitment',
        getById: '/recruitment/get-recruitment/:id',
        create: '/recruitment/add-recruitment',
        update: '/recruitment/update-recruitment/:id',
        delete: '/recruitment/delete-recruitment/:id',
    },
};
