import Escale from "./Escale"
import * as func from "../helpers/functionsHelp"
export class Voyage {
    
    /**
     * Constructeur de la classe voyage pour créer un voyage 
     * @param {*} departure lieu de départ du voyage 
     * @param {*} arrival lieu d'arrivé du voyage 
     * @param {*} departureDateTime date et heure du départ
     * @param {*} arrivalDateTime date et haure de l'arrivée  
     */
    constructor(departure, arrival, departureDateTime, arrivalDateTime, nb_Escales ) {
        this.id = func.uuidv4();
        this.departure=departure;
        this.arrival=arrival; 
        this.departureDateTime=departureDateTime;
        this.arrivalDateTime=arrivalDateTime;
        this.listeEscales=[];
        this.nb_Escales = nb_Escales; 
      }
      getNumero() {
          this.numero;
      }
      getArrival() {
          this.arrival
      }
      getDeparture() {
          this.departure
      }
      getDepartureDateTime() {
          this.departureDateTime
      }
      getArrivalDateTime() {
          this.arrivalDateTime
      }
      getListeEscales() {
          this.listeEscales;
      }
      getNbEscales() {
          this.nb_Escales
      }
      getId() {
        this.id
    }


    /**
     * 
     * @param {*} lieu lieu de mon escale 
     * @param {*} debut_escale date et heure du début de mon escale 
     * @param {*} fin_escale date et heure de la fin  de mon escale 
     */
    ajouterEscale = (lieu, debut_escale, fin_escale) => {
        if (this.listeEscales.length<this.nb_Escales) {
            var escale = new Escale(this.listeEscales.length+1, lieu, debut_escale, fin_escale);//je crée l'escale à partir des données 
            this.listeEscales.push(escale);//je l'ajoute à ma liste d'escale 
            this.nb_Escales=this.listeEscales.length;//je met à jour le nombre d'escale de mon voyage
        } 
    }
    /**
     * fonction qui retire l'escale du voyage 
     * 
     * @param {*} position position de l'escale dans la liste d'escales du voyage
     */
    supprimerEscale = (position) => {
        if (this.listeEscales.length>0) {
            for (let i = 0; i < this.listeEscales.length; i++) {
                var element = this.listeEscales[i];
                if (element.numero-1==position) {
                    this.listeEscales.slice(position, 1)
                }  
            }
        }
    }


}
console.log("cc")