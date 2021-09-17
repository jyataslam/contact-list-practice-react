import { useState } from "react";

import "./add-contact.styles.css";

const AddContact = ({ addContacts }) => {
    const [contact, setContact] = useState({
        name: "",
        email: "",
    });

    const handleSubmit = e => {
        e.preventDefault();

        if (contact.name === "" || contact.email === "") {
            alert("fill out required fields");
            return;
        }

        addContacts(contact);
        setContact({ name: "", email: "" });
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setContact({ ...contact, [name]: value });
    };

    return (
        <div className="add-contact">
            <form className="form">
                <div className="form-field">
                    <label htmlFor="name">Name</label>
                    <input
                        name="name"
                        placeholder="Name"
                        onChange={handleChange}
                        value={contact.name}
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="email">Email</label>
                    <input
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        value={contact.email}
                    />
                </div>
                <button onClick={handleSubmit}>Add Contact</button>
            </form>
        </div>
    );
};

export default AddContact;
