"use client";
import React, { useContext, useState } from "react";
import AutoCompleteAddress from "./AutoCompleteAddress";
import Cars from "./Cars";
import Cards from "./Cards";
import { useRouter } from "next/navigation";
import { UserSelectedCarAmountContext } from "@/context/UserSelectedCarAmountContext";

const Booking = () => {
  const screeHeight = window.innerHeight * 0.82;
  const {carAmount, setCarAmount} = useContext(UserSelectedCarAmountContext);


  // console.log("car Amount: ",carAmount);

  const router = useRouter();

  return (
    <>
      <div className=" p-">
        <div
          className=" border-[5px] p-5 rounded-md md:w-[100%] sm:w-[10px]"
          style={{ height: screeHeight }}
        >
          <AutoCompleteAddress />
          <Cars/>
          <Cards />
          <button className={ `p-1 rounded-md w-full  bg-yellow-600 text-white mt-6 ${!carAmount ? "bg-gray-200" : null}`}
          onClick={() => router.push("/payment")}
          disabled={!carAmount}
          >
            Book Now
          </button>
        </div>
      </div>
    </>
  );
};

export default Booking;
