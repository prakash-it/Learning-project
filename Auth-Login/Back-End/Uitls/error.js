 const errorHandler = (statusCode, message) =>{
    const error = new Error()
    error.staatusCode = statusCode
    error.message = message
    return error
}

module.exports = errorHandler