const { app, BrowserWindow } = require('electron');
const fs = require('fs')
const path = require('path')

var btnCreate = document.getElementById('btnCreate')
var btnRead = document.getElementById('btnRead')
var btnUpdate = document.getElementById('btnUpdate')
var btnDelete = document.getElementById('btnDelete')
var fileName = document.getElementById('fileName')
var fileContents = document.getElementById('fileContents')

let pathName = path.join(__dirname, 'Files')

btnCreate.addEventListener('click', function() {
  let file = path.join(pathName, fileName.value)
  let contents = fileContents.value

  fs.writeFile(file, contents, function(err) {
    if (err) {
      return console.log(err)
    }
    var txtfile = document.getElementById("fileName").value
    alert(txtfile + " text file was created, thank you for your feedback!")
    console.log("Thank you for your feedback!")

    // Clear the form after successful creation
    fileName.value = ""
    fileContents.value = ""
  })
})

btnRead.addEventListener('click', function() {
  let file = path.join(pathName, fileName.value)

  fs.readFile(file, 'utf8', function(err, data) {
    if (err) {
      return console.log(err)
    }
    fileContents.value = data
    console.log("The feedback was read!")
  })
})

btnUpdate.addEventListener('click', function() {
  let file = path.join(pathName, fileName.value)
  let updatedContents = fileContents.value

  fs.writeFile(file, updatedContents, function(err) {
    if (err) {
      return console.log(err)
    }
    var txtfile = document.getElementById("fileName").value
    alert(txtfile + " text file was updated, thank you for your feedback!")
    console.log("Feedback updated!")
  })
})

btnDelete.addEventListener('click', function() {
  let file = path.join(pathName, fileName.value)

  fs.unlink(file, function(err) {
    if (err) {
      return console.log(err)
    }
    fileName.value = ""
    fileContents.value = ""
    console.log("The feedback was deleted!")
  })
})

