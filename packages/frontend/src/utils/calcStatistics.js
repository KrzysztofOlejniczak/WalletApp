export const statisticsSum = (data) => {
  return data.reduce((acc, el) => {
    const { category, amount } = el;
    if (!acc[category]) {
      acc[category] = amount;
    } else {
      acc[category] += amount;
    }
    return acc;
  }, {});
};
