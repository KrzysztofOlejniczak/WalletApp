import { Chart } from '../chart/chart.jsx';
import { useSelector } from 'react-redux';
import {
  selectBalance,
  selectTransactions,
} from '../../redux/finance/selectors';

export default function DiagramTab() {
  const balance = useSelector(selectBalance);
  const stats = useSelector(selectTransactions);
  return (
    <>
      <div>
        <Chart />
      </div>
    </>
  );
}
