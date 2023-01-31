import axios from 'axios'

const cinemaWsUsers = `${process.env.REACT_APP_BASE_CINEMAX_API_URL}/${process.env.REACT_APP_USERS_ENDPOINT}`
const cinemaWsSubscriptions = `${process.env.REACT_APP_BASE_CINEMAX_API_URL}/${process.env.REACT_APP_SUBSCRIPTIONS_ENDPOINT}`
const cinemaWsMovies = `${process.env.REACT_APP_BASE_CINEMAX_API_URL}/${process.env.REACT_APP_MOVIES_ENDPOINT}`
const cinemaWsMembers = `${process.env.REACT_APP_BASE_CINEMAX_API_URL}/${process.env.REACT_APP_MEMBERS_ENDPOINT}`
const cinemaWsAuth = `${process.env.REACT_APP_BASE_CINEMAX_API_URL}/${process.env.REACT_APP_AUTH_ENDPOINT}`

//mode can be login or register
export const authUser = async (username, password, mode) => {
    try {
        const {data} = await axios.post(`${cinemaWsAuth}/${mode}`, {username, password})
        return data
    }
    catch (err){
        console.log(err)
        return err.response.data
    }
}

export const getAllUsers = async () => {
    
    try {
        const {data} = await axios.get(cinemaWsUsers)
        return data
    }
    catch(err){
        console.log(err)
        return err.response.data
    }
}

export const getAllMembers = async () => {
    try {
       const {data} = await axios.get(cinemaWsMembers)
       return data
    }
    catch(err){
        return err.response.data
    }
}

export const getAllMovies = async () => {
    try {
       const {data} = await axios.get(cinemaWsMovies)
       return data
    }
    catch(err){
        return err.response.data
    }
}

export const getAllSubscriptions = async () => {
    try {
       const {data} = await axios.get(cinemaWsSubscriptions)
       return data
    }
    catch(err){
        return err.response.data
    }
}

export const updateSubscription = async(subscriptionId, obj) => {
    try{
        const {data} = await axios.put(`${cinemaWsSubscriptions}/${subscriptionId}`, obj)
        return data
    }
    catch(err){
        return err.response.data
    }
}


//users
export const createUser = async (obj) => {
    try {
        const {data} = await axios.post(cinemaWsUsers, obj)
        return data
    }
    catch (err){
        return err.response.data
    }
}

export const getUser = async (userId) => {
    try {
        const {data} = await axios.get(`${cinemaWsUsers}/${userId}`)
        return data
    }
    catch (err){
        return err.response.data
    }
}

export const updateUser = async (userId ,userObj) => {
    try {
        const {data} = await axios.put(`${cinemaWsUsers}/${userId}`, userObj)
        return data
    }
    catch (err) {
        return err.response.data
    }
}

export const deleteUser = async (userId) => {
    try {
        const {data} = await axios.delete(`${cinemaWsUsers}/${userId}`)
        return data
    }
    catch (err) {
        return err.response.data
    }
}


//members
export const createMember = async (memberObj) => {
    try{
        const {data} = await axios.post(cinemaWsMembers, memberObj)
        return data
    }
    catch (err){
        return err.response.data
    }
}

export const getMember = async (memberId) => {
    try{
        const {data} = await axios.get(`${cinemaWsMembers}/${memberId}`)
        return data
    }
    catch (err){
        return err.response.data
    }
}

export const updateMember = async (memberId, memberObj) => {
    try{
        const {data} = await axios.put(`${cinemaWsMembers}/${memberId}`, memberObj)
        return data
    }
    catch (err){
        return err.response.data
    }
}

export const deleteMember = async (memberId) => {
    try{
        const {data} = await axios.delete(`${cinemaWsMembers}/${memberId}`)
        return data
    }
    catch (err){
        return err.response.data
    }
}


//movies
export const createMovie = async (movieObj) => {
    try {
        const {data} = await axios.post(cinemaWsMovies, movieObj)
        return data
    }
    catch (err) {
        return err.response.data
    }
}

export const getMovie = async (movieId) => {
    try{
        console.log(movieId)
        const {data} = await axios.get(`${cinemaWsMovies}/${movieId}`)
        return data
    }
    catch (err) {
        return err.response.data
    }
}

export const updateMovie = async (movieId, movieObj) => {
    try{
        const {data} = await axios.put(`${cinemaWsMovies}/${movieId}`, movieObj)
        return data
    }
    catch (err) {
        return err.response.data
    }
}

export const deleteMovie = async (movieId) => {
    try{
        const {data} =  await axios.delete(`${cinemaWsMovies}/${movieId}`)
        return data
    }
    catch (err) {
        return err.response.data
    }
}