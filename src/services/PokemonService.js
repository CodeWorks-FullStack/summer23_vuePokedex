import { AppState } from "../AppState.js"
import { Pokemon } from "../models/Pokemon.js"
import { logger } from "../utils/Logger.js"
import { pokeApi } from "./AxiosService.js"

class PokemonService {

    async getPokemon() {
        const res = await pokeApi.get('')
        logger.log('[GETTING POKEMON]', res.data)
        AppState.pokemon = res.data.results
        AppState.newer = res.data.next
        AppState.older = res.data.previous
    }

    async setActivePokemon(pokeName) {
        const res = await pokeApi.get(pokeName)
        logger.log('[SETTING ACTIVE]', res.data)
        AppState.activePokemon = new Pokemon(res.data)
        logger.log(AppState.activePokemon)

    }

    async changePage(url) {
        const res = await pokeApi.get(url)
        logger.log('[CHANGING PAGE]', res.data)
        AppState.pokemon = res.data.results
        AppState.newer = res.data.next
        AppState.older = res.data.previous
    }

}

export const pokemonService = new PokemonService()