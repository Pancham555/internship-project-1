"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import FilterDropdown from "@components/components/dropdowns/filterDropDown";
import Table from "@components/components/table/table";
import Range from "@components/components/range/range";
import Navbar from "@components/components/navbar/navbar";

export default function Filter5() {
  const [data, setData] = useState([]);
  const rangeValues = { min: 0, max: 1000 };
  const [value, setValue] = useState(5);

  const getData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/filters/filter5?limit=${value}`
      );
      setData([...res.data]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [value]);
  return (
    <main className="p-5">
      <Navbar />
      <FilterDropdown>
        <Range
          max={rangeValues.max}
          min={rangeValues.min}
          step={1}
          title="Top Cities with highest users and average income:"
          value={value}
          setValue={setValue}
        />
      </FilterDropdown>

      <Table headers={["City", "Total Users", "Average Income"]} data={data} />
      <div className="flex justify-center mt-8">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
          onClick={() => setValue((prevItemsToShow) => prevItemsToShow + 10)}
        >
          Load More
        </button>
      </div>
    </main>
  );
}
