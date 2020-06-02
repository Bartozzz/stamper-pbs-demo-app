import React from "react";
import { mount } from "enzyme";

import MapCard from "./";
import colors from "../../constants/Colors";

const getByTestID = (component, ID) => {
  return component.findWhere((node) => node.prop("testID") === `${ID}`);
};

const mocks = [
  // Active
  {
    active: true,
    address: "ul. Urzędnicza 35",
    backgroundImageUrl:
      "https://stamperstorestaging.blob.core.windows.net/adata/backgrounds/restaurant.jpg",
    cardDescription:
      "1 zabieg o wartości 200 zł = 1 pieczątka. Zbierz 5 pieczątek i odbierz darmowy zabieg o wartości 200 zł.",
    companyDescription:
      "Company Description, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ecommerceUrl: "www.google.com",
    filter: "Jedzenie",
    id: "89deb3bf-ad37-44aa-0b24-08d7168f1fc9",
    inWallet: false,
    logoUrl:
      "https://a.static.getstamper.com/logos/755e0172-f557-4f66-7c83-08d680c25417_stampr-sygnet.png",
    merchantName: "Stamper",
    openingHours: "Pon - Pt 07:00 - 09:00",
    phone: "601 910 484",
    title: "Zabieg",
    validDays: "0",
    validTo: false,
    validToDate: "01/01/0001",
    website: "www.google.pl",
  },

  // Inactive (including phone, website and description)
  {
    active: false,
    address: "ul. Urzędnicza 35",
    backgroundImageUrl:
      "https://stamperstorestaging.blob.core.windows.net/adata/backgrounds/restaurant.jpg",
    cardDescription:
      "1 zabieg o wartości 200 zł = 1 pieczątka. Zbierz 5 pieczątek i odbierz darmowy zabieg o wartości 200 zł.",
    filter: "Jedzenie",
    id: "89deb3bf-ad37-44aa-0b24-08d7168f1fc9",
    inWallet: false,
    logoUrl:
      "https://a.static.getstamper.com/logos/755e0172-f557-4f66-7c83-08d680c25417_stampr-sygnet.png",
    merchantName: "Stamper",
    openingHours: "Pon - Pt 07:00 - 09:00",
    title: "Zabieg",
    validDays: "0",
    validTo: false,
    validToDate: "01/01/0001",
    website: "www.google.pl",
  },
];

describe("MapCard", () => {
  it("should flip the card", () => {
    const component = mount(<MapCard {...mocks[0]} />);
    const toggler = getByTestID(component, "toggle-flip");

    expect(getByTestID(component, "card-not-fliped").first()).toBeTruthy();
    toggler.first().props().onPress();
    component.update();
    expect(getByTestID(component, "card-fliped").first()).toBeTruthy();
  });

  it("buttons should have #dad9e3 color if they're inactive", () => {
    const component = mount(<MapCard {...mocks[1]} />);

    const companyDescription = getByTestID(component, "company-description");
    const phone = getByTestID(component, "phone-number");
    const commerceLink = getByTestID(component, "commerce-link");
    const addCard = getByTestID(component, "add-card");

    expect(companyDescription.last().prop("style")[0].backgroundColor).toBe(
      "#dad9e3"
    );
    expect(phone.last().prop("style")[0].backgroundColor).toBe("#dad9e3");
    expect(commerceLink.last().prop("style")[0].backgroundColor).toBe(
      "#dad9e3"
    );
    expect(addCard.last().prop("style")[0].backgroundColor).toBe("#dad9e3");
  });

  it("buttons should have colors.primary color if they're active", () => {
    const component = mount(<MapCard {...mocks[0]} />);

    const companyDescription = getByTestID(component, "company-description");
    const phone = getByTestID(component, "phone-number");
    const commerceLink = getByTestID(component, "commerce-link");
    const addCard = getByTestID(component, "add-card");

    expect(companyDescription.last().prop("style")[0].backgroundColor).toBe(
      colors.primary
    );
    expect(phone.last().prop("style")[0].backgroundColor).toBe(colors.primary);
    expect(commerceLink.last().prop("style")[0].backgroundColor).toBe(
      colors.primary
    );
    expect(addCard.last().prop("style")[0].backgroundColor).toBe(
      colors.primary
    );
  });
});
