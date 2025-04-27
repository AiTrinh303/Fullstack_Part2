
import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import { getAll, createNew, removePerson, updatePerson } from './services/persons.js'


const App = () => {
 
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')


  useEffect(() => {
    getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  const personToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFormSubmit = (event) => {
    event.preventDefault()
  
    const existingPerson = persons.find(person => person.name === newName)
  
    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook. Replace the old number with a new one?`
      )
  
      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newNumber }
  
        updatePerson(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => 
              person.id !== existingPerson.id ? person : returnedPerson
            ))
            setNewName('')
            setNewNumber('')
          })
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
  
      createNew(newPerson)
        .then(person => {
          setPersons(persons.concat(person))
          setNewName('')
          setNewNumber('')
        })
    }
  }
  

  const handleDelete = (id, name) => {
    const confirmDelete = window.confirm(`Delete ${name}?`)
    
    if (confirmDelete) {
        removePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })       
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={filter} onChange={handleFilterChange} />

      <h2>Add a new</h2>

      <PersonForm 
        newName={newName} 
        newNumber={newNumber} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} 
        handleFormSubmit={handleFormSubmit}
      />

      <h2>Numbers</h2>    

      <Persons persons={personToShow} handleDelete={handleDelete}/>
    </div>

  )
}

export default App