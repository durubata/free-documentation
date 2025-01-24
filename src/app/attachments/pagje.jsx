export default async function AttachmentsPage() {
  // Fetching  data from local JSON
  const res = await fetch('http://localhost:3000/data/docsdata.json')
  const docs = await res.json()

  return (
    <div>
      <h1>{docs.title}</h1>
      <p>{docs.description}</p>
      <h2>Appmint Docs</h2>
      <ul>
        {docs.properties.map((property, index) => (
          <li key={index}>
            <strong>
              {property.name} ({property.type})
            </strong>
            : {property.description}
          </li>
        ))}
      </ul>
    </div>
  )
}
