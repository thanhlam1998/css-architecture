import React, { useState } from "react";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  onOptionSelected?: (option: SelectOption, optionIndex: number) => void;
  options?: SelectOption[];
  label?: string;
}

const Select: React.FC<SelectProps> = ({
  options = [],
  label = "Plase select an options...",
  onOptionSelected: handler,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOptionSelected = (option: SelectOption, optionIndex: number) => {
    setIsOpen((prev) => !prev);

    handler?.(option, optionIndex);
  };

  const onLabelClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      <button onClick={onLabelClick}>{label}</button>

      {isOpen && (
        <ul>
          {options.map((option, optionIndex) => {
            return (
              <li
                onClick={() => onOptionSelected(option, optionIndex)}
                key={option.value}>
                {option.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Select;
