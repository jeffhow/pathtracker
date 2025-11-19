
/**
 * Calculates the total point buy cost for a given base ability score in Pathfinder 1e.
 * Assumes scores start at 10 (cost 0) and ignores scores below 7 or above 18
 * as they are typically not allowed by standard point buy rules.
 */
export const calculateAbilityCost = (baseScore: number): number => {
    if (baseScore < 7 || baseScore > 18) {
        // Return a high cost or throw an error if the score is out of bounds
        return Infinity; 
    }
    
    // Cost array mapping score (index) to total cost
    // Index 0-6 are unused, 7 starts the valid scores.
    const costs = [
        0, 0, 0, 0, 0, 0, 0, // 0-6 (unused)
        -4, // 7
        -2, // 8
        -1, // 9
        0,  // 10
        1,  // 11
        2,  // 12
        3,  // 13
        5,  // 14
        7,  // 15
        10, // 16
        13, // 17
        17  // 18
    ];

    return costs[baseScore];
};

/**
 * Calculates the change in cost when increasing/decreasing a score by 1.
 */
export const calculateCostDelta = (currentScore: number, delta: number): number => {
    if (delta === 1) {
        // Cost of the NEW score minus Cost of the CURRENT score
        return calculateAbilityCost(currentScore + 1) - calculateAbilityCost(currentScore);
    } 
    if (delta === -1) {
        // Cost of the CURRENT score minus Cost of the NEW score (which is lower)
        return calculateAbilityCost(currentScore) - calculateAbilityCost(currentScore - 1);
    }
    return 0;
}