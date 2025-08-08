// Datos iniciales simulados para el juego
import { Category } from "./models/Category";
import { Player } from "./models/Player";

export const initialCategories = [
    (() => { const c = new Category("Armas"); c.items = [  "Cuchillo","Cuerda","Pistola","Soga","Tubo","Llave inglesa","Candelabro","Revólver","Escopeta","Katana","Daga","Hacha","Maza","Espada","Ballesta","Arco","Lanza","Granada","Molotov","Lanzacohetes",]; return c; })(),
    (() => { const c = new Category("Lugares"); c.items = ["Duvivier", "Brown", "Don Bosco", "French", "Saavedra", "9 de Julio", "Belgrano", "25 de Mayo", "Colon", "Laprida", "Velez Sarsfield"]; return c; })(),
    (() => { const c = new Category("Asesinos"); c.items = ["Srta. Escarlata- rojo", "Coronel Mostaza - amarillo", "Profesor Ciruela - violeta", "Sr. Verde - verde", "Sra. Blanco - blanco", "Sra. Pavo Real - azul",]; return c; })(),
];
export const initialPlayers = [
    new Player("Jugador 1"),
    new Player("Jugador 2"),
    new Player("Jugador 3"),
    new Player("Jugador 4"),
    new Player("Jugador 5")
];
