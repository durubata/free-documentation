// export async function fetchDocs() {
//   const response = await fetch('', {
//     headers: {
//       Authorization: `Bearer ${process.env.Y}`,
//     },
//   })
//   if (!response.ok) {
//     throw new Error('Failed to fetch AppMint docs')
//   }
//   return response.json()
// }

export async function fetchDocs() {
  const response = await fetch('/data/docsData.json') 
  if (!response.ok) {
    throw new Error('Failed to fetch mock data')
  }
  return response.json()
}
