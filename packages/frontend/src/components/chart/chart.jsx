import { VictoryPie, VictoryLabel } from 'victory';
import { ChartTable } from './chartTable';
import { colorPallete } from '../../stylesheet/chartColors';
import './chart.scss';

export const Chart = ({ expenseByCategory, income, balance, expensesSum }) => {
  const dataForPieChart = expenseByCategory.map((categoryData) => ({
    label: categoryData.category,
    y: categoryData.amount,
  }));

  return (
    <>
      <div className="mainSheet">
        <div className="statsSheet">
          <h2 className="pieHeader">Statistics</h2>
          <div className="pieStyle">
            <svg viewBox="0 0 280 280">
              <VictoryPie
                standalone={false}
                innerRadius={100}
                width={280}
                height={280}
                labelComponent={<></>}
                data={dataForPieChart}
                padding={0}
                colorScale={colorPallete}
              ></VictoryPie>
              <VictoryLabel
                textAnchor="middle"
                style={{
                  fontSize: 18,
                  fontFamily: 'Circe',
                  fontWeight: '700',
                }}
                x={140}
                y={140}
                text={balance}
              />
            </svg>
          </div>
        </div>
        <div className="chartStyle">
          <ChartTable
            data={dataForPieChart}
            income={income}
            colorPallete={colorPallete}
          />
        </div>
      </div>
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
