// import { EnzymeAdapter } from "enzyme";
import {shallow, mount, render} from "enzyme";
import SearchBox from "./SearchBox";

describe("SearchBox Component tests", () => {

    function setCity(city){
        return(
            console.log(city)
        )
    }

it("checks if SearchBox container component matches the snapshot", () => {
    
    expect(shallow(<SearchBox 
        placeholder = "London"
        setSearchedItem = {setCity}
        navigate = {"/weather"}
    />)).toMatchSnapshot();
})

it('should call onChange prop', () => {
    const city = "London";
    const path="/";
    const wrapper = shallow(<SearchBox.WrappedComponent setSearchedItem = {setCity} placeholder = {city} navigate = {path}/>);
    const instance = wrapper.instance();
    // const onChange = jest.fn();
    const event = {
      target: { value: "London" }
    };
    wrapper.find('input').simulate('change', event);

    expect(wrapper.find('input').prop('value')).toEqual(
        'London',
      );
  });

});