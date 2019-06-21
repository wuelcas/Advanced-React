import { mount } from "enzyme";
import wait from "waait";
import toJSON from "enzyme-to-json";
import { MockedProvider } from "react-apollo/test-utils";
import Order, { SINGLE_ORDER_QUERY } from "../components/Order";
import { fakeOrder } from "../lib/testUtils";

const mocks = [
  {
    request: { query: SINGLE_ORDER_QUERY, variables: { id: "abc123" } },
    result: { data: { order: {...fakeOrder() } } },
  },
];

describe("<Order />", () => {
  it("renders and matches the snapshot", async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <Order id="abc123" />
      </MockedProvider>,
    );

    await wait();
    wrapper.update();

    expect(toJSON(wrapper.find("OrderStyles"))).toMatchSnapshot();
  });
});
