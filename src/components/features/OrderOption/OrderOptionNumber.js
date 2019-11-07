import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderOption.scss';
import {formatPrice} from '../../../utils/formatPrice.js';


const OrderOptionNumber = ({currentValue, setOptionValue, limits, price}) => (
  <div className={styles.number}>
    <input type='number'
      className={styles.inputSmall}
      value={currentValue} min={limits.min} max={limits.max}
      onChange={event => setOptionValue(event.currentTarget.value)} /> paid {formatPrice(price)}
  </div>
);

OrderOptionNumber.propTypes = {
  id: PropTypes.string,
  defaultValue: PropTypes.number,
  limits: PropTypes.object,
  price: PropTypes.string,
  currentValue: PropTypes.number,
  setOptionValue: PropTypes.func,
};

export default OrderOptionNumber;
