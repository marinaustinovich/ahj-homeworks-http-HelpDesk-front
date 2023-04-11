import Ticket from './Ticket';

export default function renderTickets(item) {
  const tableBody = document.querySelector('tbody');
  const tableRow = document.createElement('tr');
  const ticket = new Ticket(item, tableRow);

  tableRow.classList.add('ticket-row');
  tableRow.innerHTML = ticket.markUp();
  tableRow.setAttribute('data-row', item.id);

  const statusEl = tableRow.querySelector('.done');
  if (statusEl.dataset.status === 'true') {
    statusEl.innerHTML = '&#10003;';
  }

  ticket.events(tableRow);
  tableBody.append(tableRow);
}
