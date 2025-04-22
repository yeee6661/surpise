export default async (request) =>
  new Response('Hello, World!', {
    headers: { 'content-type': 'text/html' },
  })
const fs = require("fs");
const path = require("path");

exports.handler = async (event) => {
  const ip = event.headers["x-forwarded-for"] || "Unknown";
  const userAgent = event.headers["user-agent"];
  const time = new Date().toISOString();

  const content = `Time: ${time}\nIP: ${ip}\nUser-Agent: ${userAgent}\n\n`;
  const filePath = path.join("/tmp", "ips.txt"); // only writable location

  fs.appendFileSync(filePath, content);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "IP logged (temporarily)" }),
  };
};
