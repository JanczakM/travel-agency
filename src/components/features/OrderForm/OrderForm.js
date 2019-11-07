import React from 'react';
import PropTypes from 'prop-types';
import pricing from '../../../data/pricing.json';
//import styles from './OrderForm.scss';
import OrderSummary from '../OrderSummary/OrderSummary';
import OrderOption from '../OrderOption/OrderOption';
import {Row, Col} from 'react-flexbox-grid';

const OrderForm = props => (
  <Row>
    {pricing.map(option => (
      <Col md={4} key={option.id}>
        <OrderOption {...option} currentValue={props.options[option.id]} setOrderOption={props.setOrderOption}/>
      </Col>
    ))}
    <Col xs={12}>
      <OrderSummary totalCost={props.tripCost} tripOptions={props.options}/>
    </Col>
  </Row>
);

OrderForm.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
  setOrderOption: PropTypes.func,
};

export default OrderForm;
