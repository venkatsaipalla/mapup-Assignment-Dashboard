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
import {
  DashboardMenuWeb,
  DashboardHeaderWeb,
  UploadSectionWeb,
  ListingsResultsWeb,
  PieChatDashboard,
} from "./Dashboard.web.components";

export default function DashboardWeb() {
  const [data, setData] = useState([]);
  const [selectedTagsData, setSelectedTagsData]: any = useState({});
  const [files, setFiles]: any = useState(null);
  const [fileName, setFileName] = useState(null);
  const [activeTab, setActiveTab] = useState(2);
  const [error, setError] = useState("");
  const allowedExtensions = ["csv", "xls", "xlsx"];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  // Handle pagination change
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleFileChange = (event: any) => {
    if (event.target.files[0]) {
      setError("");
      const fileExtension = event.target.files[0]?.name.split(".")[1];
      if (!allowedExtensions.includes(fileExtension)) {
        setError("Please input a csv file");
        return;
      }
      setFileName(event.target.files[0].name);
    }
  };
  const handleSubmit = () => {
    // setFormData(data)

    const reader = new FileReader();
    reader.readAsBinaryString(files);
    reader.onload = (e: any) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData: any = XLSX.utils.sheet_to_json(sheet);
      const rowsWithId = parsedData.map((row: any, index: number) => ({
        id: index + 1, // Add unique id for each row
        ...row,
      }));

      setData(rowsWithId);
      setActiveTab(1);
    };
    setFileName(null);
    setFiles(null);
  };
  const removeFile = (event: any) => {
    event.stopPropagation();
    setFileName(null);
    setFiles(null);
  };
  const handleFileUpload = async (event: any) => {
    if (event.target.files[0]) {
      setError("");
      const file = event.target.files[0];
      const fileExtension = file.name.split(".").pop();

      if (!allowedExtensions.includes(fileExtension)) {
        setError("Please upload a valid CSV/XLS file");
        return;
      }

      setFileName(file.name);
      setFiles(file);

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const binaryStr = e.target.result;
        const workbook = XLSX.read(binaryStr, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData: any = XLSX.utils.sheet_to_json(sheet);

        const rowsWithId = parsedData.map((row: any, index: number) => ({
          id: index + 1, // Add unique id for each row
          ...row,
        }));
        setActiveTab(1);
        setData(rowsWithId);
      };

      reader.readAsBinaryString(file);
    }
  };

  console.log(data);
  const handleMenuTabChange = (e: any) => {
    setActiveTab(e);
  };
  console.log({ selectedTagsData });
  return (
    <CHFlex sx={{ overflowX: "clip" }}>
      <DashboardMenuWeb
        handleMenuTabChange={handleMenuTabChange}
        activeTab={activeTab}
      />
      <CVFlex className={`${DashboardWebStyles.rightDiv}`}>
        <DashboardHeaderWeb activeTab={activeTab} />
        {activeTab == 2 && (
          <UploadSectionWeb
            handleFileUpload={handleFileUpload}
            removeFile={removeFile}
            fileName={fileName}
            handleSubmit={handleSubmit}
          />
        )}
        {data.length && activeTab == 1 ? (
          <>
            <ListingsResultsWeb
              data={data}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              page={page}
              setPage={setPage}
              paginationModel={paginationModel}
              setPaginationModel={setPaginationModel}
            />
            <PieChatDashboard data={data} />
          </>
        ) : (
          <></>
        )}
      </CVFlex>
    </CHFlex>
  );
}
