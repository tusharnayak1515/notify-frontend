import axios from "axios";

export const fetchAlltodos = () => async (dispatch) => {
    const token = localStorage.getItem("token");
    const myheaders = { headers: { "auth-token": token } };
    if(token) {
        try {
            const res = await axios.get("http://localhost:5000/api/todos/fetchAlltodos", myheaders);
    
            if (res.data.success) {
                localStorage.setItem("todolist", JSON.stringify(res.data.todos));
                return (dispatch) => {
                    dispatch({
                        type: "fetchalltodos",
                        payload: {
                            todos: res.data.todos,
                            error: null
                        }
                    });
                }
            }
        }
        catch (error) {
            return dispatch({
                type: "fetchalltodos",
                payload: {
                    error: error.message
                }
            });
        }
    }

}

export const addTodo = (text, date) => async (dispatch) => {
    const token = localStorage.getItem("token");
    const myheaders = { headers: { "auth-token": token } };
    try {
        const res = await axios.post("http://localhost:5000/api/todos/addtodo", { text: text, date: date }, myheaders);

        if (res.data.success) {
            return dispatch({
                type: "addtodo",
                payload: {
                    mytodo: res.data.mytodo,
                    error: null
                }
            })
        }
    }
    catch (error) {
        return dispatch({
            type: "addtodo",
            payload: {
                error: error.message
            }
        })
    }
}

export const editTodo = (id, text, date) => async (dispatch) => {
    const token = localStorage.getItem("token");
    const myheaders = { headers: { 'auth-token': token } };
    try {
        const res = await axios.put(`http://localhost:5000/api/todos/edittodo/${id}`, { text: text, date: date }, myheaders);

        if (res.data.success) {
            return dispatch({
                type: "edittodo",
                payload: {
                    mytodo: res.data.todo,
                    error: null
                }
            })
        }
    }
    catch (error) {
        return dispatch({
            type: "edittodo",
            payload: {
                error: error.message
            }
        })
    }
}

export const deleteTodo = (id) => async (dispatch) => {
    const token = localStorage.getItem("token");
    const myheaders = { headers: { 'auth-token': token } };
    try {
        const res = await axios.delete(`http://localhost:5000/api/todos/deletetodo/${id}`, myheaders);

        if (res.data.success) {
            return dispatch({
                type: "deletetodo",
                payload: {
                    todos: res.data.filteredTodos,
                    error: null
                }
            })
        }
    }
    catch (error) {
        return dispatch({
            type: "deletetodo",
            payload: {
                error: error.message
            }
        })
    }
}

export const completeTodo = (id) => async (dispatch) => {
    const token = localStorage.getItem("token");
    const myheaders = { headers: { 'auth-token': token } };
    try {
        const res = await axios.put(`http://localhost:5000/api/todos/complete/${id}`, {}, myheaders);

        if (res.data.success) {
            return dispatch({
                type: "completetodo",
                payload: {
                    todos: res.data.updatedTodos,
                    error: null
                }
            })
        }
    }
    catch (error) {
        return dispatch({
            type: "completetodo",
            payload: {
                error: error.message
            }
        })
    }
}

export const register = ({ name, username, email, password }) => async (dispatch) => {
    try {
        const res = await axios.post("http://localhost:5000/api/auth/register", {
            name: name,
            username: username,
            email: email,
            password: password
        });

        if (res.data.success) {
            localStorage.setItem("token", res.data.authToken);
            return dispatch({
                type: "register",
                payload: {
                    user: res.data.authToken,
                    error: null
                }
            })
        }
    }
    catch (error) {
        return dispatch({
            type: "register",
            payload: {
                error: error.message
            }
        })
    }
}

export const login = ({ email, password }) => async (dispatch) => {
    try {
        const res = await axios.post("http://localhost:5000/api/auth/login", {
            email: email,
            password: password
        });

        if (res.data.success) {
            localStorage.setItem("token", res.data.authToken);
            return dispatch({
                type: "login",
                payload: {
                    token: res.data.authToken,
                    error: null,
                    todos: res.data.mytodos
                }
            })
        }
    }
    catch (error) {
        return dispatch({
            type: "login",
            payload: {
                error: error.message
            }
        })
    }
}

export const profile = () => async (dispatch) => {
    const token = localStorage.getItem("todolist");
    try {
        const res = await axios.get("http://localhost:5000/api/auth/profile", {
            headers: { "auth-token": token }
        });

        if (res.data.success) {
            localStorage.setItem("profile", JSON.stringify(res.data.user));
            return dispatch({
                type: "profile",
                payload: {
                    user: res.data.user,
                    error: null
                }
            })
        }
    }
    catch (error) {
        return dispatch({
            type: "profile",
            payload: {
                error: error.message
            }
        })
    }
}

export const deleteuser = (id) => async (dispatch) => {
    const token = localStorage.getItem("todolist");
    try {
        const res = await axios.delete(`http://localhost:5000/api/auth/deleteuser/${id}`, {
            headers: { "auth-token": token },
        });

        if (res.data.success) {
            localStorage.removeItem("profile");
            localStorage.removeItem("token");
            localStorage.removeItem("todolist");
            return dispatch({
                type: "deleteuser",
                payload: {
                    error: null
                }
            })
        }
    }
    catch (error) {
        return dispatch({
            type: "deleteuser",
            payload: {
                error: error.message
            }
        })
    }
}

export const logout = () => async (dispatch) => {
    const token = localStorage.getItem("token");
    if(token) {
        return dispatch({
            type: "logout"
        })
    }
}