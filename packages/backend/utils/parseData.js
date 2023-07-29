const parseNumber = (input) => {
  if (input.includes(',') && input.includes('.')) {
    throw new Error('Wrong format of amount');
  }

  input = input.replace(',', '.');

  const number = parseFloat(input); // parseFloat(input) lub parseInt(input, 10);

  return number;
};

module.exports = { parseNumber };
