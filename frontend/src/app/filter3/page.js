"use client";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import FilterDropdown from "@components/components/dropdowns/filterDropDown";
import Table from "@components/components/table/table";
import Range from "@components/components/range/range";
import TextInput from "@components/components/textInput/textInput";
import Navbar from "@components/components/navbar/navbar";

export default function Filter3() {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [lastName, setLastName] = useState("");
  const [loadLimit, setLoadLimit] = useState(10);
  const rangeValues = { min: 0, max: 50 };
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
        `http://localhost:5000/filters/filter3?letter=${lastName}&ql=${value}&limit=${loadLimit}`
      );
      setData([...res.data]);
    } catch (error) {
      console.log(error);
    }
  }, [loadLimit, lastName, value]);

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
          step={1}
          title="Quote character length (Greater than):"
          value={value}
          setValue={setValue}
        />
        <TextInput lastName={lastName} setLastName={setLastName} />
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
