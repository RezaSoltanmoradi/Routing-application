import { useRef, useEffect } from "react";
import classes from "./NewCommentForm.module.css";
import useHttp from "../../hooks/use-https";
import { addComment } from "../../lip/api";
import LoadingSpinner from "../UI/LoadingSpinner";
const isNotEmpty = (value) => value.length >= 4;

const NewCommentForm = ({ onAddedComment, quoteId }) => {
    const commentTextRef = useRef();
    const { status, sendRequest, error } = useHttp(addComment);

    useEffect(() => {
        if (status === "completed" && !error) {
            onAddedComment();
            commentTextRef.current.value = " ";
        }
    }, [status, error, onAddedComment]);
    const submitFormHandler = (event) => {
        event.preventDefault();

        const enteredText = commentTextRef.current.value;
        const enteredValidText = isNotEmpty(enteredText);

        if (enteredValidText) {
            sendRequest({ commentData: { text: enteredText }, quoteId });
        }
    };

    return (
        <form className={classes.form} onSubmit={submitFormHandler}>
            {status === "pending" && (
                <div className="centered">
                    <LoadingSpinner />
                </div>
            )}
            <div className={classes.control} onSubmit={submitFormHandler}>
                <label htmlFor="comment">Your Comment</label>
                <textarea id="comment" rows="5" ref={commentTextRef}></textarea>
            </div>
            <div className={classes.actions}>
                <button className="btn">Add Comment</button>
            </div>
        </form>
    );
};

export default NewCommentForm;
