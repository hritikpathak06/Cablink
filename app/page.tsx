"use client";
import Booking from "@/components/Booking";
import MapBox from "@/components/MapBox";
import { DestinationCordinatesContext } from "@/context/DestinationCordinatesContext";
import { SourceCordinatesContext } from "@/context/SourceCordinatesContext";
import { UserLocationContext } from "@/context/UserLocationContext";
import { useEffect, useState } from "react";

export default function Home() {
  const [userLocation, setUserLocation] = useState<any>();
  const [sourceCordinates, setSourceCordinates] = useState<any>([]);
  const [destinationCordinates, setDestinationCordinates] = useState<any>([]);

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
        <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
          <SourceCordinatesContext.Provider
            value={{ sourceCordinates, setSourceCordinates }}
          >
            <DestinationCordinatesContext.Provider
              value={{ destinationCordinates, setDestinationCordinates }}
            >
              <div className="grid md:grid-cols-3 sm:grid-cols-1 w-full">
                <div className=" col-span-1">
                  <Booking />
                </div>
                <div className=" col-span-2 bg-red-200 md:order-last">
                  <MapBox
                    userLocation={userLocation}
                    setUserLocation={setUserLocation}
                  />
                </div>
              </div>
            </DestinationCordinatesContext.Provider>
          </SourceCordinatesContext.Provider>
        </UserLocationContext.Provider>
      </div>
    </>
  );
}
