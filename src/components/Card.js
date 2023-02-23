function Card(props) {
    function handleClick() {
        props.onClick(props.card);
    }  
        return (   
        <article className="showplace" key={props.card._id} onClick={handleClick}>
            <button className="showplace__remove" type="button"></button>
            <div className="showplace__image" style={{ backgroundImage: `url(${props.card.link})` }}></div>
            <div className="showplace__signature">
                <h2 className="showplace__name">{props.card.name}</h2>
                <div className="showplace__information">
                    <button className="showplace__like" type="button"></button>
                    <p className="showplace__people-likes">{props.card.likes.length}</p>
                </div>
            </div>
        </article>
        )
}

export default Card;