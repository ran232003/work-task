export const apiCall = async (method, url, payload) => {
  console.log(method, url, payload);
  let data, response;
  try {
    switch (method) {
      case "GET":
        console.log(url, payload);
        response = await fetch(url, { method: "GET", credentials: "include" });
        break;
      case "POST":
        console.log(url, payload, method);

        response = await fetch(url, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        break;
      case "DELETE":
        response = await fetch(url, {
          method: "delete",
          credentials: "include",
        });
        // Expected output: "Mangoes and papayas are $2.79 a pound."
        break;
      case "FORMDATA":
        const formData = new FormData();
        for (const key in payload) {
          if (payload.hasOwnProperty(key)) {
            const value = payload[key];

            // Check if the key is "attachments" and handle as an array
            if (key === "attachments" && Array.isArray(value)) {
              console.log("attachments", value);
              value.forEach((file, index) => {
                // Append each file with a unique key (optional: add indices if needed)
                console.log(value, "value");
                formData.append("attachments", file);
              });
            } else {
              // Append other keys normally
              formData.append(key, value);
            }
          }
        }

        response = await fetch(url, {
          method: "POST",
          credentials: "include",
          body: formData,
        });
        // Expected output: "Mangoes and papayas are $2.79 a pound."
        break;
      case "MULTY":
        // Expected output: "Mangoes and papayas are $2.79 a pound."
        break;
      default:
        console.log(`Sorry, we are out of.`);
    }
    data = await response.json();
    console.log(data);
    return data;
  } catch (error) {}
};
