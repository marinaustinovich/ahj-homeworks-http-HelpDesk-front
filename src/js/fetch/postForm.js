import renderTickets from '../HelpDesk/renderTickets';

export default async function postForm(formData) {
  const response = await fetch('http://localhost:3000/?method=createTicket', {
    method: 'POST',
    body: formData,
  });

  const jsonData = await response.json();
  await renderTickets(jsonData);
}
