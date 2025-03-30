export const revalidate = 60;

export async function GET(request: Request) {
  const url = process.env.BASE_URL + "/songs";
  const data = await fetch(url);
  const songs = await data.json();

  return Response.json(songs);
}
