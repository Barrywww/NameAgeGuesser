import React, { useCallback, useEffect, useState } from "react"
import { NameForm } from "@component/NameForm"
import { NameAge } from "@model"

import "./index.less"

/**
 * Homepage screen for the application
 * @constructor
 */
export const Home = () => {
    // detect if the current number of guesses is a odd number.
    const [odd, setOdd] = useState<boolean>(false)
    // store guess results
    const [listData, setListData] = useState<NameAge[]>([])
    // counter of guesses
    const [totalGuesses, setTotalGuesses] = useState<number>(0)

    const updateListData = useCallback((name: string, age: number) => {
        // update guess results on successful submission of form.
        listData.push({
            name: name,
            age: age
        })
        setListData(listData)
        setTotalGuesses(totalGuesses + 1)
    }, [listData, totalGuesses])

    useEffect(() => {
        // check if the current number of guesses is odd.
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
