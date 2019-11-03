import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderOption.scss';


const OrderOptionNumber = props => (
  <div className={styles.component}>
    {props.id}
  </div>
);

OrderOptionNumber.propTypes = {
  id: PropTypes.string,
  defaultValue: PropTypes.number,
  price: PropTypes.string,
  limits: PropTypes.object,
};

export default OrderOptionNumber;
