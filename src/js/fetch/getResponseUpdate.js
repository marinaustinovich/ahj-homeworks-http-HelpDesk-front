export default async function getResponseUpdate(id, el) {
  const response = await fetch(`http://localhost:3000/?method=ticketById&id=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.status >= 200 && response.status < 300) {
    try {
      const jsonData = await response.json();
      const nameInput = el.querySelector('[data-id="name"]');
      const descriptionInput = el.querySelector('[data-id="description"]');
      nameInput.value = jsonData.name;
      descriptionInput.value = jsonData.description;
    } catch (e) {
      /* eslint-disable */
      console.error(e);
    }
  }
}
