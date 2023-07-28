import { Chart } from '../chart/chart.jsx';
import { useSelector } from 'react-redux';
import { selectMonthlyStats } from '../../redux/finance/selectors';

export default function DiagramTab() {
  const data = useSelector(selectMonthlyStats);

  return (
    <div>
      <Chart
        expenseByCategory={data.expenseByCategory}
        income={data.income}
        balance={data.income - data.expense}
        expensesSum={data.expense}
      />
    </div>
  );
}
