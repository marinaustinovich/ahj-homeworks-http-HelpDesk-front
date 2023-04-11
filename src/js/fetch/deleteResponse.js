export default async function deleteResponse(id) {
  const response = await fetch(`http://localhost:3000/?method=ticketById&id=${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.status >= 200 && response.status < 300) {
    try {
      const jsonData = await response.text();
      /* eslint-disable */
      console.log(jsonData);
    } catch (e) {
      /* eslint-disable */
      console.error(e);
    }
  }
}
