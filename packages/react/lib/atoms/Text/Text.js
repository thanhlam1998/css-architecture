import React from 'react';
import { FontSize } from '@ds.jindo/foundation';

const Text = ({ size = FontSize.md, children }) => {
    const className = `dse-text dse-text-${size}`;
    return React.createElement("p", { className: className }, children);
};

export { Text as default };
//# sourceMappingURL=Text.js.map
