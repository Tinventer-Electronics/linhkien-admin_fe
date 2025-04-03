import React, { useEffect, useState } from 'react';
import { message, Space, Tag } from 'antd';
import { apiEndpoint } from '../../constants/apiEndpoint';
import handleAPI from '../../api/handleAPI';

const CategoryComponent = (props) => {
    const [category, setCategory] = useState();

    useEffect(() => {
        getCategory();
    }, []);

    const getCategory = async () => {
        const { id } = props;

        try {
            const res = await handleAPI(apiEndpoint.category.getById.replace(':id', id), 'get');
            res.data && setCategory(res.data);
        } catch (error) {
            message.error(error.message);
            console.log(error);
        }
    };

    return (
        <Space>
            <Tag>{category?.categoryName}</Tag>
        </Space>
    );
};

export default CategoryComponent;
