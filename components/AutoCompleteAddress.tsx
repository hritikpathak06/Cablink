"use client";
import React, { useEffect, useState } from "react";

const AutoCompleteAddress = () => {
  const [source, setSource] = useState<any>("");
  const [addressList, setAddressList] = useState<any>();
  const [destinationChange, setDestinationChange] = useState<any>(false);
  const [destination, setDestination] = useState<any>();
  const [sourceChange, setSourceChange] = useState<any>(false);

  const getAddressList = async () => {
    setAddressList([]);
    const query = sourceChange ? source : destination;
    const res = await fetch(`/api/search-address?q=${query}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    setAddressList(result);
  };

  useEffect(() => {
    const debaounceFn = setTimeout(() => {
      getAddressList();
    }, 1000);

    return () => clearTimeout(debaounceFn);
  }, [source, destination]);

  return (
    <>
      <div className=" relative">
        <div className=" mt-3">
          <label htmlFor="" className=" text-gray-400">
            Where From?
          </label>
          <input
            type="text"
            value={source}
            className=" bg-white p-1 border-[3px] w-full rounded-md outline-none focus:border-yellow-100"
            onChange={(e: any) => {
              setSource(e.target.value);
              setSourceChange(true);
            }}
          />
          {addressList?.suggestions && sourceChange ? (
            <div className=" shadow-md p-1 rounded-md absolute w-full bg-white max-h-[200px] overflow-scroll">
              {addressList.suggestions.map((item: any, index: number) => (
                <h2
                  key={index}
                  className=" p-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSource(item.place_formatted);
                    setAddressList([]);
                  }}
                >
                  {item.place_formatted}
                </h2>
              ))}
            </div>
          ) : null}
        </div>
        <div className=" mt-2">
          <label htmlFor="" className=" text-gray-400">
            Where To?
          </label>
          <input
            type="text"
            className=" bg-white p-1 border-[3px] w-full rounded-md outline-none focus:border-yellow-100"
            value={destination}
            onChange={(e) => {
              setDestination(e.target.value);
              setDestinationChange(true);
            }}
          />
          {addressList?.suggestions && destinationChange ? (
            <div className=" shadow-md p-1 rounded-md absolute w-full bg-white max-h-[200px] overflow-scroll">
              {addressList.suggestions.map((item: any, index: number) => (
                <h2
                  key={index}
                  className=" p-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setDestination(item.place_formatted);
                    setAddressList([]);
                  }}
                >
                  {item.place_formatted}
                </h2>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default AutoCompleteAddress;
