import {Ability} from "./Ability";

function Abilities() {
    const data = [
        { name: "Strength", abbr: "STR", points: 10, adjust: 0, modifier: 10 },
        { name: "Dexterity", abbr: "DEX", points: 10, adjust: 0, modifier: 10 },
        { name: "Constitution", abbr: "CON", points: 10, adjust: 0, modifier: 10 },
        { name: "Intelligence", abbr: "INT", points: 10, adjust: 0, modifier: 10 },
        { name: "Wisdom", abbr: "WIS", points: 10, adjust: 0, modifier: 10 },
        { name: "Charisma", abbr: "CHA", points: 10, adjust: 0, modifier: 10 },
    ];
    return(
        <div className="text-white p-3 bg-stone-800 rounded-md border border-stone-600 flex flex-col gap-2 ">
            <h2>
                Abilities Component
            </h2>
            <div className="abilities flex gap-4 flex-wrap">
                {data.map((ability) => {
                    const { name, abbr, points, adjust, modifier } = ability;
                    return (
                        <Ability key={abbr} name={name} abbr={abbr} points={points} adjust={adjust} modifier={modifier} />
                )})}   
            </div>
        </div>
    ) 
}
export default Abilities;