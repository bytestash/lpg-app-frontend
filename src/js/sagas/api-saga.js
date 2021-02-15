import { takeEvery, call, put } from "redux-saga/effects";
import {CREATE_PRODUCT} from "../constants/action-types";

export default function* watcherSaga() {
    yield takeEvery("PRODUCTS_REQUESTED", productRequestedWorker);
    yield takeEvery("DELETE_PRODUCT", deleteProductWorker);
    yield takeEvery("CATEGORIES_REQUESTED", categoriesRequestedWorker);
    yield takeEvery("CREATE_PRODUCT", createProductWorker);
}

function* productRequestedWorker(params) {
    try {
        const payload = yield call(fetchProducts, params.sortColumn, params.sortDirection, params.pageNumber, params.pageSize);
        const {sortColumn, sortDirection} = params;

        yield put({ type: "PRODUCTS_LOADED", payload, sortColumn, sortDirection });
    } catch (e) {
        yield put({ type: "PRODUCTS_API_ERRORED", payload: e });
    }
}

function* deleteProductWorker(params) {
    try {
        yield call(deleteProduct, params.url);
        yield put({ type: "PRODUCT_DELETED_SUCCESSFULLY"});
    } catch (e) {
        yield put({ type: "PRODUCT_DELETION_ERROR", payload: e });
    }
}

function* createProductWorker(params) {
    try {
        const payload = yield call(createProduct, params.payload);

        yield put({ type: "PRODUCT_CREATED_SUCCESSFULLY", payload });
    } catch (e) {
        yield put({ type: "PRODUCT_CREATION_ERROR", payload: e });
    }
}

function* categoriesRequestedWorker() {
    try {
        const payload = yield call(fetchCategories);

        yield put({ type: "CATEGORIES_LOADED", payload});
    } catch (e) {
        yield put({ type: "PRODUCTS_API_ERRORED", payload: e });
    }
}

function fetchProducts(attribute, direction, pageNumber, pageSize) {
    return fetch(`http://localhost:8080/api/product?size=${pageSize}&sort=${attribute},${direction}&page=${pageNumber}`).then(response =>
        response.json()
    );
}

function fetchCategories() {
    return fetch(`http://localhost:8080/api/category`).then(response =>
        response.json()
    );
}

function deleteProduct(url) {
    const request = new Request(url, {
        method: 'DELETE'
    });
    return fetch(request).then(response =>
        response.json()
    );
}

function createProduct(body) {
    const request = new Request("http://localhost:8080/api/product", {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return fetch(request).then(response =>
        response.json()
    );
}