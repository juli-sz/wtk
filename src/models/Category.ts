// Modelo de categoría para el juego

/**
 * Clase: Category
 * Responsabilidad: Representar una categoría del juego, gestionar sus ítems y operaciones sobre ellos.
 * Colaboradores: Ninguno directo (puede ser utilizada por Player, App, etc.)
 */

export class Category {
    name: string;         // Nombre de la categoría
    items: string[];      // Lista de ítems de la categoría

    /**
     * Crea una nueva categoría.
     * @param name Nombre de la categoría.
     * @param items (Opcional) Lista inicial de ítems.
     */
    constructor(name: string, items?: string[]) {
        this.name = name;
        this.items = items ? [...items] : [];
    }

    /**
     * Agrega un ítem a la categoría si no está vacío ni duplicado.
     * @param item Ítem a agregar.
     */
    addItem(item: string) {
        if (item && !this.items.includes(item)) {
            this.items.push(item);
        }
    }

    /**
     * Elimina un ítem de la categoría por su valor.
     * @param item Ítem a eliminar.
     */
    removeItem(item: string) {
        this.items = this.items.filter(i => i !== item);
    }

    /**
     * Mezcla los ítems usando el algoritmo Fisher-Yates.
     */
    shuffleItems() {
        for (let i = this.items.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.items[i], this.items[j]] = [this.items[j], this.items[i]];
        }
    }

    /**
     * Devuelve una copia de los ítems.
     * @returns Copia del array de ítems.
     */
    getItems(): string[] {
        return [...this.items];
    }

    /**
     * Verifica si la categoría tiene al menos un ítem.
     * @returns true si hay ítems, false si está vacía.
     */
    hasItems(): boolean {
        return this.items.length > 0;
    }

    /**
     * Limpia todos los ítems de la categoría.
     */
    clearItems() {
        this.items = [];
    }
}