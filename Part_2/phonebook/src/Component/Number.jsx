
const Number = ({entry, onDeleteClick}) => {

  return (
    <div>        
        <p>{entry.name}: {entry.number}</p>
        <button onClick={() => onDeleteClick(entry.id)}>Delete</button>
    </div>
  )
}

export default Number