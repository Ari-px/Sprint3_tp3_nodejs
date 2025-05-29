import {agregarSuperheroes, leerSuperheroes } from './utils.mjs';

//Leer y mostrar la lista de superheroes ordenada
const archivoOriginal = './superheroes.txt';
const archivoNuevo = './agregarSuperheroes.txt';



agregarSuperheroes(archivoOriginal,archivoNuevo);

const superheroes = leerSuperheroes('./superheroes.txt');
console.log('superheroes ordenados:');
console.log(superheroes);