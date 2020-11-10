'use strict'

const noteId = location.hash.substring(1)

let notes = getSavedNotes()

let note = notes.find((note) => note.id === noteId)

if (!note)
    location.assign('/index.html')

document.querySelector('#time').textContent = generateLastEdited(note.updatedAt)
document.querySelector('#note-title').value = note.title
document.querySelector('#note-body').value = note.body

document.querySelector('#note-title').addEventListener('input',(e) => {
    note.title = e.target.value
    note.updatedAt = moment().valueOf()
    document.querySelector('#time').textContent = generateLastEdited(note.updatedAt)

    saveNotes(notes)
})

document.querySelector('#note-body').addEventListener('input',(e) => {
    note.body = e.target.value
    note.updatedAt = moment().valueOf()
    document.querySelector('#time').textContent = generateLastEdited(note.updatedAt)
    saveNotes(notes)
})

document.querySelector('#remove-note').addEventListener('click',(e) => {

    removeNote(note.id)
    saveNotes(notes)
    location.assign('/index.html')
})

window.addEventListener('storage',(e) => {
    if (e.key === 'notes')
    {
        notes = JSON.parse(e.newValue)
        
        let note = notes.find((note) => note.id === noteId)
        
        if (!note)
            location.assign('/index.html')

        document.querySelector('#note-title').value = note.title
        document.querySelector('#note-body').value = note.body
        document.querySelector('#time').textContent = generateLastEdited(note.updatedAt)
    }
})