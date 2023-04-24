function TextInput({ heading = "Last Name", lastName, setLastName }) {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 font-bold mb-2"
        htmlFor="text-input"
      >
        {heading}
      </label>
      <input
        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="text-input"
        type="text"
        placeholder="Enter text here"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
    </div>
  );
}

export default TextInput;
