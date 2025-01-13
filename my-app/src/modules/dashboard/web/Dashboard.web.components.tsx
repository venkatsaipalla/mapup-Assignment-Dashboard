import { CHFlex, CVFlex } from "@/components/CFlex";
import React, { useState } from "react";
import DashboardWebStyles from "./DashboardWeb.module.css";
import Image from "next/image";
import { RxCross2, RxDashboard } from "react-icons/rx";
import { IoDocumentText, IoSettingsOutline } from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";
import { FaCalendarAlt, FaCloudUploadAlt, FaRegBell } from "react-icons/fa";
import { HiMiniTicket } from "react-icons/hi2";
import { LuUpload } from "react-icons/lu";
import readXlsxFile from "read-excel-file";
import * as XLSX from "xlsx";
import { ColumnTitlesWeb } from "./CustomColumns";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Pie, Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Box, Typography } from "@mui/material";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

const MenuTabs = [
  {
    id: 1,
    icon: <RxDashboard className={`${DashboardWebStyles.tabIcon}`} />,
    title: "Dashboard",
  },
  {
    id: 2,
    icon: <FaCloudUploadAlt className={`${DashboardWebStyles.tabIcon}`} />,
    title: "Upload",
  },
  {
    id: 3,
    icon: <HiMiniTicket className={`${DashboardWebStyles.tabIcon}`} />,
    title: "Invoice",
  },
  {
    id: 4,
    icon: <IoDocumentText className={`${DashboardWebStyles.tabIcon}`} />,
    title: "Schedule",
  },
  {
    id: 5,
    icon: <FaCalendarAlt className={`${DashboardWebStyles.tabIcon}`} />,
    title: "Calendar",
  },
  {
    id: 6,
    icon: <IoIosNotifications className={`${DashboardWebStyles.tabIcon}`} />,
    title: "Notification",
  },
  {
    id: 7,
    icon: <IoSettingsOutline className={`${DashboardWebStyles.tabIcon}`} />,
    title: "Settings",
  },
];

export const DashboardMenuWeb = (props: any) => {
  const { activeTab, handleMenuTabChange } = props;
  return (
    <CVFlex className={`${DashboardWebStyles.menuTabDiv}`}>
      <CHFlex sx={{ marginLeft: "3.5rem" }}>
        <Image
          src="/images/Subtract.png"
          width="42"
          height="42"
          alt="logo"
          // style={{ position: "absolute", top: "36%", left: "0" }}
        />
        <h1
          className={`${DashboardWebStyles.text} ${DashboardWebStyles.MainHeading}`}
        >
          Venkat
        </h1>
      </CHFlex>
      <CVFlex sx={{ marginTop: "3rem", gap: "1.5rem" }}>
        {MenuTabs.map((item: any, index: any) => (
          <CHFlex
            className={
              activeTab == item.id
                ? `${DashboardWebStyles.TabItem} ${DashboardWebStyles.activeTabItem}`
                : `${DashboardWebStyles.TabItem}`
            }
            sx={{ gap: "0.88rem" }}
            key={index}
            id={item.id}
            onClick={() => handleMenuTabChange(item.id)}
          >
            {item.icon}
            <p
              className={`${DashboardWebStyles.text} ${DashboardWebStyles.secondaryText}`}
              style={{ color: "inherit" }}
            >
              {item.title}
            </p>
          </CHFlex>
        ))}
      </CVFlex>
    </CVFlex>
  );
};
DashboardMenuWeb.displayName = "DashboardMenuWeb";

export const DashboardHeaderWeb = (props: any) => {
  const user = useSelector((state: { user: any }) => state.user);
  console.log({ user });
  const { activeTab } = props;
  return (
    <CHFlex
      className={`${DashboardWebStyles.container} ${DashboardWebStyles.profileHeader}`}
    >
      <p
        className={`${DashboardWebStyles.text} ${DashboardWebStyles.primaryText}`}
      >
        {activeTab === 2
          ? "Upload CSV"
          : MenuTabs.find((item) => item.id === activeTab)?.title}
      </p>
      <CHFlex sx={{ gap: "2rem" }}>
        <FaRegBell className={`${DashboardWebStyles.Notification}`} />
        <Image
          src={
            user?.currentUser?.avatar
              ? user?.currentUser?.avatar
              : `/images/profile.png`
          }
          alt="profile"
          width="30"
          height="30"
          className={`${DashboardWebStyles.avatarProfile}`}
        />
      </CHFlex>
    </CHFlex>
  );
};
DashboardHeaderWeb.displayName = "DashboardHeaderWeb";

