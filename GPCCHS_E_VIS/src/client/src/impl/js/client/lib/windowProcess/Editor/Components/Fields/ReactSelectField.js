/* eslint import/no-webpack-loader-syntax:0 */
import React, { PropTypes } from 'react';
import Select from 'react-select';
import '!style!css!react-select/dist/react-select.css';

export default class ReactSelectField extends React.Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    free: PropTypes.bool,
    options: PropTypes.array,
  }

  onChange = (event) => {
    if (this.props.input.onChange) {
      this.props.input.onChange(event.value);
    }
  }

  onInputChange = (val) => {
    if (this.props.free) {
      this.props.input.onChange(val);
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
      free,
      ...rest,
    } = this.props;
    let { options } = this.props;

    if (!options.find(e => e.value === input.value) && free) {
      options = options.concat({
        label: input.value,
        value: input.value
      });
    }

    return (
      <Select
        {...input}
        {...rest}
        onBlur={this.onBlur}
        options={options}
        onChange={this.onChange}
        onInputChange={this.onInputChange}
        className={className}
        placeholder={placeholder}
      />
    );
  }
}
