import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import {
  useQuery,
  // useMutation,
  // useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Chart, initTE } from "tw-elements";

const queryClient = new QueryClient();

initTE({ Chart });

const dataLine = {
  type: "line",
  data: {
    labels: [""],
    datasets: [
      {
        label: "Cases",
        data: [0],
        backgroundColor: ["rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
      {
        label: "Deaths",
        data: [0],
        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(255,99,132,1)"],
        borderWidth: 1,
      },
      {
        label: "Recovered",
        data: [0],
        backgroundColor: ["rgba(75, 192, 192, 0.2)"],
        borderColor: ["rgba(75, 192, 192, 1)"],
        borderWidth: 1,
      },
    ],
  },
};

export default function Charts() {
  const [active, setActive] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      if (active === 2) {
        document.getElementById("line-chart")?.remove();
        let canvas = document.createElement("canvas");
        canvas.id = "line-chart";
        new Chart(canvas, dataLine);
        document.getElementById("line-chart-container")?.appendChild(canvas);
      }
    }, 500);
  }, [active]);

  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <div className="container lg:w-3/4 sm:w-full max-sm:w-full p-12">
        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
          <li className="mr-2">
            <button
              className={
                active === 1
                  ? "inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
                  : "inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
              }
              onClick={() => {
                setActive(1);
              }}
            >
              Worldwide Covid Cases
            </button>
          </li>
          <li className="mr-2">
            <button
              className={
                active === 2
                  ? "inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
                  : "inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
              }
              onClick={() => {
                setActive(2);
              }}
            >
              Daily Covid Cases
            </button>
          </li>
        </ul>
        {active === 1 ? (
          <MapContainer
            center={[28.6448, 77.216721]}
            zoom={4}
            scrollWheelZoom={false}
            style={{ height: "70vh", margin: "1rem 1rem" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <WorldwideData />
          </MapContainer>
        ) : (
          <div
            className="mx-auto mt-16 w-4/5 overflow-hidden"
            id="line-chart-container"
          >
            <DateWiseData />
          </div>
        )}
      </div>
    </QueryClientProvider>
  );
}

const fetchDateWise = async () => {
  const res = await fetch(
    "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
  );
  if (res.ok) {
    return res.json();
  } else {
    throw new Error(`Error: ${res.status} ${res.statusText}`);
  }
};

const DateWiseData = () => {
  const query = useQuery(["covid_datewise"], fetchDateWise);

  if (!!query.data) {
    let lab = Object.keys(!!query.data && query.data.cases);
    let cases: Array<number> = Object.values(!!query.data && query.data.cases);
    let deaths: Array<number> = Object.values(
      !!query.data && query.data.deaths
    );
    let recovered: Array<number> = Object.values(
      !!query.data && query.data.recovered
    );
    dataLine.data.labels = lab;
    dataLine.data.datasets = [
      {
        label: "Cases",
        data: cases,
        backgroundColor: ["rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
      {
        label: "Deaths",
        data: deaths,
        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(255,99,132,1)"],
        borderWidth: 1,
      },
      {
        label: "Recovered",
        data: recovered,
        backgroundColor: ["rgba(75, 192, 192, 0.2)"],
        borderColor: ["rgba(75, 192, 192, 1)"],
        borderWidth: 1,
      },
    ];
  }
  return <></>;
};

const fetchWorldwide = async () => {
  const res = await fetch("https://disease.sh/v3/covid-19/countries");
  if (res.ok) {
    return res.json();
  } else {
    throw new Error(`Error: ${res.status} ${res.statusText}`);
  }
};
function WorldwideData() {
  const query = useQuery(["covid_countries"], fetchWorldwide);
  interface Covid_Countries {
    country: string;
    countryInfo: {
      _id: number;
      iso3: string;
      lat: number;
      long: number;
      flag: string;
    };
    cases: number;
    deaths: number;
    recovered: number;
    active: number;
    population: number;
    continent: string;
  }
  return (
    !!query.data &&
    query.data.map((todo: Covid_Countries, i: number) => (
      <Marker key={i} position={[todo.countryInfo.lat, todo.countryInfo.long]}>
        <Popup>
          <img
            src={todo.countryInfo.flag}
            alt={todo.countryInfo.iso3}
            title={todo.country}
            width={48}
          />
          <br />
          <h1 className="font-bold text-lg">{todo.country}</h1>
          <br />
          <span>Total Cases: {todo.cases}</span>
          <br />
          <span>Active Cases: {todo.active}</span>
          <br />
          <span>Total Recovered: {todo.recovered}</span>
          <br />
          <span>Death Toll: {todo.deaths}</span>
        </Popup>
      </Marker>
    ))
  );
}
