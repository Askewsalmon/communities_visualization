import PropTypes from "prop-types";
import {
  Listbox,
  ListboxOptions,
  ListboxButton,
  ListboxOption,
} from "@headlessui/react";
const CustomSelect = ({ selectOptions, value, onChange }) => {
  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative mr-6 w-40 h-[2.2rem]">
        <ListboxButton className="relative flex w-full h-full text-white text-left pl-3 pt-1.5 bg-orange-600 rounded-lg shadow-md border border-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-orange-300 focus:ring-orange-600 sm:text-sm">
          {value}
          <svg
            className="h-3 fill-white ml-auto mr-3 mt-1"
            viewBox="0 0 512 512"
          >
            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
          </svg>
        </ListboxButton>
        <ListboxOptions className="absolute w-full text-white mt-1 bg-black rounded-md border border-white border-solid max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {selectOptions.map((option, idx) => (
            <ListboxOption
              key={idx}
              className={() =>
                `cursor-pointer select-none relative py-2 px-2 text-white hover:bg-orange-700 ${
                  idx < selectOptions.length - 1
                    ? "border-b-2 border-b-white rounded-t-md"
                    : "rounded-b-md"
                }`
              }
              value={option.value}
            >
              {option.label}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
};

CustomSelect.propTypes = {
  selectOptions: PropTypes.array,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default CustomSelect;
