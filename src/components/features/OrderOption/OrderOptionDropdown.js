import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderOption.scss';


const OrderOptionDropdown = props => (
  <div className={styles.component}>
    {props.id}
  </div>
);

OrderOptionDropdown.propTypes = {
  id: PropTypes.string,
  values: PropTypes.array,
};

export default OrderOptionDropdown;
