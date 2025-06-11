export const renderizarSuperheroe = (superheroe) => {
  return {
    Nombre: superheroe.nombreSuperHeroe,
    "Nombre Real": superheroe.nombreReal,
    Edad: superheroe.edad,
    "Planeta de Origen": superheroe.planetaOrigen,
    Debilidad: superheroe.debilidad,
    Poderes: superheroe.poderes,
    Aliados: superheroe.aliados,
    Enemigos: superheroe.enemigos,
  };
};

export const renderizarListaSuperheroes = (superheroes) => {
  return superheroes.map((superheroe) => renderizarSuperheroe(superheroe));
};