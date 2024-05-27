async function fetchData(endpoint) {
  try {
    const response = await axios.get(`${baseUrl}${endpoint}`, {
      headers: { "content-type": "application/json" },
    });
    return response.data;
  } catch (error) {
    showError(error);
    console.error(`Error fetching data from ${endpoint}:`, error);
  }
}
// async function postData(endpoint, data) {
//   loadingInit();
//   try {
//     const response = await axios.get(`${baseUrl}${endpoint}`, {
//       headers: { "content-type": "application/json" },
//       data: data,
//     });
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching data from ${endpoint}:`, error);
//     // throw error;
//   } finally {
//     loadingDestroy();
//   }
// }
