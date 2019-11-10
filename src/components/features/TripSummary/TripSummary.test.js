import React from 'react';
import {shallow} from 'enzyme';
import TripSummary from './TripSummary';

describe('Component TripSummary', () => {

  it('should link to proper site', () => {
    const expectedId = 'abc';
    const component = shallow(<TripSummary id={expectedId} tags={[expectedId]} image='test.jpg' name='abc' cost='5euro' days={5}/>);
    expect(component.find('.link').prop('to')).toEqual(`/trip/${expectedId}`);
  });

  it('should render proper alt and src for image', () => {
    const expectedAlt = 'abc';
    const expectedSrc = 'image.jpg';
    const component = shallow(<TripSummary image={expectedSrc} name={expectedAlt} tags={[expectedAlt]} cost='5euro' days={5} id='abc'/>);
    expect(component.find('img').prop('src')).toEqual(expectedSrc);
    expect(component.find('img').prop('alt')).toEqual(expectedAlt);
  });

  it('should properly render props name, cost, days', () => {
    const expectedName = 'abc';
    const expectedCost = 'one';
    const expectedDays = 4;
    const component = shallow(<TripSummary name={expectedName} cost={expectedCost} days={expectedDays} tags={[expectedName]} id='abc' image='test.jpg'/>);
    expect(component.find('img').prop('alt')).toEqual(expectedName);
    expect(component.find('.title').text()).toEqual(expectedName);
    expect(component.find('.details').text()).toContain(expectedCost);
    expect(component.find('.details').text()).toContain(expectedDays);
  });

  it('should render tags properly', () => {
    const expectedTags = ['abc', 'def', 'ghi'];
    const component = shallow(<TripSummary tags={expectedTags} id='abc' image='test.jpg' days={5} cost='5euro' name='abc'/>);
    expect(component.find('.tag').at(0).text()).toEqual(expectedTags[0]);
    expect(component.find('.tag').at(1).text()).toEqual(expectedTags[1]);
    expect(component.find('.tag').at(2).text()).toEqual(expectedTags[2]);
  });

  it('should not render div tags without prop tags', () => {
    const component = shallow(<TripSummary id='abc' image='image.jpg' name='abc' cost='5euro' days={5}/>);
    expect(component.find('.tags')).toBeTruthy();
  });

});
