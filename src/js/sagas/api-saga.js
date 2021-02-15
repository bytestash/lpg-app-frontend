import { takeEvery, call, put } from "redux-saga/effects";

export default function* watcherSaga() {
    yield takeEvery("PRODUCTS_REQUESTED", workerSaga);
}

function* workerSaga() {
    try {
        const payload = yield call(fetchProducts);
        console.log(payload);
        yield put({ type: "PRODUCTS_LOADED", payload });
    } catch (e) {
        yield put({ type: "PRODUCTS_API_ERRORED", payload: e });
    }
}

function fetchProducts() {
    return fetch("http://localhost:8080/api/product").then(response =>
        response.json()
    );
}