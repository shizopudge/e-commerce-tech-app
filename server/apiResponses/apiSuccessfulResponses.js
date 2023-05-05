class ApiSuccessfullResponses {
    successfullResponse(message, data) {
        return {
            status: 200,
            message: message,
            data: data,
        }
    }
}

module.exports = new ApiSuccessfullResponses();