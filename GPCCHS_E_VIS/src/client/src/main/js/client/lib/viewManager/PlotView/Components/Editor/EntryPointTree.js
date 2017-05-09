import React, { PropTypes, PureComponent } from 'react';
import {
  Glyphicon,
  Alert,
  Button,
} from 'react-bootstrap';
import classnames from 'classnames';
import Collapse from 'rc-collapse';
import styles from './EntryPointTree.css';
import EntryPointDetailsContainer from './EntryPointDetailsContainer';
/*
  EntryPointTree liste les EntryPoints à afficher.
  Permet également d'appliquer un filtre sur le nom
*/
const { Panel } = Collapse;

export default class EntryPointTree extends PureComponent {
  static propTypes = {
    entryPoints: PropTypes.arrayOf(PropTypes.object),
    search: PropTypes.string,
    remove: PropTypes.func.isRequired,
  }

  static defaultProps = {
    entryPoints: [],
    search: '',
  };

  static contextTypes = {
    viewId: React.PropTypes.string,
    windowId: React.PropTypes.string,
  }

  state = { openPanels: [] };

  onChange = openPanels =>
    this.setState({ openPanels })

  handleRemove = (e, key) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.remove(key);
  }

  render() {
    const { viewId, windowId } = this.context;
    const mask = `${this.props.search}.*`;
    const { entryPoints } = this.props;
    const { openPanels } = this.state;
    const list = entryPoints
      .filter(entryPoint => entryPoint.name.toLowerCase().match(mask.toLowerCase()));

    if (!list.length) {
      return (<Alert bsStyle="info" className="m0">
        Nothing to display.
      </Alert>);
    }


    return (
      <Collapse accordion={false} onChange={this.onChange}>
        {list.map((entryPoint, key) => {
          const isOpen = openPanels.includes(entryPoint.id);
          return (
            <Panel
              key={entryPoint.id}
              header={
                <div className="rc-collapse-header-inner">
                  {entryPoint.objectStyle && entryPoint.objectStyle.curveColor &&
                    <div style={{ width: '30px' }}>
                      <div
                        className={styles.colorSquare}
                        style={{
                          backgroundColor: entryPoint.objectStyle.curveColor,
                        }}
                      />
                    </div>
                  }
                  <span className="flex">{entryPoint.name}</span>
                  <div>
                    <Button
                      bsSize="xsmall"
                      className={classnames('btn-link', styles.removeButton)}
                      onClick={e => this.handleRemove(e, key)}
                    >
                      <Glyphicon
                        className="text-danger"
                        glyph="remove"
                        title="Remove"
                      />
                    </Button>
                  </div>
                </div>
              }
            >
              {isOpen && <EntryPointDetailsContainer
                key={`${entryPoint.name}#details`}
                idPoint={key}
                windowId={windowId}
                viewId={viewId}
                entryPoint={entryPoint}
              />}
            </Panel>
          );
        })}
      </Collapse>
    );
  }
}
