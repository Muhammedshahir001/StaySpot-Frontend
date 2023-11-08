import React, { useEffect, useState } from "react";
import Navbars from "./layout/Navbar";
import Headers from "./layout/Header";
import { getAllData, get_All_Bookings } from "../../api/adminApi";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);
const AdminHomes = () => {
  const [approved, setApproved] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [allbooking, setAllbooking] = useState([]);
  const [cancelbook, setCancelbook] = useState("");
  const resorts = {
    labels: ["Approved_Resorts", "Rejected_Resorts"],
    datasets: [
      {
        label: "Resorts",
        data: [approved, rejected],
        backgroundColor: ["rgba(0, 255, 0, 0.2)", "rgba(255, 0, 0, 0.2)"],
        borderColor: ["rgba(0, 255, 0, 1)", "rgba(255, 0, 0, 1)"],
        borderWidth: 1,
      },
    ],
  };
  const booking = {
    labels: ["Booked_Resorts", "Cancelled_Resorts"],
    datasets: [
      {
        label: "Bookings",
        data: [allbooking, cancelbook],
        backgroundColor: ["rgba(0, 255, 0, 0.2)", "rgba(255, 0, 0, 0.2)"],
        borderColor: ["rgba(0, 255, 0, 1)", "rgba(255, 0, 0, 1)"],
        borderWidth: 1,
      },
    ],
  };
  useEffect(() => {
    getAllBooking();
  });

  const getAllBooking = async () => {
    try {
      let { data } = await get_All_Bookings();
      console.log(data, " this is the data of bookings...");
      let confirmBooking = data.result.filter(
        (book) => book.status === "booked"
      );
      console.log(confirmBooking, "booked");
      setAllbooking(confirmBooking.length);
      let cancelbooking = data.result.filter(
        (book) => book.status === "cancelled"
      );
      setCancelbook(cancelbooking.length);
    } catch (error) {
      console.log(error, "Error occured while getting the boking");
    }
  };

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      let dataa = await getAllData();
      console.log(dataa, "data of all resorts");
      const approve = dataa.data.resort.filter(
        (book) => book.verify === "verified"
      );
      console.log(approve, "lenght of approved");
      setApproved(approve.length);
      const reject = dataa.data.resort.filter(
        (book) => book.verify === "rejected"
      );
      console.log(reject, "count of rejected");
      setRejected(reject.length);
    } catch (error) {
      console.log(error, "error is  comingggggg..");
    }
  };
  return (
    <div className="flex">
      <Navbars />

      {/* Main Content */}
      <div className="flex-1">
        <Headers name={"Dashboard"} />

        <div className="p-4">
          <h3 className="text-xl font-bold mb-4">Admin Dashboard:</h3>
          <div className="flex p-4 justify-around">
            <div className="bg-gray-100 p-4 rounded-lg mb-4 max-w-xs">
              <h4 className="text-lg font-semibold mb-2">Number of Resorts:</h4>
              <p className="text-gray-600">
                <Pie data={resorts} />
              </p>
              {/* Replace '10' with the actual number of resorts */}
            </div>

            <div className="bg-gray-100 p-4 rounded-lg mb-4 max-w-xs">
              <h4 className="text-lg font-semibold mb-2">
                Number of ResortBooking:
              </h4>
              <p className="text-gray-600">
                <Pie data={booking} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomes;
