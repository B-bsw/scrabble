'use client'

import { Card, InputGroup, Spinner } from '@heroui/react'
import axios from 'axios'
import { Check, X } from 'lucide-react'
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
                <InputGroup variant="primary">
                    <InputGroup.Prefix>
                        {data[inputWord] ? (
                            <Check size={16} />
                        ) : (
                            <X size={16} />
                        )}
                    </InputGroup.Prefix>
                    <InputGroup.Input
                        value={inputWord}
                        onChange={(e) =>
                            setInputWord(e.currentTarget.value.toUpperCase())
                        }
                    />
                    <InputGroup.Suffix
                        className="cursor-pointer"
                        onClick={() => setInputWord('')}
                    >
                        clear
                    </InputGroup.Suffix>
                </InputGroup>
                <div className="font-bold">
                    {data[inputWord] ? 'Has word' : "Don't has word"}
                </div>
            </Card>
        </>
    )
}
