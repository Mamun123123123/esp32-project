"use client";

import { useEffect, useState } from "react";

export default function Home() {

  const [data, setData] = useState({
    temperature: 0,
    humidity: 0
  });

  const getData = async () => {

    const res = await fetch("http://localhost:3000/api/data");

    const result = await res.json();

    setData(result);
  };

  useEffect(() => {

    getData();

    const interval = setInterval(getData, 2000);

    return () => clearInterval(interval);

  }, []);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0f172a",
        color: "white"
      }}
    >

      <div
        style={{
          background: "#1e293b",
          padding: "30px",
          borderRadius: "20px",
          width: "320px",
          textAlign: "center"
        }}
      >

        <h1>ESP32 DHT11</h1>

        <h2>
          🌡 Temperature: {data.temperature} °C
        </h2>

        <h2>
          💧 Humidity: {data.humidity} %
        </h2>

      </div>

    </div>
  );
}