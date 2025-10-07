
const FilterForm = ({filter, handleFilterChange}) => {


  return (
    <div>        
      <h2>Filter</h2>        
        <form>
          <div>
            <label htmlFor="filter">Filter:</label> <input type="text" value={filter} id="filter" onChange={handleFilterChange}></input>  
          </div>
        </form>
    </div>
  )
}

export default FilterForm