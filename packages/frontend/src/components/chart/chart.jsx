import { useSelector } from 'react-redux';
import { VictoryPie } from 'victory';
import { selectTransactions } from '../../redux/finance/selectors';
import { statisticsSum } from '../../utils/calcStatistics';

const colorPallete = [
  '#FED057',
  '#FFD8D0',
  '#FD9498 ',
  '#C5BAFF',
  '#6E78E8',
  '#4A56E2',
  '#81E1FF',
  '#24CCA7',
  '#00AD84',
  '#cf97a9',
];

export const ChartTable = ({ data }) => {
  return (
    <table>
      <tbody>
        {data.map((el, index) => (
          <tr key={el.label}>
            <td>
              <div
                style={{
                  backgroundColor: colorPallete[index],
                  borderRadius: '2px',
                  width: '24px',
                  height: '24px',
                }}
              ></div>
            </td>
            <td>{el.label}</td>
            <td>{el.y}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const Chart = () => {
  const data = useSelector(selectTransactions);

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
      />
      <ChartTable data={dataForPieChart} />
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
