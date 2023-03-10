import '../index.css';
import { useEffect, useState } from "react";
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    };

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    };

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    };

    function closeAllPopups() {
        setIsAddPlacePopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard({});
    };

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});

    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);

    useEffect(() => {
        api.getUserInformation()
        .then((res) => {
            setCurrentUser(res)
        })
        .catch((error) => {
            console.log(error);
        });

    }, [])

    function handleCardClick(card) {
            setSelectedCard(card);
    }


    function handleClickBackgroundClose(e) {
            if (e.target === e.currentTarget) {
                closeAllPopups();
            }
            
    }

    function handleEscClose(e) {
                if (e.key === 'Escape') {
                    closeAllPopups();
                }
            }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        const choiceApiMethod = isLiked ? api.deleteLike(card._id) : api.putLike(card._id);
        choiceApiMethod.then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        }).catch((e) => { console.log(e) });
      };

    function  handleCardDelete(card) {
        api.removeMyOwnCard(card._id)
        .then(() => {
            setCards(cards.filter(value => value._id !== card._id))
        })
        .catch((e) => { 
            console.log(e) 
        })
    }

    useEffect(() => {   
        if (isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen === true) {    
            document.addEventListener('keydown', handleEscClose);

        } 
         return () => { 
            document.removeEventListener('keydown', handleEscClose); 
        }; 

    }, [isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen ]);


  return (
    <CurrentUserContext.Provider value={{currentUser}}>
    <>
    <Header />

    <Main 
        onEditProfile = {handleEditProfileClick}
        onAddPlace = {handleAddPlaceClick}
        onEditAvatar = {handleEditAvatarClick}
        onCardClick = {handleCardClick}
        onCardLike = {handleCardLike}
        onCardDelete = {handleCardDelete}
    />

    <Footer />

    <ImagePopup 
        card={selectedCard} 
        onClose={closeAllPopups} 
        onClick={handleClickBackgroundClose}
    />

    <PopupWithForm 
        onClick={handleClickBackgroundClose} 
        name="profile" 
        title="Редактировать профиль" 
        btnName="Сохранить" 
        isOpen={isEditProfilePopupOpen} 
        onClose={closeAllPopups}>
            <fieldset className="popup__fieldset">
                <input 
                    className="popup__input popup__input_type_name" 
                    type="text" 
                    name="name"
                    placeholder="Имя" 
                    required id="popup-name-profile" 
                    maxlength="40" 
                    minlength="2"/>
                <span className="popup-name-profile-error popup__input-error"></span>
                <input 
                    className="popup__input popup__input_type_status" 
                    type="text" 
                    name="status"
                    placeholder="Описание профиля" 
                    required 
                    id="popup-status-profile" 
                    maxlength="200" 
                    minlength="2"/>
                <span className="popup-status-profile-error popup__input-error"></span>
        </fieldset>
    </PopupWithForm>

    <PopupWithForm 
        onClick={handleClickBackgroundClose} 
        name="showplace" 
        title="Новое место" 
        btnName="Создать" 
        isOpen={isAddPlacePopupOpen} 
        onClose={closeAllPopups} >
            <fieldset className="popup__fieldset">
                <input 
                    className="popup__input popup__input_type_title" 
                    type="text" 
                    name="title" 
                    placeholder="Название"
                    required 
                    id="popup-title-photo" 
                    maxlength="30" 
                    minlength="2"/>
                <span className="popup-title-photo-error popup__input-error"></span>
                <input 
                    className="popup__input popup__input_type_url" 
                    type="url" 
                    name="url"
                    placeholder="Ссылка на картинку" 
                    required 
                    id="popup-url-photo"/>
                <span className="popup-url-photo-error popup__input-error"></span>
            </fieldset>
    </PopupWithForm>

    <PopupWithForm onClick={handleClickBackgroundClose} name="are-you-sure" title="Вы уверены?" btnName="Да" isOpen="">
        <>
            <button className="popup__close popup-are-you-sure__close" type="button"></button>
            <h2 className="popup__title popup__title-without-inputs">Вы уверены?</h2>
            <button className="popup__button" type="submit" value="Да">Да</button>
        </>
    </PopupWithForm>

    <PopupWithForm 
        onClick={handleClickBackgroundClose} 
        name="avatar" 
        title="Обновить аватар" 
        btnName="Сохранить" 
        isOpen={isEditAvatarPopupOpen} 
        onClose={closeAllPopups} >
            <fieldset className="popup__fieldset">
                <input 
                    className="popup__input popup__input_type_url-avatar" 
                    type="url" 
                    name="url"
                    placeholder="Ссылка на новый аватар" 
                    required 
                    id="popup-url-avatar"/>
                <span className="popup-url-avatar-error popup__input-error"></span>
            </fieldset>
    </PopupWithForm>
    </>
    </CurrentUserContext.Provider>
  );
}

export default App;
