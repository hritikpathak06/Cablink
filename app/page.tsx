"use client";
import Booking from "@/components/Booking";
import MapBox from "@/components/MapBox";
import { useEffect, useState } from "react";

export default function Home() {
  const [userLocation, setUserLocation] = useState<any>();

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      setUserLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  };

  return (
    <>
      <div>
        <div className="grid md:grid-cols-3 sm:grid-cols-1 w-full">
          <div className=" col-span-1">
            <Booking />
          </div>
          <div className=" col-span-2 bg-red-200 md:order-last">
            <MapBox />
          </div>
        </div>
      </div>
    </>
  );
}
