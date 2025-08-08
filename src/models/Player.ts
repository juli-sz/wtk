// Modelo de jugador para el juego

/**
 * Clase: Player
 * Responsabilidad: Representar un jugador, gestionar su información secreta y operaciones relacionadas.
 * Colaboradores: Puede interactuar con Category, App, etc.
 */
export class Player {
    name: string;             // Nombre del jugador
    secretInfo: string[] = []; // Información secreta asignada al jugador

    /**
     * Crea un nuevo jugador.
     * @param name Nombre del jugador.
     */
    constructor(name: string) {
        this.name = name;
    }

    /**
     * Asigna información secreta al jugador.
     * @param info Información a agregar.
     */
    addSecretInfo(info: string) {
        this.secretInfo.push(info);
    }

    /**
     * Limpia la información secreta del jugador.
     */
    clearSecretInfo() {
        this.secretInfo = [];
    }

    /**
     * Devuelve una copia de la información secreta.
     * @returns Copia del array de información secreta.
     */
    getSecretInfo(): string[] {
        return [...this.secretInfo];
    }
}