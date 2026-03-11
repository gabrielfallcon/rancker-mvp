import OverrunByAreaChart from './OverrunByAreaChart';
import RootCausesChart from './RootCausesChart';
import styles from '../dash.module.scss';

export default function OverrunDashboard() {
  return (
    <div className={styles.listGraphs}>
      <div className={styles.card}>
        <h3>Estouros por Área</h3>
        <OverrunByAreaChart />
      </div>

      <div className={styles.card}>
        <h3>Principais Causas de Estouro</h3>
        <RootCausesChart />
      </div>
    </div>
  );
}
