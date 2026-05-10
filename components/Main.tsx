'use client'

import { Card, InputGroup, Spinner } from '@heroui/react'
import axios from 'axios'
import { Check, Ellipsis, X } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function MainPage() {
    const [data, setData] = useState<Record<string, number>>({})
    const [inputWord, setInputWord] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchData = () => {
            const API: string =
                process.env.NEXT_PUBLIC_API ||
                `http://localhost:${process.env.NEXT_PUBLIC_PORT || 3000}`

            axios
                .get(API + 'all')
                .then((e) => setData(e.data))
                .catch((err) => console.log(err))
                .finally(() => setIsLoading(false))
        }

        fetchData()
    }, [])

    if (isLoading) {
        return (
            <>
                <Spinner />
                <span className="ml-2">Loading</span>
            </>
        )
    }

    return (
        <>
            <Card className="items-center border border-zinc-50">
                {/*<div>{inputWord.length === 0 ? "N/A" : inputWord}</div>*/}

                <div className="font-bold">
                    {inputWord.length === 0 ? (
                        <div className="animate-caret-blink font-normal">
                            <Ellipsis />
                        </div>
                    ) : data[inputWord] ? (
                        'Has word'
                    ) : (
                        "Don't has word"
                    )}
                </div>

                <InputGroup variant="primary">
                    <InputGroup.Prefix>
                        {data[inputWord] ? (
                            <Check size={20} className="text-lime-600" />
                        ) : (
                            <X size={20} className="text-red-600" />
                        )}
                    </InputGroup.Prefix>
                    <InputGroup.Input
                        placeholder="Type word"
                        value={inputWord}
                        onChange={(e) =>
                            setInputWord(e.currentTarget.value.toUpperCase())
                        }
                    />
                    <InputGroup.Suffix
                        className="cursor-pointer select-none"
                        onClick={() => setInputWord('')}
                    >
                        clear
                    </InputGroup.Suffix>
                </InputGroup>
            </Card>
        </>
    )
}
