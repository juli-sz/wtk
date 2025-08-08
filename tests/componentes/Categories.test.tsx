import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Categories from "../../src/components/Categories";

describe("Categories component", () => {
    it("muestra la lista de categorías", () => {
        const categories = [
            {
                // crea una nueva categoría con nombre y métodos simulados
                name: "Armas",
                items: ["Cuchillo", "Pistola"],
                addItem: vi.fn(),
                removeItem: vi.fn(),
                shuffleItems: vi.fn(),
                // retorna los ítems de la categoría
                getItems: function () { return this.items; },
                // verifica si la categoría tiene ítems
                hasItems: function () { return this.items.length > 0; },
                // limpia los ítems de la categoría
                clearItems: function () { this.items = []; }
            },
            {
                name: "Lugares",
                items: ["Cocina", "Sala"],
                addItem: vi.fn(),
                removeItem: vi.fn(),
                shuffleItems: vi.fn(),
                getItems: function () { return this.items; },
                hasItems: function () { return this.items.length > 0; },
                clearItems: function () { this.items = []; }
            }
        ];
        // renderiza el componente Categories con las categorías simuladas
        render(<Categories categories={categories} />);
        // verifica que los nombres de las categorías se muestren en el documento
        expect(screen.getByText("Armas")).toBeDefined();
        expect(screen.getByText("Lugares")).toBeDefined();
    });   

});