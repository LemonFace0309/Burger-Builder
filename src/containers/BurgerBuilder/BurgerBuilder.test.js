import React from 'react'

import { configure, shallow } from 'enzyme' //shallow from "shallow" renderer (good for isolated tests)
import Adapter from 'enzyme-adapter-react-16'

import { BurgerBuilder } from './BurgerBuilder'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

configure({ adapter: new Adapter() })

describe('<BurgerBuilder />', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} />)
  })

  it('should render <BuildControls /> if received ingredients', () => {
    wrapper.setProps({
      ingredients: true,
    })
    expect(wrapper.find(BuildControls)).toHaveLength(1)
  })
})
