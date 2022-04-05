import { useEffect } from "react";
import QuoteForm from "../components/quotes/QuoteForm";
import useHttp from "../hooks/use-https";
import { addQuote } from "../lip/api";
const NewQuote = () => {
    const { sendRequest, status } = useHttp(addQuote);
    useEffect(() => {
        if (status === "completed") {
        }
    }, [status]);
    const addQuoteHandler = (quoteData) => {
        sendRequest(quoteData);
    };
    return (
        <QuoteForm
            onAddQuote={addQuoteHandler}
            isLoading={status === "pending"}
        />
    );
};
export default NewQuote;
