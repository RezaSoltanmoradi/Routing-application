import react, { Suspense } from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Comments from "./components/comments/Comments";
import LoadingSpinner from "./components/UI/LoadingSpinner";
const NewQuote = react.lazy(() => import("./pages/NewQuote"));
const QuoteDetail = react.lazy(() => import("./pages/QuoteDetail"));
const NotFound = react.lazy(() => import("./pages/NotFound"));
const AllQuotes = react.lazy(() => import("./pages/AllQuotes"));
function App() {
    return (
        <Layout>
            <Suspense
                fallback={
                    <p className="centered">
                        <LoadingSpinner />
                    </p>
                }
            >
                <Routes>
                    <Route
                        path="/"
                        element={<Navigate replace to="/quotes" />}
                    />
                    <Route path="/quotes" element={<AllQuotes />} />
                    <Route path="/quotes/:quoteId/*" element={<QuoteDetail />}>
                        <Route
                            path=""
                            element={
                                <div className="centered">
                                    <Link className="btn--flat" to="comments">
                                        Load Comments
                                    </Link>
                                </div>
                            }
                        />
                        <Route path="comments" element={<Comments />} />
                    </Route>
                    <Route path="/new-quote" element={<NewQuote />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </Layout>
    );
}

export default App;
