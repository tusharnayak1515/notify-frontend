let isTodo;
if (localStorage.getItem("todolist") === null) {
    isTodo = [];
}
else {
    isTodo = JSON.parse(localStorage.getItem("todolist"));
}

let isError;
if (localStorage.getItem("error") === null) {
    isError = null;
}
else {
    isError = localStorage.getItem("error");
}

const initTodo = {
    todos: isTodo,
    error: isError
}

const todoReducer = (state = initTodo, action) => {

    if (action.type === 'addtodo') {
        const { error, mytodo } = action.payload;
        if (error) {
            return {
                ...state,
                error: error
            }
        }
        return {
            ...state,
            todos: [
                ...state.todos,
                mytodo
            ],
            error: null
        }
    }

    else if (action.type === 'fetchalltodos') {
        const { error, todos } = action.payload;
        if (error) {
            return {
                ...state,
                error: error
            }
        }
        return {
            ...state,
            todos: todos,
            error: null
        }
    }

    else if (action.type === 'deletetodo') {
        const { todos, error } = action.payload;
        if (error) {
            return {
                ...state,
                error: error
            }
        }
        return {
            ...state,
            todos: todos,
            error: null
        }
    }

    else if (action.type === 'edittodo') {
        const { mytodo, error } = action.payload;
        if (error) {
            return {
                ...state,
                error: error
            }
        }
        return {
            ...state,
            todos: [...state.todos].map(todo => { return todo._id === mytodo._id ? mytodo : todo }),
            error: null
        }
    }

    else if (action.type === 'completetodo') {
        const { todos, error } = action.payload;
        if (error) {
            return {
                ...state,
                error: error
            }
        }
        return {
            ...state,
            todos: todos,
            error: null
        }
    }

    else if (action.type === 'login') {
        const { todos, error } = action.payload;
        if(error) {
            return {
                ...state,
                error: error
            }
        }
        return {
            ...state,
            todos: todos,
            error: null
        };
    }

    else if (action.type === 'logout') {
        return {
            ...state,
            todos: [],
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

export default todoReducer;