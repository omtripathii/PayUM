import React, { useEffect } from "react";
import { useAuth } from "../../Hooks/useAuth";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function SendMoney(props) {
  const { firstName, lastName, toUserId } = props;
  const { loading, auth } = useAuth();
  const [amount, setAmount] = useState(0);
  if (loading) {
    return <div>Loading........</div>;
  }
  if (!auth) {
    return <Navigate to="/" replace />;
  }
  const handleTransfer = async () => {
    try {
        const transferData = {
          toUser: toUserId,
          amount: Number(amount)
        };
        const response = await axios.post(
          "http://localhost:3000/api/v1/account/transfer",
          transferData,
          { withCredentials: true }
        );
      toast.success(response?.data?.message || "Payment Successful");
    } catch (error) {
      toast.error("Payment Failed");
      console.log(error);
    }
  };
  return (
    <div className="w-full max-w-md flex flex-col justify-center items-center rounded-xl">
      <div className="text-3xl font-semibold text-blue-500 mb-6">
        Send Money
      </div>
      <div className="flex flex-row gap-2 mb-6">
        <div className="w-10 h-10 rounded-full bg-green-400 flex items-center justify-center text-white font-bold text-lg">
          {firstName?.charAt(0).toUpperCase() || "?"}
        </div>
        <div className="text-xl text-gray-600 mt-1.5">
          {firstName + " " + lastName}
        </div>
      </div>
      <div>
        <div className="text-xl text-gray-500 mb-2">Amount $</div>
        <div>
          <input
            type="number"
            placeholder="Enter Amount"
            className="w-fit border border-blue-300 rounded-md px-3 py-2"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
          <button
            onClick={() => {
              handleTransfer();
            }}
            className="w-fit border px-4 py-2 border-gray-200 rounded-md bg-green-500 hover:bg-green-300 text-amber-50 font-semibold cursor-pointer ml-3"
          >
            Initiate Transfer
          </button>
        </div>
      </div>
    </div>
  );
}

export default SendMoney;
