import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const EditPage = () => {
    const { id } = useParams();
    const [contact, setContact] = useState();
    const [updatedContact, setUpdatedContact] = useState({
        name: "",
        email: "",
    });

    const fetchContact = async () => {
        if (id) {
            const response = await axios
                .get(`http://localhost:3006/contacts/${id}`)
                .catch(error => console.log(error));

            if (response) setContact(response.data);
            else return;
        }
    };

    const updateContact = async id => {
        if (updatedContact.name === "" || updatedContact.email === "") {
            alert("fill out mandatory fields");
            return;
        }

        const data = {
            id: id,
            ...updatedContact,
        };

        await axios
            .put(`http://localhost:3006/contacts/${id}`, data)
            .catch(error => console.log("user could not be updated", error));

        fetchContact();
        setUpdatedContact({ name: "", email: "" });
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setUpdatedContact({ ...updatedContact, [name]: value });
    };

    useEffect(() => {
        fetchContact();
    }, []);

    console.log(updatedContact);

    return (
        <div className="edit">
            <h1>edit page</h1>
            {contact ? (
                <>
                    <h2>Name: {contact.name}</h2>
                    <h3>Email: {contact.email}</h3>
                    <form>
                        <input
                            name="name"
                            placeholder="Name"
                            value={updatedContact.name}
                            onChange={handleChange}
                        />
                        <input
                            name="email"
                            placeholder="Email"
                            value={updatedContact.email}
                            onChange={handleChange}
                        />
                        <button onClick={() => updateContact(id)}>
                            Update
                        </button>
                        <Link to="/">Cancel</Link>
                    </form>
                </>
            ) : (
                <>
                    <h1>Contact does not exist :(</h1>
                    <Link to="/">Back</Link>
                </>
            )}
        </div>
    );
};

export default EditPage;
