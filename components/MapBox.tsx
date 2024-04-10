"use client";
import React, { useContext } from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { UserLocationContext } from "@/context/UserLocationContext";
import { SourceCordinatesContext } from "@/context/SourceCordinatesContext";

const MapBox = ({ userLocation, setUserLocation }: any) => {
  const { sourceCordinates, setSourceCordinates } = useContext(
    SourceCordinatesContext
  );
  return (
    <>
      <div className=" rounded-lg overflow-hidden">
        {userLocation ? (
          <Map
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            initialViewState={{
              longitude: sourceCordinates?.lng || userLocation?.lng,
              latitude: sourceCordinates?.lat || userLocation?.lat,
              zoom: 14,
            }}
            style={{ width: "100%", height: 700, borderRadius: 10 }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
          >
            <Marker
              longitude={sourceCordinates?.lng || userLocation?.lng}
              latitude={ sourceCordinates?.lat || userLocation?.lat}
              anchor="bottom"
            >
              <img src="/pin.png" className=" w-[30px] h-[30px]" />
            </Marker>
          </Map>
        ) : null}
      </div>
    </>
  );
};

export default MapBox;
