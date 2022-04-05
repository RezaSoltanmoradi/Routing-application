import React, { Fragment, useEffect } from "react";
import { useParams , Outlet } from "react-router-dom";
import HighlightedQuote from "./../components/quotes/HighlightedQuote";
import useHttp from "../hooks/use-https";
import { getSingleQuote } from "../lip/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const QuoteDetail = () => {
    const {
        status,
        data: loadedQoute,
        error,
        sendRequest,
    } = useHttp(getSingleQuote, true);
    const params = useParams();
    const { quoteId } = params;
    useEffect(() => {
        sendRequest(quoteId);
    }, [sendRequest, quoteId]);
    if (status === "pending") {
        return (
            <div className="centered">
                <LoadingSpinner />
            </div>
        );
    }
    if (error) {
        return <p className="centered focused">{error}</p>;
    }
    if (!loadedQoute) {
        return <p> no quote found ...</p>;
    }
    return (
        <Fragment>
            <HighlightedQuote
                text={loadedQoute.text}
                author={loadedQoute.author}
            />
            <Outlet/>
        </Fragment>
    );
};
export default QuoteDetail;
