import axios from "axios";

const baseUrl = "https://apimocha.com/quicksell/data";

const fetchData = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default fetchData;
