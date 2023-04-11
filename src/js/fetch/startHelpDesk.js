import HelpDesk from '../HelpDesk/HelpDesk';
import renderTickets from '../HelpDesk/renderTickets';

export default async function startHelpDesk() {
  const response = await fetch('http://localhost:3000/?method=allTickets', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.status >= 200 && response.status < 300) {
    try {
      const jsonData = await response.json();
      const helpDesk = new HelpDesk();
      helpDesk.bindToDOM(document.querySelector('#ticket-container'));
      jsonData.forEach((item) => renderTickets(item));
    } catch (e) {
      /* eslint-disable */
      console.error(e);
    }
  }
}
