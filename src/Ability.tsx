export interface AbilityProps {
    name: string;
    abbr: string;
    points: number;
    adjust: number;
    modifier: number;
}
export const Ability = ({ name, abbr, points, adjust, modifier }: AbilityProps) => {
    return(
        <div className="ability">
            <div title={name}>{abbr}</div>
            <div className="grid grid-cols-4 gap-2 grid-rows-2 grid-flow-col">
                <span>Score</span>
                <span>{points + adjust + modifier}</span>
                <span>points</span>
                <span>{points}</span>
                <span>adjust</span>
                <span>{adjust}</span>
                <span>modifier</span>
                <span>{modifier}</span>
            </div>
        </div>
    )
}
