import React from "react";
import { FontSize } from "@ds.e/foundation";

interface TextProps {
  size?: keyof typeof FontSize;
}

const Text: React.FC<TextProps> = ({ size = FontSize.md, children }) => {
  const className = `dse-text-${size}`;

  return <p className={className}>{children}</p>;
};

export default Text;