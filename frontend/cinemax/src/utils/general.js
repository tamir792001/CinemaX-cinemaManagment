const authFieldsValidator = (mode, username, password) => {
    switch (mode) {
        case "login":
            if (!username || !password) return {"error" : "Please fill both username and password fields"}
            return {"success" : "fields approved"}
        case "register":
            if (!username || !password) return {"error" : "Please fill both username and password fields"}
            if (password.length < 5) return {"error" : "Password must contain at least 5 characters"}
            return {"success" : "fields approved"}
    }
}

const findUser = (usersCol, userId) => {
    const user = usersCol.filter(user => user._id === userId)[0]
    return user
}

const findMember = (membersCol, memberId) => {
    const member = membersCol.filter(member => member._id === memberId)[0]
    return member
}

const findMovie = (moviesCol, movieId) => {
    console.log(moviesCol)
    console.log(movieId)
    const movie = moviesCol.filter(movie => movie._id === movieId)[0]
    console.log(movie)
    return movie
}

const getToday = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() +1
    const day = date.getDate()
    return `${year}-${month < 10 ? "0" : ""}${month}-${day < 10 ? "0" : ""}${day}`
}

//this function taks as paramaters: users collection, user id, action, and a function.
//the function extracts the relevent user from the users collection, and checks whether the given action exists in user's premissions.
//if the action exists the given function executes.
const checkPremissions = (usersCol, userId, action, navigateFunc) =>{
    const user = usersCol.filter(user => user._id === userId)[0]
    switch(action)
    {
        case "View Subscriptions":
            if(user.premissions.includes(action)){
                navigateFunc()
            }
            else{
                alert("Method Not Allowed - You do not have premissions for this method, please contact your administrator")
            }
            break;
        case "Create Subscriptions":
            if(user.premissions.includes(action)){
                navigateFunc()
            }
            else{
                alert("Method Not Allowed - You do not have premissions for this method, please contact your administrator")
            }
            break;
        case "Update Subscriptions":
            if(user.premissions.includes(action)){
                navigateFunc()
            }
            else{
                alert("Method Not Allowed - You do not have premissions for this method, please contact your administrator")
            }
            break;
        case "Delete Subscriptions":
            if(user.premissions.includes(action)){
                navigateFunc()
            }
            else{
                alert("Method Not Allowed - You do not have premissions for this method, please contact your administrator")
            }
            break;
        case "View Movies":
            if(user.premissions.includes(action)){
                navigateFunc()
            }
            else{
                alert("Method Not Allowed - You do not have premissions for this method, please contact your administrator")
            }
            break;
        case "Create Movies":
            if(user.premissions.includes(action)){
                navigateFunc()
            }
            else{
                alert("Method Not Allowed - You do not have premissions for this method, please contact your administrator")
            }
            break;
        case "Update Movies":
            if(user.premissions.includes(action)){
                navigateFunc()
            }
            else{
                alert("Method Not Allowed - You do not have premissions for this method, please contact your administrator")
            }
            break;
        case "Delete Movies":
            if(user.premissions.includes(action)){
                navigateFunc()
            }
            else{
                alert("Method Not Allowed - You do not have premissions for this method, please contact your administrator")
            }
            break;   
    }
}
export {authFieldsValidator, findUser, findMember, findMovie, getToday, checkPremissions}