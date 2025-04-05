import { replaceName } from './replaceName';

export const findSlugsByIdsInTreeCategories = (tree, selectedValues, slugs = []) => {
    for (const node of tree) {
        if (selectedValues.includes(node.value)) {
            slugs.push(replaceName(node.label));
        }

        if (node.children && node.children.length > 0) {
            findSlugsByIdsInTreeCategories(node.children, selectedValues, slugs);
        }
    }

    return slugs;
};
