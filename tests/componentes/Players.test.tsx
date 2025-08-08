import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Players from "../../src/components/Players";

describe("Players component", () => {
    it("muestra la lista de jugadores", () => {
        const players = [
            { 
                //crea un nuevo jugador con nombre y métodos simulados
                name: "Ana", 
                secretInfo: [], 
                //la funciones vi.fn() simula las funciones de los jugadores
                //vi es una función de Vitest que permite crear mocks
                addSecretInfo: vi.fn(), 
                clearSecretInfo: vi.fn(), 
                getSecretInfo: vi.fn().mockReturnValue([]) 
            },
            { 
                name: "Luis", 
                secretInfo: [], 
                addSecretInfo: vi.fn(), 
                clearSecretInfo: vi.fn(), 
                //mockReturnValue se usa para simular el retorno de la función
                getSecretInfo: vi.fn().mockReturnValue([]) 
            }
        ];
        render(<Players players={players} />);
        //verifica que los nombres de los jugadores se muestren en el documento
        //screen.getByText busca un elemento que contenga el texto especificado
        //toBeDefined verifica que el elemento exista
        //toBeDefined es una aserción de Jest que verifica que el valor no sea undefined
        expect(screen.getByText("Ana")).toBeDefined();
        expect(screen.getByText("Luis")).toBeDefined();
    });
});