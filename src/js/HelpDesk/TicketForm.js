import messages from './messages';
import postForm from '../fetch/postForm';
import postUpdateForm from '../fetch/postUpdateForm';

export default class TicketForm {
  constructor(container) {
    this.container = container;
    this.form = null;
    this.currentElError = undefined;
  }

  bindToDOM(data) {
    this.form = document.createElement('div');
    this.form.classList.add('ticket-form-container');
    let formData = data;
    if (!data) {
      formData = {
        name: '',
        description: '',
      };
    }
    this.form.innerHTML = `
    <form id="ticket-form" novalidate>
      <div class="form-control form-ticket">
        <label class="label-ticket" for="name">Краткое описание</label>
        <input name="name" data-id="name" class="input input-ticket" type="text" placeholder="ticket name" autocomplete="off" value="${formData.name}" required> 
      </div>
      <div class="form-control form-ticket">
        <label for="description" class="label-ticket">Полное описание</label>
        <textarea name="description" data-id="description" class="input input-ticket" placeholder="ticket description" autocomplete="off" value="${formData.description}"
            cols="25" rows="5" maxlength="100" minlength="20" tabindex="0"></textarea>
      </div>

      <div class="ticket-btn">
        <button type="button" class="btn btn-close" data-toggle="ticket-close" title="Close ticket form">Отмена</button>
        <button type="submit" class="btn btn-add" data-toggle="ticket-add" title="Submit ticket form">ОК</button>
      </div>
    </form>
      `;

    this.container.append(this.form);

    const ticketFormContainer = this.form.closest('.ticket-form-container');
    const table = this.container.querySelector('.table');
    const coords = table.getBoundingClientRect();
    ticketFormContainer.style.top = `${coords.top + window.scrollY + this.container.offsetHeight + table.offsetHeight}px`;

    this.events();
  }

  events() {
    const closeBtn = this.form.querySelector('[data-toggle="ticket-close"]');

    closeBtn.addEventListener('click', () => this.closeForm());
    this.form.addEventListener('submit', (e) => this.onSubmit(e));
  }

  closeForm() {
    const ticketForm = document.querySelector('#ticket-form');
    if (ticketForm.dataset.id) ticketForm.removeAttribute('data-id');

    ticketForm.reset();
    this.form.classList.remove('ticket-form-container_visible');
    if (!this.currentElError) this.container.querySelector('.ticket-form-error').classList.remove('form-error_visible');
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.currentElError) this.container.querySelector('.ticket-form-error').classList.remove('form-error_visible');

    const ticketForm = this.form.querySelector('#ticket-form');
    this.formElements = [...ticketForm.elements];

    const notValidEl = TicketForm.getNotValidEl(this.formElements);
    if (!notValidEl) {
      if (ticketForm.dataset.id) {
        const ticketUpdateForm = new FormData(document.getElementById('ticket-form'));
        ticketUpdateForm.append('id', ticketForm.dataset.id);
        const ticket = this.container.querySelector(`[data-row="${ticketForm.dataset.id}"]`);
        postUpdateForm(ticketUpdateForm, ticket);
      } else {
        const ticketCreateForm = new FormData(document.getElementById('ticket-form'));
        ticketCreateForm.append('id', null);
        ticketCreateForm.append('status', 'false');
        postForm(ticketCreateForm);
      }
      this.closeForm();
    } else {
      this.showError(notValidEl);
      notValidEl.focus();
      this.currentElError = undefined;
    }
  }

  showError(el) {
    const messageError = messages[el.dataset.id];
    const formError = this.container.querySelector('.form-error');

    formError.innerText = messageError;
    formError.classList.add('form-error_visible');
    const coords = el.getBoundingClientRect();

    this.currentElError = el;
    formError.style.top = `${coords.top + window.scrollY + el.offsetHeight / 2 + formError.offsetHeight / 2}px`;
    formError.style.left = `${coords.left + window.scrollX}px`;
  }

  static getNotValidEl(array) {
    /* eslint-disable */
    return array.find((el) => {
      if (el.type !== 'button' && el.type !== 'submit') {
        return !el.value;
      }
    });
  }
}
