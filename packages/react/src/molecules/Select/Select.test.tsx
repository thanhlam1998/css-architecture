import React from "react";
import Select from "./Select";

import { render, fireEvent } from "@testing-library/react";

const options = [
  {
    label: "Strict Black",
    value: "strict-black",
  },
  {
    label: "Heavenly Green",
    value: "heavenly-green",
  },
  {
    label: "Sweet Pink",
    value: "sweet-pink",
  },
];

test("renders all options pass to it", () => {
  const { getAllByRole, getByTestId } = render(<Select options={options} />);

  fireEvent.click(getByTestId("DseSelectButton"));

  expect(getAllByRole("menuitemradio")).toHaveLength(options.length);
});

test("renders options using custom renderOption method if passed as props", () => {
  //
});

test("calls the onOptionSelected prop with the selected option and its index if passed", () => {
  //
});

test("the button label changes to the selected option label", () => {
  //
});

test("snapshot of the selected option state", () => {
  //
});

test("snapshot of the base state", () => {
  //
});

test("snapshot of the options menu open state", () => {
  //
});
