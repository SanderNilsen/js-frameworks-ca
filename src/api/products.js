const BASE_URL = "https://v2.api.noroff.dev/online-shop";

export async function getProducts() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch products");
  const json = await res.json();
  return json.data; 
}

export async function getProductById(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  const json = await res.json();
  return json.data;
}