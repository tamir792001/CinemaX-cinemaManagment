

const initialValues = {
    users : [],
    movies : [],
    members : [],
    subscriptions : []
}

const cinemaxReducer = (state = initialValues, action) =>
{   
    console.log(state)
    switch(action.type){
        //payload is goin to be {admin : true/false}
        case "INIT_STORE":
            return {
                    ...state,
                    users: action.payload.users,
                    members : action.payload.members,
                    movies : action.payload.movies,
                    subscriptions : action.payload.subscriptions
                }
        case "RES_STORE":
            return {
                ...state,
                users: [],
                members : [],
                movies : [],
                subscriptions : []
            }
        case "ADD_USER":
            console.log(action.payload)
            return {...state, users : [...state.users , action.payload]}
        case "EDIT_USER":
            console.log(action.payload)
            const users = [...state.users]
            const userindex = users.findIndex(user => user._id === action.payload._id)
            users[userindex] = action.payload
            return {...state, users}
        case "DELETE_USER":
            const filteredUsers = state.users.filter(user => user._id !== action.payload)
            console.log(filteredUsers)
            return {...state, users: filteredUsers}
        case "ADD_MOVIE":
            console.log(action.payload)
            return {...state, movies: [...state.movies, action.payload]}
        case "EDIT_MOVIE":
            console.log(action.payload)
            const movies = [...state.movies]
            const movieindex = movies.findIndex(movie => movie._id === action.payload._id)
            movies[movieindex] = action.payload
            return {...state, movies}
        case "DELETE_MOVIE":
            const filteredMovies = state.movies.filter(movie => movie._id !== action.payload)
            console.log(filteredMovies)
            return {...state, movies: filteredMovies}
        case "ADD_MEMBER":
            console.log(action.payload)
            return {...state, members: [...state.members, action.payload]}
        case "EDIT_MEMBER":
            console.log(action.payload)
            const members = [...state.members]
            const memberIndex = members.findIndex(member => member._id === action.payload._id)
            members[memberIndex] = action.payload
            return {...state, members}
        case "DELETE_MEMBER":
            const filteredMembers = state.members.filter(member => member._id !== action.payload)
            console.log(filteredMembers)
            return {...state, members: filteredMembers}
        case "UPDATE_SUB":
            const subscriptions = [...state.subscriptions]
            const subIndex = subscriptions.findIndex(sub=> sub._id === action.payload.subscriptionId)
            subscriptions[subIndex].movies.push(action.payload.newSubObj)
            console.log(subscriptions)
            return {...state, subscriptions}
        default:
            return state
    }
}

export default cinemaxReducer;