import React, { useEffect, useState } from "react";
import axios from "axios";
export function useAuth() {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);
  const [userData,setUserData] = useState({})

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/user/isAuthenticated",
          { withCredentials: true }
        );
        if (response?.data?.success) {
          setAuth(true);
          setUserData(response?.data?.UserData)
        }
      } catch (error) {
        setAuth(false);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  return { loading, auth ,userData};
}
