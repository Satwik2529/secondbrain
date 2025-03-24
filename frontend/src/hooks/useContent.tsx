import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

export function useContent() {
  const [contents, setContents] = useState([]);

  async function refresh() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in localStorage.");
        return;
      }

      const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: token, // Ensure a valid token is passed
        },
      });

      setContents(response.data.content); // Ensure the API response structure matches
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  }

  useEffect(() => {
    refresh(); // Initial fetch

    const interval = setInterval(() => {
      refresh();
    }, 20 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return contents;
}
