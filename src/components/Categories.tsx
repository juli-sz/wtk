import React from "react";
import { Category } from "../models/Category";

/**
 * Componente: Categories
 * Responsabilidad: Mostrar la lista de categorías y la cantidad de ítems en cada una.
 * Colaboradores: Recibe un array de Category como prop.
 */
interface Props {
    categories: Category[];
}

const Categories: React.FC<Props> = ({ categories }) => (
    <div>
        <h2 className="titulo">Categorías</h2>
        <ul>
            {/* Muestra cada categoría y su cantidad de ítems */}

            {categories.map(category => (
                <li key={category.name}>{category.name}</li>
            ))}
        </ul>
    </div>
);

export default Categories;