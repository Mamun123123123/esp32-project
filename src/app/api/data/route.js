import { google } from "googleapis";

let sensorData = { temperature: 0, humidity: 0 };

const auth = new google.auth.JWT(
  process.env.GOOGLE_CLIENT_EMAIL,
  null,
  process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  ["https://www.googleapis.com/auth/spreadsheets"]
);

const sheets = google.sheets({ version: "v4", auth });

const SPREADSHEET_ID = process.env.SHEET_ID;

export async function POST(req) {
  const body = await req.json();

  sensorData = body;

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: "SensorData!A:C",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          new Date().toLocaleString(),
          body.temperature,
          body.humidity
        ]
      ]
    }
  });

  return Response.json({ message: "Saved to Sheet" });
}

export async function GET() {
  return Response.json(sensorData);
}