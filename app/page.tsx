import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <h2 className=" text-5xl">Subscribe to youtube</h2>
      <div className="h-screen">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}
