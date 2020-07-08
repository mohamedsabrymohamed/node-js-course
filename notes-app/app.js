// const chalk = require('chalk')
// const yargs = require('yargs')
// const notes = require('./notes.js')

// // customize yargs version
// // yargs.version('1.0.1')


// //create add command
// yargs.command({
//     command: 'add',
//     describe: 'add new note',
//     builder:{
//         title: {
//             describe: 'Note Title',
//             demandOption: true,
//             type: 'string'
//         },
//         body: {
//             describe: 'Note body',
//             demandOption: true,
//             type: 'string'
//         }
//     },
//     handler: function (argv) {
//         notes.addNote(argv.title, argv.body)
//     }
// })

// //create remove command
// yargs.command({
//     command: 'remove',
//     describe: 'remove note',
//     builder:{
//         title: {
//             describe: 'Note Title',
//             demandOption: true,
//             type: 'string'
//         }
//     },
//     handler: function (argv) {
//         notes.removeNote(argv.title)
//     }
// })

// //create list command
// yargs.command({
//     command: 'list',
//     describe: 'list all notes',
//     handler: function () {
//         console.log('list note')
//     }
// })


// //create read command
// yargs.command({
//     command: 'read',
//     describe: 'read note',
//     handler: function () {
//         console.log('reading note')
//     }
// })


// console.log(yargs.argv)

                                                //use Arrow functions as in ES6
                                                const chalk = require('chalk')
                                                const yargs = require('yargs')
                                                const notes = require('./notes.js')
                                                
                                                // Customize yargs version
                                                yargs.version('1.1.0')
                                                
                                                // Create add command
                                                yargs.command({
                                                    command: 'add',
                                                    describe: 'Add a new note',
                                                    builder: {
                                                        title: {
                                                            describe: 'Note title',
                                                            demandOption: true,
                                                            type: 'string'
                                                        },
                                                        body: {
                                                            describe: 'Note body',
                                                            demandOption: true,
                                                            type: 'string'
                                                        }
                                                    },
                                                    handler(argv) {
                                                        notes.addNote(argv.title, argv.body)
                                                    }
                                                })
                                                
                                                // Create remove command
                                                yargs.command({
                                                    command: 'remove',
                                                    describe: 'Remove a note',
                                                    builder: {
                                                        title: {
                                                            describe: 'Note title',
                                                            demandOption: true,
                                                            type: 'string'
                                                        }
                                                    },
                                                    handler(argv) {
                                                        notes.removeNote(argv.title)
                                                    }
                                                })
                                                
                                                // Create list command
                                                yargs.command({
                                                    command: 'list',
                                                    describe: 'List your notes',
                                                    handler() {
                                                        notes.listNotes()
                                                    }
                                                })
                                                
                                                // Create read command
                                                yargs.command({
                                                    command: 'read',
                                                    describe: 'Read a note',
                                                    builder: {
                                                        title: {
                                                            describe: 'Note title',
                                                            demandOption: true,
                                                            type: 'string'
                                                        }
                                                    },
                                                    handler(argv) {
                                                        notes.readNote(argv.title)
                                                    }
                                                })
                                                
                                                yargs.parse()