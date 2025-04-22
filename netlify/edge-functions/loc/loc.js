export default async (request, context) => {
  const ip = request.headers.get("x-forwarded-for") || "Unknown";
  const userAgent = request.headers.get("user-agent");
  const time = new Date().toISOString();

  const sheetUrl = "https://sheet.best/api/sheets/e2WqMy7p21#WjjhIWJX_QSHFN6fiSLXr6N@byhbAO#sGN3ee9-txJO9!CVN2G7SW"; 

  await fetch(sheetUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ time, ip, userAgent }),
  });

  return new Response(JSON.stringify({ message: "IP logged" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

