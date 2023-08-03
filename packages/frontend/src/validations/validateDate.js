import moment from 'moment';

export function isPreviousDay() {
  const yesterday = moment().subtract(1, 'day');
  let valid = function (current) {
    return current.isAfter(yesterday);
  };

  return valid;
}
