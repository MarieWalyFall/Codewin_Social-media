import React, { useEffect, useState, ChangeEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { updateUser } from '../../store/actions/userActions';
import { uploadImg } from 'services/imgUpload.service';
import { User } from 'types';
import { useAppDispatch } from 'hooks/useAppDispatch';

interface EditModalProps {
  toggleShowEditModal: () => void;
  user: User;
}

export const EditModal: React.FC<EditModalProps> = ({ toggleShowEditModal, user }) => {
  const dispatch = useAppDispatch();
  
  const [userToUpdate, setUserToUpdate] = useState({
    age: user.age || '',
    bg: user.bg || '',
    email: user.email || '',
    fullname: user.fullname || '',
    imgUrl: user.imgUrl || '',
    phone: user.phone || '',
    profession: user.profession || '',
  
  });

  const { age, bg, email, fullname, imgUrl, phone, profession} = userToUpdate;

  useEffect(() => {}, []);

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = target;
    const updatedValue = type === 'number' ? +value || '' : value;

    setUserToUpdate((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));
  };

  const onSaveUser = () => {
    dispatch(updateUser({ ...user, ...userToUpdate })).then((res: any) => {
      if (res) toggleShowEditModal();
    });
  };

  const onUploadImg = async (ev: ChangeEvent<HTMLInputElement>) => {
    const res = await uploadImg(ev);
    setUserToUpdate((prev) => ({
      ...prev,
      imgUrl: res.url,
    }));
  };

  return (
    <section className="edit-modal">
      <div className="bg" onClick={toggleShowEditModal}></div>
      <div className="container">
        <div className="title">
          <p>Edit profile</p>
          <span onClick={toggleShowEditModal}>
            Icon
          </span>
        </div>

        <div className="form-container">
          <form className="form" action="">
            <label htmlFor="imgUrl" className="add-file">
              <div className="add-btn">
                <p>Add image profile</p>
                Icon
              </div>
              <input onChange={onUploadImg} id="imgUrl" type="file" name="imgUrl" hidden />
              {imgUrl && <img className="img-to-upload" src={imgUrl} alt="Uploaded profile" />}
            </label>

            <label htmlFor="fullname" className="first-name">
              <p>
                Fullname <span>*</span>
              </p>
              <input name="fullname" onChange={handleChange} id="fullname" type="text" value={fullname || ''} />
            </label>

            <label htmlFor="email" className="email">
              <p>Email</p>
              <input name="email" onChange={handleChange} id="email" type="email" value={email || ''} />
            </label>

            <label htmlFor="profession" className="profession">
              <p>Profession</p>
              <input name="profession" onChange={handleChange} id="profession" type="text" value={profession || ''} />
            </label>

            <label htmlFor="age" className="age">
              <p>Age</p>
              <input name="age" onChange={handleChange} id="age" type="number" value={age || ''} />
            </label>

            <label htmlFor="phone" className="phone">
              <p>Phone</p>
              <input name="phone" onChange={handleChange} id="phone" type="text" value={phone || ''} />
            </label>
          </form>
        </div>
        <div className="btn-save-container">
          <button onClick={onSaveUser}>Save</button>
        </div>
      </div>
    </section>
  );
};
