import { describe, it, expect } from "vitest";
import { Category } from "../../src/models/Category";

describe("Category", () => {
    it("agrega items correctamente", () => {
        const cat = new Category("Test");
        cat.addItem("Item1");
        expect(cat.items.length).toBe(1);
        expect(cat.items[0]).toBe("Item1");
    });

    it("mezcla los items", () => {
        const cat = new Category("Test");
        cat.items = ["A", "B", "C"];
        cat.shuffleItems();
        expect(cat.items.length).toBe(3);
        // No se puede garantizar el orden, pero sí que contiene los mismos elementos
        expect(cat.items.sort()).toEqual(["A", "B", "C"]);
    });

    it("crea una categoría con nombre y sin items", () => {
        const cat = new Category("Lugares");
        expect(cat.name).toBe("Lugares");
        expect(cat.items).toEqual([]);
    });

    it("crea una categoría con nombre y con items", () => {
        const cat = new Category("Armas", ["Cuchillo", "Pistola"]);
        expect(cat.name).toBe("Armas");
        expect(cat.items).toEqual(["Cuchillo", "Pistola"]);
    });

    it("no agrega items vacíos", () => {
        const cat = new Category("Test");
        cat.addItem("");
        expect(cat.items.length).toBe(0);
    });
});