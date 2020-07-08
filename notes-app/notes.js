// const fs = require('fs')
// const chalk = require('chalk')

// const getNotes = function ($notes) {
//     return $notes
// }

// const addNote = function(title, body) {
//     const notes = loadNotes()
//     const duplicateNotes = notes.filter(function(note) {
//         return note.title === title
//     })

//     if (duplicateNotes.length === 0) {
//         notes.push({
//             title: title,
//             body: body
//         })
    
//         saveNotes(notes)
//         console.log(chalk.green.inverse('New Note added'))
//     } else {
//         console.log(chalk.red.inverse('Note Title already exist'))
//     }

    
// }

// const removeNote = function(title) {
//     const notes = loadNotes()
//     const notesToKeep = notes.filter(function(note) {
//         return note.title != title
//     })

//     if(notes.length > notesToKeep.length) {
//         console.log(chalk.green.inverse('Note removed'))
//         saveNotes(notesToKeep)
//     } else{
//         console.log(chalk.red.inverse('No note found'))
//     }
    
// }

// const loadNotes = function() {
//     try {
//         const dataBuffer = fs.readFileSync('notes.json')
//         const dataJson = dataBuffer.toString()
//         return JSON.parse(dataJson)
//     } catch(e) {
//         return []
//     }
   
// }

// const saveNotes = function(notes) {
//     const dataJson = JSON.stringify(notes)
//     fs.writeFileSync('notes.json',dataJson)
// }

// module.exports = {
//     getNotes: getNotes,
//     addNote: addNote,
//     removeNote: removeNote
// }



                                                //use Arrow functions as in ES6

const fs = require('fs')
const chalk = require('chalk')


const loadNotes = ()=> {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson)
    } catch(e) {
        return []
    }
   
}

const saveNotes = (notes)=> {
    const dataJson = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJson)
}

const addNote = (title, body)=> {
    const notes = loadNotes()
    //const duplicateNotes = notes.filter((note)=> note.title === title)
    const duplicateNote = notes.find((node) => note.title ===title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes)
        console.log(chalk.green.inverse('New Note added'))
    } else {
        console.log(chalk.red.inverse('Note Title already exist'))
    }

    
}

const removeNote = (title)=> {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note)=> note.title != title)

    if(notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note removed'))
        saveNotes(notesToKeep)
    } else{
        console.log(chalk.red.inverse('No note found'))
    }
    
}

const listNotes = ()=>{
    console.log(chalk.inverse('Your Notes: '))
    const notes = loadNotes()
    notes.forEach((note) => {
        console.log(note.title)
    });
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note)=> note.title === title)

    if(note){
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    }else {
        console.log(chalk.red.inverse('Note not found'))
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}