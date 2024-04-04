import Booking from "@/components/Booking";
import Map from "@/components/Map";

export default function Home() {
  return (
    <>
      <div>
        <div className="grid md:grid-cols-3 sm:grid-cols-1 w-full">
          <div className=" col-span-1">
            <Booking/>
          </div>
          <div className=" col-span-2 bg-red-200 md:order-last">
            <Map/>
          </div>
        </div>
      </div>
    </>
  );
}
