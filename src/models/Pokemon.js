export class Pokemon {
    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.height = data.height
        this.weight = data.weight
        this.img = data.sprites.other.dream_world.front_default
    }
}