// Ability.jsx
import React from 'react';

export interface AbilityProps {
    name: string;
    abbr: string;
    base: number;
    adjust: number; 
    modifier: number; 
    min: number;
    max: number;
    changeAbility: (ability: string, delta: number) => void;
    canIncreaseGlobal: boolean; 
    costDeltaToIncrease: number; 
    currentCost: number; // New prop for Point Buy cost
}

export const Ability = ({ 
    name, 
    abbr, 
    base, 
    adjust, 
    modifier, 
    min, 
    max, 
    changeAbility, 
    canIncreaseGlobal, 
    costDeltaToIncrease,
    currentCost // Destructured
}: AbilityProps) => {
    
    // Logic for disabling buttons based on local min/max and global points
    const canIncreaseLocal = base < max;
    const canDecreaseLocal = base > min;

    const isIncreaseDisabled = !canIncreaseLocal || !canIncreaseGlobal;
    const isDecreaseDisabled = !canDecreaseLocal;

    const increaseTitle = isIncreaseDisabled 
        ? (base >= max ? 'Max score reached.' : 'Not enough points.')
        : `Cost to increase to ${base + 1}: ${costDeltaToIncrease} points`;

    // Updated Total Score calculation: base + adjust
    const totalScore = base + adjust; 

    const increase = () => {
        if (!isIncreaseDisabled) {
            changeAbility(abbr, 1);
        }
    }
    const decrease = () => {
        if (!isDecreaseDisabled) {
            changeAbility(abbr, -1);
        }
    }

    return(
        <div className="ability">
            <div title={name}>{abbr}</div>
            
            {/* <div className="grid grid-cols-6 gap-2 grid-rows-2 grid-flow-col text-center items-center w-full"> */}
            <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_min-content] gap-2 grid-rows-2 grid-flow-col text-center items-center w-full">
                {/* 1. Score */}
                <span className="text-xs text-stone-400">Score</span>
                <span className="font-bold text-lg">{totalScore}</span> 
                
                {/* 2. Base */}
                <span className="text-xs text-stone-400">Base</span>
                <span className="font-bold text-lg">{base}</span>
                
                {/* 3. Adjust */}
                <span className="text-xs text-stone-400">Adjust</span>
                <span className="font-bold text-lg">{adjust}</span>
                
                {/* 4. Modifier */}
                <span className="text-xs text-stone-400">Mod</span>
                <span className="font-bold text-lg">{modifier}</span>
                
                {/* 5. Points */}
                <span className="text-xs text-stone-400">Points</span> 
                <span className="font-bold text-lg">{currentCost}</span> 
                
                {/* 6. Buttons (These will occupy the 6th column, Row 1 & 2) */}
                <button 
                    className="btn-primary" 
                    onClick={increase}
                    disabled={isIncreaseDisabled}
                    title={increaseTitle}
                >
                    +
                </button>
                <button 
                    className="btn-secondary" 
                    onClick={decrease}
                    disabled={isDecreaseDisabled}
                    title={isDecreaseDisabled ? 'Min score reached.' : 'Decreasing returns points.'}
                >
                    -
                </button>
            </div>
        </div>
    )
}