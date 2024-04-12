
import React from "react";
import { Layer, Source } from "react-map-gl";
import { Feature, GeoJsonProperties, Geometry } from "geojson";

// Define a type for GeoJSON data
interface GeoJSONData extends Feature<Geometry, GeoJsonProperties> {
  geometry: {
    type: "LineString";
    coordinates: number[][];
  };
}

const MapBoxRoute = (props: { coordinates: number[][] }) => {
  const geojsonData: GeoJSONData = {
    type: "Feature",
    geometry: { type: "LineString", coordinates: props.coordinates },
    properties: {},
  };

  return (
    <Source type="geojson" data={geojsonData}>
      <Layer
        type="line"
        layout={{ "line-join": "round", "line-cap": "square" }}
        paint={{ "line-color": "#0462d4", "line-width": 4 }}
      />
    </Source>
  );
};

export default MapBoxRoute;

