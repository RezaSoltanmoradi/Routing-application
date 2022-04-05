import { useEffect } from "react";
import QuoteList from "./../components/quotes/QuoteList";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import useHttp from "../hooks/use-https";
import { getAllQuotes } from "../lip/api";

const AllQuotes = () => {
    const {
        sendRequest,
        status,
        data: loadedQoutes,
        error,
    } = useHttp(getAllQuotes, true);
    useEffect(() => {
        sendRequest();
    }, [sendRequest]);
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
    if (
        status === "compleded" &&
        (!loadedQoutes || loadedQoutes.length === 0)
    ) {
        <NoQuotesFound />;
    }
    return <QuoteList quotes={loadedQoutes} />;
};
export default AllQuotes;
