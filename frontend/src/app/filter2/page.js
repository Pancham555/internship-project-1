"use client";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import FilterDropdown from "@components/components/dropdowns/filterDropDown";
import Table from "@components/components/table/table";
import Range from "@components/components/range/range";
import GenderDropdown from "@components/components/dropdowns/genderDropDown";
import Navbar from "@components/components/navbar/navbar";

export default function Filter2() {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [selectedGender, setSelectedGender] = useState("");
  const [loadLimit, setLoadLimit] = useState(10);
  const rangeValues = { min: 0, max: 20000 };
  const [value, setValue] = useState(rangeValues.max / 2);
  const getHeading = async () => {
    try {
      const res = await axios.get("http://localhost:5000/headers");
      setHeaders([...res.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const getData = useCallback(async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/filters/filter2?gender=${
          selectedGender === "All" ? "" : selectedGender
        }&phone_price=${value}&limit=${loadLimit}`
      );
      setData([...res.data]);
    } catch (error) {
      console.log(error);
    }
  }, [loadLimit, selectedGender, value]);
  //
  useEffect(() => {
    getHeading();
    getData();
  }, [getData]);
  return (
    <main className="p-5">
      <Navbar />
      <FilterDropdown>
        <Range
          max={rangeValues.max}
          min={rangeValues.min}
          step={10}
          title="Phone Price (Greater than):"
          value={value}
          setValue={setValue}
        />
        <GenderDropdown
          selectedGender={selectedGender}
          setSelectedGender={setSelectedGender}
        />
      </FilterDropdown>

      <Table headers={headers} data={data} />
      <div className="flex justify-center mt-8">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
          onClick={() =>
            setLoadLimit((prevItemsToShow) => prevItemsToShow + 10)
          }
        >
          Load More
        </button>
      </div>
    </main>
  );
}
