import { Chart } from '../chart/chart.jsx';
import { useSelector } from 'react-redux';
import { selectMonthlyStats } from '../../redux/finance/selectors';
import { Helmet } from 'react-helmet-async';

export default function DiagramTab() {
  const data = useSelector(selectMonthlyStats);

  return (
    <div>
        <Helmet>
        <title>Statistics</title>
      </Helmet>
      <Chart
        expenseByCategory={data.expenseByCategory}
        income={data.income}
        balance={data.income - data.expense}
        expensesSum={data.expense}
      />
    </div>
  );
}
