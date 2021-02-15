import { CREATE_PRODUCT, PRODUCTS_REQUESTED } from "../constants/action-types";

const initialState = {
    productCollection: {
        _embedded: {
            products: []
        }
    }
};

function rootReducer(state = initialState, action) {
    if (action.type === CREATE_PRODUCT) {
        return Object.assign({}, state, {
            productCollection: state.productCollection.concat(action.payload)
        });
    }

    if (action.type === "PRODUCTS_LOADED") {
        return Object.assign({}, state, {
            productCollection: action.payload
        });
    }

    return state;
}

export default rootReducer;