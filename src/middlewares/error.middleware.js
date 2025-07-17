import { ApiError } from "../utils/ApiError";

const errorMiddleWare = (err , req , res , next) => {
    const statusCode = err.statusCode || 500 ;
    const message = err.message;

    res.status(statusCode).json({
        success : false,
        message,
        statusCode
    })
}

export {errorMiddleWare}