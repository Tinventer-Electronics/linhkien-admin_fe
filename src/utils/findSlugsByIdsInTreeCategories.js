// export const findSlugsByIdsInTreeCategories = (tree, selectedValues, slugs = []) => {
//     for (const node of tree) {
//         if (selectedValues.includes(node.value)) {
//             slugs.push(node.label);
//         }

//         if (node.children && node.children.length > 0) {
//             findSlugsByIdsInTreeCategories(node.children, selectedValues, slugs);
//         }
//     }

//     return slugs;
// };

export const findSlugsByIdsInTreeCategories = (tree, selectedValues, slugs = []) => {
    const allLabels = getAllLabelsFromTree(tree);

    for (const val of selectedValues) {
        if (allLabels.includes(val)) {
            // Nếu val đã là label, giữ nguyên
            slugs.push(val);
        } else {
            // Nếu là value, tìm label tương ứng
            const label = findLabelByValueInTree(tree, val);
            if (label) slugs.push(label);
        }
    }

    return slugs;
};

// Hàm phụ trợ: tìm label tương ứng với value
const findLabelByValueInTree = (tree, value) => {
    for (const node of tree) {
        if (node.value === value) return node.label;
        if (node.children) {
            const found = findLabelByValueInTree(node.children, value);
            if (found) return found;
        }
    }
    return null;
};

// Hàm phụ trợ: lấy tất cả label trong tree
const getAllLabelsFromTree = (tree, labels = []) => {
    for (const node of tree) {
        labels.push(node.label);
        if (node.children) {
            getAllLabelsFromTree(node.children, labels);
        }
    }
    return labels;
};
