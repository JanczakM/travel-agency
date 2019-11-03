import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderOption.scss';


const OrderOptionIcons = props => (
  <div className={styles.component}>
    {props.id}
  </div>
);

OrderOptionIcons.propTypes = {
  id: PropTypes.string,
  required: PropTypes.bool,
  defaultValue: PropTypes.string,
  values: PropTypes.array,
};

export default OrderOptionIcons;
