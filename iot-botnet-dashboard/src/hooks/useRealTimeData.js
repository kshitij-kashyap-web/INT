import { useEffect, useState } from "react";

export default function useRealTimeData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8000/data");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();

    // 🔥 auto refresh every 2 sec
    const interval = setInterval(fetchData, 2000);

    return () => clearInterval(interval);
  }, []);

  return data;
}