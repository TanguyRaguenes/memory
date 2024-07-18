const soumettre = document.getElementById("soumettre")
const saisieEmail = document.getElementById("email")
const saisieMdp = document.getElementById("mdp")
let nomUtilisateur=""

soumettre.addEventListener("click",e=>{

    e.preventDefault()
    console.log("click")

    const data = JSON.parse(localStorage.getItem("comptes"))

    let occurence=false
    
    if(data!=null){
        data.forEach(e => {

            if(e.email==saisieEmail.value && e.mdp==md5(saisieMdp.value)){
                occurence=true
                nomUtilisateur=e.nom
            }
    })
    }


    if(occurence){
        alert("Bienvenue !")
        window.location.assign("../pages/profil.html")

        sessionStorage.setItem("utilisateur", nomUtilisateur)

    }else{
        // console.log("Pas touvé ...")

        alert("Ce compte n'exite pas.\n Veuillez vérifier votre saisie.")
    }


})
