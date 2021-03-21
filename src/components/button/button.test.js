// import { EnzymeAdapter } from "enzyme";
import {shallow} from "enzyme";
import Button from "./Button";

it("checks if button component matches the snapshot", () => {
    expect(shallow(<Button> Start Again </Button>)).toMatchSnapshot();
})
