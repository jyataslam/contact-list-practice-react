import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import AddContact from "../../components/add-contact/add-contact";
import ContactList from "../../components/contact-list/contact-list";

import "./homepage.styles.css";

const HomePage = () => {
    const [contacts, setContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const getContacts = async () => {
        const response = await axios.get("http://localhost:3006/contacts");
        if (response) setContacts(response.data);
    };

    const addContacts = async contact => {
        const request = {
            id: uuidv4(),
            ...contact,
        };

        const response = await axios
            .post("http://localhost:3006/contacts", request)
            .catch(error => console.log(error));

        setContacts([...contacts, response.data]);
    };

    const deleteContact = async id => {
        await axios
            .delete(`http://localhost:3006/contacts/${id}`)
            .catch(error => console.log(error));

        const newContactList = contacts
            .slice()
            .filter(contact => contact.id !== id);
        setContacts(newContactList);
    };

    const searchHandler = searchWord => {
        setSearchTerm(searchWord);

        if (searchWord !== "") {
            // filter results
            const newContactList = contacts.filter(contact =>
                Object.values(contact)
                    .join(" ")
                    .toLowerCase()
                    .includes(searchWord.toLowerCase())
            );

            setSearchResults(newContactList);
        } else {
            setSearchResults(contacts);
        }
    };

    useEffect(() => {
        getContacts();
    }, []);

    return (
        <div className="homepage">
            <h1>Contacts</h1>
            <AddContact addContacts={addContacts} />
            <ContactList
                contacts={searchTerm.length < 1 ? contacts : searchResults}
                deleteContact={deleteContact}
                term={searchTerm}
                searchKeyword={searchHandler}
            />
        </div>
    );
};

export default HomePage;
