import { takeEvery, call, put } from "redux-saga/effects";

export default function* watcherSaga() {
    yield takeEvery("PRODUCTS_REQUESTED", workerSaga);
}

function* workerSaga(params) {
    try {
        const payload = yield call(fetchProducts, params.sortColumn, params.sortDirection, params.pageNumber, params.pageSize);
        const {sortColumn, sortDirection} = params;

        yield put({ type: "PRODUCTS_LOADED", payload, sortColumn, sortDirection });
    } catch (e) {
        yield put({ type: "PRODUCTS_API_ERRORED", payload: e });
    }
}

function fetchProducts(attribute, direction, pageNumber, pageSize) {
    return fetch("http://localhost:8080/api/product?size="+pageSize+"&sort="+attribute+","+direction+"&page="+pageNumber).then(response =>
        response.json()
    );
}