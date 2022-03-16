import axios from "axios";

let isTodo;
if(localStorage.getItem("mytodos")===null) {
    isTodo = [];
}
else {
    isTodo = JSON.parse(localStorage.getItem("mytodos"))
}

const initTodo = {
    todos: isTodo
}

const userReducer = async (state=initTodo,action) => {

    if(action.type === 'addtodo') {
        const token = localStorage.getItem("token");
        if(token) {
            const {text,date,isComplete} = action.payload;
            try {
                const res = await axios.post("http://localhost:5000/api/todos/addtodo",{
                    headers: { "auth-token": token },
                    text: text,
                    date: date,
                    isComplete: isComplete
                });

                if(res.data.error) {
                    return res.data.error;
                }

                if(res.data.success) {
                    return {
                        ...state,
                        todos : [
                            ...state.todos,
                            res.data.mytodo
                        ]
                    }
                }
            }
            catch(error) {
                localStorage.setItem("error",error);
            }
        }
    }

    if(action.type === 'fetchalltodos') {
        const token = localStorage.getItem("token");
        if(token) {
            try {
                const res = await axios.get("http://localhost:5000/api/todos/fetchAlltodos",{
                    headers: { "auth-token": token },
                });

                if(res.data.error) {
                    return res.data.error;
                }

                if(res.data.success) {
                    return {
                        ...state,
                        todos : res.data.todos
                    }
                }
            }
            catch(error) {
                localStorage.setItem("error",error);
            }
        }
    }

    if(action.type === 'deletetodo') {
        const token = localStorage.getItem("token");
        const {id} = action.payload;
        if(token) {
            try {
                const res = await axios.get(`http://localhost:5000/api/todos/deletetodo/${id}`,{
                    headers: { "auth-token": token },
                });

                if(res.data.error) {
                    return res.data.error;
                }

                if(res.data.success) {
                    return {
                        ...state,
                        todos : res.data.filteredTodos
                    }
                }
            }
            catch(error) {
                localStorage.setItem("error",error);
            }
        }
    }

    if(action.type === 'edittodo') {
        const token = localStorage.getItem("token");
        const {id,text,date} = action.payload;
        if(token) {
            try {
                const res = await axios.get(`http://localhost:5000/api/todos/edittodo/${id}`,{
                    headers: { "auth-token": token },
                    text: text,
                    date: date
                });

                if(res.data.error) {
                    return res.data.error;
                }

                if(res.data.success) {
                    return {
                        ...state,
                        todos : res.data.updatedTodos
                    }
                }
            }
            catch(error) {
                localStorage.setItem("error",error);
            }
        }
    }

    if(action.type === 'completetodo') {
        const token = localStorage.getItem("token");
        const {id} = action.payload;
        if(token) {
            try {
                const res = await axios.get(`http://localhost:5000/api/todos/complete/${id}`,{
                    headers: { "auth-token": token }
                });

                if(res.data.error) {
                    return res.data.error;
                }

                if(res.data.success) {
                    return {
                        ...state,
                        todos : res.data.updatedTodos
                    }
                }
            }
            catch(error) {
                localStorage.setItem("error",error);
            }
        }
    }
}

export default userReducer;