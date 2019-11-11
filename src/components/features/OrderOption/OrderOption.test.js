import React from 'react';
import {shallow} from 'enzyme';
import OrderOption from './OrderOption';

describe('Component OrderOption', () => {

  it('should render', () => {
    const component = shallow(<OrderOption name='abc' type='icons' />);
    expect(component).toBeTruthy();
  });

  it('should return empty object if called without required props', () => {
    const component = shallow(<OrderOption />);
    expect(component).toEqual({});
  });

  it('should render name', () => {
    const name = 'option one';
    const component = shallow(<OrderOption name={name} type='icons' />);
    expect(component.find('.title').text()).toEqual(name);
  });

  const optionTypes = {
    dropdown: 'OrderOptionDropdown',
    icons: 'OrderOptionIcons',
    checkboxes: 'OrderOptionCheckboxes',
    number: 'OrderOptionNumber',
    text: 'OrderOptionText',
    date: 'OrderOptionDate',
  };

  const mockProps = {
    id: 'abc',
    name: 'Lorem',
    values: [
      {id: 'aaa', icon: 'h-square', name: 'Lorem A', price: 0},
      {id: 'xyz', icon: 'h-square', name: 'Lorem X', price: 100},
    ],
    required: false,
    currentValue: 'aaa',
    price: '50%',
    limits: {
      min: 0,
      max: 6,
    },
  };

  const mockPropsForType = {
    dropdown: {},
    icons: {},
    checkboxes: {currentValue: [mockProps.currentValue]},
    number: {currentValue: 1},
    text: {},
    date: {},
  };

  const testValue = mockProps.values[1].id;
  const testValueNumber = 3;
  const testValueDate = new Date();

  for(let type in optionTypes){
    describe(`Component OrderOption with type=${type}`, () => {
      /* test setup */
      let component;
      let subcomponent;
      let renderedSubcomponent;
      let mockSetOrderOption;

      beforeEach(() => {
        mockSetOrderOption = jest.fn();
        component = shallow(
          <OrderOption
            type={type}
            setOrderOption={mockSetOrderOption}
            {...mockProps}
            {...mockPropsForType[type]}
          />
        );
        subcomponent = component.find(optionTypes[type]);
        renderedSubcomponent = subcomponent.dive();
      });

      /* common tests */
      it(`renders ${optionTypes[type]}`, () => {
        expect(subcomponent).toBeTruthy();
        expect(subcomponent.length).toBe(1);
      });

      /* type-specific tests */
      switch (type) {
        case 'dropdown': {
          it('contains select and options', () => {
            const select = renderedSubcomponent.find('select');
            expect(select.length).toBe(1);

            const emptyOption = select.find('option[value=""]').length;
            expect(emptyOption).toBe(1);

            const options = select.find('option').not('[value=""]');
            expect(options.length).toBe(mockProps.values.length);
            expect(options.at(0).prop('value')).toBe(mockProps.values[0].id);
            expect(options.at(1).prop('value')).toBe(mockProps.values[1].id);
          });
          it('should run setOrderOption function on change', () => {
            renderedSubcomponent.find('select').simulate('change', {currentTarget: {value: testValue}});
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
          });
          break;
        }
        case 'icons': {
          it('renders its elements', () => {
            const iconsContainer = renderedSubcomponent.find('.component');
            const divs = iconsContainer.children();

            expect(iconsContainer).toBeTruthy();
            expect(divs.length).toBe(mockProps.values.length + 1);
            expect(divs.at(0).text()).toEqual('<Icon />none');
            expect(divs.find('.iconActive').length).toBe(1);
            expect(divs.find('.icon').length).toBe(mockProps.values.length - 1);
          });
          it('should run setOrderOption function on click', () => {
            renderedSubcomponent.find('.icon').simulate('click');
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
          });
          break;
        }
        case 'checkboxes': {
          it('renders its elements', () => {
            const input = renderedSubcomponent.find('input');
            const testedValues = mockProps.values;
            expect(input.length).toBe(testedValues.length);
            expect(input.at(0).prop('value')).toBe(mockProps.values[0].id);
            expect(input.at(1).prop('value')).toBe(mockProps.values[1].id);
          });
          it('should run setOrderOption function on change', () => {
            renderedSubcomponent.find('input').at(1).simulate('change', {currentTarget: {checked: true}});
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: [mockProps.currentValue, testValue] });
          });
          break;
        }
        case 'number': {
          it('renders its elements', () => {
            const input = renderedSubcomponent.find('input');
            expect(input.length).toBe(1);
            expect(input.prop('value')).toEqual(mockPropsForType.number.currentValue);
            expect(input.prop('min')).toEqual(mockProps.limits.min);
            expect(input.prop('max')).toEqual(mockProps.limits.max);
          });
          it('should run setOrderOption function on change', () => {
            renderedSubcomponent.find('input').simulate('change', {currentTarget: {value: testValueNumber}});
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValueNumber });
          });
          break;
        }
        case 'text': {
          it('renders its elements', () => {
            const input = renderedSubcomponent.find('input');
            expect(input.length).toBe(1);
            expect(input.prop('value')).toEqual(mockProps.currentValue);
          });
          it('should run setOrderOption function on change', () => {
            renderedSubcomponent.find('input').simulate('change', {currentTarget: {value: testValue}});
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
          });
          break;
        }
        case 'date': {
          it('renders its elements', () => {
            const datePicker = renderedSubcomponent.find('t');
            expect(datePicker.length).toBe(1);
          });
          it('should run setOrderOption function on change', () => {
            renderedSubcomponent.find('t').simulate('change', testValueDate);
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValueDate.getFullYear() + '-' + (testValueDate.getMonth() + 1) + '-' + testValueDate.getDate() });
          });
          break;
        }
      }
    });
  }

});
