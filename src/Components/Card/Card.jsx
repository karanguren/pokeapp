import React from "react";
import "./Card.css";

import {
    BrowserRouter as Router,
    Link,
    useLocation
} from "react-router-dom";

const Card = ({ pokemon, loading, infoPokemon }) => {
    console.log(pokemon)

    return (
        <>
            {
                loading ? <h1>Loading...</h1> :
                    pokemon.map((item) => {
                        let className = item.types.map(({ type }) => 'type-' + type.name).join(' ')
                        return (
                            <Link style={{ textDecoration: 'none' }} to={`pokemon/${item.id}`} >
                                <div className="card-container" key={item.id} onClick={() => infoPokemon(item)}>
                                    <div className={`card ${className}`}>

                                        <div className="bg-pokeball"></div>
                                        <span className="pokemon-id">{item.id}</span>

                                        <div className="card-title">
                                            <h2>
                                                {item.name.replace(/-/g, ' ')}
                                            </h2>
                                            <div className="pokemon-types">
                                                {
                                                    item.types.map(({ type }) => (
                                                        <span className="type" key={type.name}>{type.name}</span>
                                                    ))
                                                }
                                            </div>
                                        </div>

                                        <div className="pokemon-image">
                                            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${item.id}.svg`} alt={item.name} id="img-portada" />
                                        </div>

                                    </div>
                                </div>
                            </Link>
                        )
                    })
            }

        </>
    )
}
export default Card;