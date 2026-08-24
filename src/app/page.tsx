"use client";

import { useEffect, useState } from "react";
import { BibleBookNumberToName } from "../data/consts";

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
  const [verse, setVerse] = useState<string>("");
  const [reference, setReference] = useState<string>("");
  const [link, setLink] = useState<string>("");

  useEffect(() => {
    async function startFetching() {
      const response = await fetch(url);
      const result: Verse = await response.json();
      setVerse(result.text);
      setReference(
        `${BibleBookNumberToName[result.book as keyof typeof BibleBookNumberToName]} ${result.chapter}:${result.verse}`,
      );
      setLink(
        `${baseBibleUrl}/${result.book}/${result.chapter}/${result.verse}`,
      );
    }

    startFetching();
  }, []);

  return (
    <div className="min-h-screen bg-sky-100 flex flex-col justify-center items-center p-3">
      {verse && (
        <div className="bg-white p-5 rounded-md shadow flex flex-col">
          <p
            className="cursor-pointer"
            onClick={() => copyVerse(verse, reference)}
          >
            {verse}
          </p>
          <cite className="self-end mt-1">
            <a
              className="text-sm hover:underline underline-offset-2"
              href={link}
            >
              {reference}
            </a>
          </cite>
        </div>
      )}
    </div>
  );
}
