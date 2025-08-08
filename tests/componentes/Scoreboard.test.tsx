import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import Scoreboard from "../../src/components/Scoreboard";

describe("Scoreboard component", () => {
    afterEach(() => cleanup());

    it("muestra el título del marcador", () => {
        render(<Scoreboard winners={["Ana"]} />);
        expect(screen.getByText(/marcador \(ganadores previos\)/i)).toBeDefined();
    });

    it("muestra todos los ganadores provistos", () => {
        const winners = ["Ana", "Luis", "Pedro"];
        render(<Scoreboard winners={winners} />);
        winners.forEach(winner => {
            expect(screen.getByText(winner)).toBeDefined();
        });
    });

    // it("muestra lista vacía si no hay ganadores", () => {
    //     render(<Scoreboard winners={[]} />);
    //     expect(screen.getByText(/marcador \(ganadores previos\)/i)).toBeDefined();
    //     expect(screen.queryAllByRole("listitem").length).toBe(0);
    // });
});