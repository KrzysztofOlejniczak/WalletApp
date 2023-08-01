import './chart.scss';
import { ChartFilters } from './chartFilters';
export const ChartTable = ({ data, income, colorPallete }) => {
  const expensesSum = data.reduce((acc, el) => {
    return (acc += el.y);
  }, 0);

  return (
    <>
      <ChartFilters />
      <div className="tableHeaderStyle">
        <ul className="tableHeader">
          <li>Category</li>
          <li>Sum</li>
        </ul>
      </div>
      <table className="tableStyle">
        <tbody className="bodyStatsStyle">
          {data.map((el, index) => (
            <tr key={el.label} className="trStatsStyle">
              <td className="columnStatsStyle">
                <div
                  style={{
                    backgroundColor: colorPallete[index],
                    borderRadius: '2px',
                    width: '24px',
                    height: '24px',
                  }}
                ></div>
                {el.label}
              </td>
              <td className="columnStatsStyle">{el.y}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <ul className="tableFooter">
          <li className="columnFooterStatsStyle">
            Expenses:<span className="tableFooterCashBad">{expensesSum}</span>
          </li>
          <li className="columnFooterStatsStyle">
            Income: <span className="tableFooterCash">{income}</span>
          </li>
        </ul>
      </div>
    </>
  );
};
