import { useSelector } from 'react-redux';
import { getFilter } from 'Redux/selectors';

import {
  useGetContactsQuery,
  useDeleteContactMutation,
} from 'Redux/contactsSlice';

import { RiDeleteBinLine } from 'react-icons/ri';

import { Button, List, Item } from '../ContactList/ContactList.styled';

export const Contacts = () => {
  const removeContactId = id => {
    removeContact(id);
  };

  const { data: contacts = [] } = useGetContactsQuery();
  const [removeContact] = useDeleteContactMutation();

  const filter = useSelector(getFilter);

  const existingContacts = (() => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  })();

  return (
    <List>
      {existingContacts.map(({ name, id, number }) => (
        <Item key={id}>
          {name} : {number}
          <Button onClick={() => removeContactId(id)}>
            <RiDeleteBinLine />
          </Button>
        </Item>
      ))}
    </List>
  );
};

export default Contacts;
