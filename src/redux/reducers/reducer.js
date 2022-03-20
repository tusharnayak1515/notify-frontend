import axios from "axios";

let isTodo;
if (localStorage.getItem("todolist") === null) {
    isTodo = [];
}
else {
    isTodo = JSON.parse(localStorage.getItem("todolist"));
}

let isUser;
if (localStorage.getItem("token") === null) {
    isUser = null;
}
else {
    isUser = localStorage.getItem("token");
}

const initState = {
    todos: isTodo,
    user: isUser
}

const reducer = async (state = initState, action) => {

    if (action.type === 'addtodo') {
        const token = localStorage.getItem("token");
        if (token) {
            const { text, date } = action.payload;
            try {
                const res = await axios.post("http://localhost:5000/api/todos/addtodo", {
                    headers: { "auth-token": token },
                    text: text,
                    date: date
                });

                if (res.data.error) {
                    return res.data.error;
                }

                if (res.data.success) {
                    return {
                        ...state,
                        todos: [
                            ...state.todos,
                            res.data.mytodo
                        ]
                    }
                }
            }
            catch (error) {
                localStorage.setItem("error", error);
            }
        }

        else {
            return localStorage.setItem("error", "You need to be logged in first!")
        }
    }

    else if (action.type === 'fetchalltodos') {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const res = await axios.get("http://localhost:5000/api/todos/fetchAlltodos", {
                    headers: { "auth-token": token }
                });

                if (res.data.error) {
                    return res.data.error;
                }


                if (res.data.success) {
                    localStorage.setItem("todolist", JSON.stringify(res.data.todos));
                    return {
                        ...state,
                        todos: res.data.todos
                    }
                }
            }
            catch (error) {
                localStorage.setItem("error", error);
            }
        }

        else {
            return localStorage.setItem("error", "You need to be logged in first!")
        }
    }

    else if (action.type === 'deletetodo') {
        const token = localStorage.getItem("token");
        const { id } = action.payload;
        if (token) {
            try {
                const res = await axios.delete(`http://localhost:5000/api/todos/deletetodo/${id}`, {
                    headers: { "auth-token": token },
                });

                if (res.data.error) {
                    return res.data.error;
                }

                if (res.data.success) {
                    return {
                        ...state,
                        todos: res.data.filteredTodos
                    }
                }
            }
            catch (error) {
                localStorage.setItem("error", error);
            }
        }

        else {
            return localStorage.setItem("error", "You need to be logged in first!")
        }
    }

    else if (action.type === 'edittodo') {
        const token = localStorage.getItem("token");
        const { id, text, date } = action.payload;
        if (token) {
            try {
                const res = await axios.put(`http://localhost:5000/api/todos/edittodo/${id}`, {
                    headers: { "auth-token": token },
                    text: text,
                    date: date
                });

                if (res.data.error) {
                    return res.data.error;
                }

                if (res.data.success) {
                    return {
                        ...state,
                        todos: res.data.updatedTodos
                    }
                }
            }
            catch (error) {
                localStorage.setItem("error", error);
            }
        }

        else {
            return localStorage.setItem("error", "You need to be logged in first!")
        }
    }

    else if (action.type === 'completetodo') {
        const token = localStorage.getItem("token");
        const { id } = action.payload;
        if (token) {
            try {
                const res = await axios.put(`http://localhost:5000/api/todos/complete/${id}`, {
                    headers: { "auth-token": token }
                });

                if (res.data.error) {
                    return res.data.error;
                }

                if (res.data.success) {
                    return {
                        ...state,
                        todos: res.data.updatedTodos
                    }
                }
            }
            catch (error) {
                localStorage.setItem("error", error);
            }
        }

        else {
            return localStorage.setItem("error", "You need to be logged in first!")
        }
    }

    else if (action.type === 'register') {
        const { name, username, email, password } = action.payload;
        try {
            const res = await axios.post("http://localhost:5000/api/auth/register", {
                name: name,
                username: username,
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

    else if (action.type === 'login') {
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

    else if (action.type === 'profile') {
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
                    return {
                        ...state,
                        user: res.data.user
                    };
                }
            }

        }
        catch (error) {
            localStorage.setItem("error", error);
        }
    }

    else if (action.type === 'deleteuser') {
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
                    return {
                        ...state,
                        user: res.data.user
                    };
                }
            }
        }
        catch (error) {
            localStorage.setItem("error", error);
        }
    }

    else if (action.type === 'logout') {
        try {
            const token = window.localStorage.getItem("token");
            if (token) {
                localStorage.removeItem("token");
                localStorage.removeItem("todolist");
                return {
                    ...state,
                    user: null,
                    todos: []
                };
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

export default reducer;