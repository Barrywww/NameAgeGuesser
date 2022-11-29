import React, { useCallback, useState } from "react"
import { getAgeByName } from "@api"
import { UserFormData } from "@model"

import "./index.less"


type NameFormProps = {
    updateListData: Function
}


export const NameForm = ({ updateListData }: NameFormProps) => {
    const [formData, setFormData] = useState<UserFormData>({ name: "" })


    const onFormChange = useCallback((event: React.FormEvent<HTMLInputElement>): void => {
        setFormData({
            name: event.currentTarget.value
        })
    }, [formData])

    const onFormSubmit = useCallback(async (event: React.SyntheticEvent) => {
        event.preventDefault();
        if (formData.name.trim() === "") {
            alert("Please input a name!")
            return
        }

        const age = await getAgeByName(formData.name)
        setFormData({ name: "" })
        updateListData(formData.name, age)
    }, [formData])


    return (
        <form id="input-form" onSubmit={onFormSubmit}>
            <label>Please enter a name here:</label>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={onFormChange}/>
            <button type="submit">Submit</button>
        </form>
    )
}
