import React, { useState, useEffect } from 'react' 
import People from './components/People'
import Services from './components/Services'
import Notification from './components/Notification'

const App = () => {
  const [ people, setPeople ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ errToggle, setErr ] = useState([])

  const hook = () => { 
    Services
      .getAll()
      .then(returnedInfo => setPeople(returnedInfo))
  }
  
  useEffect(hook, [])

  const addName = (event) => {
    event.preventDefault()
    
    //Add part
    const nameObj = {
      name: newName,
      phone: newPhone,
      id: people.length + 1
    }
    const add = () => { 
      Services
      .create(nameObj)
      .then(returned => setPeople(people.concat(returned)))
      .then(result => setErr('New phone added'))
      .catch(error => { 
        console.log(error.response.data.error)
        const showErr = error.response.data.error
        setErr(showErr)
      }) 
      setNewName('')
      setNewPhone('')
    }

    // If exist 
    const findExist = people.find(el => el.name === nameObj.name)
    
    if (findExist) {
      const winConfirm = window.confirm(`Do you want to replace ${nameObj.name}`)
      if (winConfirm) {
        const idToReplace = findExist.id
        const updatedBook = people.filter(el => el.name !== findExist.name)
        Services 
          .update(idToReplace, nameObj)
          .then(returned => setPeople(updatedBook.concat(returned)))
          .catch(error => {
            console.log(error)
          })
          .then(hook)
      }
    } else {
      add()
    }
  }

  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewPhone = (event) => {
    setNewPhone(event.target.value)
  } 

  const delPhone = (id) => {
    const url = `http://localhost:3001/api/peps/${id}`
    const toDelete = people.find(el => el.id === id) 
    const newList = people.filter(list => list.id !== id)
    const result = window.confirm(`Are you sure you want to delete ${toDelete.name}`) 
    console.log(toDelete)
    
    if (result === true) {
      Services
      .del(url)
      .then(setPeople(newList))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errToggle}/>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
          phone: <input value={newPhone} onChange={handleNewPhone} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <People people={people} delPhone={delPhone}/>    
    </div>
  )
}

export default App