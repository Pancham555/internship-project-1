"use client";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import FilterDropdown from "@components/components/dropdowns/filterDropDown";
import Table from "@components/components/table/table";
import EmailDropdown1 from "@components/components/dropdowns/emailDropDown/emailDropDown-1";
import CarTag from "@components/components/dropdowns/carTagDropdown";
import Navbar from "@components/components/navbar/navbar";

export default function Filter4() {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [loadLimit, setLoadLimit] = useState(10);
  const [selectedEmail, setSelectedEmail] = useState("Email with numbers");
  const [cars, setCars] = useState([]);
  const getHeading = async () => {
    try {
      const res = await axios.get("http://localhost:5000/headers");
      setHeaders([...res.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const getCars = async () => {
    try {
      const res = await axios.get("http://localhost:5000/cars");
      setCars([...res.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const getData = useCallback(async () => {
    try {
      const val = selectedTags.join(", ");
      const valEmail = selectedEmail === "Email with numbers" ? 0 : 1;
      const res = await axios.get(
        `http://localhost:5000/filters/filter4?cars=${val}&email_not_num=${valEmail}&limit=${loadLimit}`
      );
      setData([...res.data]);
    } catch (error) {
      console.log(error);
    }
  }, [loadLimit, selectedTags, selectedEmail]);

  useEffect(() => {
    getHeading();
    getCars();
    getData();
  }, [getData]);
  return (
    <main className="p-5">
      <Navbar />
      <FilterDropdown>
        <EmailDropdown1
          selectedEmail={selectedEmail}
          setSelectedEmail={setSelectedEmail}
        />
        <CarTag
          tagsList={cars}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
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
