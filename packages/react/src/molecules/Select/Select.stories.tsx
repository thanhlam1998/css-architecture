import React from "react";
import Select from "./Select";

import { withA11y } from "@storybook/addon-a11y";

// css
import "@ds.jindo/scss/lib/Select.css";

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

export default {
  title: "Molecules/Select",
  decorators: [withA11y],
};

export const Common = () => <Select options={options} />;

export const RenderOption = () => (
  <Select
    options={options}
    renderOption={({ option, getOptionRecommendedProps, isSelected }) => (
      <span {...getOptionRecommendedProps()}>
        {option.label} {isSelected ? "SELECTED!" : ""}
      </span>
    )}
  />
);

export const CustomLabel = () => (
  <Select label="Select a color" options={options} />
);
