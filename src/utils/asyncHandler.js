const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}

export {asyncHandler}

// What teacher said it will only helpful , like we dont have to put em in async/await try/catch that is the benefit of this , i dont understand what actually he means ?