//Variable con la informacion
let resultados1 = {
    "nombre": "ejercito1",
    "ganador": false,
    "cantidadUnidadesVivas": 0,
    "golpesCriticos": 0,
    "ataqueEfectivo": 0,
    "unidadesIlesas": 0,
    "medico": 0,
    "unidadesSobrevivientes": {
        "SoldadoRegular": 0,
        "SoldadoProfesional": 0,
        "SoldadoElite": 0,
        "CarroTanque": 0,
        "Helicoptero": 0,
        "AviondeCombate": 0,
        "Submarino": 0
    },
    "unidadesPerdidas": {
        "SoldadoRegular": 0,
        "SoldadoProfesional": 0,
        "SoldadoElite": 0,
        "CarroTanque": 0,
        "Helicoptero": 0,
        "AviondeCombate": 0,
        "Submarino": 0
    }
}
let resultados2 = {
    "nombre": "ejercito2",
    "ganador": false,
    "cantidadUnidadesVivas": 0,
    "golpesCriticos": 0,
    "ataqueEfectivo": 0,
    "unidadesIlesas": 0,
    "medico": 0,
    "unidadesSobrevivientes": {
        "SoldadoRegular": 0,
        "SoldadoProfesional": 0,
        "SoldadoElite": 0,
        "CarroTanque": 0,
        "Helicoptero": 0,
        "AviondeCombate": 0,
        "Submarino": 0
    },
    "unidadesPerdidas": {
        "SoldadoRegular": 0,
        "SoldadoProfesional": 0,
        "SoldadoElite": 0,
        "CarroTanque": 0,
        "Helicoptero": 0,
        "AviondeCombate": 0,
        "Submarino": 0
    }
}

// Objetos de ejercitos con la vida y cantidad 
let ejercito1 = {
    "SoldadoRegular": generateEjer(generateRandomNumber(500, 1000), (2 / 12), 2500, (1 / 14), 500),
    "SoldadoProfesional": generateEjer(generateRandomNumber(500, 1000), (3 / 12), 2500, (2 / 14), 500),
    "SoldadoElite": generateEjer(generateRandomNumber(200, 300), (4 / 12), 2500, (3 / 14), 500),
    "CarroTanque": generateEjer(generateRandomNumber(50, 100), (7 / 12), 2500, (4 / 14), 500),
    "Helicoptero": generateEjer(generateRandomNumber(30, 50), (8 / 12), 2500, (5 / 14), 500),
    "AviondeCombate": generateEjer(generateRandomNumber(50, 75), (10 / 12), 2500, (6 / 14), 500),
    "Submarino": generateEjer(generateRandomNumber(1, 2), (1), 2500, (1), 500)
};
let ejercito2 = {
    "SoldadoRegular": generateEjer(generateRandomNumber(500, 1000), (2 / 12), 2500, (1 / 14), 500),
    "SoldadoProfesional": generateEjer(generateRandomNumber(500, 1000), (3 / 12), 2500, (2 / 14), 500),
    "SoldadoElite": generateEjer(generateRandomNumber(200, 300), (4 / 12), 2500, (3 / 14), 500),
    "CarroTanque": generateEjer(generateRandomNumber(50, 100), (7 / 12), 2500, (4 / 14), 500),
    "Helicoptero": generateEjer(generateRandomNumber(30, 50), (8 / 12), 2500, (5 / 14), 500),
    "AviondeCombate": generateEjer(generateRandomNumber(50, 75), (10 / 12), 2500, (6 / 14), 500),
    "Submarino": generateEjer(generateRandomNumber(1, 2), (1), 2500, (1), 500)
};

let copia1 = JSON.parse(JSON.stringify(ejercito1));
let copia2 = JSON.parse(JSON.stringify(ejercito2));
let turno = 0

//Funcion de numeros aleatorios
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Función para crear vida y ataque 
function generateLifeAttack(fraction, max) {
    return Math.round(fraction * max);
}

//Función para crear ejercitos 
function generateEjer(cantidad, fravid, maxvid, fraata, maxata) {
    let eje = [];
    for (let index = 0; index < cantidad; index++) {
        let prueba = {
            "vida": generateLifeAttack(fravid, maxvid),
            "ataque": generateLifeAttack(fraata, maxata)
        }
        eje.push(prueba);
    }
    return eje;
}

