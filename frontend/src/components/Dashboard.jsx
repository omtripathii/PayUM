import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useAuth } from "../../Hooks/useAuth";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import SendMoney from "./SendMoney";
function Dashboard() {
  const [balance, setBalance] = useState(0);
  const [filter, setFilter] = useState("");
  const [friends, setFriends] = useState([]);
  const [filteredList, setFilteredList] = useState(friends);
  const [selectedFriend, setSelectedFriend] = useState(null);
  useEffect(() => {
    async function checkBalance() {
      const response = await axios.get(
        "http://localhost:3000/api/v1/account/balance",
        { withCredentials: true }
      );
      setBalance(response?.data?.balance);
    }
    checkBalance();
    console.log(balance);
  }, []);
  useEffect(() => {
    async function getFriends() {
      const response = await axios.get(
        "http://localhost:3000/api/v1/user/users",
        { withCredentials: true }
      );
      setFriends(...friends, response?.data?.friendList);
    }
    getFriends();
    console.log(friends);
  }, []);
  useEffect(() => {
    async function filterFriend() {
      const response = await axios.get(
        "http://localhost:3000/api/v1/user/bulk",
        {
          params: { name: filter },
          withCredentials: true,
        }
      );
      setFilteredList(response?.data?.filteredList);
    }
    filterFriend();
  }, [filter]);
  const { loading, auth, userData } = useAuth();
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl">
        Loading...
      </div>
    );
  }
  if (!auth) {
    return <Navigate to="/" replace />;
  }
  const { username, firstName, lastName } = userData;


  return (
    <div className="flex flex-col justify-center items-center">
      {/* AppBar */}
      <div className="w-2/3 flex flex-row justify-between text-2xl rounded-md shadow-md px-3 py-4 mb-6">
        <div className=" max-w-1/11">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/PayU.svg/2560px-PayU.svg.png"
            alt=""
          />
        </div>
        <div className="flex flex-row justify-evenly gap-2 mt-1">
          <div className="text-xl mt-1">
            <i>hi !</i>
            <b>{" " + firstName} </b>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold text-lg">
            {firstName?.charAt(0).toUpperCase() || "?"}
          </div>
        </div>
      </div>
      {/* Balance Component  */}
      <div className="text-3xl text-gray-500 mb-6">
        Your Balance is ${Math.round(balance)}
      </div>
      {/* Sending Money to Friends */}
      <div className="w-2/3 shadow-md flex flex-col px-3 py-3">
        <div className="text-2xl font-semibold text-gray-600 mb-6 ml-1">
          Friends on PayUM
        </div>
        <div>
          <input
            className="w-full px-3 py-2 mb-6 border border-blue-200 rounded-3xl"
            type="text"
            placeholder="Enter Name of the User"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
            }}
          />
          <div className="">
            {filteredList.map((item, index) => {
              return (
                <div key={item._id} className="flex flex-row justify-between">
                  <div className="flex flex-row px-3 py-3 gap-2">
                    <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold text-lg">
                      {item.firstName?.charAt(0).toUpperCase() || "?"}
                    </div>
                    <div className="mt-2">
                      {item.firstName + " " + item.lastName}
                    </div>
                  </div>
                  <div className="mt-3">
                    <button onClick={() => setSelectedFriend(item)} className="w-fit border px-4 py-2 border-gray-200 rounded-md bg-gray-950 hover:bg-gray-800 text-amber-50 font-semibold cursor-pointer" >
                      Send Money
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Conditionally render SendMoney component */}
      {selectedFriend && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <SendMoney
              firstName={selectedFriend.firstName}
              lastName={selectedFriend.lastName}
              toUserId={selectedFriend._id}
            />
            <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg" onClick={() => setSelectedFriend(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
