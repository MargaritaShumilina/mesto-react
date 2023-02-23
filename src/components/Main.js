import { useEffect, useState } from "react";
import { api } from '../utils/Api';
import Card from './Card';


function Main(props) {
    const [userName, setUserName] = useState(false);
    const [userDescription, setUserDescription] = useState(false);
    const [userAvatar, setUserAvatar] = useState(false);
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
        .then((cardsData) => {
            const newCard = cardsData.map((card) => {
            return (
                <Card card={card} key={card._id} onClick={props.onCardClick} />
            )
            })
            setCards(newCard);
        })
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
            <section className="photo-places">{cards}</section>
        </main>
    )
}

export default Main;