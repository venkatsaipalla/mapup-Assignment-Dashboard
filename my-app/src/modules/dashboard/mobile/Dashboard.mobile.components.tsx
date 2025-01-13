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
import { Paper } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export const MenuTabs = [
  {
    id: 1,
    icon: <RxDashboard className={`${DashboardMobileStyles.tabIcon}`} />,
    title: "Dashboard",
  },
  {
    id: 2,
    icon: <FaCloudUploadAlt className={`${DashboardMobileStyles.tabIcon}`} />,
    title: "Upload",
  },
  {
    id: 3,
    icon: <HiMiniTicket className={`${DashboardMobileStyles.tabIcon}`} />,
    title: "Invoice",
  },
  {
    id: 4,
    icon: <IoDocumentText className={`${DashboardMobileStyles.tabIcon}`} />,
    title: "Schedule",
  },
  {
    id: 5,
    icon: <FaCalendarAlt className={`${DashboardMobileStyles.tabIcon}`} />,
    title: "Calendar",
  },
  {
    id: 6,
    icon: <IoIosNotifications className={`${DashboardMobileStyles.tabIcon}`} />,
    title: "Notification",
  },
  {
    id: 7,
    icon: <IoSettingsOutline className={`${DashboardMobileStyles.tabIcon}`} />,
    title: "Settings",
  },
];

export const DashboardMenuMobile = (props: any) => {
  const { activeTab, handleMenuTabChange } = props;
  const action = (id: any) => {
    handleMenuTabChange(id);
  };
  return (
    <CVFlex className={`${DashboardMobileStyles.drawerContainer1}`}>
      {/* <CVFlex className={`${DashboardMobileStyles.drawerContainer2}`}> */}

      <CVFlex sx={{ gap: "1.62rem" }}>
        {MenuTabs.map((item) => (
          <CHFlex
            className={
              activeTab == item.id
                ? ` ${DashboardMobileStyles.activeTabDiv} ${DashboardMobileStyles.menuTabDiv}`
                : `${DashboardMobileStyles.menuTabDiv}`
            }
            key={item.id}
            onClick={() => action(item.id)}
          >
            {item.icon}
            <p
              className={`${DashboardMobileStyles.secondaryText}`}
              style={{ color: "inherit" }}
            >
              {item.title}
            </p>
          </CHFlex>
        ))}
      </CVFlex>
      {/* </CVFlex> */}
    </CVFlex>
  );
};

DashboardMenuMobile.displayName = "DashboardMenuMobile";

export const DashboardHeaderMobile = (props: any) => {
  const { toggleMenu } = props;
  return (
    <CHFlex className={`${DashboardMobileStyles.headerMobile}`}>
      <CHFlex
        className={`${DashboardMobileStyles.container}`}
        sx={{ justifyContent: "space-between" }}
      >
        <CHFlex sx={{ gap: "0.8rem" }}>
          <IoMenuSharp
            className={`${DashboardMobileStyles.menuIcon}`}
            onClick={toggleMenu}
          />
          <Image src="/images/Subtract.png" alt="logo" width="26" height="26" />
          <p className={`${DashboardMobileStyles.MainHeading}`}>Venkat</p>
        </CHFlex>
        <CHFlex className={`${DashboardMobileStyles.profileHeader}`}>
          <FaRegBell className={`${DashboardMobileStyles.bellIcon}`} />
          <Image
            src="/images/profile.png"
            alt="Profile"
            width="35"
            height="35"
            className={`${DashboardMobileStyles.avatarProfile}`}
          />
        </CHFlex>
      </CHFlex>
    </CHFlex>
  );
};

DashboardHeaderMobile.displayName = "DashboardHeaderMobile";

