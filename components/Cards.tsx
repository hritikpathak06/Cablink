import cardList from "@/data/cardList";
import Image from "next/image";
import React, { useState } from "react";

const Cards = () => {
  const [activeIndex, setActiveIndex] = useState<any>();
  return (
    <>
      <div className=" mt-10">
        <h2 className=" text-[14px] font-semibold">Payments Method</h2>
        <div className=" grid grid-cols-5 mt-5 ">
          {cardList.map((item, index) => (
            <div
              key={index}
              className={`w-[50px] border-[2px] flex items-center justify-center cursor-pointer hover:scale-x-110 transition-all hover:border-yellow-500 ${
                activeIndex === index ? "border-yellow-500 border-[2px]" : null
              }`}
              onClick={() => setActiveIndex(index)}
            >
              <Image src={item.image} alt="payments" width={30} height={50} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Cards;
