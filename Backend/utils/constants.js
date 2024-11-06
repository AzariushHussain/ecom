const responseMessages = {
    success: {
        created: "{operation} created successfully.",
        deleted: "{operation} deleted successfully.",
        fetched: "{operation} fetched successfully.",
        operationSuccessful: "{operation} completed successfully.",
        login: "User {operation} logged in successfully.",
        register: "{operation} registered successfully.",
        updated: "{operation} updated successfully.",
    },
    error: {
        notFound: "{operation} not found.",
        invalidInput: "Invalid {operation} provided.",
        internalServerError: "An internal server error occurred. Please try again later.",
        limitReached: "Limit reached for {operation}.",
        timeout: "Timeout reached for {operation}.",
        alreadyExists: "{operation} already exists.",
    },
};


const constants = {
    bool:{
        TRUE: true,
        FALSE: false
    },
    operation:{
        status:{
            SUCCESS: 'success',
            FAILED: 'failed',
        }
    },
    user: {
        status: {
            ONLINE: 'online',
            OFFLINE: 'offline'
        },
        type: {
            STANDARD: 'standard',
            ADMIN: 'admin'
        }
    },
    order: {
        status: {
            PENDING: 'pending',
            ACCEPTED: 'accepted',
            DELIVERED: 'delivered',
            CANCELLED: 'cancelled'
        },
        paymentMethod: {
            CARD: 'card',
            COD: 'cod'
        }
    },
    transaction: {
        status: {
            PENDING: 'pending',
            COMPLETED: 'completed',
            CANCELLED: 'cancelled'
        }
    }
};

module.exports = {responseMessages, constants};
