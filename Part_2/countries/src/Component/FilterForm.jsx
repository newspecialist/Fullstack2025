import { useState, useEffect, useRef } from 'react';

const FilterForm = ({ description, onSelected, list }) => {
  const [listToShow, setListToShow] = useState(list || []);
  const [filter, setFilter] = useState('');
  const [tooManyResults, setTooManyResults] = useState(false);
  const lastSelectedRef = useRef(null);

  // Sync listToShow with list prop initially and when list changes
  useEffect(() => {
  if (!filter) {
      if (list.length > 10) {
        setListToShow([]);
        setTooManyResults(true);
      } else {
        setListToShow(list);
        setTooManyResults(false);
      }
    }
}, [list, filter]);

  // Only trigger onSelected if it's a new selection
  useEffect(() => {
    if (listToShow.length === 1) {
      const selected = listToShow[0];
      if (lastSelectedRef.current !== selected) {
        lastSelectedRef.current = selected;
        onSelected(selected); // only called once per unique selection
      }
    }
  }, [listToShow, onSelected]);

  const handleFilterChange = (event) => {
    const newFilter = event.target.value;
    setFilter(newFilter);

    // Filter list by matching items with the filter string (case-insensitive)
    const filtered = list.filter(item =>
      item.toLowerCase().includes(newFilter.toLowerCase())
    );
   if (filtered.length > 10) {
    setListToShow([]); // show nothing if more than 10
    setTooManyResults(true);
  } else {
    setListToShow(filtered);
    setTooManyResults(false);
  }
  };

  const List = ({ item }) => (
  <p 
    style={{ cursor: 'pointer', padding: '4px 0' }}
    onClick={() => onSelected(item)}
  >
    {item}
  </p>
);

  return (
    <div>
      <form>
        <div>
          <label htmlFor="filter">{description}:</label>
          <input
            type="text"
            value={filter}
            id="filter"
            onChange={handleFilterChange}
          />
        </div>
      </form>
    
    {tooManyResults ? (
        <p style={{ color: 'red' }}>Too many results, please refine your search.</p>
      ) : 
      
        listToShow.map((item, index) => (
          <div
            key={index}
            onClick={() => onSelected(item)}
            style={{
              padding: '8px',
              cursor: 'pointer',
              borderBottom: '1px solid #eee',
              backgroundColor: '#fff',
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f0f0f0'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#fff'}
          >
            {item}
          </div>
    ))}
    </div>
  );
};

export default FilterForm;
