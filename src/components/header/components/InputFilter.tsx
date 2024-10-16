import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  loadPosts,
  addFilterByPostsAction,
  getPostsLength,
} from 'store/actions/postActions';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { FaSearch } from 'react-icons/fa';

interface Field {
  [key: string]: any;
}

export const InputFilter = () => {
  const dispatch = useAppDispatch();

  const { users } = useSelector((state: any) => state.userModule);

  const [fields, setFields] = useState<Field>({ txt: '' });
  const [usersAutoComplete, setUsersAutoComplete] = useState<string[]>([]);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const handleChange = async ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const field = target.name;
    let value = target.type === 'number' ? +target.value || '' : target.value;
    setFields({ [field]: value });
    if (target.value === '') onLoadPosts();
  };

  const handleAutComplete = () => {
    const inputField = document.getElementById('txt') as HTMLInputElement;
    const ulField = document.querySelector('.suggestions') as HTMLUListElement;

    inputField.addEventListener('input', changeAutoComplete);
    if (ulField) ulField.addEventListener('click', selectItem);

    function changeAutoComplete({ target }: Event) {
      const data = (target as HTMLInputElement).value;
      ulField.innerHTML = ``;
      if (data?.length) {
        const autoCompleteValues = autoComplete(data);
        autoCompleteValues.forEach((value) => {
          addItem(value);
        });
      }
    }

    function autoComplete(inputValue: string) {
      const destination = usersAutoComplete || [];
      return destination.filter((value) =>
        value.toLowerCase().includes(inputValue.toLowerCase())
      );
    }

    function addItem(value: string) {
      ulField.innerHTML += `<li>${value}</li>`;
    }

    function selectItem({ target }: Event) {
      if ((target as HTMLElement).tagName === 'LI') {
        inputField.value = (target as HTMLElement).textContent || '';
        ulField.innerHTML = ``;
        setFields({ txt: inputField.value });
      }
    }
  };

  const getUsersName = () => {
    if (!users) return;
    const usersToReturn = users.map(
      (user: { fullname: string }) => user.fullname
    );
    setUsersAutoComplete(usersToReturn);
  };

  useEffect(() => {
    getUsersName();
    handleAutComplete();
    return () => {
      dispatch(addFilterByPostsAction({}));
    };
  }, [users]);

  useEffect(() => {
    handleAutComplete();
  }, [usersAutoComplete]);

  useEffect(() => {
    onLoadPosts();
  }, [fields.txt]);

  const onLoadPosts = () => {
    dispatch(addFilterByPostsAction(fields));
    dispatch(loadPosts());
    dispatch(getPostsLength());
  };

  const focusStyle = isFocus ? 'focus' : '';

  return (
    <section className="input">
      <FaSearch className="search-icon" />
      <input
        type="text"
        placeholder="Search..."
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.code === 'Enter') onLoadPosts();
        }}
        onFocus={() => {
          setIsFocus(true);
        }}
        onBlur={() => {
          setIsFocus(false);
        }}
        id="txt"
        name="txt"
        value={fields.txt}
      />
      <ul className={'suggestions ' + focusStyle}></ul>
    </section>
  );
};
