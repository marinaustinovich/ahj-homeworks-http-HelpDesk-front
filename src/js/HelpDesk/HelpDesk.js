import TicketForm from './TicketForm';
import deleteResponse from '../fetch/deleteResponse';

export default class HelpDesk {
  constructor() {
    this.container = null;
    this.ticketForm = null;
    this.deleteMessage = null;
  }

  bindToDOM(container) {
    this.container = container;

    this.drawUi();
    this.events();
  }

  drawUi() {
    this.checkBinding();

    this.container.innerHTML = `
      <table class="table">
      <thead>
        <tr class="tickets">
          <th colspan="6" style="text-align:right" data-id="add"><span class="add">Добавить тикет</span></th>
        </tr>
      </thead>
      <tbody></tbody>
      </table>
      <div class="delete-message">
        <h2>Удалить тикет</h2>
        <div>Вы уверены, что хотите удалить тикет? Это действие необратимо</div>
        <div class="ticket-btn">
          <button type="button" class="btn btn-close" data-toggle="close-message" title="Close delete message">Отмена</button>
          <button type="button" class="btn btn-add" data-toggle="delete-ticket" title="Button for delete ticket">Ok</button>
        </div>
      </div>
      <div class="form-error ticket-form-error"></div>
      `;

    const ticketForm = new TicketForm(this.container);
    ticketForm.bindToDOM();

    this.ticketForm = this.container.querySelector('.ticket-form-container');
    this.deleteMessage = this.container.querySelector('.delete-message');
  }

  checkBinding() {
    if (this.container === null) {
      throw new Error('Form not bind to DOM');
    }
  }

  events() {
    const addEl = this.container.querySelector('[data-id="add"]');
    const deleteTicket = this.container.querySelector('[data-toggle="delete-ticket"]');
    const closeMessage = this.container.querySelector('[data-toggle="close-message"]');

    addEl.addEventListener('click', () => this.showForm());
    deleteTicket.addEventListener('click', (e) => this.deleteTicket(e));
    closeMessage.addEventListener('click', () => this.closeMessage());
  }

  showForm() {
    this.ticketForm.classList.add('ticket-form-container_visible');
  }

  deleteTicket() {
    deleteResponse(this.deleteMessage.dataset.id);

    const ticket = this.container.querySelector(`[data-row="${this.deleteMessage.dataset.id}"]`);
    ticket.parentNode.removeChild(ticket);
    this.closeMessage();
  }

  closeMessage() {
    this.deleteMessage.classList.remove('delete-message_visible');
  }
}
