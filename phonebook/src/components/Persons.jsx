const Persons = ({ persons, handleDelete}) => {
  return (
    <ul>
      {persons.map((person) => (
        <li key={person.id}>
          <div>
            {person.name}: {person.number}
            <button onClick={() => handleDelete(person.id, person.name)}>delete</button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default Persons