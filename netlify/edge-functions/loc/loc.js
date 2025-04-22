
exports.handler = async (event) => {
  const ip = event.headers["x-forwarded-for"] || "Unknown";
  const userAgent = event.headers["user-agent"];
  const time = new Date().toISOString();

  const sheetUrl = "https://sheet.best/api/sheets/e2WqMy7p21#WjjhIWJX_QSHFN6fiSLXr6N@byhbAO#sGN3ee9-txJO9!CVN2G7SW";


 
  await fetch(sheetUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ time, ip, userAgent }),
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "IP logged" }),
  };
};

