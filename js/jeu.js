let tbSelections=[]
let tbTirages=[]
let tbFinal=[]

let nbOccurences=0
let compteur=0

let tbImages=[]

const nbTentatives = document.getElementById("nbTentatives")

const quitter=document.getElementById("quitter")

quitter.addEventListener("click",()=>{
    window.location.assign("../index.html")
})

function toggleBoiteDeDialogue(){

    const boiteDeDialogue = document.getElementById("boiteDeDialogue")
    const main= document.querySelector("main")
    
    if(boiteDeDialogue.style.display=="block"){

        console.log("masquer")
        main.style.filter="none"
        main.style.pointerEvents="auto"

        boiteDeDialogue.style.display="none"
        

    }else{

        console.log("afficher")
        main.style.filter="blur(5px)"
        main.style.pointerEvents="none"

        boiteDeDialogue.style.display="block"
        // boiteDeDialogue.style.pointerEvents="auto"
        // boiteDeDialogue.style.filter="none"

    }
    

}

const boiteDeDialogueFermer = document.getElementById("boiteDeDialogueFermer")


boiteDeDialogueFermer.addEventListener("click",()=>{

    toggleBoiteDeDialogue()

})






// ***INITIALISATION***
// ______________________________________________________

alimenterTbImages()

function alimenterTbImages(){

    const data = localStorage.getItem("prefMemory")
    const dataExploitable = JSON.parse(data)

    dataExploitable.images.forEach(e => {
        tbImages.push(e)
    });

}

const grille = document.getElementById("grille")
genererElementsGrille()

function genererElementsGrille(){

    const data=JSON.parse(localStorage.getItem("prefTailleGrille"))
    const lignes = data.lignes
    const colonnes = data.colonnes
    const nbCases = lignes*colonnes

    const grille = document.getElementById("grille")
    grille.style.gridTemplateRows=`repeat(${lignes}, 1fr)`
    grille.style.gridTemplateColumns=`repeat(${colonnes}, 1fr)`


    for (let i = 0; i < nbCases; i++) {

        const balise = `
        <div  id='carte${i}' class='carte'>
            <div class='avant'>
                <img  src='../images/question.svg' alt=''>
            </div>
            <div class='arriere retourner'>
                <img id='img${i}'src='' alt=''>
            </div>
        </div>
        `
        grille.insertAdjacentHTML('beforeend', balise)
        
    }

}

reinitialiserJeu()

function reinitialiserJeu(){

    nbOccurences=0
    compteur=0
    tbTirages=[]
    tbFinal=[]

    nbTentatives.innerText=compteur

    
    definirPositionImages()

    for(let i=0 ; i<grille.children.length; i++){
        grille.children[i].children[0].classList.remove("retourner")
        grille.children[i].children[1].classList.add("retourner")
        grille.children[i].style.pointerEvents="auto"
    }

    setTimeout(()=>{

        for(let i=0 ; i<grille.children.length; i++){
            grille.children[i].children[1].children[0].src=tbFinal[i]
        }
    

    },1000)

}


// ***POSITION DES IMAGES***
// ______________________________________________________

function definirPositionImages(){

    const data=localStorage.getItem("prefTailleGrille")
    const dataExploitable=JSON.parse(data)
    const lignes = dataExploitable.lignes
    const colonnes = dataExploitable.colonnes
    const nbCases = lignes*colonnes

    
    for (let i = 0; i < nbCases; i++) {

        let tirageEstValide = false

        while (tirageEstValide==false){

            let tirage = TirageAleatoire(nbCases/2)

            if (compterOccurences(tirage, tbTirages)<2){
                
                tbTirages.push(tirage)

                tirageEstValide=true
    
            }


        }
        
    }

    for (let i= 0; i < tbTirages.length; i++) {
        
        tbFinal[i]=tbImages[tbTirages[i]] 
    }

}

function TirageAleatoire(plage){

    return(Math.ceil(Math.random()*plage)-1)

}

function compterOccurences(valeur, tableau){

    let nbOccurences=0
    tableau.forEach(e => {
        
        if(e==valeur){
            nbOccurences++
        }
    });

    return nbOccurences

}


// ***GESTION SCORE***

alimenterTbScores()

