import React, { useState, useEffect } from "react";
import "./Main.css";
import Card from "../Card/Card";
import PokeInfo from "../PokeInfo/PokeInfo";
import axios from "axios";

const Main = () => {
    const [pokeData, setPokeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/")
    const [nextUrl, setNextUrl] = useState();
    const [prevUrl, setPrevUrl] = useState();
    const [pokeDex, setPokeDex] = useState();

    const pokeFun = async () => {
        setLoading(true)
        const res = await axios.get(url);
        setNextUrl(res.data.next);
        setPrevUrl(res.data.previous);
        getPokemon(res.data.results)
        setLoading(false)
    }
    console.log(pokeDex)

    const getPokemon = async (res) => {
        res.map(async (item) => {
            const result = await axios.get(item.url)
            setPokeData(state => {
                state = [...state, result.data]
                state.sort((a, b) => a.id > b.id ? 1 : -1)
                return state;
            })
        })
    }

    useEffect(() => { pokeFun(); }, [url])

    return (
        <div>
            <div className="pokedex-view">
                <Card pokemon={pokeData} loading={loading} infoPokemon={poke => setPokeDex(poke)} />
            </div>

            



            {/* <Grid><PokeInfo data={pokeDex} /></Grid> */}
            {prevUrl && <button onClick={() => {
                setPokeData([])
                setUrl(prevUrl)
            }}>Previous</button>}

            {nextUrl && <button onClick={() => {
                setPokeData([])
                setUrl(nextUrl)
            }}>Next</button>}
        </div>
    )
}
export default Main;