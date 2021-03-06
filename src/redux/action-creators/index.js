import axios from "axios";

export const fetchAlltodos = () => async (dispatch) => {
    const token = localStorage.getItem("token");
    const myheaders = { headers: { "auth-token": token } };
    if (token) {
        try {
            const res = await axios.get("http://localhost:5000/api/todos/fetchAlltodos", myheaders);

            if (res.data.success) {
                localStorage.removeItem("error");
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

            if (res.data.error) {
                localStorage.setItem("error", res.data.error);
                return dispatch({
                    type: "fetchalltodos",
                    payload: {
                        error: res.data.error
                    }
                });
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
            localStorage.removeItem("error");
            return dispatch({
                type: "addtodo",
                payload: {
                    mytodo: res.data.mytodo,
                    error: null
                }
            })
        }
        if (res.data.error) {
            localStorage.setItem("error", res.data.error);
            return dispatch({
                type: "addtodo",
                payload: {
                    error: res.data.error
                }
            });
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
            localStorage.removeItem("error");
            return dispatch({
                type: "edittodo",
                payload: {
                    mytodo: res.data.todo,
                    error: null
                }
            })
        }

        if (res.data.error) {
            localStorage.setItem("error", res.data.error);
            return dispatch({
                type: "edittodo",
                payload: {
                    error: res.data.error
                }
            });
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
            localStorage.removeItem("error");
            return dispatch({
                type: "deletetodo",
                payload: {
                    todos: res.data.filteredTodos,
                    error: null
                }
            })
        }

        if (res.data.error) {
            localStorage.setItem("error", res.data.error);
            return dispatch({
                type: "fetchalltodos",
                payload: {
                    error: res.data.error
                }
            });
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
            localStorage.removeItem("error");
            return dispatch({
                type: "completetodo",
                payload: {
                    todos: res.data.updatedTodos,
                    error: null
                }
            })
        }

        if (res.data.error) {
            localStorage.setItem("error", res.data.error);
            return dispatch({
                type: "fetchalltodos",
                payload: {
                    error: res.data.error
                }
            });
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
            localStorage.removeItem("error");
            localStorage.setItem("token", res.data.authToken);
            return dispatch({
                type: "register",
                payload: {
                    user: res.data.authToken,
                    error: null
                }
            })
        }

        if (res.data.error) {
            localStorage.setItem("error", res.data.error);
            return dispatch({
                type: "register",
                payload: {
                    error: res.data.error
                }
            });
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

        if (res.data.error) {
            localStorage.setItem("error", res.data.error);
            return dispatch({
                type: "login",
                payload: {
                    error: res.data.error
                }
            });
        }
        
        if (res.data.success) {
            localStorage.removeItem("error");
            localStorage.setItem("token", res.data.authToken);
            localStorage.setItem("profile", JSON.stringify(res.data.user));
            return dispatch({
                type: "login",
                payload: {
                    error: null,
                    token: res.data.authToken,
                    todos: res.data.mytodos,
                    profile: res.data.user
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
    const token = localStorage.getItem("token");
    try {
        const res = await axios.get("http://localhost:5000/api/auth/profile", {
            headers: { "auth-token": token }
        });

        if (res.data.success) {
            localStorage.setItem("profile", JSON.stringify(res.data.user));
            localStorage.removeItem("error");
            return dispatch({
                type: "profile",
                payload: {
                    user: res.data.user,
                    error: null
                }
            })
        }

        if (res.data.error) {
            localStorage.setItem("error", res.data.error);
            return dispatch({
                type: "profile",
                payload: {
                    error: res.data.error
                }
            });
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
    const token = localStorage.getItem("token");
    try {
        const res = await axios.delete(`http://localhost:5000/api/auth/deleteuser/${id}`, {
            headers: { "auth-token": token },
        });

        if (res.data.success) {
            localStorage.removeItem("profile");
            localStorage.removeItem("token");
            localStorage.removeItem("todolist");
            localStorage.removeItem("error");
            return dispatch({
                type: "deleteuser",
                payload: {
                    error: null
                }
            })
        }

        if (res.data.error) {
            localStorage.setItem("error", res.data.error);
            return dispatch({
                type: "deleteuser",
                payload: {
                    error: res.data.error
                }
            });
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
    localStorage.removeItem("error");
    if (token) {
        return dispatch({
            type: "logout"
        })
    }
}

export const cancelError = () => async (dispatch) => {
    localStorage.removeItem("error");
    return dispatch({
        type: "cancelerror"
    });
}