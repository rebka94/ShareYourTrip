export const  uuidv4=()=> {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  /**
   * permet davoir le format d'un new Date() en jour, DD:MM:YY
   * @param {*} date 
   */
export const getDateFormat=(date)=> {
  let tab = []
  tab.push(getNameDay(date.getDay()).substring(0,3))
  tab.push(", ")
  if (date.getDate()>10){
    tab.push(date.getDate())
  }else {
    tab.push("0")
    tab.push(date.getDate())
  }
  tab.push(":")
  if (date.getUTCMonth()>10){
    tab.push(date.getUTCMonth())
  }else {
      tab.push("0")
      tab.push(date.getUTCMonth()+1)
  }
  tab.push(":")
  tab.push(date.getFullYear()) 

  return tab.join("")
}
/**
 *  convertit l'heure en format MM:HH
 * @param {*} date 
 */
export const getTimeFormat=(date)=> {
  let tab = []
  if (date.getHours()<10){
    tab.push("0")
    tab.push(date.getHours())
  }else {
      tab.push(date.getHours())
  }
  tab.push(":")
  if (date.getMinutes()<10){
    tab.push("0")
    tab.push(date.getUTCMinutes())
  }else {
      tab.push(date.getUTCMinutes())
  }
  return tab.join("")
}
export const getNameDay=(day)=> {
  var weekdays = new Array(7);
  weekdays[0] = "Sunday";
  weekdays[1] = "Monday";
  weekdays[2] = "Tuesday";
  weekdays[3] = "Wednesday";
  weekdays[4] = "Thursday";
  weekdays[5] = "Friday";
  weekdays[6] = "Saturday";
  var r = weekdays[day];
  var jour=""
  if (r=="Sunday") {
    jour="Dimanche"
    return jour
  }
  if (r=="Monday") {
    jour="Lundi"
    return jour
  }
  if (r=="Tuesday") {
    jour="Mardi"
    return jour
  }
  if (r=="Wednesday") {
    jour="Mardi"
    return jour
  }
  if (r==="Thursday") {
    jour="Jeudi"
    return jour
  }
  if (r=="Friday") {
    jour="Vendredi"
    return jour
  }
  if (r=="Saturday") {
    jour="Samedi"
    return jour
  }


}