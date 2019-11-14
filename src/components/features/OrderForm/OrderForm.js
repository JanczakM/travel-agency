import React from 'react';
import PropTypes from 'prop-types';
import pricing from '../../../data/pricing.json';
import styles from './OrderForm.scss';
import OrderSummary from '../OrderSummary/OrderSummary';
import OrderOption from '../OrderOption/OrderOption';
import {Row, Col} from 'react-flexbox-grid';
import settings from '../../../data/settings';
import {formatPrice} from '../../../utils/formatPrice';
import {calculateTotal} from '../../../utils/calculateTotal';
import Button from '../../common/Button/Button';

const sendOrder = (options, tripCost, tripName, tripId, countryCode) => {
  const totalCost = formatPrice(calculateTotal(tripCost, options));

  const payload = {
    ...options,
    totalCost,
    tripName,
    tripId,
    countryCode,
  };

  const url = settings.db.url + '/' + settings.db.endpoint.orders;

  const fetchOptions = {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  fetch(url, fetchOptions)
    .then(function(response){
      return response.json();
    }).then(function(parsedResponse){
      console.log('parsedResponse', parsedResponse);
    });

};

const OrderForm = props => (
  <Row>
    {pricing.map(option => (
      <Col md={4} key={option.id} className={styles.formField}>
        <OrderOption {...option} currentValue={props.options[option.id]} setOrderOption={props.setOrderOption} />
      </Col>
    ))}
    <Col xs={12}>
      <OrderSummary totalCost={props.tripCost} tripOptions={props.options}/>
    </Col>
    <Col xs={12}>
      <Button onClick={() => {
        if(props.options.name == '' || props.options.contact == ''){
          if(props.options.name == ''){
            window.alert('Name can not be empty!');
          }
          if(props.options.contact == ''){
            window.alert('Contact can not be empty!');
          }
        }
        else {
          sendOrder(props.options, props.tripCost, props.tripName, props.tripId, props.countryCode);
          window.alert('Form submitted!');
        }
      }}>Order now!</Button>
    </Col>
    <Col xs={12}>
    </Col>
  </Row>
);

OrderForm.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
  setOrderOption: PropTypes.func,
  tripName: PropTypes.string,
  tripId: PropTypes.string,
  countryCode: PropTypes.string,
};

export default OrderForm;
