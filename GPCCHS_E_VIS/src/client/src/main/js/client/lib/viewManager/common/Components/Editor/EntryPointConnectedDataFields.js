import React, { PropTypes, PureComponent } from 'react';
import { Field, FieldArray } from 'redux-form';
import FiltersFields from '../../../commonEditor/Fields/FiltersFields';
import HorizontalFormGroup from '../../../../windowProcess/commonReduxForm/HorizontalFormGroup';
import TextareaField from '../../../../windowProcess/commonReduxForm/TextareaField';
import InputField from '../../../../windowProcess/commonReduxForm/InputField';
import DomainFieldContainer from '../../../commonEditor/Fields/DomainFieldContainer';
import TimelineFieldContainer from '../../../commonEditor/Fields/TimelineFieldContainer';

const { string } = PropTypes;

/*
  All the fields used in Connected data form
  It can be used with a prefix to map exactly form's initialValues'ss tructure
*/
export default class EntryPointConnectedDataFields extends PureComponent {
  static propTypes = {
    timeline: string.isRequired,
    domain: string.isRequired,
  };

  static defaultProps = {
    timeline: null,
    domain: null,
  };

  static contextTypes = {
    windowId: React.PropTypes.string,
  };

  render() {
    const { timeline, domain } = this.props;
    const { windowId } = this.context;

    return (
      <div>
        <HorizontalFormGroup label="Formula">
          <Field
            name="formula"
            component={TextareaField}
            rows="4"
            className="form-control input-sm"
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Unit">
          <Field
            name="unit"
            component={InputField}
            type="text"
            className="form-control input-sm"
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Domain">
          <DomainFieldContainer
            domainName={domain}
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Timeline">
          <TimelineFieldContainer
            windowId={windowId}
            timelineName={timeline}
          />
        </HorizontalFormGroup>

        <FieldArray
          name="filter"
          component={FiltersFields}
        />
      </div>
    );
  }
}
