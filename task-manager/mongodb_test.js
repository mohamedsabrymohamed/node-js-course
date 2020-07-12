//////////////////crud in mongodb//////////////////
//////////////////connection//////////////////
// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// //object id
// const ObjectId = mongodb.ObjectID

//////////////////destructure mongodb and object id//////////////////

const {
    MongoClient,
    ObjectId
} = require('mongodb')
const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// const id = new ObjectId()

MongoClient.connect(connectionUrl, {
    useUnifiedTopology: true
}, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database')
    }
    const db = client.db(databaseName)

    //////////////////insert one to collection//////////////////
    // db.collection('users').insertOne({
    //     name: 'sabry',
    //     age: 32
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user')
    //     }
    //     console.log(result.ops)
    // })

    //////////////////insert multi records to collection//////////////////

    // db.collection('users').insertMany([{
    //     name: 'aaaa',
    //     age: 22
    // }, {
    //     name: "dddddd",
    //     age: 27
    // }], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert')
    //     }

    //     console.log(result.ops)
    // })


    ////////////////// query data find one//////////////////

    // db.collection('users').findOne({
    //     _id: ObjectId('5f08ece331abacc836c0e46d')
    //     //name: 'sabry',
    //     //age: 32
    // }, (error, user) => {
    //     if (error) {
    //         return console.log('Unable to fetch')
    //     }
    //     console.log(user)
    // })


    ////////////////// query data find many//////////////////

    // db.collection('users').find({
    //     age: 32
    // }).toArray((error, users) => {
    //     if (error) {
    //         return console.log('Unable to fetch')
    //     }
    //     console.log(users)
    // })

    ////////////////// query data count//////////////////

    // db.collection('users').find({
    //     age: 32
    // }).count((error, count) => {
    //     if (error) {
    //         return console.log('Unable to fetch')
    //     }
    //     console.log(count)
    // })



    ////////////////// update one record with promises which in mongodb is returned in update//////////////////

    // db.collection('users').updateOne({
    //     _id: ObjectId('5f08ece331abacc836c0e46d')
    // }, {
    //     $set: {
    //         name: 'Mohamed'
    //     }
    //     // $inc:{
    //     //     age:1
    //     // }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })


    ////////////////// update many records//////////////////

    // db.collection('users').updateMany({
    //     age: 32
    // }, {
    //     $set: {
    //         name: 'sabbry'
    //     }
    // }).then((result) => {
    //     console.log(result.modifiedCount)
    // }).catch((error) => {
    //     console.log(error)
    // })



    ////////////////// delete one record//////////////////

    // db.collection('users').deleteOne({
    //     _id: ObjectId('5f08ece331abacc836c0e46d')
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })


    ////////////////// delete many records//////////////////

    // db.collection('users').deleteMany({
    //     age: 32
    // }).then((result) => {
    //     console.log(result.deletedCount)
    // }).catch((error) => {
    //     console.log(error)
    // })

})