function alimenterTbScores(){

    const scores = JSON.parse(localStorage.getItem("scores"))
    const memory = JSON.parse(localStorage.getItem("prefMemory")).nom
    const grille = JSON.parse(localStorage.getItem("prefTailleGrille")).id

    const tableau=[]

    if(scores!=null){

        scores.forEach(e => {
            if(e.memory==memory && e.grille==grille){
                tableau.push(e)
            }
        });

    }


    tableau.sort((a,b)=>a.nbTentatives-b.nbTentatives)
        
    for (let i = 0; i < 5; i++) {

        if(tableau[i]!=null){
            tbScore.children[1].children[i].children[0].innerText = tableau[i].memory
            tbScore.children[1].children[i].children[1].innerText = tableau[i].grille
            tbScore.children[1].children[i].children[2].innerText = tableau[i].utilisateur
            tbScore.children[1].children[i].children[3].innerText = tableau[i].date
            tbScore.children[1].children[i].children[4].innerText = tableau[i].nbTentatives
        }else{
            tbScore.children[1].children[i].children[0].innerText = "-"
            tbScore.children[1].children[i].children[1].innerText = "-"
            tbScore.children[1].children[i].children[2].innerText = "-"
            tbScore.children[1].children[i].children[3].innerText = "-"
            tbScore.children[1].children[i].children[4].innerText = "-"
        }

        
    }
  
}

// ***GESTION FRAPPE***
// ______________________________________________________

document.addEventListener("keydown", e=>recupererFrappe(e))

function recupererFrappe(e){

    console.log(e.key)
    if(e.key==" "){
        
        // alert("Nouvelle partie !")

        reinitialiserJeu()

    }
}




// ***GESTION CLIC SUR IMAGES***
// ______________________________________________________


const carte = document.querySelectorAll(".carte")

carte.forEach(elmt=>elmt.addEventListener('click',(e)=>recupererCible(e)))

function recupererCible(e){

    if(e.target.src.includes("question.svg") && tbSelections.length<2){
        // console.log(e.target.parentElement)
        // console.log(e.target.parentElement.nextElementSibling)
        e.target.parentElement.classList.add("retourner")
        e.target.parentElement.nextElementSibling.classList.remove("retourner")
    }
    
    // console.log(e.target.parentElement.parentElement)
    if(!tbSelections.includes(e.target.parentElement.parentElement)){
        tbSelections.push(e.target.parentElement.parentElement)
    }
    
    if(tbSelections.length==2){

        
        setTimeout(()=>{

            compteur++
            nbTentatives.innerText=compteur

            console.log("1°________________________")
            console.log(tbSelections[0].children[1].children[0])

            console.log("2°________________________")
            console.log(tbSelections[1].children[1].children[0])


            if(tbSelections[0].children[1].children[0].src==tbSelections[1].children[1].children[0].src && tbSelections[0].children[1].children[0].id != tbSelections[1].children[1].children[0].id){

                nbOccurences ++


                tbSelections[0].style.pointerEvents="none"
                tbSelections[1].style.pointerEvents="none"
    
                if(nbOccurences==grille.children.length/2){

                    // alert("Victoire !")
                    toggleBoiteDeDialogue()

                    const utilisateur = sessionStorage.getItem("utilisateur")
                    const grille = JSON.parse(localStorage.getItem("prefTailleGrille")).id
                    const memory = JSON.parse(localStorage.getItem("prefMemory")).nom
                    

                    const score = {

                        "utilisateur" : utilisateur,
                        "date" : new Date().toLocaleString(),
                        "nbTentatives" : compteur,
                        "memory" : memory,
                        "grille" : grille

                    }


                    const scores=[]
                    scores.push(score)
                    const data= JSON.parse(localStorage.getItem("scores"))
                    
                    if(data!=null){
                        data.forEach(e => {
                            scores.push(e)
                    });
                    }
           
                    
                    localStorage.setItem("scores",JSON.stringify(scores))

                    alimenterTbScores()


                }
    
    
    
    
            }else{
                tbSelections.forEach(e => {
                    e.children[0].classList.remove("retourner")
                    e.children[1].classList.add("retourner")
                });

            }

            tbSelections=[]
        },1000)

    }
    
}