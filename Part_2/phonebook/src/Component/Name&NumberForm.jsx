
const Number = ({newName, newNumber, handleNameChange, handleNumberChange, handleAddClick}) => {
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAddClick}>
        <div>
          <label htmlFor="firstname">name:</label> <input type="text" value={newName} id="firstname" onChange={handleNameChange}></input>   
          <label htmlFor="number">number:</label> <input type="text" value={newNumber} id="number" onChange={handleNumberChange}></input>        
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default Number