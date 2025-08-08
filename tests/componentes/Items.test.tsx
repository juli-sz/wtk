import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Items from "../../src/components/Items";

describe("Items component", () => {
    it("muestra los ítems de cada categoría", () => {
        const categories = [
            {
                name: "Armas",
                items: ["Cuchillo", "Pistola"],
                addItem: () => {},
                removeItem: () => {},
                shuffleItems: () => {},
                getItems: function () { return this.items; },
                hasItems: function () { return this.items.length > 0; },
                clearItems: function () { this.items = []; }
            },
            {
                name: "Lugares",
                items: ["Cocina", "Sala"],
                addItem: () => {},
                removeItem: () => {},
                shuffleItems: () => {},
                getItems: function () { return this.items; },
                hasItems: function () { return this.items.length > 0; },
                clearItems: function () { this.items = []; }
            }
        ];
        render(<Items categories={categories} />);
        expect(screen.getByText("Armas")).toBeDefined();
        expect(screen.getByText("Cuchillo")).toBeDefined();
        expect(screen.getByText("Pistola")).toBeDefined();
        expect(screen.getByText("Lugares")).toBeDefined();
        expect(screen.getByText("Cocina")).toBeDefined();
        expect(screen.getByText("Sala")).toBeDefined();
    });

    // it("muestra mensaje si no hay categorías", () => {
    //     render(<Items categories={[]} />);
    //     expect(screen.getByText(/no hay categorías/i)).toBeInTheDocument();
    // });
});