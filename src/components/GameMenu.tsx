import React from "react";

/**
 * Componente: GameMenu
 * Responsabilidad: Mostrar el menú principal del juego con botones para las acciones principales.
 * Colaboradores: Recibe funciones de callback como props para manejar las acciones.
 */
interface Props {
    // onAddPlayer: () => void;        // Callback para agregar un jugador
    // onAddCategory: () => void;      // Callback para agregar una categoría
    onStartGame: () => void;        // Callback para iniciar el juego
    onShowScoreboard: () => void;   // Callback para mostrar el marcador
}

const GameMenu: React.FC<Props> = ({
    onShowScoreboard,
    // onAddPlayer,
    // onAddCategory,
    onStartGame
    
}) => (
    <div className="menu">
        {/* Botón para agregar un jugador */}
        {/* <button onClick={onAddPlayer}>Agregar Jugador</button> */}
        {/* Botón para agregar una categoría */}
        {/* <button onClick={onAddCategory}>Agregar Categoría</button> */}
        {/* Botón para comenzar el juego */}
        <button onClick={onStartGame} >Comenzar Juego</button>
        {/* Botón para ver el marcador */}
        <button onClick={onShowScoreboard}>Ver Marcador</button>
    </div>
);

export default GameMenu;

