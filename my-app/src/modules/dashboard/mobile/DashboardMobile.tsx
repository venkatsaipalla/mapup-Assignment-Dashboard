import { CDrawer, CHFlex, CVFlex } from "@/components/CFlex";
import React, { useState } from "react";
import DashboardMobileStyles from "./DashboardMobile.module.css";
import { IoMenuSharp } from "react-icons/io5";
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
  DashboardMenuMobile,
  DashboardHeaderMobile,
  UploadSectionMobile,
  ListingsResultsMobile,
} from "./Dashboard.mobile.components";

const DashboardMobile = () => {
  const [data, setData] = useState([]);
  const [files, setFiles]: any = useState(null);
  const [fileName, setFileName] = useState(null);
  const [activeTab, setActiveTab] = useState(2);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const allowedExtensions = ["csv", "xls", "xlsx"];
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

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

  const handleSelectInputChange = (tagName: any, id: any) => {
    console.log({ tagName, id });
    const shallow = [...data];
    const updatedTag: any = shallow.map((item: any) => {
      if (item.id === id) {
        const tagExists = item.tags.some((tag: any) => tag.label === tagName);
        if (!tagExists) {
          item.tags = [
            ...item.tags,
            { label: tagName, id: Math.ceil(Math.random() * 123) },
          ];
        }
      }
      return item;
    });

    console.log(updatedTag);
    setData(updatedTag);
  };

  const handleMenuTabChange = (e: any) => {
    setActiveTab(e);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleFileChange = (event: any) => {
    console.log(event);
    if (event.target.files[0]) {
      setError("");
      const fileExtension = event.target.files[0]?.name.split(".")[1];
      console.log(fileExtension);
      if (!allowedExtensions.includes(fileExtension)) {
        setError("Please input a csv file");
        return;
      }
      setFileName(event.target.files[0].name);
    }
  };

  return (
    <CVFlex className={`${DashboardMobileStyles.bgContainer}`}>
      {isOpen && (
        <CDrawer isOpen={isOpen} setIsOpen={setIsOpen}>
          <DashboardMenuMobile
            handleMenuTabChange={handleMenuTabChange}
            activeTab={activeTab}
          />
        </CDrawer>
      )}
      <DashboardHeaderMobile toggleMenu={toggleMenu} />
      {activeTab == 2 && (
        <UploadSectionMobile
          handleFileUpload={handleFileUpload}
          fileName={fileName}
          removeFile={removeFile}
          handleSubmit={handleSubmit}
        />
      )}
      {data && activeTab == 1 && (
        <ListingsResultsMobile
          data={data}
          handleSelectInputChange={handleSelectInputChange}
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
        />
      )}
    </CVFlex>
  );
};

export default DashboardMobile;
