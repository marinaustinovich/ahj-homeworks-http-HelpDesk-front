import getResponseDescription from '../fetch/getResponseDescription';
import getResponseUpdate from '../fetch/getResponseUpdate';
import putResponseStatus from '../fetch/putResponseStatus';

export default class Ticket {
  constructor(data, container) {
    this.row = container;
    this.bindToDOM(data);
  }

  bindToDOM(data) {
    this.row.innerHTML = `
    <span class="done" data-status="${data.status}"></span>
    <th colspan="2" class="ticket-name" data-name="${data.name}">${data.name}</th>
    <th colspan="2" class="ticket-created">${data.created}</th>
    <th class="ticket-actions"><span class="update">✎</span><span class="delete">✖</span></th>
    `;
  }

  events(container) {
    const updateBtn = container.querySelector('.update');
    const deleteBtn = container.querySelector('.delete');
    const isDoneEl = this.row.querySelector('.done');

    updateBtn.addEventListener('click', (e) => this.update(e));
    deleteBtn.addEventListener('click', (e) => this.delete(e));
    this.row.addEventListener('click', (e) => this.showDescription(e));
    isDoneEl.addEventListener('click', (e) => this.done(e));
  }

  /* eslint-disable */
  update(e) {
    const id = e.target.closest('.ticket-row').dataset.row;
    const form = document.querySelector('#ticket-form');
    form.setAttribute('data-id',id);
    form.closest('.ticket-form-container').classList.add('ticket-form-container_visible');

    getResponseUpdate(id, form);
  }

  delete(e) {
    const id = e.target.closest('.ticket-row').dataset.row;
    const deleteMessage = document.querySelector('.delete-message');
    deleteMessage.classList.add('delete-message_visible');
    deleteMessage.setAttribute('data-id', id);
  }

  showDescription(e) {
    if(this.isTrueForClassName(e)) {
      const nameEl = this.row.querySelector('.ticket-name');
      const descriptionEl = this.row.querySelector('.ticket-description');
      if (descriptionEl) {
        nameEl.innerHTML = `${nameEl.dataset.name}`;
      } else {
        getResponseDescription(this.row.dataset.row, nameEl)
      }
    }
  }

  done(e) {
    const id = e.target.closest('.ticket-row').dataset.row;
    let status = false;
    if (e.target.dataset.status === 'false') {
      e.target.innerHTML = `&#10003;`;
      status = 'true';
      e.target.dataset.status = status;
    } else {
      e.target.innerText = '';
      e.target.dataset.status = 'false';
    }
    putResponseStatus(id, status);
  }

  markUp() {
    return this.row.innerHTML;
  }

  isTrueForClassName(e) {
    return e.target.className !== 'update' && e.target.className !== 'delete' && e.target.className !== 'done'
  }
}
