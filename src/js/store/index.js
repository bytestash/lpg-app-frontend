import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/index";
import { productFormValidator } from "../middleware";
import createSagaMiddleware from "redux-saga";
import apiSaga from "../sagas/api-saga";

const initialiseSagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(productFormValidator, initialiseSagaMiddleware)
    )
);

initialiseSagaMiddleware.run(apiSaga);

export default store;