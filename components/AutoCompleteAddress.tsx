"use client";
import { DestinationCordinatesContext } from "@/context/DestinationCordinatesContext";
import { SourceCordinatesContext } from "@/context/SourceCordinatesContext";
import React, { useContext, useEffect, useState } from "react";

const session_token = "5ccce4a4-ab0a-4a7c-943d-580e55542363";
const MAPBOX_RETRIVE_URL =
  "https://api.mapbox.com/search/searchbox/v1/retrieve/";

const AutoCompleteAddress = () => {
  const [source, setSource] = useState<any>("");
  const [addressList, setAddressList] = useState<any>();
  const [destinationChange, setDestinationChange] = useState<any>(false);
  const [destination, setDestination] = useState<any>();
  const [sourceChange, setSourceChange] = useState<any>(false);

  // Context
  const { sourceCordinates, setSourceCordinates } = useContext(
    SourceCordinatesContext
  );
  const { destinationCordinates, setDestinationCordinates } = useContext(
    DestinationCordinatesContext
  );

  // console.log("Source: ",sourceCordinates)
  // console.log("Destination: ",destinationCordinates);

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


  // Source MapBoxId
  const onSourceAddressClick = async (item: any) => {
    setSource(item.place_formatted);
    setAddressList([]);
    setSourceChange(false);

    const res = await fetch(
      MAPBOX_RETRIVE_URL +
        item.mapbox_id +
        "?session_token=" +
        session_token +
        "&access_token=" +
        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
    );

    const result = await res.json();

    setSourceCordinates({
      lng: result.features[0].geometry.coordinates[0],
      lat: result.features[0].geometry.coordinates[1],
    });
  };

  // Destination Mapbox_ID
  const onDestinationAddressClick = async (item: any) => {
    setDestination(item.place_formatted);
    setAddressList([]);
    setDestinationChange(false);

    const res = await fetch(
      MAPBOX_RETRIVE_URL +
        item.mapbox_id +
        "?session_token=" +
        session_token +
        "&access_token=" +
        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
    );
    const result = await res.json();
    setDestinationCordinates({
      lng: result.features[0].geometry.coordinates[0],
      lat: result.features[0].geometry.coordinates[1],
    });
  };

  // console.log("Soource: ", sourceCordinates);
  // console.log("destination: ", destinationCordinates);

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
                  onClick={() => onSourceAddressClick(item)}
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
                  onClick={() => onDestinationAddressClick(item)}
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
