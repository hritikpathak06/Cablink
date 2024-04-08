"use client";
import React from "react";
import AutoCompleteAddress from "./AutoCompleteAddress";
import Cars from "./Cars";
import Cards from "./Cards";

const Booking = () => {
  const screeHeight = window.innerHeight * 0.82;

  return (
    <>
      <div className=" p-">
        <div
          className=" border-[1px] p-5 rounded-md md:w-[100%] sm:w-[10px]"
          style={{ height: screeHeight }}
        >
          <AutoCompleteAddress />
          <Cars />
          <Cards />
          <button className=" p-1 rounded-md w-full  bg-yellow-600 text-white mt-6">
            Book Now
          </button>
        </div>
      </div>
    </>
  );
};

export default Booking;
