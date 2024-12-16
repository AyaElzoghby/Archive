import { useState, useEffect } from "react";
import { handleDropdownFormat } from "../utilities";
import { api } from "../utilities";

export function useDropDown(spName, params = {}, key, value) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.get(
        `/table/filter?sp=${spName}` +
          Object.keys(params)
            .map((key) => `&${key}=${params[key]}`)
            .join("")
      );
      const formattedData = handleDropdownFormat(
        response.data.data,
        key,
        value
      );
      setData(formattedData);
      setLoading(false);
    } catch (err) {
      setError(err.message || "An error in fetching the dropDown options");
    }
  };

  console.log(data);

  useEffect(() => {
    fetchData();
  }, []); // Add dependencies to avoid stale data

  return { data, loading, error };
}
