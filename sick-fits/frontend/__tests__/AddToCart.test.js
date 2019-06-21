import { mount } from "enzyme";
import wait from "waait";
import toJSON from "enzyme-to-json";
import { MockedProvider } from "react-apollo/test-utils";
import { ApolloConsumer } from "react-apollo";
import AddToCart, { ADD_TO_CART_MUTATION } from "../components/AddToCart";
import { CURRENT_USER_QUERY } from "../components/User";
import { fakeUser, fakeCartItem } from "../lib/testUtils";

const mocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: { ...fakeUser(), cart: [] } } },
  },
  {
    request: { query: ADD_TO_CART_MUTATION, variables: { id: "abc123" } },
    result: { data: { addToCart: { ...fakeCartItem(), quantity: 1 } } },
  },
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: { ...fakeUser(), cart: [fakeCartItem()] } } },
  },
];

describe("<AddToCart />", () => {
  it("renders and matches snapshot", async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <AddToCart id="abc123" />
      </MockedProvider>,
    );

    await wait();
    wrapper.update();

    expect(toJSON(wrapper.find("button"))).toMatchSnapshot();
  });

  it("adds and item to cart when clicked", async () => {
    let apolloClient;
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <ApolloConsumer>
          {client => {
            apolloClient = client;
            return <AddToCart id="abc123" />;
          }}
        </ApolloConsumer>
      </MockedProvider>,
    );

    await wait();
    wrapper.update();

    const { data: { me } } = await apolloClient.query({ query: CURRENT_USER_QUERY });
    expect(me.cart).toHaveLength(0);
    wrapper.find("button").simulate("click");
    await wait();
    wrapper.update();
    const res = await apolloClient.query({ query: CURRENT_USER_QUERY });
    const me2 = res.data.me;

    expect(me2.cart).toHaveLength(1);
    expect(me2.cart[0].quantity).toBe(3);
  });

  it("changes from add to adding when click", async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <AddToCart id="abc123" />
      </MockedProvider>,
    );

    await wait();
    wrapper.update();

    expect(wrapper.text()).toContain("Add to Cart");
    wrapper.find("button").simulate("click");
    expect(wrapper.text()).toContain("Adding to Cart");
  });
});
