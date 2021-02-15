import { CREATE_PRODUCT } from "../constants/action-types";

export function productFormValidator({ dispatch }) {
    return function(next) {
        return function(action) {
            // do your stuff
            if (action.type === CREATE_PRODUCT) {

              //  action.payload.lastPurchasedDate < now;

                //
                if (false) {
                    return dispatch({ type: "LASTPURCHASEDDATE_VALIDATION_FAILED" });
                }
            }
            return next(action);
        };
    };
}