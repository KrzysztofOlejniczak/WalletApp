export const ChartTable = ({ data, income, colorPallete }) => {
  const expensesSum = data.reduce((acc, el) => {
    return (acc += el.y);
  }, 0);

  return (
    <>
      <div>
        <span>Category</span>
        <span>Sum</span>
      </div>
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
      <ul>
        <li>
          Expenses:<span>{expensesSum}</span>
        </li>
        <li>
          Income: <span>{income}</span>
        </li>
      </ul>
    </>
  );
};
