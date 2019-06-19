import Item from "../components/Item";
import { shallow, mount } from "enzyme";
import toJSON from "enzyme-to-json";

const fakeItem = {
  id: "ABC123",
  title: "A cool item",
  price: 5000,
  description: "Cool item",
  image: "dog.jpg",
  largeImage: "do-large.jpg",
};

describe("<Item />", () => {
  it("Renders the img properly", () => {
    const wrapper = shallow(<Item item={fakeItem} />);
    const img = wrapper.find("img");
    expect(img.props().src).toBe(fakeItem.image);
    expect(img.props().alt).toBe(fakeItem.title);
  });

  it("Renders the price tag and title properly", () => {
    const wrapper = shallow(<Item item={fakeItem} />);
    const priceTag = wrapper.find("PriceTag");
    expect(priceTag.children().text()).toEqual("$50");
    expect(wrapper.find("Title a").text()).toEqual(fakeItem.title);
  });

  it("Renders out the buttons properly", () => {
    const wrapper = shallow(<Item item={fakeItem} />);
    const buttonList = wrapper.find(".buttonList");
    expect(buttonList.children()).toHaveLength(3);
    expect(buttonList.find("Link").exists()).toBe(true);
    expect(buttonList.find("AddToCart").exists()).toBe(true);
    expect(buttonList.find("DeleteItem").exists()).toBe(true);
  });
});

describe("<Item /> snapshot", () => {
  it("Renders and matches the snapshot", () => {
    const wrapper = shallow(<Item item={fakeItem} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});