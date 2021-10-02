import React, { useState, useRef, useEffect } from 'react';
import Text from '../../atoms/Text/Text.js';

const Select = ({ options = [], label = "Please select an options...", onOptionSelected: handler, renderOption, }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const labelRef = useRef(null);
    const [overlayTop, setOverlayTop] = useState(0);
    const onOptionSelected = (option, optionIndex) => {
        handler?.(option, optionIndex);
        setSelectedIndex(optionIndex);
        setIsOpen(false);
    };
    const onLabelClick = () => {
        setIsOpen((prev) => !prev);
    };
    useEffect(() => {
        setOverlayTop((labelRef.current?.offsetHeight || 0) + 10);
    }, [labelRef.current?.offsetHeight]);
    let selectedOption = null;
    if (selectedIndex !== null) {
        selectedOption = options[selectedIndex];
    }
    return (React.createElement("div", { className: "dse-select" },
        React.createElement("button", { ref: labelRef, className: "dse-select__label", onClick: onLabelClick },
            React.createElement(Text, null, selectedOption === null ? label : selectedOption.label),
            React.createElement("svg", { className: `dse-select__caret ${isOpen ? "dse-select__caret--open" : "dse-select__caret--closed"}`, width: "1rem", height: "1rem", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
                React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }))),
        isOpen && (React.createElement("ul", { style: { top: overlayTop }, className: "dse-select__overlay" }, options.map((option, optionIndex) => {
            const isSelected = selectedIndex === optionIndex;
            const renderOptionProps = {
                option,
                isSelected,
                getOptionRecommendedProps: (overrideProps = {}) => {
                    return {
                        className: `dse-select__option ${isSelected ? "dse-select__option--select" : ""}`,
                        key: option.value,
                        onClick: () => onOptionSelected(option, optionIndex),
                        ...overrideProps,
                    };
                },
            };
            if (renderOption) {
                return renderOption(renderOptionProps);
            }
            return (React.createElement("li", { className: `dse-select__option ${isSelected ? "dse-select__option--select" : ""}`, onClick: () => onOptionSelected(option, optionIndex), key: option.value },
                React.createElement(Text, null, option.label),
                isSelected && (React.createElement("svg", { widths: "1rem", height: "1rem", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
                    React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" })))));
        })))));
};

export { Select as default };
//# sourceMappingURL=Select.js.map
