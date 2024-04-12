"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import Map from "react-map-gl";
import Markers from "./Markers";
import { SourceCordinatesContext } from "@/context/SourceCordinatesContext";
import { DestinationCordinatesContext } from "@/context/DestinationCordinatesContext";
import { DirectionDataContext } from "@/context/DirectionDataContext";
import MapBoxRoute from "./MapBoxRoute";
import DistanceTime from "./DistanceTime";

const MAPBOX_DRIVING_ENDPOINT =
  "https://api.mapbox.com/directions/v5/mapbox/driving/";
const session_token = "5ccce4a4-ab0a-4a7c-943d-580e55542363";

const MapBox = ({ userLocation, setUserLocation }: any) => {
  console.log("MY Location: ", userLocation);
  const { sourceCordinates } = useContext(SourceCordinatesContext);
  const { destinationCordinates } = useContext(DestinationCordinatesContext);

  const { directionData, setDirectionData } = useContext(DirectionDataContext);

  const mapRef = useRef<any>();

  useEffect(() => {
    if (sourceCordinates) {
      mapRef.current?.flyTo({
        center: [sourceCordinates.lng, sourceCordinates.lat],
        duration: 2500,
      });
    }
  }, [sourceCordinates]);

  useEffect(() => {
    if (destinationCordinates) {
      mapRef.current?.flyTo({
        center: [destinationCordinates.lng, destinationCordinates.lat],
        duration: 2500,
      });
    }
    if (sourceCordinates && destinationCordinates) {
      getDirectionRoutes();
    }
  }, [destinationCordinates]);

  const getDirectionRoutes = async () => {
    const res = await fetch(
      MAPBOX_DRIVING_ENDPOINT +
        sourceCordinates.lng +
        "," +
        sourceCordinates.lat +
        ";" +
        destinationCordinates.lng +
        "," +
        destinationCordinates.lat +
        "?overview=full&geometries=geojson" +
        "&access_token=" +
        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await res.json();
    console.log(result);
    console.log("Routes", result.routes);
    setDirectionData(result);
  };

  return (
    <>
      <div className="p-5">
        <div className=" rounded-lg overflow-hidden">
          {userLocation ? (
            <Map
              ref={mapRef}
              mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
              initialViewState={{
                longitude: userLocation?.lng,
                latitude: userLocation?.lat,
                zoom: 14,
              }}
              style={{ width: "100%", height: 600, borderRadius: 10 }}
              mapStyle="mapbox://styles/mapbox/streets-v9"
            >
              <Markers
                userLocation={userLocation}
                setUserLocation={setUserLocation}
              />
              {directionData?.routes ? (
                <MapBoxRoute
                  coordinates={directionData?.routes[0]?.geometry?.coordinates}
                />
              ) : null}
            </Map>
          ) : null}
        </div>
        <div className=" absolute bottom-[40px] z-20 right-[20px] hidden md:block">
          <DistanceTime />
        </div>
      </div>
    </>
  );
};

export default MapBox;
