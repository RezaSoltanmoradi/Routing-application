import { useRef, useState, Fragment } from "react";
import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./QuoteForm.module.css";

const isNotEmpty = (value) => value.length >= 4;

const QuoteForm = ({ onAddQuote, isLoading }) => {
    const [isEntering, setIsEntering] = useState(false);

    const authorInputRef = useRef();
    const textInputRef = useRef();

    function submitFormHandler(event) {
        event.preventDefault();

        const enteredAuthor = authorInputRef.current.value;
        const enteredValidAuthor = isNotEmpty(enteredAuthor);
        const enteredText = textInputRef.current.value;
        const enteredValidText = isNotEmpty(enteredText);
        // optional: Could validate here
        const validationForm = enteredValidAuthor && enteredValidText;
        if (validationForm) {
            new Promise((resolve) => {
                resolve();
                onAddQuote({ author: enteredAuthor, text: enteredText }); // props
            }).then(() => {
                authorInputRef.current.value = "";
                textInputRef.current.value = "";
            });
        }
    }
    const finishEnteringHandler = () => {
        setIsEntering(false);
    };
    const formFocusedHandler = () => {
        setIsEntering(true);
    };
    return (
        <Fragment>
            <Card>
                <form
                    className={classes.form}
                    onSubmit={submitFormHandler}
                    onFocus={formFocusedHandler}
                >
                    {isLoading && (
                        <div className={classes.loading}>
                            <LoadingSpinner />
                        </div>
                    )}

                    <div className={classes.control}>
                        <label htmlFor="author">Author</label>
                        <input type="text" id="author" ref={authorInputRef} />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor="text">Text</label>
                        <textarea
                            id="text"
                            rows="5"
                            ref={textInputRef}
                        ></textarea>
                    </div>
                    <div className={classes.actions}>
                        <button className="btn" onClick={finishEnteringHandler}>
                            Add Quote
                        </button>
                    </div>
                </form>
            </Card>
        </Fragment>
    );
};

export default QuoteForm;
