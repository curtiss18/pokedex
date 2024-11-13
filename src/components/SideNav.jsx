import { first151Pokemon, getFullPokedexNumber } from '../utils'
import { useState } from 'react'

export default function SideNav(props) {
    const { selectedPokemon, setSelectedPokemon, handleToggleMenu, showSideMenu } = props

    const [searchValue, setSearchValue] = useState('')

    const filteredPokemon = first151Pokemon.filter((ele, eleIndex) => {
        //if full pokedex number includes the current search value, return true
        if (getFullPokedexNumber(eleIndex).includes(searchValue)) {return true}
        //if the pokemon name includes the current search value, return true
        if (ele.toLowerCase().includes(searchValue.toLowerCase())) {return true}
        //otherwise, exclude from the array
        return false
    })

    return (
        <nav className={'' + (!showSideMenu ? " open": '')}>
            <div className={'header ' + (!showSideMenu ? " open": '')}>
                <button onClick={handleToggleMenu} className='open-nav-button'>
                    <i className="fa-solid fa-arrow-left-long"></i>
                </button>
                <h1 className='text-gradient'>Pokédex</h1>
            </div>
            <input placeholder='e.g. 001 or Bulba...' value={searchValue} onChange={(e) => {
                setSearchValue(e.target.value)
            }} />
            {filteredPokemon.map((pokemon, pokemonIndex) => {
                const truePokedexNum = first151Pokemon.indexOf(pokemon)
                return (
                    <button onClick={() => {
                        setSelectedPokemon(truePokedexNum)
                        handleToggleMenu()
                    }} key={pokemonIndex} className={'nav-card ' + (truePokedexNum === selectedPokemon ? 'nav-card-selected' : '')}>
                        <p>{getFullPokedexNumber(truePokedexNum)}</p>
                        <p>{pokemon}</p>
                    </button>
                )
            })}
        </nav>
    )
}