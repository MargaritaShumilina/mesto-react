import PopupWithForm from './PopupWithForm';
import React from "react";
import { useState, useRef } from "react";

function EditAvatarPopup(props) {

    const currentAvatar = useRef('');
    const [avatar, setAvatar] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
      
        props.onUpdateAvatar({
          avatar: currentAvatar.current.value,
        });
      }

    function handleChangeAvatar(e) {
        setAvatar(e.target.value);
    }
    return (
        <PopupWithForm 
            onClick={props.onClick} 
            name="avatar" 
            title="Обновить аватар" 
            btnName="Сохранить" 
            isOpen={props.isOpen} 
            onClose={props.onClose}
            onSubmit={handleSubmit} >
                <fieldset className="popup__fieldset">
                    <input 
                        ref={currentAvatar}
                        onChange={handleChangeAvatar}
                        className="popup__input popup__input_type_url-avatar" 
                        type="url" 
                        name="url"
                        placeholder="Ссылка на новый аватар" 
                        required 
                        id="popup-url-avatar"/>
                    <span className="popup-url-avatar-error popup__input-error"></span>
                </fieldset>
        </PopupWithForm>
    )

}

export default EditAvatarPopup