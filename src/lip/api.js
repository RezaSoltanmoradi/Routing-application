const FIREBASE_DOMAIN = "https://quotes-e1fe9-default-rtdb.firebaseio.com";
export async function getAllQuotes() {
    const response = await fetch(`${FIREBASE_DOMAIN}/quotes.json`);
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Could not fetch quotes");
    }
    const transformedQuotes = [];

    for (const key in data) {
        const quoteObj = {
            id: key,
            ...data[key],
            // id: key,
            // text: data[key].text,
            // author: data[key].author,
        };
        transformedQuotes.push(quoteObj);
    }
    return transformedQuotes;
}
export async function getSingleQuote(quoteId) {
    const response = await fetch(`${FIREBASE_DOMAIN}/quotes/${quoteId}.json`);
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "coulden't fetch quote .");
    }
    const loadedQoute = {
        id: quoteId,
        ...data,
    };
    return loadedQoute;
}

export async function addQuote(quoteData) {
    const response = await fetch(`${FIREBASE_DOMAIN}/quotes.json`, {
        headers: {
            "Content-Type": "aplication/json",
        },
        body: JSON.stringify(quoteData),
        method: "POST",
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "coulden't send quote.");
    }
    return null;
}
export async function addComment(requestData) {
    const response = await fetch(
        `${FIREBASE_DOMAIN}/comments/${requestData.quoteId}.json`,
        {
            method: "POST",
            body: JSON.stringify(requestData.commentData),
            headers: {
                "Content-Type": "aplication/json",
            },
        }
    );
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "coulden't send quote.");
    }
    return { commentId: data.name };
}
export async function getAllComments(quoteId) {
    const response = await fetch(`${FIREBASE_DOMAIN}/comments/${quoteId}.json`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "coulden't fetch quote .");
    }
    const transfomedComments = [];

    for (const key in data) {
        const commentsObj = {
            id: key,
            ...data[key],
        };
        transfomedComments.push(commentsObj);
    }
    return transfomedComments;
}
