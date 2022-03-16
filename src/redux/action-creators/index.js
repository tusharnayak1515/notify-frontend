export const fetchAlltodos = ()=> {
    return(dispatch)=> {
        dispatch({
            type: "fetchalltodos"
        })
    }
}

export const addTodo = (id,text,date,isComplete)=> {
    return(dispatch)=> {
        dispatch({
            type: "addtodo",
            payload: {
                id: id,
                text: text,
                date: date,
                isComplete: isComplete
            }
        })
    }
}

export const editTodo = (id,text,date)=> {
    return(dispatch)=> {
        dispatch({
            type: "edittodo",
            payload: {
                id: id,
                text: text,
                date: date
            }
        })
    }
}

export const deleteTodo = (id)=> {
    return(dispatch)=> {
        dispatch({
            type: "deletetodo",
            payload: {
                id: id
            }
        })
    }
}

export const completeTodo = (id)=> {
    return(dispatch)=> {
        dispatch({
            type: "completeTodo",
            payload: {
                id: id
            }
        })
    }
}