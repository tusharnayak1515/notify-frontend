let isUser;
if (localStorage.getItem("token") === null) {
    isUser = null;
}
else {
    isUser = localStorage.getItem("token");
}

let isError;
if (localStorage.getItem("error") === null) {
    isError = null;
}
else {
    isError = localStorage.getItem("error");
}

let isProfile;
if (localStorage.getItem("profile") === null) {
    isProfile = [];
}
else {
    isProfile = JSON.parse(localStorage.getItem("profile"));
}

const initUser = {
    profile: isProfile,
    user: isUser,
    error: isError
};

const userReducer = (state = initUser, action) => {

    if (action.type === 'register') {
        const { user, error } = action.payload;
        if (error) {
            return {
                ...state,
                error: error
            }
        }
        return {
            ...state,
            user: user,
            error: null
        }
    }

    else if (action.type === 'login') {
        const { token, error } = action.payload;
        if (error) {
            return {
                ...state,
                error: error
            }
        }
        return {
            ...state,
            user: token,
            error: null
        }
    }

    else if (action.type === 'profile') {
        const { user, error } = action.payload;
        if (error) {
            return {
                ...state,
                error: error
            }
        }
        return {
            ...state,
            profile: user,
            error: null
        }
    }

    else if (action.type === 'deleteuser') {
        const { error } = action.payload;
        if (error) {
            return {
                ...state,
                error: error
            }
        }
        return {
            ...state,
            user: null,
            profile: [],
            error: null
        }
    }

    else if (action.type === 'logout') {
        localStorage.removeItem("token");
        localStorage.removeItem("profile");
        localStorage.removeItem("todolist");
        return {
            ...state,
            profile: [],
            user: null,
            error: null
        };
    }

    else if (action.type === 'cancelerror') {
        return {
            ...state,
            error: null
        };
    }

    else {
        return state;
    }
}

export default userReducer;