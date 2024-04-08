import carsList from "@/data/carsList";
import Image from "next/image";
import { useState } from "react";

const Cars = () => {
  const [selectedCar, setSelectedCar] = useState<any>();
  return (
    <>
      <div className="mt-3 ">
        <h2 className=" font-semibold">Select a Car</h2>
        <div className=" grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3">
          {carsList.map((item, index) => (
            <div
              key={index}
              className={`m-2 p-2 border-[1px] rounded-md hover:border-yellow-500 cursor-pointer ${index == selectedCar ? 'border-yellow-500 border-[2px]' : null}`}
              onClick={() => setSelectedCar(index)}
            >
              <Image
                src={item.image}
                alt="cars"
                height={90}
                width={75}
                className=" w-full"
              />
              <h2 className=" text-[12px]">{item.name}</h2>
              <span className=" float-right">{item.charges * 8}$</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Cars;
