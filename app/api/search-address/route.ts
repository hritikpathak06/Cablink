import { NextRequest, NextResponse } from "next/server";

let BASE_URL = "https://api.mapbox.com/search/searchbox/v1/suggest";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const searchText = searchParams.get("q");
  const result = await fetch(
    `${BASE_URL}?q=${searchText}language=en&limit=10&session_token=[GENERATED-UUID]&proximity=-83.748708,42.265837&country=US&access_token=${process.env.MAPBOX_ACCESS_TOKEN}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const searchResult = await result.json();
  return NextResponse.json(searchResult);
}
