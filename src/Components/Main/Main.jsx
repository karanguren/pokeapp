import React, { useState, useEffect } from "react";
import "./Main.css";
import Card from "../Card/Card";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Main = () => {
    
    const [pokeData, setPokeData] = useState([]);
    const [pokeDataRes, setPokeDataRes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/")
    const [nextUrl, setNextUrl] = useState();
    const [prevUrl, setPrevUrl] = useState();
    const [pokeDex, setPokeDex] = useState();
    const [busqueda, setBusqueda] = useState("");

    const pokeFun = async () => {
        setLoading(true)
        const res = await axios.get(url);
        setNextUrl(res.data.next);
        setPrevUrl(res.data.previous);
        getPokemon(res.data.results)
        setLoading(false)
    }

    const getPokemon = async (res) => {
        res.map(async (item) => {
            const result = await axios.get(item.url)
            setPokeData(state => {
                state = [...state, result.data]
                state.sort((a, b) => a.id > b.id ? 1 : -1)
                return state;
            })
            setPokeDataRes(state => {
                state = [...state, result.data]
                state.sort((a, b) => a.id > b.id ? 1 : -1)
                return state;
            })
        })
    }

    const handleChange = e => {
        setBusqueda(e.target.value);
        filtrar(e.target.value);
    }

    const filtrar = (terminoBusqueda) => {
        var resultadosBusqueda = pokeDataRes.filter((elemento) => {
            if (elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
                || elemento.id.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
            ) {
                return elemento;
            }
        });
        setPokeData(resultadosBusqueda);
    }

    useEffect(() => { pokeFun(); }, [url])

    return (
        <div>
            <div className='divS'>
                <input
                    className="form-control inputBuscar"
                    value={busqueda}
                    placeholder="Search"
                    onChange={handleChange}
                    type="text"
                />
                <button className="button btnSearch">
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
            <div className="pokedex-view">
                <Card pokemon={pokeData} loading={loading} infoPokemon={poke => setPokeDex(poke)} />
            </div>
            <div className='divS'>
                {prevUrl && <button className="button" onClick={() => {
                    setPokeData([])
                    setUrl(prevUrl)
                }}>Previous</button>}

                {nextUrl && <button className="button" onClick={() => {
                    setPokeData([])
                    setUrl(nextUrl)
                }}>Next</button>}
            </div>
        </div>
    )
}
export default Main;