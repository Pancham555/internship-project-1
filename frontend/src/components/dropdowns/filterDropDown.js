import { useState, useEffect, useRef } from "react";

function FilterDropdown({ children }) {
  const [showFilters, setShowFilters] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowFilters(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleFilters = () => {
    setShowFilters((prevShowFilters) => !prevShowFilters);
  };

  return (
    <div className="relative inline-block text-left mb-3" ref={dropdownRef}>
      <div>
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={toggleFilters}
        >
          Filters
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M6.2929 8.29289C6.68342 7.90237 7.31658 7.90237 7.7071 8.29289L10 10.58579L12.2929 8.29289C12.6834 7.90237 13.3166 7.90237 13.7071 8.29289C14.0976 8.68342 14.0976 9.31658 13.7071 9.7071L10.7071 12.7071C10.3166 13.0976 9.68342 13.0976 9.29289 12.7071L6.2929 9.7071C5.90237 9.31658 5.90237 8.68342 6.2929 8.29289Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {showFilters && (
        <div className="origin-top-right absolute left-0 mt-2 w-auto p-5 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1 flex gap-5 flex-wrap"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

export default FilterDropdown;
