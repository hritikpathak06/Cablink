"use client";
import React from "react";
import Map from "react-map-gl";

const MapBox = () => {
  return (
    <>
      <div className=" rounded-lg overflow-hidden">
        {/* <h2  className=" text-[20px] font-semibold">Map</h2> */}
        <Map
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
          initialViewState={{
            // longitude: -122.4,
            longitude:85.3878,
            // latitude: 37.8,
            latitude:25.4853,
            zoom: 14,
          }}
          style={{ width: "100%", height: 700,borderRadius:10 }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        />
      </div>
    </>
  );
};

export default MapBox;
