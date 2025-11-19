// Abilities.jsx
import React, { useState } from 'react';
import { Ability } from "./Ability";
import { calculateAbilityCost, calculateCostDelta } from './ability-cost-calculator';

interface AbilityType {
    name: string;
    abbr: string;
    base: number;
    adjust: number;
    modifier: number;
    min: number;
    max: number;
}

function Abilities() {
    const maxPoints = 25;
    const initialAbilities: AbilityType[] = [
        { name: "Strength", abbr: "STR", base: 10, adjust: 0, modifier: 0, min: 7, max: 18 },
        { name: "Dexterity", abbr: "DEX", base: 10, adjust: 0, modifier: 0, min: 7, max: 18 },
        { name: "Constitution", abbr: "CON", base: 10, adjust: 0, modifier: 0, min: 7, max: 18 },
        { name: "Intelligence", abbr: "INT", base: 10, adjust: 0, modifier: 0, min: 7, max: 18 },
        { name: "Wisdom", abbr: "WIS", base: 10, adjust: 0, modifier: 0, min: 7, max: 18 },
        { name: "Charisma", abbr: "CHA", base: 10, adjust: 0, modifier: 0, min: 7, max: 18 },
    ];

    const [abilities, setAbilities] = useState(initialAbilities);

    // Calculate the total points spent using the cost function
    const pointsSpent = abilities.reduce((sum, ab) => sum + calculateAbilityCost(ab.base), 0);
    const pointsRemaining = maxPoints - pointsSpent;

    const changeAbility = (abilityAbbr: string, delta: number) => {

        const abilityToChange = abilities.find(ab => ab.abbr === abilityAbbr);
        if (!abilityToChange) return;

        const newBase = abilityToChange.base + delta;

        // Check local min/max
        if (newBase < abilityToChange.min || newBase > abilityToChange.max) {
            return;
        }

        const costDelta = calculateCostDelta(abilityToChange.base, delta);

        // Check global maxPoints limit
        if (delta > 0 && pointsSpent + costDelta > maxPoints) {
            return;
        }

        setAbilities(prevAbilities => {
            return prevAbilities.map((ab) => {
                if (ab.abbr === abilityAbbr) {
                    const newModifier = Math.floor((newBase - 10) / 2);

                    return {
                        ...ab,
                        base: newBase,
                        modifier: newModifier
                    };
                }
                return ab;
            });
        });
    }

    return (
        <div className="text-white p-3 bg-stone-800 rounded-md border border-stone-600 flex flex-col gap-2 max-w-md">
            <h2 className="inline-block w-fit -mt-7 bg-stone-800 py-2 px-4 rounded-t-lg text-sm font-semibold text-stone-300">
                Abilities Component
            </h2>
            <div className="flex justify-between">
                <p className="text-sm text-stone-400">
                    Points Remaining: **{pointsRemaining}** / {maxPoints}
                </p>
                <p className="text-sm text-stone-400">
                    Points Spent: **{pointsSpent}**
                </p>
            </div>
            <div className="abilities flex flex-col gap-4">
                {abilities.map((ability) => {

                    const costDeltaToIncrease = calculateCostDelta(ability.base, 1);
                    const canIncreaseGlobal = pointsSpent + costDeltaToIncrease <= maxPoints;

                    // 💡 NEW: Calculate the current total cost for this ability
                    const currentCost = calculateAbilityCost(ability.base);

                    const { name, abbr, base, adjust, modifier, min, max } = ability;

                    return (
                        <Ability
                            key={abbr}
                            name={name}
                            abbr={abbr}
                            base={base}
                            adjust={adjust}
                            modifier={modifier}
                            min={min}
                            max={max}
                            costDeltaToIncrease={costDeltaToIncrease}
                            // 💡 Pass the current cost down
                            currentCost={currentCost}
                            changeAbility={changeAbility}
                            canIncreaseGlobal={canIncreaseGlobal}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default Abilities;