import React, { useState, useEffect, useRef } from "react";

const emailOptions = [
  "Email with users last name",
  "Email without users last name",
];

function EmailDropdown2() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [dropdownRef]);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          id="gender-menu-button"
          aria-expanded={isOpen ? "true" : "false"}
          aria-haspopup="true"
          onClick={toggleDropdown}
        >
          {selectedGender ? selectedGender : "Select Email Type"}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path fillRule="evenodd" d="M10 14l5-5H5z" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="gender-menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            {emailOptions.map((option) => (
              <button
                key={option}
                className={`${
                  selectedGender === option ? "bg-gray-100" : ""
                } block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900`}
                role="menuitem"
                tabIndex="-1"
                onClick={() => handleGenderSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default EmailDropdown2;
