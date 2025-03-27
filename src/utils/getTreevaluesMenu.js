export const getTreevaluesMenu = (datas, isGetAllInfo) => {
    const values = [];

    const items = datas.filter((element) => !element.parentId);
    const newItems = items.map((element) =>
        isGetAllInfo
            ? { ...element, key: element._id }
            : { label: element.categoryName, value: element._id }
    );
    newItems.forEach((element) => {
        values.push({
            ...element,
            children: changeMenu(datas, isGetAllInfo ? element._id : element.value, isGetAllInfo),
        });
    });
    return values;
};

const changeMenu = (datas, id, isGetAllInfo) => {
    const items = [];
    const childrens = datas.filter((element) => element.parentId === id);
    childrens.forEach((element) => {
        items.push(
            isGetAllInfo
                ? {
                      ...element,
                      key: element._id,
                      children: changeMenu(datas, element._id, isGetAllInfo),
                  }
                : {
                      label: element.categoryName,
                      value: element._id,
                      children: changeMenu(datas, element._id, isGetAllInfo),
                  }
        );
    });

    return items;
};