export const UploadSectionMobile = (props: any) => {
  const { handleFileUpload, fileName, removeFile, handleSubmit } = props;
  return (
    <CVFlex
      className={`${DashboardMobileStyles.container}`}
      sx={{ marginTop: "1.75rem", gap: "1.5rem" }}
    >
      <p className={`${DashboardMobileStyles.primaryText}`}>Upload CSV</p>
      <CVFlex className={`${DashboardMobileStyles.dropBoxBgContainer}`}>
        <label htmlFor="upload">
          <CVFlex className={`${DashboardMobileStyles.dropBox}`}>
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
                className={`${DashboardMobileStyles.secondaryText}`}
                style={{ textOverflow: "ellipsis" }}
              >
                {fileName}
                <br />
                <span
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={removeFile}
                >
                  remove
                </span>
              </p>
            ) : (
              <p className={`${DashboardMobileStyles.secondaryText}`}>
                Drop your excel sheet here or{" "}
                <span style={{ color: "#605BFF" }}>browse</span>
              </p>
            )}
          </CVFlex>
        </label>
        <button
          className={`${DashboardMobileStyles.submitButton}`}
          onClick={handleSubmit}
          disabled={fileName !== null ? false : true}
          style={fileName !== null ? { opacity: "100%" } : { opacity: "40%" }}
        >
          {/* <CHFlex className={`${DashboardMobileStyles.submitButton}`}> */}
          <LuUpload className="inherit" />
          <p className="inherit">Upload</p>
          {/* </CHFlex> */}
        </button>
      </CVFlex>
    </CVFlex>
  );
};

UploadSectionMobile.displayName = "UploadSectionMobile";

export const ListItemRowMobile = (props: any) => {
  const { item, removeSelectedTag } = props;
  return (
    <li className={`${DashboardMobileStyles.listItem}`} key={item.id}>
      <p className={`${DashboardMobileStyles.listItemText}`}>{item.id}</p>
      <div
        className={`${DashboardMobileStyles.listItemText} ${DashboardMobileStyles.rough}`}
      >
        <a
          className={`${DashboardMobileStyles.listItemText}`}
          style={{ color: "#5B93FF" }}
        >
          {item.links}
        </a>
      </div>
      <p className={`${DashboardMobileStyles.listItemText}`}>{item.prefix}</p>
      <SelectedTagsDivMobile
        removeSelectedTag={removeSelectedTag}
        item={item}
      />
    </li>
  );
};

export const ColumnTitlesMobile = () => (
  <CHFlex sx={{ gap: "5rem" }}>
    <p className={`${DashboardMobileStyles.columnTitle}`}>SI No.</p>
    <p className={`${DashboardMobileStyles.columnTitle}`}>Links</p>
    <p
      className={`${DashboardMobileStyles.columnTitle}`}
      // style={{ marginRight: "-3rem" }}
    >
      Prefix
    </p>
    <p
      className={`${DashboardMobileStyles.columnTitle}`}
      // style={{ marginRight: "-1rem" }}
    >
      Add Tags
    </p>
    <p
      className={`${DashboardMobileStyles.columnTitle}`}
      style={{ minWidth: "10rem" }}
    >
      Selected Tags
    </p>
  </CHFlex>
);
ColumnTitlesMobile.displayName = "ColumnTitlesMobile";


export const SelectedTagsDivMobile = (props: any) => {
  const { item, removeSelectedTag } = props;
  return (
    <CHFlex className={`${DashboardMobileStyles.selectedTagDiv}`}>
      {item.tags &&
        item.tags.map((index: any, key: any) => (
          <CHFlex className={`${DashboardMobileStyles.selectedTags}`} key={key}>
            <p className={`${DashboardMobileStyles.selectTagText}`}>
              {index.label}
            </p>
            <RxCross2
              className={`${DashboardMobileStyles.cross}`}
              onClick={() => removeSelectedTag(item.id, index.id)}
            />
          </CHFlex>
        ))}
    </CHFlex>
  );
};
SelectedTagsDivMobile.displayName = "SelectedTagsDivMobile";

export const ListingsResultsMobile = (props: any) => {
  const { data, paginationModel,setPaginationModel } = props;
    // Dynamically create columns based on the data
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
  const rows = data;
  return (
    <CVFlex
      className={` ${DashboardMobileStyles.container} ${DashboardMobileStyles.UploadedItemsContainer}`}
    >
      <p
        className={`${DashboardMobileStyles.primaryText}`}
        style={{ marginTop: "3rem" }}
      >
        Uploads
      </p>
      <CVFlex className={`${DashboardMobileStyles.UploadItemsDiv}`}>
        <Paper sx={{ height: 'auto', width: "100%" }}>
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
