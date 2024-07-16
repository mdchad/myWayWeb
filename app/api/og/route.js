import { ImageResponse } from 'next/og';
import {loadGoogleFont} from "@/lib/utils";
// App router includes @vercel/og.
// No need to install it.

export const runtime = 'edge';

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;

  const title = searchParams.get("title");
  const subtitle = searchParams.get("subtitle");

  const text = title
  const fontData = await loadGoogleFont('Caveat', title);
  const fontData1 = await loadGoogleFont('Raleway', subtitle);

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 80,
          fontWeight: 700,
          fontFamily: 'Caveat',
          color: 'black',
          background: 'white',
          width: '100%',
          height: '100%',
          padding: '50px 200px',
          display: 'flex',
          flexDirection: "column",
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {text}
        <div
          style={{
            fontSize: 40,
            fontWeight: 700,
            fontFamily: 'Raleway',
            display: "flex"
          }}>
          {subtitle}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Caveat",
          data: fontData,
          style: "normal",
        },
        {
          name: "Raleway",
          data: fontData1,
          style: "normal"
        }
      ]
    }
  );
}