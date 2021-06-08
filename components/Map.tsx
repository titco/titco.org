import { GoogleCharts } from "google-charts";
import { useEffect } from "react";

interface mapProps {
  data: location[];
}

interface location {
  latitude: number;
  longitude: number;
  name: string;
}

export function Map({ data }: mapProps) {
  useEffect(() => {
    const head = [
      { type: "number", id: "Latitude" },
      { type: "number", id: "Longitude" },
      { type: "string", id: "Name" },
    ];

    function drawMap() {
      const mapData = GoogleCharts.api.visualization.arrayToDataTable(
        [].concat(
          [head],
          data.map((location) => {
            const { latitude, longitude, name } = location;
            return [latitude, longitude, name];
          })
        )
      );

      var options = {
        showTooltip: true,
        showInfoWindow: false,
        mapType: "terrain",
      };

      var map = new GoogleCharts.api.visualization.Map(
        document.getElementById("chart_div")
      );

      map.draw(mapData, options);
    }

    GoogleCharts.load(drawMap, {
      packages: ["map"],
      mapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    });
  });

  return <div id="chart_div" style={{ width: "100%", height: "100%" }}></div>;
}