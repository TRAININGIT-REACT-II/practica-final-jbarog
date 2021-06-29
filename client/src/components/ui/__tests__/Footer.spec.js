import React from "react";
import { render, mount } from "enzyme";

import Footer from "../Footer";

describe(Footer, () => {
  describe("Render", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = render(<Footer />);
    });

    it("set DOM elements", () => {
      expect(wrapper.find("div").length).toBe(1);
      expect(wrapper.find("p").length).toBe(2);
    });

    it("set proper literals", () => {
      expect(wrapper.find(".MuiTypography-body1").text()).toBe("LOREN IPSUM");
    });
  });
});
