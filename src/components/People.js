import React from 'react'

const People = ({ people, delPhone }) => {

  return (
    people.map(person => 
      <ul key={person.name}>
        <li>{person.name} {person.phone} <button onClick={() => delPhone(person.id)}>Delete</button> </li>
      </ul>
    )
  )
}

export default People