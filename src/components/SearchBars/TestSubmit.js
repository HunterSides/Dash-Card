import React from "react";
import Link from "react-router-dom";

function TestSubmit() {
  const base = "https://api.dashretail.org";
  const deviceAuthToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTUzNDc0MTYsInVzZXJJZCI6ImIwNjZkZmE1LWYyNTUtNGRiMi04MTYwLTBkMTFiNDQyYzkxNCJ9.DKWY2RCuO8XlvytOC0wwOm-alWL3_hIe3Gw_w2vRtRI";
  const defaultHeaders = { Authorization: "Bearer " + deviceAuthToken };
  const defaultnumber = "3813028379942091";

  useEffect(() => {
    fetchItems();
  }, []);

  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const data = await fetch(`${base}/store-cards/unknown?number=${number}`, {
      method: "POST",
      headers: { ...defaultHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ pin: "" })
    });

    const items = await data.json();
    console.log(items);
    //setItems(items.items);
  };
}
export default TestSubmit();
