const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN': {
            return {
                uid: action.uid
            }
        }
        case 'LOGOUT': {
            return {
                auth: {}
            }
        }

        default: return state
    }
}

export default authReducer