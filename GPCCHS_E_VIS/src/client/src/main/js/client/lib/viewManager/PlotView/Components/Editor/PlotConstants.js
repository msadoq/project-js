import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Glyphicon,
} from 'react-bootstrap';
import classnames from 'classnames';
import Collapse from 'rc-collapse';
import _memoize from 'lodash/memoize';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';

import AddPlotConstant from './AddPlotConstant';
import styles from './EntryPointTree.css';

const { Panel } = Collapse;
const emptyArray = [];

export default class PlotConstants extends Component {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    constants: PropTypes.objectOf(PropTypes.object),
    removeConstant: PropTypes.func.isRequired,
    updateConstant: PropTypes.func.isRequired,
    updateViewSubPanels: PropTypes.func.isRequired,
    panels: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.bool,
    ]).isRequired,
    axes: PropTypes.arrayOf(PropTypes.shape()),
  };

  static defaultProps = {
    constants: {},
    panels: [],
    axes: [],
  };

  onChange = (openPanels) => {
    const { updateViewSubPanels, viewId } = this.props;
    updateViewSubPanels(viewId, 'panels', 'constants', openPanels);
  };

  handleRemovePlotConstant = (e, constantId) => {
    const { removeConstant, viewId } = this.props;
    e.preventDefault();
    e.stopPropagation();
    removeConstant(viewId, constantId);
  };

  handleSubmit(key, values) {
    const { updateConstant, viewId } = this.props;
    updateConstant(
      viewId,
      key,
      { ...values }
    );
  }

  handleSubmitFactory = _memoize(key => values => this.handleSubmit(key, values));

  render() {
    const {
      constants,
      viewId,
      panels,
      axes,
    } = this.props;

    return (
      <ErrorBoundary>
        <Collapse
          accordion={false}
          onChange={this.onChange}
          defaultActiveKey={panels === true ? emptyArray : panels}
        >
          {Object.keys(constants).map((constantId) => {
            const constant = constants[constantId];
            return (
              <Panel
                key={constantId}
                header={
                  <div className="rc-collapse-header-inner">
                    <span className="">&nbsp;&nbsp;&nbsp;{constant.label}</span>
                    {constantId !== 'time' &&
                    <div>
                      <Button
                        bsSize="xsmall"
                        className={classnames(styles.removeButton, 'btn-link')}
                        onClick={e => this.handleRemovePlotConstant(e, constantId)}
                      >
                        <Glyphicon
                          className="text-danger"
                          glyph="remove"
                          title="Remove"
                        />
                      </Button>
                    </div>
                    }
                  </div>
                }
              >
                { Array.isArray(panels) && panels.includes(constantId) &&
                <AddPlotConstant
                  key={constantId}
                  constantId={constantId}
                  initialValues={constant}
                  constant={constant}
                  onSubmit={this.handleSubmitFactory(constantId)}
                  form={`edit-plot-axis-${constant.id}-${viewId}`}
                  axes={axes}
                />}
              </Panel>
            );
          })}
        </Collapse>
      </ErrorBoundary>
    );
  }
}
