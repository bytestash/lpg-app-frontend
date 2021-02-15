import { CREATE_PRODUCT } from "../constants/action-types";

export function productFormValidator({ dispatch }) {
    return function(next) {
        return function(action) {
            // do your stuff
            if (action.type === CREATE_PRODUCT) {


            }
            return next(action);
        };
    };
}