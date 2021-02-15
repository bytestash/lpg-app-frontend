import { CREATE_PRODUCT } from "../constants/action-types";

const initialState = {
    productCollection: {
        _embedded: {
            products: []
        },
        page : {
            size : 5,
            totalElements : 0,
            totalPages : 0,
            number : 1,
        }
    },
    sortColumn: "id",
    sortDirection: "asc"
};

function rootReducer(state = initialState, action) {
    if (action.type === CREATE_PRODUCT) {
        return Object.assign({}, state, {
            productCollection: state.productCollection.concat(action.payload)
        });
    }

    if (action.type === "PRODUCTS_LOADED") {
        return Object.assign({}, state, {
            productCollection: action.payload,
            sortColumn: action.sortColumn,
            sortDirection: action.sortDirection
        });
    }

    if (action.type === "PRODUCT_DELETED_SUCCESSFULLY") {
        // Todo: Display a nice message
    }

    return state;
}

export default rootReducer;