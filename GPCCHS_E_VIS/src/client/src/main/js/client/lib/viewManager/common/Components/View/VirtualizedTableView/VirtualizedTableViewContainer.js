import { connect } from 'react-redux';
import VirtualizedTableView from './VirtualizedTableView';

const mapStateToProps = () => {
  const generateColumns = n => Array(...Array(n)).map((_, index) => ({ name: `c${index}` }));
  const generateRows =
    (n, m) =>
      Array(...Array(m))
        .map(
          (_, rowIndex) =>
            Array(...Array(n)).map((__, colIndex) =>
              ({
                value: `(${rowIndex}, ${colIndex})`,
              })
            ));

  const N = 10000;

  const COLS = generateColumns(10);
  const ROWS = generateRows(10, N);

  return {
    columns: COLS,
    rows: ROWS,
  };
};

const mapDispatchToProps = ({
  onCellClick: (i, j, content) => {
    console.error('[NotImplementedError] Click on cell has not yet been implemented');
    console.info(`Clicked on cell (${i}, ${j}) with content: ${JSON.stringify(content)}`);
  },
  onCellDoubleClick: (i, j, content) => {
    console.error('[NotImplementedError] Double-click on cell has not yet been implemented');
    console.info(`Clicked on cell (${i}, ${j}) with content: ${JSON.stringify(content)}`);
  },
});

const VirtualizedTableViewContainer =
  connect(mapStateToProps, mapDispatchToProps)(VirtualizedTableView);


export default VirtualizedTableViewContainer;
