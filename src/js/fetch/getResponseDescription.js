export default async function getResponseDescription(id, el) {
  const response = await fetch(`http://localhost:3000/?method=ticketById&id=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.status >= 200 && response.status < 300) {
    try {
      const jsonData = await response.json();
      const ticketEl = el;
      ticketEl.innerHTML = `
          ${el.dataset.name}
          <span class="ticket-description ticket-description_visible">${jsonData.description}</span>
         `;
    } catch (e) {
      /* eslint-disable */
      console.error(e);
    }
  }
}
