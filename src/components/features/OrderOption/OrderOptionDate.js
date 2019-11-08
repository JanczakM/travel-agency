import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class OrderOptionDate extends React.Component {

  render() {
    const {setOptionValue, currentValue} = this.props;

    return (
      <DatePicker
        selected={currentValue != '' ? new Date(currentValue) : new Date()}
        onChange={date => {
          const formatDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
          setOptionValue(formatDate);
        }}
        dateFormat="d MMMM yyyy"
      />
    );
  }
}

OrderOptionDate.propTypes = {
  setOptionValue: PropTypes.func,
  id: PropTypes.string,
  currentValue: PropTypes.string,
};

export default OrderOptionDate;
