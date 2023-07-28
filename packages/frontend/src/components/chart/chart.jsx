import { useSelector } from 'react-redux';
import { VictoryPie } from 'victory';
import { selectTransactions } from '../../redux/finance/selectors';
import { statisticsSum } from '../../utils/calcStatistics';
import { selectBalance } from '../../redux/finance/selectors';
import { ChartTable } from './chartTable';
import { colorPallete } from '../../stylesheet/chartColors';

export const Chart = () => {
  const data = useSelector(selectTransactions);
  const balance = useSelector(selectBalance);

  const statisticsData = statisticsSum(data);

  const dataForPieChart = Object.keys(statisticsData)
    .filter((category) => category !== 'Income')
    .map((category) => ({
      label: category,
      y: statisticsData[category],
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
      <ChartTable data={dataForPieChart} income={statisticsData.Income} colorPallete={colorPallete} />
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
