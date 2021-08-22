export const login = () => {
    return {
        type: 'LOGGED_IN',
    }
}

export const logout = () => {
    return {
        type: 'LOGGED_OUT',
    }
}

export const updateName = (payload) => {
    return {
        type: 'UPDATE_NAME',
        data: payload
    }
}

export const showForm = (payload) => {
    return {
        type: 'SHOW_FORM',
        data: payload
    }
}
