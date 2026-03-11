import { DividerTag } from '~/presentation/components/common';
import styles from './dash.module.scss';
import OverrunDashboard from './components/OverrunDashboard';

const DashComponent = () => {
  return (
    <div className={styles.dashContainer}>
      <h1>Análise de estouro</h1>

      <div className={styles.listInfos}>
        <div className={styles.info}>
          <strong>Obra:</strong> <span> Nubank</span>
        </div>
        <div className={styles.info}>
          <strong>Unidade:</strong> <span> Apto 1203</span>
        </div>
        <div className={styles.info}>
          <strong>Fornecedor:</strong> <span> Abc investimentos</span>
        </div>
      </div>

      <div className={styles.listValues}>
        <div className={styles.value}>
          <span>Valor Previsto</span>
          <DividerTag />
          <p>R$ 48.000,00</p>
        </div>
        <div className={styles.value}>
          <span>Valor da Compra</span>
          <DividerTag />
          <p>R$ 63.500,00</p>
        </div>
        <div className={styles.value}>
          <span>Estouro</span>
          <DividerTag />
          <p style={{ color: '#f57979' }}>R$15.500,00</p>
        </div>
        <div className={styles.value}>
          <span>% Estouro</span>
          <DividerTag />
          <p style={{ color: '#f57979' }}>+32%</p>
        </div>
      </div>

      <div className={styles.listStack}>
        <h2>Origem do estouro</h2>

        <div className={styles.listInfos}>
          <div className={styles.info}>
            <strong>Área: </strong> <span>Arquitetura</span>
          </div>

          <div className={styles.info}>
            <strong>Categoria: </strong> <span>Desenvolvimento</span>
          </div>

          <div className={styles.info}>
            <strong>Motivo: </strong>{' '}
            <span>Erro de especificação/Premissa</span>
          </div>
        </div>
      </div>

      <OverrunDashboard />
    </div>
  );
};

export default DashComponent;
