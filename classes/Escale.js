import * as func from "../helpers/functionsHelp"
export class Escale {
  /** 
   * @param {*} position //sa position dans la liste d'escales de son voyage 
   * @param {*} lieu lieu de mon escale 
   * @param {*} debut_escale date et heure du début de mon escale 
   * @param {*} fin_escale date et heure de la fin  de mon escale 
   */
    constructor(position, lieu, debut_escale, fin_escale) {
      this.id = func.uuidv4();//un identifiant aléatoire pour chque escale 
      this.position = position;
      this.lieu = lieu;
      this.debut_escale = debut_escale;
      this.fin_escale = fin_escale;
    }
    
    getId() {
      return this.id;
    }
    getposition() {
      return this.position;
    }
    getLieu() {
      return this.lieu;
    }
    getDebut_escale() {
      return this.debut_escale;
    }
    getFin_escale() {
      return this.fin_escale;
    }
    setLieu(nouveauLieu) {
      return this.lieu=nouveauLieu;
    }
    setDebut_escale(nouvelleDate) {
      return this.debut_escale=nouvelleDate;
    }
    setFin_escale(nouvelleDate) {
      return this.fin_escale=nouvelleDate;
    }
    
  }