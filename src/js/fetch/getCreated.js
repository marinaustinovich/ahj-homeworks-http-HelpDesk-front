const dayjs = require('dayjs');

export default function getCreated() {
  return dayjs().format('DD.MM.YY HH:mm');
}
