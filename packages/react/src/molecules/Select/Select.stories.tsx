import React from "react";
import Select from "./Select";

export default {
  title: "Select",
};

// css
import "@ds.e/scss/lib/Select.css";

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

export const Common = () => <Select options={options} />;
