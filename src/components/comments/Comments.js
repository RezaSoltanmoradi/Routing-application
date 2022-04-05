import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import useHttp from "../../hooks/use-https";
import { getAllComments } from "../../lip/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import CommentsList from "../comments/CommentsList";
const Comments = () => {
    const [isAddingComment, setIsAddingComment] = useState(false);

    const params = useParams();
    const { quoteId } = params;
    const {
        status,
        data: loadedComments,
        sendRequest,
    } = useHttp(getAllComments, true);

    useEffect(() => {
        sendRequest(quoteId);
    }, [sendRequest, quoteId]);

    const startAddCommentHandler = () => {
        setIsAddingComment((value) => !value);
    };

    const addedCommentHandler = useCallback(() => {
        sendRequest(quoteId);
    }, [sendRequest, quoteId]);
    let comment;
    if (status === "pendign") {
        comment = (
            <div className="centered">
                <LoadingSpinner />
            </div>
        );
    }
    if (status === "completed" && loadedComments && loadedComments.length > 0) {
        comment = <CommentsList comments={loadedComments} />;
    }
    if (
        status === "completed" &&
        (!loadedComments || loadedComments.length === 0)
    ) {
        comment = <p> no comments were added yet</p>;
    }
    return (
        <section className={classes.comments}>
            <h2>User Comments</h2>
            {comment}
            {isAddingComment && (
                <NewCommentForm
                    quoteId={quoteId}
                    onAddedComment={addedCommentHandler}
                />
            )}
            {!isAddingComment && (
                <button className="btn" onClick={startAddCommentHandler}>
                    Add a Comment
                </button>
            )}
        </section>
    );
};

export default Comments;
