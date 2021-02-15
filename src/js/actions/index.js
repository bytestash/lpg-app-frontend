import { CREATE_PRODUCT, PRODUCTS_REQUESTED } from "../constants/action-types";

export function createProduct(payload) {
    return { type: CREATE_PRODUCT, payload };
}

export function getProductsFromBackend() {
    return { type: PRODUCTS_REQUESTED };
}