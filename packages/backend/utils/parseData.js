const parseNumber = (input) => {
  if (input.includes(',') && input.includes('.')) {
    throw new Error('Wrong format of amount');
  }

  input = input.replace(',', '.');

  const number = parseFloat(input);

  return number;
};

module.exports = { parseNumber };
