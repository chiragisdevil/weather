// import { EnzymeAdapter } from "enzyme";
import {shallow} from "enzyme";
import CardContainer from "./CardContainer";
import sampleTestData from "./card-container-sample";

describe("Card Component tests", () => {

it("checks if card container component matches the snapshot", () => {
    expect(shallow(<CardContainer />)).toMatchSnapshot();
})


it("checks if card container component matches the snapshot", () => {
    expect(shallow(<CardContainer forecast={sampleTestData}/>)).toMatchSnapshot();
})


});
