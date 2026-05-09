let sensorData = {
  temperature: 0,
  humidity: 0
};

export async function POST(req) {

  const body = await req.json();

  sensorData = body;

  console.log(sensorData);

  return Response.json({
    message: "Data received"
  });
}

export async function GET() {

  return Response.json(sensorData);
}