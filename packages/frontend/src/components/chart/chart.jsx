import { VictoryPie } from 'victory';
import { ChartTable } from './chartTable';
import { colorPallete } from '../../stylesheet/chartColors';

export const Chart = ({ expenseByCategory, income, balance, expensesSum }) => {
  const dataForPieChart = expenseByCategory.map((categoryData) => ({
    label: categoryData.category,
    y: categoryData.amount,
  }));

  return (
    <>
      <VictoryPie
        innerRadius={100}
        data={dataForPieChart}
        width={280}
        height={280}
        labelComponent={<></>}
        padding={0}
        colorScale={colorPallete}
      ></VictoryPie>
      <h2>&#36;{balance}</h2>
      <p>Total Expenses: &#36;{expensesSum}</p>
      <ChartTable
        data={dataForPieChart}
        income={income}
        colorPallete={colorPallete}
      />
    </>
  );
};

// #FED057 main expenses
// #FFD8D0 products
// #FD9498 car
// #C5BAFF self care
// #6E78E8 child care
// #4A56E2 household products
// #81E1FF education
// #24CCA7 leisure
// #00AD84 other expenses
// #  entertainment
