const BASE_URL = "http://localhost:4000";

async function getData(endpoint) {
  const res = await fetch(`${BASE_URL}${endpoint}`);
  const data = await res.json();
  return data;
}

async function saveData(endpoint, data) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  const res = await fetch(`${BASE_URL}${endpoint}`, requestOptions);
  const responseData = await res.json();
  return responseData;
}

async function deleteData(endpoint, id) {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };
  const res = await fetch(`${BASE_URL}${endpoint}/${id}`, requestOptions);
  if (!res.ok) {
    throw new Error("Error al eliminar registro");
  }
  return res.ok;
}

async function updateData(endpoint, id, data) {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  const res = await fetch(`${BASE_URL}${endpoint}/${id}`, requestOptions);
  const responseData = await res.json();
  return responseData;
}

async function searchData(endpoint, param) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const url = `${BASE_URL}${endpoint}/${param}`;

  try {
    const res = await fetch(url, requestOptions);

    if (!res.ok) {
      throw new Error(
        `Error al recuperar registro: ${res.status} ${res.statusText}`
      );
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error en searchData:", error);
    throw error;
  }
}

export default { getData, saveData, deleteData, updateData, searchData };