export default async function postUpdateForm(formData, el) {
  const response = await fetch('http://localhost:3000/?method=createTicket', {
    method: 'POST',
    body: formData,
  });

  const jsonData = await response.json();
  const ticketEl = el;
  ticketEl.querySelector('.ticket-name').innerHTML = `${jsonData.name}`;
  ticketEl.querySelector('.ticket-name').dataset.name = jsonData.name;
}
