const users =[]

//////////////////////////////////////////////////add new users//////////////////////////////////////////////////
const addUser = ({ id, username, room })=>{
    //clean the data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()
    //validate data
    if(!username || !room){
        return {
            error:'Username and room are required'
        }
    }

    //check existing user
    const existingUser = users.find((user)=>{
        return user.room === room && user.username === username
    })

    //validate username
    if(existingUser){
        return{
            error:'Username is in use'
        }
    }

    //store user
    const user = {id, username, room}
    user.push(user)
    return user


}
//////////////////////////////////////////////////remove users when leave//////////////////////////////////////////////////
const removeUser = (id)=>{
    const index = users.findIndex((user)=>{
        return user.id === id
    })

    if(index != -1){
        return users.splice(index, 1)[0]
    }
}
//////////////////////////////////////////////////get exist user//////////////////////////////////////////////////
const getUser = (id) =>{
    return users.find((user)=> user.id === id)
}
//////////////////////////////////////////////////get users in room//////////////////////////////////////////////////
const getUsersInRoom = (room) =>{
    return users.filter((user)=> {
        room = room.trim().toLowerCase()
        user.room === room
    })
}



module.exports ={
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}