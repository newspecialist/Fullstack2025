
const Part = (props) => {

  return (
    <p>{props.part.name} {props.part.exercises} </p>
  )
}

const Header = (props) => {
  return (
      <h1>{props.course}</h1>
    )
  }

const Total = (props) => {

  function mySum(total, num) {

    return total + num.exercises
    
  }

  return (
      <p>Number of exercises {props.parts.reduce(mySum, 0)}</p>
  )
}

const Course = (props) => {


  return (
    <div>
      <Header course={props.course.name}/>
      
       {props.course.parts.map(part =>
          <Part key= {part.id} part={part}/>
        )}
      
      <Total parts={props.course.parts}/>
    </div>
  )
}

export default Course