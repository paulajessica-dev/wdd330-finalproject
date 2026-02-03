const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  
  if (res.ok) {
    return res.json();
  } else {
    const errorText = await res.text();
    throw { name: 'servicesError', message: errorText || "Error processing request" };
  }
}

export default class ExternalServices {
  constructor() {
    // this.category = category;
    // this.path = `../public/json/${this.category}.json`;
    this.baseURL = baseURL;
  }
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    
    return data.Result;
  }
  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    console.log(data.Result);
    return data.Result;
  }
  async checkout(orderData) {
    const response = await fetch(`${baseURL}checkout`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(orderData)
    });
    const data = await convertToJson(response);
    return data;
  }
}