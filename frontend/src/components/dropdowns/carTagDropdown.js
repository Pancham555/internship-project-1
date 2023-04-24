import React, { useEffect, useRef, useState } from "react";

const CarTag = ({
  tagsList = [
    "react",
    "tailwind",
    "javascript",
    "html",
    "css",
    "web development",
  ],
  selectedTags,
  setSelectedTags,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  function handleDropdownToggle() {
    setIsOpen(!isOpen);
  }
  const dropdownRef = useRef(null);
  function handleTagSelect(tag) {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag.trim()]);
    }
  }

  function handleTagRemove(tag) {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  }
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRef]);
  return (
    <div className="relative inline-block text-left w-auto" ref={dropdownRef}>
      <div className="flex relative">
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-gray-300 min-w-max shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={handleDropdownToggle}
        >
          Select Cars
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
        <div className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {tagsList.map((tag) => (
              <button
                key={tag}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                role="menuitem"
                onClick={() => handleTagSelect(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedTags.length > 0 && (
        <div className="flex flex-wrap mt-3" id="selected-tags">
          {selectedTags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center cursor-pointer bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
              onClick={() => handleTagRemove(tag)}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default CarTag;
