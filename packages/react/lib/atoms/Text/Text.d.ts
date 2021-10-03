import React from "react";
import { FontSize } from "@ds.jindo/foundation";
interface TextProps {
    size?: keyof typeof FontSize;
}
declare const Text: React.FC<TextProps>;
export default Text;
