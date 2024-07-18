

const saisieNom = document.getElementById("nom")
const saisieEmail = document.getElementById("email")
const saisieMdp = document.getElementById("mdp")
const saisieMdpValidation = document.getElementById("mdpValidation")
const btnEnvoi = document.getElementById("soumettre")

saisieNom.addEventListener("keydown", ()=>{
    const iconeNom = document.getElementById("iconeNom")
    setTimeout(() => {

        if(ctrlNom(saisieNom.value)!=null){
            
            iconeNom.src="../images/check.svg"
        }else{
            iconeNom.src="../images/error.svg"
        }
        
    }, 50);

})

saisieEmail.addEventListener("keydown", ()=>{
    const iconeEmail = document.getElementById("iconeEmail")
    setTimeout(() => {

        if(ctrlEmail(saisieEmail.value)!=null){
            
            iconeEmail.src="../images/check.svg"
        }else{
            iconeEmail.src="../images/error.svg"
        }
        
    }, 50);

})

saisieMdpValidation.addEventListener("keydown", ()=>{
    const iconeMdp = document.getElementById("iconeMdp")
    setTimeout(() => {

        if(saisieMdp.value==saisieMdpValidation.value){
            
            iconeMdp.src="../images/check.svg"
        }else{
            iconeMdp.src="../images/error.svg"
        }
        
    }, 50);

})

btnEnvoi.addEventListener("click", (e)=>{

    e.preventDefault();

    if (ctrlNom(saisieNom.value)==null) {
        alert("Le nom saisi n'est pas valide !")
        vibrer()
    }else if (ctrlEmail(saisieEmail.value)==null){
        alert("L'email saisi n'est pas valide !")
        vibrer()
    }else if (ctrlMdp(saisieMdp.value)==null){
        alert("Le mot de passe saisi n'est pas valide !")
        vibrer()
    }else if(saisieMdp.value!=saisieMdpValidation.value){
        alert("Les deux mots de passe ne sont pas similaires !")
        vibrer()
    }else{

        stockerDonnees(saisieNom.value, saisieEmail.value, md5(saisieMdp.value))

    }
})


function stockerDonnees(nom, email, mdp){

    const data = JSON.parse(localStorage.getItem("comptes"))

    const compte = {"nom" : nom, "email" : email, "mdp" : mdp}

    const tableau=[]


    let warning=false

    if(data!=null){

        data.forEach(e => {

            if(e.email==compte.email){
                warning=true
            }

            tableau.push(e)
            
        });
        

    }

    if(warning==false){

        tableau.push(compte)

        console.log("Tableau :")
        console.log(tableau)
    
    
        const tableauToString = JSON.stringify(tableau)
        localStorage.setItem("comptes", tableauToString)

        alert("Votre compte a bien été créé !")

        window.location.assign("../pages/connection.html")

    }else{
        alert("Ce compte existe déjà.")
    }

}



function ctrlNom(nom){

    const regex = /[a-zA-Z0-9_-]{3,}/;
    return(nom.match(regex))

}

function ctrlEmail(email){

    const regex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    return(email.match(regex))

}

function ctrlMdp(mdp){

    const regex = /(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}/;
    return(mdp.match(regex))

}

function ctrlMdpValidation(mdpValidation){

    const regex = /(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}/;
    return(mdpValidation.match(regex))

}


saisieMdp.addEventListener('keyup',analyserForceMdp)


function analyserForceMdp(){

    /*

        (?=.*\d) : check si chiffre (\d signifie un chiffre de 0 à 9).
        (?=.*[@$!%*?&]) : check si caractère spécial parmi ceux listés (@ $ ! % * ? &).
        [A-Za-z\d@$!%*?&]{6,} : check si longueur totale >= 6 + check respect des caractères autorisés :
            * A-Za-z = lettres majuscules et minuscules, 
            * \d = chiffres  de 0 à 9
            * @$!%*?& = caractères spéciaux)
    */


    // si le mot de passe contient moins de 6 caracteres il est faible.
  

    // S'il contient plus de 6 caracteres avec un symbole ou un nombre il est moyen.
    const regexMoyen = /(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}/;

    // S'il contient plus de 9 caracteres avec un symbole et un nombre il est fort.
    const regexFort = /(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,}/;

    console.log(saisieMdp.value)


    const divMdpFaible=document.getElementById("divMdpFaible")
    const divMdpMoyen=document.getElementById("divMdpMoyen")
    const divMdpFort=document.getElementById("divMdpFort")

    if(saisieMdp.value==""){

        divMdpFaible.style.visibility="hidden"
        divMdpMoyen.style.visibility="hidden"
        divMdpFort.style.visibility="hidden"

    }else if(saisieMdp.value.match(regexFort)){

        divMdpFaible.style.visibility="visible"
        divMdpMoyen.style.visibility="visible"
        divMdpFort.style.visibility="visible"
        
    }else if(saisieMdp.value.match(regexMoyen)){

        divMdpFaible.style.visibility="visible"
        divMdpMoyen.style.visibility="visible"
        divMdpFort.style.visibility="hidden"
    }else{

        divMdpFaible.style.visibility="visible"
        divMdpMoyen.style.visibility="hidden"
        divMdpFort.style.visibility="hidden"
    }
}


function vibrer(){

    const body = document.querySelector("body")
    console.log(body)
    body.classList.add("vibration")

    setTimeout(() => {
        body.classList.remove("vibration")
    }, 500)

}
