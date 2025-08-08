import React from "react";
import { Category } from "../models/Category";

/**
 * Componente: Items
 * Responsabilidad: Mostrar los ítems de cada categoría recibida.
 * Colaboradores: Recibe un array de Category como prop.
 */
interface Props {
    categories: Category[];
}

const Items: React.FC<Props> = ({ categories }) => (
    <div>
        <h2>Ítems por Categoría</h2>
        {categories.map((c, i) => (
            <div key={i}>
                {/* Muestra el nombre de la categoría */}
                <strong>{c.name}</strong>
                <ul>
                    {/* Lista los ítems de la categoría */}
                    {c.items.map((item, idx) => (
                        <li key={idx}>{item}</li>
                    ))}
                </ul>
            </div>
        ))}
    </div>
);

export default Items;