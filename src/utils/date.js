import moment from 'moment';

const formatDate = (
  date,
  format = 'YYYY-MM-DD'
) => (moment(date).format(format));

export default formatDate;
