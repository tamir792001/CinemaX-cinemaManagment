//actions for redux reducer

export const restartStore = () => {
    return {
        type: "RES_STORE",
    }
}

export const initializeStore = (obj) => {
    return {
        type: "INIT_STORE",
        payload : obj
    }
}

export const addUserAction = (userObj) => {
    return {
        type: "ADD_USER",
        payload: userObj
    }
}

export const editUserAction = (userObj) => {
    return {
        type: "EDIT_USER",
        payload: userObj
    }
}

export const deleteUserAction = (userId) => {
    return {
        type: "DELETE_USER",
        payload: userId
    }
}


export const addMovieAction = (movieObj) => {
    return {
        type: "ADD_MOVIE",
        payload: movieObj
    }
}

export const editMovieAction = (movieObj) => {
    return {
        type: "EDIT_MOVIE",
        payload: movieObj
    }
}

export const deleteMovieAction = (movieId) => {
    return {
        type: "DELETE_MOVIE",
        payload: movieId
    }
}


export const addMemberAction = (memberObj) => {
    return {
        type: "ADD_MEMBER",
        payload: memberObj
    }
}

export const editMemberAction = (memberObj) => {
    return {
        type: "EDIT_MEMBER",
        payload: memberObj
    }
}

export const deleteMemberAction = (memberId) => {
    return {
        type: "DELETE_MEMBER",
        payload: memberId
    }
}

export const updateSubscriptionAction = (subscriptionId, newSubObj) => {
    return {
        type:"UPDATE_SUB",
        payload: {subscriptionId, newSubObj}
    }
}