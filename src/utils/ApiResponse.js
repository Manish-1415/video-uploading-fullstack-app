class ApiResponse {
    // Here i set data = null because if no data we receive then by default it will set null
    constructor(statusCode , message , data = null)
    {
        // Here i will not implement super method because , use super() method only when u are inheriting property/methods from parent class
        this.statusCode = statusCode
        this.message = message
        this.data = data
    }
}

export {ApiResponse}