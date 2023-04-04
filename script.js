const rootDiv = document.querySelector(".root");
const search = document.querySelector(".search");

let col = [
    "#FF5733",
    "#FF5733",
    "#DAF7A6",
    "#DAF7A6",
    "#FF5733",
    "#FF5733",
    "#FFBF00",
    "#FFBF00",
    "#FFEA00",
    "#FFEA00",
    "#FDDA0D",
    "#FDDA0D",
    "#FFFF8F",
    "#FFFF8F",
    "#F3E5AB",
    "#F3E5AB",
    "#F5DEB3",
    "#F5DEB3",
    "#FFFF00",
    "#FFFF00",
    "#FFAA33",
    "#FFAA33",
];

let col1 = [
    "#00FFFF",
    "#F0FFFF",
    "#89CFF0",
    "#0000FF",
    "#7393B3",
    "#088F8F",
    "#0096FF",
    "#5F9EA0",
    "#0047AB",
    "#6495ED",
    "#00FFFF",
    "#00008B",
    "#6F8FAF",
    "#1434A4",
    "#7DF9FF",
    "#6082B6",
    "#00A36C",
    "#3F00FF",
    "#5D3FD3",
    "#ADD8E6",
    "#191970",
    "#000080",
    "#1F51FF",
    "#A7C7E7",
    "#CCCCFF",
    "#B6D0E2",
    "#96DED1",
    "#4169E1",
    "#0F52BA",
    "#9FE2BF",
    "#87CEEB",
    "#4682B4",
    "#008080",
    "#40E0D0",
    "#0437F2",
    "#40B5AD",
    "#0818A8",
    "#00FFFF",
    "#F0FFFF",
    "#89CFF0",
    "#0000FF",
    "#7393B3",
    "#088F8F",
    "#0096FF",
    "#5F9EA0",
    "#0047AB",
    "#6495ED",
    "#00FFFF",
    "#00008B",
    "#6F8FAF",
    "#1434A4",
    "#7DF9FF",
    "#6082B6",
    "#00A36C",
    "#3F00FF",
    "#5D3FD3",
    "#ADD8E6",
    "#191970",
    "#000080",
    "#1F51FF",
    "#A7C7E7",
    "#CCCCFF",
    "#B6D0E2",
    "#96DED1",
    "#4169E1",
    "#0F52BA",
    "#9FE2BF",
    "#87CEEB",
    "#4682B4",
    "#008080",
    "#40E0D0",
    "#0437F2",
    "#40B5AD",
    "#0818A8",
];

const color1 = () => col[Math.floor(Math.random() * 22)];
const color2 = () => col1[Math.floor(Math.random() * 75)];

function addData(pokemon_name, pokemon_ability, poke_base, he, mo, src) {
    const card = document.createElement("div");

    card.setAttribute("class", "card");

    let poke_img = document.createElement("img");
    poke_img.setAttribute("src", src);

    let poke_name = document.createElement("h2");
    poke_name.innerText = "Name: " + pokemon_name.toUpperCase();

    let poke_ability = document.createElement("h2");
    poke_ability.innerText = "Ability: " + pokemon_ability;

    let poke_base_exp = document.createElement("h2");
    poke_base_exp.innerText = "Base Experience: " + poke_base;

    let height = document.createElement("h2");
    height.innerText = "Height: " + he;

    let moves = document.createElement("h2");
    moves.innerText = "Move: " + mo;

    card.append(poke_img);
    card.append(poke_name);
    card.append(poke_ability);
    card.append(poke_base_exp);
    card.append(height);
    card.append(moves);

    rootDiv.append(card);

    card.style.backgroundImage = `linear-gradient(to bottom, ${color1()}, ${color2()})`;
}

let poke_names;
let poke_abilities;
let poke_base_experience;
let height;
let moves;
let img_src;

let offset = 1;
let limit = 20;

async function getPokemon() {
    for (let i = offset; i <= limit; i++) {
        try {
            const { data } = await axios.get(
                `https://pokeapi.co/api/v2/pokemon/${i}`
            );

            poke_names = data.name;
            poke_abilities = data.abilities[0].ability.name;
            poke_base_experience = data.base_experience;
            height = data.height;
            moves = data.moves[0].move.name;
            img_src = data.sprites.other.home.front_default;

            addData(
                poke_names,
                poke_abilities,
                poke_base_experience,
                height,
                moves,
                img_src
            );
        } catch (err) {
            console.log("Something went wrong");
        }
    }
}

getPokemon();

let prev = document.querySelector(".prev");
let next = document.querySelector(".next");

prev.disabled = "true";

async function getNextData(offset, limit) {
    for (let i = offset; i <= limit; i++) {
        const pokemons = axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
        pokemons.then((data) => {
            const pokemons = data.data;
            addData(
                pokemons.name,
                pokemons.abilities[0].ability.name,
                pokemons.base_experience,
                pokemons.height,
                pokemons.moves[0].move.name,
                pokemons.sprites.other.home.front_default,
                pokemons.id
            );
        });
    }
}

next.addEventListener("click", (e) => {
    rootDiv.innerHTML = "";
    offset = offset + 20;
    limit = limit + 20;

    getNextData(offset, limit);
    prev.disabled = false;
});

prev.addEventListener("click", (e) => {
    rootDiv.innerHTML = "";
    offset = offset - 20;
    limit = limit - 20;
    if (offset <= 1) {
        prev.disabled = true;
    }

    getNextData(offset, limit);
    console.log(offset);
    console.log(limit);
});


const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (e.target.elements.search.value == "") {
        console.log("clicked");
    } else {
        next.remove();
        prev.remove();

        rootDiv.innerHTML = "";

        const query = e.target.elements.search.value;
        e.target.elements.search.value = "";
        let url = `https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`;

        async function searchPokemon(url) {
            try {
                const { data } = await axios.get(url);
                let pokemons = data;
                addData(
                    pokemons.name,
                    pokemons.abilities[0].ability.name,
                    pokemons.base_experience,
                    pokemons.height,
                    pokemons.moves[0].move.name,
                    pokemons.sprites.other.home.front_default,
                    pokemons.id
                );
            } catch (err) {
                console.log(err);
            }
        }

        searchPokemon(url);
    }
});
const buttons = document.querySelector(".buttons");
const a = document.createElement("a");
a.innerText = "Back";
a.setAttribute("href", "index.html");
const back = document.createElement("button");
back.setAttribute("class", "btn-group");
back.append(a);
buttons.append(back);