export const UploadSectionWeb = (props: any) => {
  const { handleFileUpload, removeFile, handleSubmit, fileName } = props;
  return (
    <CHFlex
      sx={{ justifyContent: "center", alignItems: "center", height: "80%" }}
    >
      <CVFlex className={`${DashboardWebStyles.dropBoxBgContainer}`}>
        <label htmlFor="upload">
          <CVFlex className={`${DashboardWebStyles.dropBox}`}>
            <Image alt="xl" src="/images/xl.png" width="27" height="27" />
            <input
              id="upload"
              type="file"
              // onChange={handleFileChange}
              onChange={handleFileUpload}
              style={{ display: "none" }}
              accept=".csv,.xlsx,.xls"
            />
            {fileName ? (
              <p
                className={`${DashboardWebStyles.dropBoxText}`}
                style={{ textOverflow: "ellipsis" }}
              >
                {fileName}
                <br />
                <div
                  style={{
                    color: "red",
                    cursor: "pointer",
                    height: "2rem",
                    // width: "2rem",
                    textAlign: "center",
                  }}
                  onClick={removeFile}
                >
                  Remove
                </div>
              </p>
            ) : (
              <p className={`${DashboardWebStyles.dropBoxText}`}>
                Drop your excel sheet here or{" "}
                <span style={{ color: "#605BFF" }}>browse</span>
              </p>
            )}
          </CVFlex>
        </label>
        <button
          className={`${DashboardWebStyles.submitButton}`}
          onClick={handleSubmit}
          disabled={fileName !== null ? false : true}
          style={fileName !== null ? { opacity: "100%" } : { opacity: "40%" }}
        >
          <LuUpload className="inherit" />
          <p className="inherit">Upload</p>
        </button>
      </CVFlex>
    </CHFlex>
  );
};

UploadSectionWeb.displayName = "UploadSectionWeb";

export const ListingsResultsWeb = (props: any) => {
  const { data, paginationModel, setPaginationModel } = props;
  // Dynamically create columns based on the data.
  const columns: GridColDef[] = data.length
    ? Object.keys(data[0]).map((key) => ({
        field: key,
        headerName: key.charAt(0).toUpperCase() + key.slice(1),
        width: 150,
      }))
    : [];

  const handlePaginationChange = (model: {
    page: number;
    pageSize: number;
  }) => {
    setPaginationModel(model); // Update pagination state
  };

  // Paginate the data
  const rows = data;
  return (
    <CVFlex className={`${DashboardWebStyles.UploadedItemsContainer}`}>
      <h1
        className={`${DashboardWebStyles.text} ${DashboardWebStyles.primaryText}`}
      >
        Uploads
      </h1>
      <CVFlex className={`${DashboardWebStyles.UploadItemsDiv}`}>
        <Paper sx={{ height: "auto", width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pagination
            initialState={{ pagination: { paginationModel } }}
            paginationModel={paginationModel} // Set the pagination model
            onPaginationModelChange={handlePaginationChange} // Handle pagination model changes
            pageSizeOptions={[5, 10, 20, 50, 100]} // Page size options
            checkboxSelection={false}
            sx={{ border: 0 }}
          />
        </Paper>
      </CVFlex>
    </CVFlex>
  );
};

ListingsResultsWeb.displayName = "ListingsResultsWeb";

export const PieChatDashboard = (props: any) => {
  const { data } = props; // Assuming data is passed as a prop

  // Calculate statistics from the data for visualizations
  const electricVehicleTypes = data.reduce(
    (acc: { [x: string]: any }, curr: { [x: string]: string | number }) => {
      acc[curr["Electric Vehicle Type"]] =
        (acc[curr["Electric Vehicle Type"]] || 0) + 1;
      return acc;
    },
    {}
  );

  const vehiclesByState = data.reduce(
    (acc: { [x: string]: any }, curr: { State: string | number }) => {
      acc[curr.State] = (acc[curr.State] || 0) + 1;
      return acc;
    },
    {}
  );

  // Data for the Pie Chart (Electric Vehicle Type distribution)
  const pieData = {
    labels: Object.keys(electricVehicleTypes),
    datasets: [
      {
        data: Object.values(electricVehicleTypes),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  // Data for the Bar Chart (Vehicles by State)
  const barData = {
    labels: Object.keys(vehiclesByState),
    datasets: [
      {
        label: "Number of Vehicles",
        data: Object.values(vehiclesByState),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return (
    <Box sx={{ padding: "2rem", width: "100%", backgroundColor: "#fafafb" }}>
      <Typography variant="h4" gutterBottom>
        Dashboard Insights
      </Typography>
      <CHFlex sx={{ justifyContent: "space-evenly" }}>
        {/* Electric Vehicle Type Distribution Pie Chart */}
        <Paper sx={{ padding: "1rem", marginBottom: "2rem" }}>
          <Typography variant="h6" gutterBottom>
            Electric Vehicle Type Distribution
          </Typography>
          <Pie data={pieData} />
        </Paper>

        {/* Vehicles by State Bar Chart */}
        <Paper sx={{ padding: "1rem", marginBottom: "2rem" }}>
          <Typography variant="h6" gutterBottom>
            Vehicles by State
          </Typography>
          <Bar data={barData} />
        </Paper>
      </CHFlex>
      {/* Other insights can be added below similarly */}
    </Box>
  );
};

PieChatDashboard.displayName = "PieChatDashboard";
