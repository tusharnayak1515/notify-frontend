import axios from "axios";

let isUser;
if (localStorage.getItem("token") === null) {
    isUser = null;
}
else {
    isUser = localStorage.getItem("token");
}
const initUser = {
    user: isUser
};

const userReducer = async (state = initUser, action) => {

    if (action.type === 'register') {
        const { name, username, email, password } = action.payload;
        try {
            const res = await axios.post("http://localhost:5000/api/auth/register", {
                name: name,
                username: username,
                email: email,
                password: password
            });

            if(res.data.error) {
                return res.data.error;
            }

            if (res.data.success) {
                localStorage.setItem("token", res.data.authToken);
                return {
                    ...state,
                    user: res.data.authToken
                }
            }
        }
        catch (error) {
            localStorage.setItem("error", error);
        }
    }

    if (action.type === 'login') {
        const { email, password } = action.payload;
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", {
                email: email,
                password: password
            });
            if (res.data.error) {
                return res.data.error;
            }

            if (res.data.success) {
                localStorage.setItem("token", res.data.authToken);
                return {
                    ...state,
                    user: res.data.authToken
                }
            }
        }
        catch (error) {
            localStorage.setItem("error", error);
        }
    }

    if (action.type === 'profile') {
        try {
            const token = window.localStorage.getItem("token");
            if (token) {
                const res = await axios.get("http://localhost:5000/api/auth/profile", {
                    headers: { "auth-token": token }
                });
                if (res.data.error) {
                    return res.data.error;
                }

                if (res.data.success) {
                    return res.data.user;
                }
            }

        }
        catch (error) {
            localStorage.setItem("error", error);
        }
    }

    if (action.type === 'deleteuser') {
        const { id } = action.payload;
        try {
            const token = window.localStorage.getItem("token");
            if (token) {
                const res = await axios.get(`http://localhost:5000/api/auth/deleteuser/${id}`, {
                    headers: { "auth-token": token },
                });

                if (res.data.error) {
                    return res.data.error;
                }

                if (res.data.success) {
                    return res.data.user;
                }
            }
        }
        catch (error) {
            localStorage.setItem("error", error);
        }
    }

    else {
        return state;
    }
}

export default userReducer;