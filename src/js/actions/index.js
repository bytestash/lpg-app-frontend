import { CREATE_PRODUCT } from "../constants/action-types";

export function createProduct(payload) {
    return { type: CREATE_PRODUCT, payload }
}