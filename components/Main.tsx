"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function MainPage() {
  const [data, setData] = useState<Record<string, number>>({});
  const [inputWord, setInputWord] = useState<string>("");
  const [isHasWord, setIsHasWord] = useState<boolean>(false);

  // const isValid = () => {
  //   setInputWord(data[inputWord] === 1);
  // };

  useEffect(() => {
    const fetchData = () => {
      const API: string =
        process.env.NEXT_PUBLIC_API ||
        `http://localhost:${process.env.NEXT_PUBLIC_PORT || 3000}`;

      const fData = axios
        .get(API + "all")
        .then((e) => setData(e.data))
        .catch((err) => console.log(err));
    };

    fetchData();
  }, []);
  return (
    <>
      <div>
        <div>{inputWord.length === 0 ? 'N/A' : inputWord}</div>
        <input
          className="outline"
          onChange={(e) => {
            setInputWord(e.currentTarget.value.toUpperCase());
          }}
        />
        <div>{data[inputWord] === 1 ? "Has word" : "don't has word"}</div>
      </div>
    </>
  );
}
