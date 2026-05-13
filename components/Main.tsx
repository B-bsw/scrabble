'use client'

import { Card, TextField, InputGroup, Spinner } from '@heroui/react'
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
            <div className="flex items-center">
                <Spinner />
                <span className="ml-2">Loading</span>
            </div>
        )
    }

    return (
        <Card className="mx-2 w-full max-w-md">
            <Card.Header>
                <Card.Title>Scrabble Word Checker</Card.Title>
            </Card.Header>
            <Card.Content className="flex flex-col gap-4">
                <div className="flex h-12 items-center justify-center rounded-lg text-xl font-bold dark:bg-zinc-800">
                    {inputWord.length === 0 ? (
                        <div className="animate-caret-blink font-normal text-zinc-400">
                            <Ellipsis />
                        </div>
                    ) : data[inputWord] ? (
                        <span className="text-lime-600">Word Found!</span>
                    ) : (
                        <span className="text-red-500">Not Found</span>
                    )}
                </div>

                <TextField aria-label="Word to check">
                    <InputGroup>
                        <InputGroup.Prefix>
                            {inputWord.length === 0 ? null : data[inputWord] ? (
                                <Check size={20} className="text-lime-600" />
                            ) : (
                                <X size={20} className="text-red-600" />
                            )}
                        </InputGroup.Prefix>
                        <InputGroup.Input
                            placeholder="Type a word to check..."
                            value={inputWord}
                            onChange={(e) =>
                                setInputWord(
                                    e.currentTarget.value.toUpperCase()
                                )
                            }
                        />
                        {inputWord.length > 0 && (
                            <InputGroup.Suffix>
                                <button
                                    className="cursor-pointer text-sm text-zinc-500 select-none hover:text-zinc-800"
                                    onClick={() => setInputWord('')}
                                >
                                    Clear
                                </button>
                            </InputGroup.Suffix>
                        )}
                    </InputGroup>
                </TextField>
            </Card.Content>
        </Card>
    )
}
