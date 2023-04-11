export default async function getResponseUpdate(id, status) {
  const response = await fetch(`http://localhost:3000/?method=ticketById&id=${id}&status=${status}`, {
    method: 'PUT',
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