//Función para atacar al soldado aleatorio y revisar si tiene vida o se elimina con el golpe
function atacarSoldado(ejercito, tipoSoldado, poder, resultados, res2) {
    if (ejercito[tipoSoldado].length > 0) {

        let soldado = generateRandomNumber(0, ejercito[tipoSoldado].length - 1);
        let vida = ejercito[tipoSoldado][soldado].vida - poder;

        if (vida > 0) {
            res2.ataqueEfectivo += poder
            ejercito[tipoSoldado][soldado].vida = vida;
        } else {
            resultados.unidadesPerdidas[tipoSoldado] += 1;
            ejercito[tipoSoldado].splice(soldado, 1);
        }
    }
}

//Función para revisar si todavia queda elementos del ejercito
function existeEjercitoEnemigo(ejercito) {
    return (
        ejercito.SoldadoRegular.length > 0 ||
        ejercito.SoldadoProfesional.length > 0 ||
        ejercito.SoldadoElite.length > 0 ||
        ejercito.CarroTanque.length > 0 ||
        ejercito.Helicoptero.length > 0 ||
        ejercito.AviondeCombate.length > 0 ||
        ejercito.Submarino.length > 0
    );
}

//Función para realizar el ataque uno por uno del ejercito en su turno
function atacarEjercito(atacante, defensor, resul1, resul2) {
    const tipos = Object.keys(atacante);
    for (let tipo of tipos) {
        const unidades = atacante[tipo];
        for (let unidad of unidades) {
            if (existeEjercitoEnemigo(defensor)) {
                let ataquemaximo = generateRandomNumber(1, unidad.ataque);
                if (ataquemaximo === unidad.ataque) {
                    let clima = generateRandomNumber(0, 30);
                    if (clima === 0) {
                        ataquemaximo = ataquemaximo - (ataquemaximo * (clima / 100));
                        resul2.golpesCriticos += 1
                    }
                } else {
                    ataquemaximo = ataquemaximo - (ataquemaximo * (generateRandomNumber(0, 30) / 100));
                }

                let bandera = false;
                let ata = 0;

                while (!bandera) {
                    ata = generateRandomNumber(1, 7);
                    bandera = verificar(ata, defensor);
                    if (bandera) {
                        ataque(ata, ataquemaximo, defensor, resul1, resul2);
                    }
                }
            } else {
                return;
            }
        }
    }
}

//Funcón para enviar a que tipo de unidad se ataca
function ataque(ata, poder, defensor, res1, res2) {
    switch (ata) {
        case 1:
            atacarSoldado(defensor, "SoldadoRegular", poder, res1, res2);
            break;
        case 2:
            atacarSoldado(defensor, "SoldadoProfesional", poder, res1, res2);
            break;
        case 3:
            atacarSoldado(defensor, "SoldadoElite", poder, res1, res2);
            break;
        case 4:
            atacarSoldado(defensor, "CarroTanque", poder, res1, res2);
            break;
        case 5:
            atacarSoldado(defensor, "Helicoptero", poder, res1, res2);
            break;
        case 6:
            atacarSoldado(defensor, "AviondeCombate", poder, res1, res2);
            break;
        case 7:
            atacarSoldado(defensor, "Submarino", poder, res1, res2);
            break;
        default:
            break;
    }
}

// Verifica si alguno de los tipos tiene longitud 
function verificar(ata, defensor) {
    const tipos = [
        'SoldadoRegular',
        'SoldadoProfesional',
        'SoldadoElite',
        'CarroTanque',
        'Helicoptero',
        'AviondeCombate',
        'Submarino'
    ];

    let tipoSeleccionado = tipos[ata - 1];

    if (defensor[tipoSeleccionado].length > 0) {
        return true;
    } else {
        return false;
    }
}

//Función donde verifico unidades ilesas y que necesitan ir al medico
function unidadesIlesas(ejercitoGanador, res1) {

    for (const tipo in ejercitoGanador) {
        ejercitoGanador[tipo].forEach((unidad, index) => {
            let porcentajeVida = (unidad.vida / copia1[tipo][0].vida) * 100;
            if (porcentajeVida < 30) {
                res1.medico += 1
            }
            if (unidad.vida === copia1[tipo][0].vida) {
                res1.unidadesIlesas += 1
            }
        });
    }
}


