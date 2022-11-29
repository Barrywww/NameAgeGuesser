import React, { useCallback, useState } from "react"

import { getAgeByName } from "@api"
import { NameAge } from "@model"
import { UserFormData } from "@model"

import "./index.less"

export const Home = () => {
    const [listData, setListData] = useState<NameAge[]>([])
    const [totalGuesses, setTotalGuesses] = useState<number>(0)
    const [formData, setFormData] = useState<UserFormData>({ name: "" })

    const onFormChange = useCallback((event: React.FormEvent<HTMLInputElement>): void => {
        setFormData({
            name: event.currentTarget.value
        })
    }, [formData])

    const onFormSubmit = useCallback(async (event: React.SyntheticEvent) => {
        event.preventDefault();
        if (formData.name.trim() === "") {
            alert("Please input a valida name")
            return
        }

        const age = await getAgeByName(formData.name)
        listData.push({
            name: formData.name,
            age: age
        })

        setFormData({ name: "" })
        setListData(listData)
        setTotalGuesses(totalGuesses + 1)
    }, [totalGuesses, formData, listData])

    return (
        <div id="app-wrapper">
            <div id="header">Name Age Guesser</div>
            <div id="app-body">
                <div>
                    <h2 id="total">Total Guesses: {totalGuesses === 0 ? "X" : totalGuesses}</h2>
                    {totalGuesses > 0 && (
                        <span id="greeting">What an {totalGuesses % 2 === 0 ? "even" : "odd"} number of guesses!</span>
                    )}
                </div>
                <form id="input-form" onSubmit={onFormSubmit}>
                    <label>Please enter a name here:</label>
                    <br/>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={onFormChange}/>
                    <button type="submit">Submit</button>
                </form>
                <div id="result-wrapper">
                    <h2>All guesses:</h2>
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
