import React, {
  createRef,
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";

import Text from "../../atoms/Text";

const KEYS = ["Enter", " ", "ArrowDown"];

interface SelectOption {
  label: string;
  value: string;
}

interface RenderOptionProps {
  isSelected: boolean;
  option: SelectOption;
  getOptionRecommendedProps: (overrideProps?: Object) => Object;
}
interface SelectProps {
  onOptionSelected?: (option: SelectOption, optionIndex: number) => void;
  options?: SelectOption[];
  label?: string;
  renderOption?: (props: RenderOptionProps) => React.ReactNode;
}

const getNextOptionIndex = (
  currentIndex: number | null,
  options: Array<SelectOption>
) => {
  if (currentIndex === null) {
    return 0;
  }

  if (currentIndex === options.length - 1) {
    return 0;
  }

  return currentIndex + 1;
};

const getPreviousOptionIndex = (
  currentIndex: number | null,
  options: Array<SelectOption>
) => {
  if (currentIndex === null) {
    return 0;
  }

  if (currentIndex === 0) {
    return options.length - 1;
  }

  return currentIndex - 1;
};

const Select: React.FC<SelectProps> = ({
  options = [],
  label = "Please select an options...",
  onOptionSelected: handler,
  renderOption,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [optionRefs, setOptionRefs] = useState<
    React.RefObject<HTMLLIElement>[]
  >([]);
  const labelRef = useRef<HTMLButtonElement>(null);
  const [overlayTop, setOverlayTop] = useState<number>(0);

  const onOptionSelected = (option: SelectOption, optionIndex: number) => {
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

  const highlightOption = (optionIndex: number | null) => {
    setHighlightedIndex(optionIndex);
  };

  const onButtonKeyDown: KeyboardEventHandler = (event) => {
    event.preventDefault();
    if (KEYS.includes(event.key)) {
      setIsOpen(true);

      // set focus on the list item
      highlightOption(0);
    }
  };

  useEffect(() => {
    setOptionRefs(options.map((_) => createRef<HTMLLIElement>()));
  }, [options.length]);

  useEffect(() => {
    if (highlightedIndex !== null && isOpen) {
      const ref = optionRefs[highlightedIndex];

      if (ref && ref.current) {
        ref.current.focus();
      }
    }
  }, [isOpen, highlightedIndex]);

  const onOptionKeydown: KeyboardEventHandler = (event) => {
    if (event.key === "Escape") {
      setIsOpen(false);
      return;
    }

    if (event.key === "ArrowDown") {
      highlightOption(getNextOptionIndex(highlightedIndex, options));
    }

    if (event.key === "ArrowUp") {
      highlightOption(getPreviousOptionIndex(highlightedIndex, options));
    }

    if (event.key == "Enter") {
      onOptionSelected(options[highlightedIndex!], highlightedIndex!);
    }
  };

  return (
    <div className="dse-select">
      <button
        aria-haspopup={true}
        aria-expanded={isOpen ? true : undefined}
        aria-controls="dse-select-list"
        ref={labelRef}
        onKeyDown={onButtonKeyDown}
        className="dse-select__label"
        onClick={onLabelClick}>
        <Text>{selectedOption === null ? label : selectedOption.label}</Text>
        <svg
          className={`dse-select__caret ${
            isOpen ? "dse-select__caret--open" : "dse-select__caret--closed"
          }`}
          width="1rem"
          height="1rem"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <ul
          role="menu"
          style={{ top: overlayTop }}
          className="dse-select__overlay">
          {options.map((option, optionIndex) => {
            const isSelected = selectedIndex === optionIndex;
            const isHighlighted = highlightedIndex === optionIndex;

            const ref = optionRefs[optionIndex];

            const renderOptionProps = {
              ref,
              option,
              isSelected,
              getOptionRecommendedProps: (overrideProps = {}) => {
                return {
                  ref: ref,
                  role: "menuitemradio",
                  "aria-label": option.label,
                  "aria-checked": isSelected ? true : undefined,
                  className: `dse-select__option ${
                    isSelected ? "dse-select__option--select" : ""
                  } ${isHighlighted ? "dse-select__option--highlighted" : ""}`,
                  key: option.value,
                  tabIndex: isHighlighted ? -1 : 0,
                  onMouseEnter: () => highlightOption(optionIndex),
                  onMouseLeave: () => highlightOption(null),
                  onKeyDown: onOptionKeydown,
                  onClick: () => onOptionSelected(option, optionIndex),
                  ...overrideProps,
                };
              },
            };

            if (renderOption) {
              return renderOption(renderOptionProps);
            }
            return (
              <li {...renderOptionProps.getOptionRecommendedProps()}>
                <Text>{option.label}</Text>
                {isSelected && (
                  <svg
                    widths="1rem"
                    height="1rem"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Select;
