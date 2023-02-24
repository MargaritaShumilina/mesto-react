import { useEffect, useState } from "react";
import { api } from '../utils/Api';
import Card from './Card';


function Main(props) {
    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [cards, setCards] = useState([]);

    useEffect(() => {
        api.getUserInformation()
        .then((userData) => {
            setUserName(userData.name);
            setUserDescription(userData.about);
            setUserAvatar(userData.avatar);
        })
        .catch((error) => {
            console.log(error);
        });

    }, [])

    useEffect(() => {
        api.getInitialCards()
        .then(setCards)
        .catch((error) => {
            console.log(error);
        });
    }, [])

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-edit" onClick={props.onEditAvatar}><div className="profile__avatar" alt="Аватар" style={{ backgroundImage: `url(${userAvatar})` }}/></div>
                <div className="profile__info">
                    <div className="profile__heading">
                        <h1 className="profile__name">{userName}</h1>
                        <button className="profile__edit" type="button" onClick={props.onEditProfile}></button>
                    </div>
                    <p className="profile__status">{userDescription}</p>
                </div>
                <button className="profile__add-photo" type="button" onClick={props.onAddPlace}></button>
            </section>
            <section className="photo-places">{
                cards.map((card) => {
                    return (
                        <Card card={card} key={card._id} onClick={props.onCardClick} />
                    )} 
                )}
            </section>
        </main>
    )
}

export default Main;