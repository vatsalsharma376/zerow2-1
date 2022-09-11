import React, { useState } from "react";
import { useEffect } from "react";
import { Table, Pagination } from "rsuite";
import "./Tables.css";
import axios from "axios";
import Popup from "reactjs-popup";
import OtpInput from "react-otp-input";
import { ToastContainer, toast } from "react-toastify";

import "reactjs-popup/dist/index.css";

import { REACT_APP_SERVER_BASE_URL } from "../../constants";
const { Column, HeaderCell, Cell } = Table;

const Tables = (props) => {
  console.log(props);
  const [donationId,setDonationId] = useState("");
  const [userOtp, setuserOtp] = useState("0");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [tData, settData] = useState([]);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [isPopup, setisPopup] = useState(false);

  useEffect(() => {
    const getTableData = async () => {
      const resp = await axios.get(
        `${REACT_APP_SERVER_BASE_URL}/api/getDonations`
      );
      console.log(Array.isArray(resp.data.donations));
      const donations = await resp.data.donations;
      const filteredDonations = await donations.filter((donation)=>{
        // check if donation.city contains props.searchText
        return donation.city.toLowerCase().includes(props.searchText.toLowerCase());
      })
      settData(filteredDonations);
    };
    getTableData();
  }, [props.searchText]);
  const handleChangeLimit = (dataKey) => {
    setPage(1);
    setLimit(dataKey);
  };
  console.log(Array.isArray(tData), tData);
  console.log(typeof tData);
  const data1 = tData.filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });
  const deleteData = async () => {
    let tempData = tData;
    // delete indx from mongodb database
    const resp = await axios.post(
      `${REACT_APP_SERVER_BASE_URL}/api/deleteDonation`,
      { id: donationId }
    );
    if (resp.status === 200) {
      console.log("Successfully deleted!");
      settData(tempData.filter((data) => data._id !== donationId));
      return Promise.resolve();

    } else {
      console.error("Error deleting!");
      return Promise.reject(new Error("Whoops!"));
    }
  };

  const RemoveCell = ({ rowData, onClick, ...props }) => {
    return (
      <Cell {...props} style={{ padding: "6px" }}>
        <button
          className="delete-btn"
          onClick={() => {
            setuserOtp(rowData.verificationKey);
            setDonationId(rowData._id);
            setisPopup(true);
          }}
        >
          Picked Up
        </button>
      </Cell>
    );
  };
  return (
    <div style={{ height: "100%" }}>
      <Popup
        open={isPopup}
        position="right center"
        modal
        onClose={() => {
          setEnteredOtp("");
          setisPopup(false);
        }}
      >
        <div id="otp-lock">
          <i className="fa fa-solid fa-lock"></i>
        </div>
        <h5>Enter your OTP</h5>
        <p>Please enter the verification code sent to donor's mobile</p>
        <OtpInput
          shouldAutoFocus={true}
          isInputNum={true}
          containerStyle={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            marginBottom: "10px",
          }}
          value={enteredOtp}
          onChange={(otp) => setEnteredOtp(otp)}
          inputStyle={{
            color: "red",
            width: "3rem",
            height: "3rem",
            borderRadius: "0.5rem",
            border: "1px solid #ccc",
            fontSize: "1.5rem",
            textAlign: "center",
          }}
          numInputs={6}
          separator={<span> </span>}
        />

        <button
          className="otp-btn"
          onClick={() => {
            setEnteredOtp("");
            setisPopup(false);
          }}
        >
          Cancel
        </button>

        <button
          className="otp-btn otp-confirm"
          onClick={() => {
            console.log(userOtp, enteredOtp);
            if (userOtp == enteredOtp) {
              setEnteredOtp("");
              setisPopup(false);
              toast.promise(deleteData, {
                pending: "The donation is yet to be deleted",
                success: "OTP verified! Donation deleted",
                error: "Error deleting donation",
              });
            }
            else{
              toast.error("Incorrect OTP");
            }
          }}
        >
          Confirm
        </button>
      </Popup>
      <Table
        loading={tData.length > 0 ? false : true}
        data={data1}
        width={900}
        height={600}
        rowHeight={80}
        fixed={"right"}
      >
        <Column width={100} align="center">
          <HeaderCell>Name</HeaderCell>
          <Cell dataKey="name" />
        </Column>

        <Column width={200} align="center">
          <HeaderCell>Phone number</HeaderCell>
          <Cell dataKey="phone" />
        </Column>

        <Column width={200} align="center">
          <HeaderCell>City</HeaderCell>
          <Cell dataKey="city" />
        </Column>
        <Column width={200} align="center">
          <HeaderCell>Quantity</HeaderCell>
          <Cell dataKey="quantity" />
        </Column>
        <Column width={200} align="center">
          <HeaderCell>Action</HeaderCell>
          <RemoveCell />
        </Column>
      </Table>
      <div style={{ padding: 20 }} className="tb-page">
        <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          maxButtons={5}
          size="xs"
          layout={["total", "-", "limit", "|", "pager", "skip"]}
          total={tData.length}
          limitOptions={[10, 20, 30]}
          limit={limit}
          activePage={page}
          onChangePage={setPage}
          onChangeLimit={handleChangeLimit}
        />
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Tables;
