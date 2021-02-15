import { CREATE_PRODUCT, PRODUCTS_REQUESTED, DELETE_PRODUCT, CATEGORIES_REQUESTED } from "../constants/action-types";

export function createProduct(payload) {
    return { type: CREATE_PRODUCT, payload };
}

export function getProductsFromBackend(sortColumn, sortDirection, pageNumber, pageSize) {
    return { type: PRODUCTS_REQUESTED, sortColumn, sortDirection, pageNumber, pageSize };
}

export function deleteProduct(url) {
    return { type: DELETE_PRODUCT, url}
}

export function getCategoriesFromBackend() {
    return { type: CATEGORIES_REQUESTED };
}