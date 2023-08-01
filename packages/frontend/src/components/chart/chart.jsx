import { VictoryPie, VictoryLabel } from 'victory';
import { ChartTable } from './chartTable';
import { colorPallete } from '../../stylesheet/utils/chartColors';
import '../../stylesheet/utils/breakpoints.scss';
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
            <svg viewBox="0 0 288 288">
              <VictoryPie
                standalone={false}
                innerRadius={100}
                width={288}
                height={288}
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
                text={`€ ${balance}`}
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
