import { DialogTitle } from "@mui/material";
import {
  BarChart,
  Bar,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const data = [
  {
    name: "Dikshant",
    Present: 31,
    absent: 0,
    amt: 2400,
  },
  {
    name: "Aditya",
    Present: 15,
    absent: 16,
    amt: 2210,
  },
  {
    name: "Tushal",
    Present: 21,
    absent: 10,
    amt: 2290,
  },
  {
    name: "Arpan",
    Present: 23,
    absent: 8,
    amt: 2000,
  },
  {
    name: "Sanket",
    Present: 30,
    absent: 1,
    amt: 2181,
  },
  {
    name: "Harshil",
    Present: 30,
    absent: 1,
    amt: 2500,
  },
  {
    name: "Nayan",
    Present: 25,
    absent: 6,
    amt: 2100,
  },
];

export default function GraphDilog() {
  return (
    <div>
      <DialogTitle style={{ paddingBottom: "0px" }}>
        Student Attendence Bar Graph
      </DialogTitle>
      <BarChart width={950} height={450} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Present" fill="#8884d8" />
        <Bar dataKey="absent" fill="#82ca9d" />
      </BarChart>
    </div>
  );
}
