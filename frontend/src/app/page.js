"use client";
import Navbar from "@components/components/navbar/navbar";
import Table from "@components/components/table/table";
import axios from "axios";
import { useEffect, useState } from "react";
export default function Home() {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [loadLimit, setLoadLimit] = useState(10);
  const getHeading = async () => {
    try {
      const res = await axios.get("http://localhost:5000/headers");
      setHeaders([...res.data]);
    } catch (error) {
      console.log(error);
    }
  };
  const getData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/users?limit=${loadLimit}`
      );
      setData([...res.data]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHeading();
    getData();
  }, [loadLimit]);
  return (
    <main className="p-5">
      <Navbar />
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
