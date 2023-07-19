<template>
  <!-- {{ pokemon }}  NOTE: start with raw data dump from computed -->

  <div class="container-fluid">
    <section class="row poke-row">
      <!-- STUB pokemon list -->
      <div class="col-3 bg-danger">
        <button @click="setActivePokemon(p.name)" class="btn btn-outline-light my-1 w-100" v-for="p in pokemon">{{ p.name
        }}</button>

        <!-- STUB newer/olderbuttons -->
        <div class="d-flex justify-content-around">
          <!-- <button class="btn btn-outline-light" @click="changePage('older')">Older</button>
          <button class="btn btn-outline-light" @click="changePage('newer')">Newer</button> -->
          <button class="btn btn-outline-light" @click="changePage(older)" :disabled="!older">Older</button>
          <button class="btn btn-outline-light" @click="changePage(newer)">Newer</button>
        </div>
      </div>

      <!-- STUB active pokemon -->
      <!-- NOTE: instead of elvis operators, we can even put a v-if on the most-parent element where we are trying to render data -->
      <div class="col-8" v-if="activePokemon">
        <!-- {{ activePokemon }} -->
        <!-- NOTE: we can use an elvis operator for potentially null values.... if it is null, please don't break my page  -->
        <img :src="activePokemon?.img" alt="">
        <h1>Height: {{ activePokemon.height }} | Weight: {{ activePokemon.weight }}</h1>
      </div>
    </section>
  </div>
</template>

<script>
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { pokemonService } from '../services/PokemonService.js'
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';

export default {
  setup() {

    async function getPokemon() {
      try {
        await pokemonService.getPokemon()
      } catch (error) {
        logger.log(error.message)
        Pop.error(error.message)
      }
    }

    onMounted(() => {
      getPokemon()
    })

    return {
      pokemon: computed(() => AppState.pokemon),
      activePokemon: computed(() => AppState.activePokemon),
      older: computed(() => AppState.older),
      newer: computed(() => AppState.newer),

      async setActivePokemon(pokeName) {
        try {
          // logger.log('setting active', pokeName)
          await pokemonService.setActivePokemon(pokeName)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },

      // NOTE: we changed the name of this param form pageChange to url
      async changePage(url) {
        try {
          // logger.log('change page', pageChange)
          logger.log('change page', url)
          await pokemonService.changePage(url)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }

    }
  }
}
</script>

<style scoped lang="scss">
.poke-row {
  min-height: 90vh;
}
</style>
