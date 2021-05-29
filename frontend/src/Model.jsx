import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom';

const Model = ({ data }) => {
    console.log("Data============", data);
    let id = data[0]._id;
    let history = useHistory();

    const [firstName, setFirstName] = useState(data[0].firstname);
    const [lastName, setLastName] = useState(data[0].lastname);
    const [email, setEmail] = useState(data[0].email);
    const [DOB, setDOB] = useState(data[0].dob);

    const firstEvent = (event, setFunction) => {
        setFunction(event.target.value)
    }

    const editUser = async () => {
        try {
            const data = {
                "firstname": firstName,
                "lastname": lastName,
                "email": email,
                "dob": DOB
            }
            const editData = await axios({
                method: 'put',
                url: `http://localhost:8000/api/user/editUser/${id}`,
                data: data
            })

            if (editData.data.code === 200) {
                history.push('/dashboard')
                alert(editData.data.data)
            }
        } catch (e) {
            console.log("Error========", e.response);
            alert(e)
        }
    }

    return (
        <>
            <div>
                Firstname : <input type="text" value={firstName} onChange={(item) => { firstEvent(item, setFirstName) }} />
                <br /><br />
                Lastname : <input type="text" value={lastName} onChange={(item) => { firstEvent(item, setLastName) }} />
                <br /><br />
                Email : <input type="text" value={email} onChange={(item) => { firstEvent(item, setEmail) }} />
                <br /><br />
                DOB : <input type="date" value={DOB} onChange={(item) => { firstEvent(item, setDOB) }} />
                <br /><br />
                <button onClick={editUser} style={{ "cursor": "pointer" }}>Submit</button>
            </div>
        </>
    )
}

export default Model;