import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useContext } from "react";
import { SourceCordinatesContext } from "@/context/SourceCordinatesContext";
import { DestinationCordinatesContext } from "@/context/DestinationCordinatesContext";
import DistanceTime from "./DistanceTime";

const Markers = ({ userLocation, setUserLocation }: any) => {
  const { sourceCordinates } = useContext(
    SourceCordinatesContext
  );
  const { destinationCordinates} = useContext(
    DestinationCordinatesContext
  );

//   console.log("Source: ", sourceCordinates);

  return (
    <>
      <div>
        <Marker
          longitude={userLocation?.lng}
          latitude={userLocation?.lat}
          anchor="bottom"
        >
          <img src="/pin.png" className=" w-[30px] h-[30px]" />
        </Marker>

        {/* Source Marker */}
        {sourceCordinates.length != 0 ? (
          <Marker
            longitude={sourceCordinates?.lng}
            latitude={sourceCordinates?.lat}
            anchor="bottom"
          >
            <img src="/pin.png" className=" w-[30px] h-[30px]" />
          </Marker>
        ) : null}

        {/* Destination Marker */}
        {destinationCordinates.length != 0 ? (
          <Marker
            longitude={destinationCordinates?.lng}
            latitude={destinationCordinates?.lat}
            anchor="bottom"
          >
            <img src="/location.png" className=" w-[30px] h-[30px]" />
          </Marker>
        ) : null}
      </div>
    </>
  );
};

export default Markers;
