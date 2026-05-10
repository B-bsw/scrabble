"use client";

import { Card, Input, Spinner } from "@heroui/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function MainPage() {
  const [data, setData] = useState<Record<string, number>>({});
  const [inputWord, setInputWord] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = () => {
      const API: string =
        process.env.NEXT_PUBLIC_API ||
        `http://localhost:${process.env.NEXT_PUBLIC_PORT || 3000}`;

      const fData = axios
        .get(API + "all")
        .then((e) => setData(e.data))
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <>
        <Spinner />
        <span className="ml-2">Loading</span>
      </>
    );
  }

  return (
    <>
      <Card>
        <div>{inputWord.length === 0 ? "N/A" : inputWord}</div>
        <Input
          variant="secondary"
          onChange={(e) => setInputWord(e.currentTarget.value.toUpperCase())}
        />
        <div>{data[inputWord] ? "Has word" : "don't has word"}</div>
      </Card>
    </>
  );
}
