import { mount } from "enzyme";
import toJSON from "enzyme-to-json";
import wait from "waait";
import { MockedProvider } from "react-apollo/test-utils";
import Router from "next/router";
import CreateItem, { CREATE_ITEM_MUTATION } from "../components/CreateItem";
import { fakeItem } from "../lib/testUtils";

const shoeImage = "https://good.com/papasharkshoes.jpg";
global.fetch = jest.fn().mockResolvedValue({
  json: () => ({
    secure_url: shoeImage,
    eager: [{ secure_url: shoeImage }],
  }),
});

describe("<CreateItem />", () => {
  it("renders and matches snapshot", () => {
    const wrapper = mount(
      <MockedProvider>
        <CreateItem />
      </MockedProvider>,
    );

    const form = wrapper.find("Form");
    expect(toJSON(form)).toMatchSnapshot();
  });

  it("uploads a file when changed", async () => {
    const wrapper = mount(
      <MockedProvider>
        <CreateItem />
      </MockedProvider>,
    );

    const imageInput = wrapper.find("input[type='file']");
    imageInput.simulate("change", { target: { files: ["fakeshoe.jpg"] } });
    await wait();
    wrapper.update();
    const component = wrapper.find("CreateItem").instance();
    expect(component.state.image).toEqual(shoeImage);
    expect(component.state.largeImage).toEqual(shoeImage);
    expect(global.fetch).toHaveBeenCalled();
    global.fetch.mockReset();
  });

  it("handle state updating", async () => {
    const wrapper = mount(
      <MockedProvider>
        <CreateItem />
      </MockedProvider>,
    );

    wrapper
      .find("#title")
      .simulate("change", { target: { value: "Testing", name: "title" } });
    wrapper
      .find("#price")
      .simulate("change", { target: { value: 50000, name: "price" } });
    wrapper.find("#description").simulate("change", {
      target: { value: "Description", name: "description" },
    });

    expect(wrapper.find("CreateItem").instance().state).toMatchObject({
      title: "Testing",
      price: 50000,
      description: "Description",
    });
  });

  it("creates an item when the form is submitted", async () => {
    const item = fakeItem();
    const mocks = [
      {
        request: {
          query: CREATE_ITEM_MUTATION,
          variables: {
            title: item.title,
            description: item.description,
            image: "",
            largeImage: "",
            price: item.price,
          },
        },
        result: {
          data: {
            createItem: {
              ...item,
              id: "abc123",
              __typename: "Item",
            },
          },
        },
      },
    ];

    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <CreateItem />
      </MockedProvider>,
    );

    wrapper
      .find("#title")
      .simulate("change", { target: { value: item.title, name: "title" } });
    wrapper
      .find("#price")
      .simulate("change", { target: { value: item.price, name: "price" } });
    wrapper.find("#description").simulate("change", {
      target: { value: item.description, name: "description" },
    });

    // mock the router

    Router.router = { push: jest.fn() };
    wrapper.find("form").simulate("submit");
    await wait(50);
    expect(Router.router.push).toHaveBeenCalled();
    expect(Router.router.push).toHaveBeenCalledWith({
      pathname: "/item",
      query: { id: "abc123" },
    });
  });
});
