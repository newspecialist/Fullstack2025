const H2li = ({ H2, list, className = 'H2li' }) => {

  const List = ({ item }) => (
   <li>
    {item}
   </li>
  );
    
  return (
    <div className={className}>
      <h2>{H2}</h2>
      <ul>
       {list.map((item, index) =>
        (
         <List key={index} item={item}/>
        ))}
      </ul> 
    </div>
  )
}

export default H2li