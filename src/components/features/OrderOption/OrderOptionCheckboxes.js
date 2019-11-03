import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderOption.scss';


const OrderOptionCheckboxes = props => (
  <div className={styles.component}>
    {props.id}
  </div>
);

OrderOptionCheckboxes.propTypes = {
  id: PropTypes.string,
  values: PropTypes.array,
};

export default OrderOptionCheckboxes;
