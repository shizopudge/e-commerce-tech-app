class ApiExceptionResponses {
    badRequest(message) {
        return {
            status: 400,
            message: message,
        }
    }

    notFound(message) {
        return {
            status: 404,
            message: message ? message : 'Not found',
        }
    }

    noPemission() {
        return {
            status: 403,
            message: 'You do not have permission',
        }
    }

    unauthorized() {
        return {
            status: 401,
            message: 'You are not authorized',
        }
    }

    internalServerError(message) {
        return {
            status: 500,
            message: message ? message : 'Something went wrong on our server',
        }
    }
}

module.exports = new ApiExceptionResponses();