import React from 'react'

import { configure, shallow } from 'enzyme' //shallow from "shallow" renderer (good for isolated tests)
import Adapter from 'enzyme-adapter-react-16'

import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem'

configure({ adapter: new Adapter() })

describe('<NavigationItems />', () => {
  it('should render two <NavigationItems /> elements if not authenticated', () => {
    const wrapper = shallow(<NavigationItems />)
    expect(wrapper.find(NavigationItem)).toHaveLength(2)
  })
})
