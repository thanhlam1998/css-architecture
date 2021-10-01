import React, { useState } from 'react';

const Select = ({ options = [], label = "Plase select an options...", onOptionSelected: handler, }) => {
    const [isOpen, setIsOpen] = useState(false);
    const onOptionSelected = (option, optionIndex) => {
        setIsOpen((prev) => !prev);
        handler?.(option, optionIndex);
    };
    const onLabelClick = () => {
        setIsOpen((prev) => !prev);
    };
    return (React.createElement("div", null,
        React.createElement("button", { onClick: onLabelClick }, label),
        isOpen && (React.createElement("ul", null, options.map((option, optionIndex) => {
            return (React.createElement("li", { onClick: () => onOptionSelected(option, optionIndex), key: option.value }, option.label));
        })))));
};

export { Select as default };
//# sourceMappingURL=Select.js.map
