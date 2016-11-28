/* eslint import/no-webpack-loader-syntax:0 */
import React, { PropTypes } from 'react';
import Select from 'react-select';
import '!style!css!react-select/dist/react-select.css';

export default class ReactSelectField extends React.Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    placeholder: PropTypes.string,
    className: PropTypes.string
  }

  onChange = (event) => {
    if (this.props.input.onChange) {
      this.props.input.onChange(event.value);
    }
  }

  onBlur = () => {
    if (this.props.input.onBlur) {
      this.props.input.onBlur(this.props.input.value);
    }
  }

  render() {
    const {
      input,
      placeholder,
      className,
      ...rest
    } = this.props;

    return (
      <Select
        {...input}
        {...rest}
        onBlur={this.onBlur}
        onChange={this.onChange}
        className={className}
        placeholder={placeholder}
      />
    );
  }
}
