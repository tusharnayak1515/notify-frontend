let date = new Date();
let mydate = date.getDate();
let mymonth = date.getMonth() + 1;
let myyear = date.getFullYear();

let customdate = `${mydate}/${mymonth}/${myyear}`

const initState = {
    date: customdate
}

const reducer = async (state = initState, action) => {

    
}

export default reducer;