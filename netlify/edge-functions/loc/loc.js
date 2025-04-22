export default async (request, context) => {
  const ip = request.headers.get("x-forwarded-for") || "Unknown";
  const userAgent = request.headers.get("user-agent");
  const time = new Date().toISOString();

  const sheetUrl = "https://api.sheetbest.com/sheets/ba57befc-c8ec-468b-97b0-9f0def16168d"; 

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

