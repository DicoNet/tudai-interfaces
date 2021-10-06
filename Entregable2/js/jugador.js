class Jugador {
    constructor(nombre, cantFichas) {//fill no es necesario
        this.nombre = nombre;
        this.turno = false;
        this.cantFichas = cantFichas;
    }

    getNombre(){
        return this.nombre;
    }
    getTurno(){
        return this.turno;
    }
    setTurno(turno){
        this.turno = turno;
    }
    getCantFichas(){
        return this.cantFichas;
    }
    setCantFichas(cant){
        this.cantFichas = cant;
    }
}