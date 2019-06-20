import { mount } from "enzyme";
import toJSON from "enzyme-to-json";
import wait from "waait";
import PleaseSignIn from "../components/PleaseSignIn";
import Nav from "../components/Nav";
import { CURRENT_USER_QUERY } from "../components/User";
import { MockedProvider } from "react-apollo/test-utils";
import { fakeUser, fakeCartItem } from "../lib/testUtils";

const notSignInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: null } },
  },
];
const signedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: {
      ...fakeUser(),
      cart:[fakeCartItem(), fakeCartItem(), fakeCartItem()]
    } } },
  },
];

const signedInMocksWithMockedItems = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: fakeUser() } },
  },
]

describe("<Nav />", () => {
  it("renders a minimal nav when signed out", async () => {
    const wrapper = mount(
      <MockedProvider mocks={notSignInMocks}>
        <Nav />
      </MockedProvider>,
    );

    await wait();
    wrapper.update();

    const nav = wrapper.find("NavStyles");
    expect(toJSON(nav)).toMatchSnapshot();
  });

  it("renders full nav when sign in", async () => {
    const wrapper = mount(
      <MockedProvider mocks={signedInMocks}>
        <Nav />
      </MockedProvider>,
    );

    await wait();
    wrapper.update();

    const nav = wrapper.find("NavStyles ul");
    expect(nav.children().length).toBe(6);
    expect(nav.text()).toContain("Sign Out");
  });

  it("renders the amount of items in the cart", async () => {
    const wrapper = mount(
      <MockedProvider mocks={signedInMocksWithMockedItems}>
        <Nav />
      </MockedProvider>,
    );

    await wait();
    wrapper.update();

    const nav = wrapper.find("NavStyles");
    const count = nav.find('.count');

    expect(toJSON(count)).toMatchSnapshot();
  })
});
