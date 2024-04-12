import { DirectionDataContext } from "@/context/DirectionDataContext";
import { UserSelectedCarAmountContext } from "@/context/UserSelectedCarAmountContext";
import carsList from "@/data/carsList";
import Image from "next/image";
import { useContext, useState } from "react";

const Cars = () => {
  const [selectedCar, setSelectedCar] = useState<any>();
  const { directionData, setDirectionData } = useContext(DirectionDataContext);
  const {carAmount, setCarAmount} = useContext(UserSelectedCarAmountContext);

  // console.log("Data: ", directionData);

  // interface getCostFn

  const getCost = (charges: any) => {
    return (
      charges *
      directionData.routes[0].distance *
      0.000621371192
    ).toFixed(2);
  };

  return (
    <>
      <div className="mt-6 ">
        <h2 className=" font-semibold">Select a Car</h2>
        <div className=" grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3">
          {carsList.map((item, index) => (
            <div
              key={index}
              className={`m-2 p-2 border-[1px] rounded-md hover:border-yellow-500 cursor-pointer ${
                index == selectedCar ? "border-yellow-500 border-[2px]" : null
              }`}
              onClick={() => {
                setSelectedCar(index);
                setCarAmount(getCost(item.charges));
              }}
            >
              <Image
                src={item.image}
                alt="cars"
                height={90}
                width={75}
                className=" w-full"
              />
              <h2 className=" text-[12px]">
                {item.name}
                {directionData.routes ? (
                  <span
                    className="float-right font-medium
                     text-black"
                  >
                    {getCost(item.charges)}$
                  </span>
                ) : null}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Cars;