function mostrarTurno(ejer, nombre) {

    console.log("Nombre: ", nombre)
    console.log("Unidades vivas SoldadoRegular", ejer.SoldadoRegular.length)
    console.log("Unidades vivas SoldadoProfesional", ejer.SoldadoProfesional.length)
    console.log("Unidades vivas SoldadoElite:", ejer.SoldadoElite.length)
    console.log("Unidades vivas CarroTanque:", ejer.CarroTanque.length)
    console.log("Unidades vivas Helicoptero:", ejer.Helicoptero.length)
    console.log("Unidades vivas AviondeCombate:", ejer.AviondeCombate.length)
    console.log("Unidades vivas Submarino:", ejer.Submarino.length)
}

function mostrarGanador(ejer1, ejer2) {
    console.log("Ganador: ", ejer1.nombre)
    console.log("Golpe critico: ", ejer1.golpesCriticos)
    console.log("Ataque efectivo: ", ejer1.ataqueEfectivo)
    console.log("Unidades ilesas: ", ejer1.unidadesIlesas)
    console.log("Unidades para ir al medico o reparacion: ", ejer1.medico)
    console.log("Cantidad de unidades enemigas eliminadas ")
    console.log("Unidades eliminadas SoldadoRegular", ejer2.unidadesPerdidas.SoldadoRegular)
    console.log("Unidades eliminadas SoldadoProfesional", ejer2.unidadesPerdidas.SoldadoProfesional)
    console.log("Unidades eliminadas SoldadoElite:", ejer2.unidadesPerdidas.SoldadoElite)
    console.log("Unidades eliminadas CarroTanque:", ejer2.unidadesPerdidas.CarroTanque)
    console.log("Unidades eliminadas Helicoptero:", ejer2.unidadesPerdidas.Helicoptero)
    console.log("Unidades eliminadas AviondeCombate:", ejer2.unidadesPerdidas.AviondeCombate)
    console.log("Unidades eliminadas Submarino:", ejer2.unidadesPerdidas.Submarino)
    console.log("Unidades perdidas")
    console.log("Unidades Perdidas SoldadoRegular", ejer1.unidadesPerdidas.SoldadoRegular)
    console.log("Unidades Perdidas SoldadoProfesional", ejer1.unidadesPerdidas.SoldadoProfesional)
    console.log("Unidades Perdidas SoldadoElite:", ejer1.unidadesPerdidas.SoldadoElite)
    console.log("Unidades Perdidas CarroTanque:", ejer1.unidadesPerdidas.CarroTanque)
    console.log("Unidades Perdidas Helicoptero:", ejer1.unidadesPerdidas.Helicoptero)
    console.log("Unidades Perdidas AviondeCombate:", ejer1.unidadesPerdidas.AviondeCombate)
    console.log("Unidades Perdidas Submarino:", ejer1.unidadesPerdidas.Submarino)
}

let empieza = generateRandomNumber(1, 2)
let gameover = false

//Realiza la guerra hasta que uno pierda
while (!gameover) {
    if (empieza === 1) {
        if (existeEjercitoEnemigo(ejercito1) && existeEjercitoEnemigo(ejercito2)) {
            atacarEjercito(ejercito1, ejercito2, resultados2, resultados1);
        }
        if (existeEjercitoEnemigo(ejercito1) && existeEjercitoEnemigo(ejercito2)) {
            atacarEjercito(ejercito2, ejercito1, resultados1, resultados2);
        } else {
            gameover = true;
        }
        turno += 1;
        console.log("Turno: ", turno)
        mostrarTurno(ejercito1, "Ejercito 1")
        mostrarTurno(ejercito2, "Ejercito 2")
    } else {
        if (existeEjercitoEnemigo(ejercito2) && existeEjercitoEnemigo(ejercito1)) {
            atacarEjercito(ejercito2, ejercito1, resultados1, resultados2);
        }
        if (existeEjercitoEnemigo(ejercito2) && existeEjercitoEnemigo(ejercito1)) {
            atacarEjercito(ejercito1, ejercito2, resultados2, resultados1);
        } else {
            gameover = true;
        }
        turno += 1;
        console.log("Turno: ", turno)
        mostrarTurno(ejercito2, "Ejercito 2")
        mostrarTurno(ejercito1, "Ejercito 1")
    }
}

if (existeEjercitoEnemigo(ejercito1)) {
    unidadesIlesas(ejercito1, resultados1)
    mostrarGanador(resultados1, resultados2)
} else {
    unidadesIlesas(ejercito2, resultados2)
    mostrarGanador(resultados2, resultados1)
}
