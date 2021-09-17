import { useRef } from "react";
import { useHistory } from "react-router-dom";
import "./contact-list.styles.css";

const ContactList = ({ contacts, deleteContact, term, searchKeyword }) => {
    const history = useHistory();
    const inputElement = useRef("");

    const handleEdit = id => {
        history.push(`/edit/${id}`);
    };

    const getSearchTerm = () => {
        searchKeyword(inputElement.current.value);
    };

    return (
        <div className="contact-list">
            <input
                ref={inputElement}
                type="text"
                placeholder="Search Contacts"
                value={term}
                onChange={getSearchTerm}
            />
            {contacts.length > 0 ? (
                contacts.map((item, index) => (
                    <div className="contact" key={index}>
                        <h1>{item.name}</h1>
                        <h4>{item.email}</h4>
                        <button onClick={() => deleteContact(item.id)}>
                            Delete
                        </button>
                        <button onClick={() => handleEdit(item.id)}>
                            Edit
                        </button>
                    </div>
                ))
            ) : (
                <p>No results :(</p>
            )}
        </div>
    );
};

export default ContactList;
