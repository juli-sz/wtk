import React from "react";

/**
 * Componente: Scoreboard
 * Responsabilidad: Mostrar la lista de ganadores previos del juego.
 * Colaboradores: Recibe un array de nombres de ganadores como prop.
 */
interface Props {
    winners: string[];
}

const Scoreboard: React.FC<Props> = ({ winners }) => (
    <div>
        <h2>Marcador (Ganadores previos)</h2>
        <ul>
            {winners.map((w, i) => <li key={i}>{w}</li>)}
        </ul>
    </div>
);

export default Scoreboard;