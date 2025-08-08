import React, { useState } from "react";
import { Player } from "./models/Player";
import { Category } from "./models/Category";
import { initialPlayers, initialCategories } from "./data";
import GameMenu from "./components/GameMenu";
import Players from "./components/Players";
import Categories from "./components/Categories";
import Items from "./components/Items";
import Scoreboard from "./components/Scoreboard";
import "./App.css";

// Componente principal de la aplicación
const App: React.FC = () => {
    // Estado para la lista de jugadores
    const [players, setPlayers] = useState<Player[]>([...initialPlayers]);
    // Estado para la lista de categorías
    const [categories, setCategories] = useState<Category[]>([...initialCategories]);
    // Estado para la lista de ganadores (simulado)
    const [winners, setWinners] = useState<string[]>(["Juli", "Lia"]);
    // Estado para mostrar/ocultar el marcador
    const [showScoreboard, setShowScoreboard] = useState(false);

    // Estado para edición
    const [editMode, setEditMode] = useState(false);
    const [editSection, setEditSection] = useState<"jugadores" | "categorias" | "items" | null>(null);
    const [editedPlayers, setEditedPlayers] = useState<string[]>(players.map(p => p.name));
    const [editedCategories, setEditedCategories] = useState<string[]>(categories.map(c => c.name));
    const [editedItems, setEditedItems] = useState<string[][]>(categories.map(c => [...c.items]));

    // Estado de juego
    const [gameStarted, setGameStarted] = useState(false);
    const [infoEntregada, setInfoEntregada] = useState<string[][]>([]);
    const [infoSecreta, setInfoSecreta] = useState<string[]>([]);
    const [showWinnerSelect, setShowWinnerSelect] = useState(false); // <-- AGREGA ESTA LÍNEA

    // // --- Jugadores ---
    // const handleAddPlayer = () => {
    //     const name = prompt("Nombre del jugador:");
    //     if (name) setPlayers([...players, new Player(name)]);
    // };

    // // --- Categorías ---
    // const handleAddCategory = () => {
    //     const name = prompt("Nombre de la categoría:");
    //     if (name) {
    //         setCategories([...categories, new Category(name)]);
    //         setEditedCategories([...editedCategories, name]);
    //         setEditedItems([...editedItems, []]);
    //     }
    // };

    // --- Ítems ---
    const handleAddItemToCategory = (categoryIndex: number) => {
        const item = prompt("Nuevo ítem para la categoría:");
        if (item) {
            const updatedCategories = [...categories];
            updatedCategories[categoryIndex].addItem(item);
            setCategories(updatedCategories);

            // También actualiza el estado de edición de ítems si está en modo edición
            const updatedEditedItems = [...editedItems];
            updatedEditedItems[categoryIndex] = [...updatedEditedItems[categoryIndex], item];
            setEditedItems(updatedEditedItems);
        }
    };

    // --- Juego ---
    const handleStartGame = () => {
        if (players.length < 2 || categories.length < 2) {
            alert("Debe haber al menos 2 jugadores y 2 categorías.");
            return;
        }
        if (categories.some(cat => cat.items.length < 2)) {
            alert("Cada categoría debe tener al menos 2 ítems (uno para la información secreta y al menos uno para repartir).");
            return;
        }

        // 1. Mezclar y preparar listas temporales de ítems por categoría
        const tempItemsByCategory = categories.map(cat => {
            const itemsCopy = [...cat.items];
            for (let i = itemsCopy.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [itemsCopy[i], itemsCopy[j]] = [itemsCopy[j], itemsCopy[i]];
            }
            return itemsCopy;
        });

        // 2. Guardar un ítem de cada categoría como información secreta y eliminarlo de la lista temporal
        const secretInfo: string[] = [];
        tempItemsByCategory.forEach(items => {
            const secretItem = items.shift();
            if (secretItem) secretInfo.push(secretItem);
        });

        // 3. Repartir los ítems restantes a los jugadores, asegurando que no se repitan
        const entregadaInfo: string[][] = players.map(() => []);
        let canAssign = true;
        //let playerIdx = 0;

        // Mientras todos tengan ítems para repartir
        while (canAssign) {
            for (let p = 0; p < players.length; p++) {
                let playerItems: string[] = [];
                for (let c = 0; c < tempItemsByCategory.length; c++) {
                    if (tempItemsByCategory[c].length === 0) {
                        canAssign = false;
                        break;
                    }
                    // Asigna el primer ítem disponible de la categoría al jugador
                    playerItems.push(tempItemsByCategory[c].shift()!);
                }
                if (canAssign) {
                    entregadaInfo[p] = playerItems;
                }
            }
            // Si ya no hay más ítems para repartir a todos, termina
            if (tempItemsByCategory.some(items => items.length === 0)) {
                canAssign = false;
            }
        }

        setInfoSecreta(secretInfo);
        setInfoEntregada(entregadaInfo);
        setGameStarted(true);
        setEditMode(false);
        setEditSection(null);
    };

    const handleShowScoreboard = () => {
        setShowScoreboard(!showScoreboard);
    };

    // --- Guardar cambios de edición ---
    const handleSavePlayers = () => {
        setPlayers(editedPlayers.map(name => new Player(name)));
        setEditMode(false);
        setEditSection(null);
    };

    const handleSaveCategories = () => {
        const newCategories = editedCategories.map((name, idx) => new Category(name, editedItems[idx]));
        setCategories(newCategories);
        setEditMode(false);
        setEditSection(null);
    };

    // --- Agregar desde edición ---
    const handleAddPlayerEdit = () => {
        const name = prompt("Nombre del jugador:");
        if (name) setEditedPlayers([...editedPlayers, name]);
    };

    const handleAddCategoryEdit = () => {
        const name = prompt("Nombre de la categoría:");
        if (name) {
            setEditedCategories([...editedCategories, name]);
            setEditedItems([...editedItems, []]);
        }
    };

    const handleAddItemEdit = (catIdx: number) => {
        const item = prompt("Nuevo ítem para la categoría:");
        if (item) {
            const updated = [...editedItems];
            updated[catIdx] = [...updated[catIdx], item];
            setEditedItems(updated);
        }
    };

    // --- Eliminar jugador/categoría/ítem desde edición ---
    const handleRemovePlayerEdit = (idx: number) => {
        setEditedPlayers(editedPlayers.filter((_, i) => i !== idx));
    };

    const handleRemoveCategoryEdit = (idx: number) => {
        setEditedCategories(editedCategories.filter((_, i) => i !== idx));
        setEditedItems(editedItems.filter((_, i) => i !== idx));
    };

    const handleRemoveItemEdit = (catIdx: number, itemIdx: number) => {
        const updated = [...editedItems];
        updated[catIdx] = updated[catIdx].filter((_, i) => i !== itemIdx);
        setEditedItems(updated);
    };

    // --- Finalizar juego y seleccionar ganador ---
    const handleEndGame = () => {
        setShowWinnerSelect(true);
    };

    const handleSelectWinner = (winnerName: string) => {
        setWinners([...winners, winnerName]);
        setGameStarted(false);
        setShowWinnerSelect(false);
    };

    // --- Render ---
    return (
        <div className="container">
            <h1>Who's the Killer?</h1>
            {!gameStarted && !showWinnerSelect && (
                <>
                    <GameMenu
                        // onAddPlayer={handleAddPlayer}
                        // onAddCategory={handleAddCategory}
                        onShowScoreboard={handleShowScoreboard}
                        onStartGame={handleStartGame}
                        
                    />
                    <button onClick={() => setEditMode(!editMode)}>
                        {editMode ? "Salir de edición" : "Editar juego"}
                    </button>
                    {editMode && (
                        <div className="edit-section-buttons">
                            <button onClick={() => setEditSection("jugadores")}>Editar jugadores</button>
                            <button onClick={() => setEditSection("categorias")}>Editar categorías</button>
                            <button onClick={() => setEditSection("items")}>Editar ítems</button>
                        </div>
                    )}
                    {/* Edición de jugadores */}
                    {editMode && editSection === "jugadores" && (
                        <div className="edit-section">
                            <h2>Editar jugadores</h2>
                            {editedPlayers.map((name, idx) => (
                                <div key={idx} className="mb-1">
                                    <label htmlFor={`jugador-input-${idx}`}>Jugador {idx + 1}: </label>
                                    <input
                                        id={`jugador-input-${idx}`}
                                        type="text"
                                        value={name}
                                        placeholder="Nombre del jugador"
                                        title="Editar nombre del jugador"
                                        onChange={e => {
                                            const newPlayers = [...editedPlayers];
                                            newPlayers[idx] = e.target.value;
                                            setEditedPlayers(newPlayers);
                                        }}
                                    />
                                    <button
                                        title="Eliminar jugador"
                                        onClick={() => handleRemovePlayerEdit(idx)}
                                        className="ml-1"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            ))}
                            <button title="Agregar un nuevo jugador" onClick={handleAddPlayerEdit}>Agregar jugador</button>
                            <button title="Guardar cambios de jugadores" onClick={handleSavePlayers} className="ml-1">Guardar cambios</button>
                        </div>
                    )}
                    {/* Edición de categorías */}
                    {editMode && editSection === "categorias" && (
                        <div className="edit-section">
                            <h2>Editar categorías</h2>
                            {editedCategories.map((name, idx) => (
                                <div key={idx} className="mb-1">
                                    <label htmlFor={`categoria-input-${idx}`}>Categoría {idx + 1}: </label>
                                    <input
                                        id={`categoria-input-${idx}`}
                                        type="text"
                                        value={name}
                                        placeholder="Nombre de la categoría"
                                        title="Editar nombre de la categoría"
                                        onChange={e => {
                                            const newCategories = [...editedCategories];
                                            newCategories[idx] = e.target.value;
                                            setEditedCategories(newCategories);
                                        }}
                                    />
                                    <button
                                        title="Eliminar categoría"
                                        onClick={() => handleRemoveCategoryEdit(idx)}
                                        className="ml-1"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            ))}
                            <button title="Agregar una nueva categoría" onClick={handleAddCategoryEdit}>Agregar categoría</button>
                            <button title="Guardar cambios de categorías" onClick={handleSaveCategories} className="ml-1">Guardar cambios</button>
                        </div>
                    )}
                    {/* Edición de ítems */}
                    {editMode && editSection === "items" && (
                        <div className="edit-section">
                            <h2>Editar ítems de cada categoría</h2>
                            {editedCategories.map((catName, catIdx) => (
                                <div key={catIdx} className="mb-2">
                                    <strong>{catName}</strong>
                                    <ul>
                                        {editedItems[catIdx]?.map((item, itemIdx) => (
                                            <li key={itemIdx}>
                                                <input
                                                    type="text"
                                                    value={item}
                                                    placeholder="Nombre del ítem"
                                                    title="Editar nombre del ítem"
                                                    onChange={e => {
                                                        const updated = [...editedItems];
                                                        updated[catIdx][itemIdx] = e.target.value;
                                                        setEditedItems(updated);
                                                    }}
                                                />
                                                <button
                                                    title="Eliminar ítem"
                                                    onClick={() => handleRemoveItemEdit(catIdx, itemIdx)}
                                                    className="ml-1"
                                                >
                                                    Eliminar
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        title="Agregar un nuevo ítem"
                                        onClick={() => handleAddItemEdit(catIdx)}
                                    >
                                        Agregar ítem
                                    </button>
                                </div>
                            ))}
                            <button title="Guardar cambios de ítems" onClick={handleSaveCategories}>Guardar cambios</button>
                        </div>
                    )}
                    {/* Marcador de ganadores */}
                    {showScoreboard && <Scoreboard winners={winners} />}
                    {/* Lista de jugadores */}
                    <Players players={players} />
                    {/* Lista de categorías */}
                    <Categories categories={categories} />
                    {/* Permitir agregar ítems a cada categoría SOLO en modo edición */}
                    <Items categories={categories} />
                    {editMode && categories.map((cat, idx) => (
                        <button key={idx} onClick={() => handleAddItemToCategory(idx)}>
                            Agregar ítem a {cat.name}
                        </button>
                    ))}
                    
                    <button onClick={() => {
                        setPlayers([...initialPlayers]);
                        setCategories([...initialCategories]);
                        setEditedPlayers(initialPlayers.map(p => p.name));
                        setEditedCategories(initialCategories.map(c => c.name));
                        setEditedItems(initialCategories.map(c => [...c.items]));
                    }}>Restablecer juego</button>
                </>
            )}
            {/* Pantalla de juego activo */}
            {gameStarted && !showWinnerSelect && (
                <div>
                    <h2>Juego en curso</h2>
                    {/* Botón para ver la información secreta general */}
                    <button
                        className="botonInfo"
                        title="Ver información secreta general"
                        onClick={() => alert(`Información secreta: ${infoSecreta.join(", ")}`)}
                    >
                        Ver información secreta
                    </button>
                    {/* Botones de jugadores para ver sus ítems asignados */}
                    {players.map((player, idx) => (
                        <div key={idx} className="botonInfo">
                            <button
                                className="botonInfo"
                                title={`Ver ítems asignados a ${player.name}`}
                                onClick={() => alert(`Ítems asignados a ${player.name}: ${infoEntregada[idx]?.join(", ")}`)}
                            >
                                {player.name}
                            </button>
                        </div>
                    ))}
                    <button onClick={handleEndGame} className="botonInfo">Finalizar juego</button>
                </div>
            )}
            {/* Selección de ganador */}
            {showWinnerSelect && (
                <div>
                    <h2>Selecciona el ganador</h2>
                    {players.map((player, idx) => (
                        <button key={idx} onClick={() => handleSelectWinner(player.name)} className="botonInfo">
                            {player.name}
                        </button>
                    ))}
                </div>
            )}
            {/* Marcador de ganadores SOLO aquí */}
            {/* {showScoreboard && <Scoreboard winners={winners} />} */}
        </div>
    );
};

export default App;