import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./PokeInfo.css";


export default function PokeInfo() {
    const { id } = useParams();
    const [url, setUrl] = useState(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const [pokemon, setPokemon] = useState([]);
    const navigate = useNavigate();

    const getPokemon = async () => {
        const respuesta = await axios.get(url);
        setPokemon(respuesta.data);
        console.log(respuesta.data);
        return
    };

    console.log(pokemon);


    useEffect(() => {
        getPokemon();
    }, []);



    const className = pokemon.length !== 0 ? pokemon.types.map(({ type }) => 'type-' + type.name).join(' ') : '';
    const types = pokemon.length !== 0 ? pokemon.types.map(({ type }) => type.name).join(', ') : '';
    const abilities = pokemon.length !== 0 ? pokemon.abilities.map(({ ability }) => {
        return ability.name.replace('-', ' ');
    }).join(', ') : '';

    const height = pokemon.height * 10; // cm
    const weight = pokemon.weight / 10; // kg

    return (
        <>
            <div className="card-container">
                
                <div style={{ marginBottom: '20px' }} onClick={() => navigate(-1)}>
                <h2><FontAwesomeIcon icon={faArrowLeft} /> Back</h2>
                    </div>
                <div className={`cardp ${className}`}>
                    <div className="bg-pokeball"></div>
                    <span className="pokemon-id">{pokemon.id}</span>
                    <div className="card-title">
                        <h2>
                            {pokemon.name}
                        </h2>
                        <div className="pokemon-types">
                            {pokemon.length !== 0 ?
                                pokemon.types.map(({ type }) => (
                                    <span className="type" key={type.name}>{type.name}</span>
                                )) : ''}
                        </div>
                    </div>
                    <div className="pokemon-image">
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`} alt={pokemon.name} id="img-portada" />
                    </div>

                </div>
            </div>
            <h1 style={{textAlignLast: 'center'}}>About</h1>
            <div className="details">
                <div className="tab tab-about">
                    <table>
                        <tbody>
                            <tr>
                                <td>Species</td>
                                <td>{types}</td>
                            </tr>

                            <tr>
                                <td>Height</td>
                                <td>{height}cm</td>
                            </tr>

                            <tr>
                                <td>Weight</td>
                                <td>{weight}kg</td>
                            </tr>

                            <tr>
                                <td>Abilities</td>
                                <td>{abilities}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    );
}