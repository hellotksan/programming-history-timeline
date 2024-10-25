"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Technology = {
  id: string;
  name: string;
  year: number;
  type: string;
  description: string;
  creator: string;
  latestVersion: string;
  website: string;
};

async function fetchTechnologies(): Promise<Technology[]> {
  const response = await fetch("/api/homepage");
  if (!response.ok) {
    throw new Error("Failed to fetch technologies");
  }
  return response.json();
}

export default function Home() {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    fetchTechnologies().then((data) => {
      const sortedData = data.sort((a, b) =>
        sortOrder === "asc" ? a.year - b.year : b.year - a.year
      );
      setTechnologies(sortedData);
    });
  }, [sortOrder]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mt-5 mb-10">
        Programming History Timeline
      </h1>
      <div className="mb-8">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
          onClick={() => setSortOrder("asc")}
        >
          古い順
        </button>
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded"
          onClick={() => setSortOrder("desc")}
        >
          新しい順
        </button>
      </div>
      <div>
        {technologies.map((tech) => (
          <div key={tech.id} className="mb-4 p-4 border rounded shadow">
            <div>
              <Link href={`/tech?techname=${tech.name}`} passHref>
                <strong>
                  {tech.year} - {tech.name} ({tech.type})
                </strong>
                <p>{tech.description}</p>
                <p>
                  Developer: {tech.creator} | Latest Version:{" "}
                  {tech.latestVersion}
                </p>
              </Link>
            </div>
            <Link
              href={tech.website}
              target="_blank"
              className="text-blue-500 underline"
              rel="noopener noreferrer"
            >
              公式サイト
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
