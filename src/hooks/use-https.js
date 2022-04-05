import { useReducer, useCallback } from "react";

function httpReducer(state, action) {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case "SEND":
            return {
                data: null,
                error: null,
                status: "pending",
            };

        case "SUCCESS":
            return {
                data: action.responseData,
                error: null,
                status: "completed",
            };
        case "ERROR":
            return {
                data: null,
                error: action.errorMessage,
                status: "completed",
            };
    }
    return state;
}
// here we'll recive two props => 1- function() 2- bollean= false || true;
// for example:
// const {sendRequest , status, data, error} = useHttp(addQuote , false)
const useHttp = (requestFunction, startWithPending = false) => {
    const [httpState, dispatch] = useReducer(httpReducer, {
        status: startWithPending ? "pending" : null,
        error: null,
        data: null,
    });
    // here we recive data from sendRequest
    const sendRequest = useCallback(
        async function (requestData) {
            dispatch({ type: "SEND" });
            try {
                //just here we send data to requestfunction such as addQuote({data}) or getAllQuotes() without data
                const responseData = await requestFunction(requestData);
                dispatch({ type: "SUCCESS", responseData });
            } catch (error) {
                dispatch({
                    type: "ERROR",
                    errorMessage:
                        error.message ||
                        "یه چیزی اشتباهه شاید اینترنت قطع شده شاید تاریخ انقضا api تموم شده و شاید محدودیت اینترنت وجود داره!",
                });
            }
        },
        [requestFunction]
    );
    return {
        sendRequest,
        ...httpState,
    };
};
export default useHttp;
