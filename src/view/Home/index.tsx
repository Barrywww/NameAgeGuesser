import React, { useCallback, useEffect, useState } from "react"
import { NameForm } from "@component/NameForm"
import { NameAge } from "@model"

import "./index.less"

export const Home = () => {
    const [odd, setOdd] = useState<boolean>(false);
    const [listData, setListData] = useState<NameAge[]>([])
    const [totalGuesses, setTotalGuesses] = useState<number>(0)

    const updateListData = useCallback((name: string, age: number) => {
        listData.push({
            name: name,
            age: age
        })
        setListData(listData)
        setTotalGuesses(totalGuesses + 1)
    }, [listData, totalGuesses])

    useEffect(() => {
        setOdd(!(totalGuesses % 2 === 0))
    }, [totalGuesses])

    return (
        <div id="app-wrapper">
            <div id="header">Name Age Guesser</div>
            <div id="app-body">
                <div id="total">
                    <h2>Total Guesses: {totalGuesses === 0 ? "X" : totalGuesses}</h2>
                    {(totalGuesses > 0 && odd) && (
                        <span>What an odd number of guesses!</span>
                    )}
                </div>
                <NameForm updateListData={updateListData}/>
                <div id="result-wrapper">
                    <h2>All Guesses:</h2>
                    <ul>
                        {listData.map((i: NameAge) => (
                            <li>{i.name} - {i.age}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
