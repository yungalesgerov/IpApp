
export default class GotService {
    constructor() {
        this._apiBase = 'https://anapioficeandfire.com/api';
    }

    getResourse = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}  `, `received ${res.status}`);
        }
        return await res.json();
    }
    getAllCharacters = async () => {
        const res = await this.getResourse(`/characters?page=5&pageSize=10`);
        return res.map(this._tranformCharacter);
    }
    getCharacter = async (id) => {
        const res = await this.getResourse(`/characters/${id}`)
        return this._tranformCharacter(res);
    }
    getAllHouses = async () => {
        const res = await this.getResourse(`/houses/`);
        return res.map(this._tranformHouse)
    }
    getHouse = async (id) => {
        const res = await this.getResourse(`/houses/${id}/`)
        return this._tranformHouse(res)
    }
    getAllBooks = async () => {
        const res = await this.getResourse(`/books/`)
        return res.map(this._tranformBook)
    }
    getBook = async (id) => {
        const res = await this.getResourse(`/books/${id}/`);
        return this._tranformBook(res);
    }
    _tranformCharacter(char) {
        return {
            name: char.name,
            gender: char.gender,
            born: char.born,
            died: char.died,
            culture: char.culture
        }
    }
    _tranformHouse(house) {
        return {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overloard: house.overloard,
            ancestralWeapons: house.ancestralWeapons
        }
    }
    _tranformBook(book) {
        return {
            name: book.name,
            numberOfPage: book.numberOfPage,
            publiser: book.publiser,
            released: book.released
        }
    }
}