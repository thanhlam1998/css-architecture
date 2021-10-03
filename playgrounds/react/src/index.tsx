import React from "react";
import ReactDOM from "react-dom";
import { Select } from "@ds.jindo/react";

import "@ds.jindo/scss/lib/Utilities.css";
import "@ds.jindo/scss/lib/Text.css";
import "@ds.jindo/scss/lib/Margin.css";
import "@ds.jindo/scss/lib/Select.css";
import "@ds.jindo/scss/lib/global.css";

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

ReactDOM.render(
  <div style={{ padding: 40 }}>
    <Select options={options} />
  </div>,
  document.getElementById("root")
);
