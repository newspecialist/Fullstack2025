import { useEffect, useState } from 'react'
import Number from "./Component/Number"
import NameNumberForm from "./Component/Name&NumberForm"
import FilterForm from './Component/FilterForm'
import Notification from './Component/Notification'
import personService from './Services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [filter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [notifyMessage, setNotifyMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })

  }, []) //the empty [] array says the effect is only for the first render. I hope there is better way to represent that. 
  

  // Personally Don't like this very unreadable from a first glance readability stand point
  // This says const result = condition ? val1 : val2
  // the result variable will be set to the value of val1 if condition is true. If condition is false, the result variable will be set to the value of val2.
  //const personsToShow = showAll 
  //      ? persons
  //      : persons.filter(persons => persons.name.toLowerCase().includes(filter.toLowerCase()))
  // Instead

  let personsToShow;

  if (showAll) {
    personsToShow = persons;
  } else {
    personsToShow = persons.filter(person =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
       

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value); //this is asnychronous so I can not depend on filter being updated here for the if statement
    if(event.target.value != '')
      {
        setShowAll(false)
      }
    else{
       setShowAll(true)
    }      
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);      
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);      
  }

  const handleDeleteClick = id => {
  const person = persons.find(n => n.id === id)
    
if (window.confirm(`Delete ${person.name}?`)) {
  personService
    .doDelete(id)
    .then(() => {
      // Optimistically update UI
      setPersons(persons.filter(p => p.id !== id));
      setNotifyMessage(`Deleted '${person.name}'.`);
      setTimeout(() => setNotifyMessage(null), 5000); // Optional timeout to clear the error
    })
    .catch(error => {
      console.error("Failed to delete person:", error);
      setErrorMessage(`Failed to delete '${person.name}'. Please try again.`);
      setTimeout(() => setErrorMessage(null), 5000); // Optional timeout to clear the error
    });
}
    
  }

  const handleAddClick = (event) => {
    event.preventDefault()
    let emptyvalues = false;
    if(newName === '')
      {
        alert(`Empty Name Field.`);
        emptyvalues = true;
      }
    if(newNumber === '')
      {
        alert(`Empty Number Field.`);
        emptyvalues = true;
      }

    if(!emptyvalues){
    const personObject = {
      name: newName,
      number: newNumber
    }

    const nameExists = persons.some(person => person.name === newName);

    
    if (!nameExists) {
      personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response))  
      })
      
      setNotifyMessage(`Added '${newName}'.`);
      setTimeout(() => setNotifyMessage(null), 5000); // Optional timeout to clear the error
      
      setNewName('')
      setNewNumber('')
    } else {
      if(window.confirm(newName + ' is already added to phonebook, replace the old number with a new one?'))
      {
        const existingPerson = persons.find(person => person.name === newName);
    
        if (!existingPerson) return; // Just in case

        const updatedPerson = { ...existingPerson, number: newNumber };
        personService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            // Update frontend state with the updated person
            if (returnedPerson && returnedPerson.id) { // check if valid returned person
              setPersons(persons.map(person =>
              person.id === existingPerson.id ? returnedPerson : person
            ));
            } else {
              console.error('returnedPerson is invalid:', returnedPerson);
              setErrorMessage(`returnedPerson is invalid`);
              setTimeout(() => setErrorMessage(null), 5000); // Optional timeout to clear the error
            }
            //Notify User
            setNotifyMessage(`Updated '${updatedPerson.name}' with number '${updatedPerson.number}'.`);
            setTimeout(() => setNotifyMessage(null), 5000); // Optional timeout to clear the error
          })
          .catch(error => {
            console.error(`Failed to update ${newName}. Maybe the person was already removed from the server.`, error);
            setErrorMessage(`Failed to update ${newName}. Maybe the person was already removed from the server.`);
            setTimeout(() => setErrorMessage(null), 5000); // Optional timeout to clear the error
            setPersons(persons.filter(person => person.id !== existingPerson.id));
        });
      }
    }
  }

  }
  

  //not bothered to make the change but handleXXX= should be OnChange= handleXXX TLDR: more generic names
  return (

    <div>

      <Notification message={errorMessage} />
      <Notification message={notifyMessage} className="notify" />

      <FilterForm filter={filter} handleFilterChange = {handleFilterChange}/> 

      <NameNumberForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} handleAddClick={handleAddClick}/>

      <h2>Numbers</h2>
    {
      personsToShow.map(entry =>
      <Number key= {entry.id} entry={entry} onDeleteClick={handleDeleteClick} />
      )
    }

    </div>
  )
}

export default App