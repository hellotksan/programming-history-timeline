import fs from "fs";
import path from "path";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const name = url.searchParams.get("name");

  const filePath = path.join(process.cwd(), "data", "homepage.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const technologies = JSON.parse(fileContents);

  if (name) {
    const tech = technologies.find(
      (tech: { name: string }) => tech.name.toLowerCase() === name.toLowerCase()
    );
    if (tech) {
      return new Response(JSON.stringify(tech), {
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }

  // 技術が見つからない場合
  return new Response(JSON.stringify(technologies), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
