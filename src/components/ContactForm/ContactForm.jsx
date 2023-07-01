import { useState } from 'react';

import {
  useAddContactMutation,
  useGetContactsQuery,
} from '../../Redux/contactsSlice';

import { Form, Input, Button } from './ContactForm.styled';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const [createContact] = useAddContactMutation();
  const { data: contacts } = useGetContactsQuery();

  const reset = () => {
    setName('');
    setNumber('');
  };

  const createNewContact = async () => {
    const newContact = { name, number };
    const isAlreadyInContacts = contacts.some(
      contact =>
        contact.name.toLowerCase() === name.toLowerCase() ||
        contact.number === number
    );
    if (isAlreadyInContacts) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }
    try {
      await createContact(newContact);
      alert(`Contact ${newContact.name} was added`);
    } catch (error) {
      alert('Something went wrong');
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    createNewContact();
    reset();
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        placeholder="Name"
        type="text"
        name="name"
        value={name}
        onChange={handleInputChange}
        required
      />
      <Input
        placeholder="Number"
        type="tel"
        name="number"
        value={number}
        onChange={handleInputChange}
        required
      />
      <Button type="submit">Add contact</Button>
    </Form>
  );
};

export default ContactForm;
