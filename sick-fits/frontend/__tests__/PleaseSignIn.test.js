import { mount } from "enzyme";
import wait from "waait";
import PleaseSignIn from "../components/PleaseSignIn";
import { CURRENT_USER_QUERY } from "../components/User";
import { MockedProvider } from "react-apollo/test-utils";
import { fakeUser } from "../lib/testUtils";

const notSignInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: null } },
  },
];
const signedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: fakeUser() } },
  },
];

describe("<PleaseSignIn />", () => {
  it("renders the sign in dialog to logged out users", async () => {
    const wrapper = mount(
      <MockedProvider mocks={notSignInMocks}>
        <PleaseSignIn />
      </MockedProvider>,
    );

    await wait();
    wrapper.update();
    expect(wrapper.text()).toContain("Please sign in!");
    expect(wrapper.find('Signin').exists()).toBe(true);
  });

  it("renders the child component when the user is signed in", async () => {
    const wrapper = mount(
      <MockedProvider mocks={signedInMocks}>
        <PleaseSignIn>
          <p>I'm signed in</p>
        </PleaseSignIn>
      </MockedProvider>,
    );

    await wait();
    wrapper.update();
    expect(wrapper.text()).toContain("I'm signed in");
  })
});
