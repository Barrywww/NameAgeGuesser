import React, { useCallback, useState } from "react"
import { getAgeByName } from "@api"
import { UserFormData } from "@model"

import "./index.less"


// Type declaration of the props of NameForm
type NameFormProps = {
    updateListData: Function
}

/**
 * Form component to handle user input&submission
 * @param updateListData: update the result to parent component.
 * @constructor
 */
export const NameForm = ({ updateListData }: NameFormProps) => {
    // store form data.
    const [formData, setFormData] = useState<UserFormData>({ name: "" })


    // handle change upon user changed form value.
    const onFormChange = useCallback((event: React.FormEvent<HTMLInputElement>): void => {
        setFormData({
            name: event.currentTarget.value
        })
    }, [formData])

    // handle form submission.
    const onFormSubmit = useCallback(async (event: React.SyntheticEvent) => {
        event.preventDefault()
        // check empty input.
        if (formData.name.trim() === "") {
            alert("Please input a name!")
            return
        }

        // await for API response & propagate to parent component.
        updateListData(formData.name, await getAgeByName(formData.name))
        // reset form input.
        setFormData({ name: "" })
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
