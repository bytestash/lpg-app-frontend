import {act} from "@testing-library/react";

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
    categoryCollection: {
        _embedded: {
            categories: []
        }
    },
    sortColumn: "id",
    sortDirection: "asc",
    productCreatedSuccessFully: false
};

function rootReducer(state = initialState, action) {
    if (action.type === "PRODUCTS_LOADED") {
        return Object.assign({}, state, {
            productCollection: action.payload,
            sortColumn: action.sortColumn,
            sortDirection: action.sortDirection
        });
    }

    if (action.type === "CATEGORIES_LOADED") {
        return Object.assign({}, state, {
            categoryCollection: action.payload
        });
    }

    if (action.type === "PRODUCT_DELETED_SUCCESSFULLY") {
        // Todo: Display a nice message
    }

    if (action.type === "PRODUCT_CREATED_SUCCESSFULLY") {
        return Object.assign({}, state, {
            productCreatedSuccessFully: true
        });
    }

    return state;
}

export default rootReducer;