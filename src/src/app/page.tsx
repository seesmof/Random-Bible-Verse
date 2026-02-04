"use client";

import { useEffect, useState } from "react";
import { Bible_Book_number_to_name } from "../data/consts";

interface Verse {
  primaryKey: number;
  translation: string;
  book: number;
  chapter: number;
  verse: number;
  text: string;
}
const url = "https://bolls.life/get-random-verse/UBIO/";
const baseBibleUrl = "https://bolls.life/UBIO";

const copyVerse = (verseText: string, reference: string) => {
  navigator.clipboard.writeText(`${verseText} (${reference})`);
};

export default function Home() {
  const [verse, setVerse] = useState("");
  const [reference, setReference] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    async function startFetching() {
      const response = await fetch(url);
      const result: Verse = await response.json();
      setVerse(result.text);
      setReference(
        `${Bible_Book_number_to_name[result.book as keyof typeof Bible_Book_number_to_name]} ${result.chapter}:${result.verse}`,
      );
      setLink(
        `${baseBibleUrl}/${result.book}/${result.chapter}/${result.verse}`,
      );
    }

    startFetching();
  }, []);

  return (
    <div className="h-screen bg-sky-100 flex flex-col justify-center items-center p-3">
      <div className="card bg-white p-3 rounded-md">
        <div className="card-body">
          <p
            className="cursor-pointer"
            onClick={() => copyVerse(verse, reference)}
          >
            {verse}
          </p>
          <cite className="self-end">
            <a
              className="text-sm hover:underline underline-offset-2"
              href={link}
            >
              {reference}
            </a>
          </cite>
        </div>
      </div>
    </div>
  );
}
