const rls = require("readline-sync");

// let headRow:string[] = ['   ','|_A_|','|_B_|','|_C_|']
// let topRow:string[] = ['1: ','|___|','|___|','|___|']
// let midRow:string[] = ['2: ','|___|','|___|','|___|']
// let bottomRow:string[] = ['3: ','|___|','|___|','|___|']

let headRow:string[] = ['   ','|_A_|','|_B_|','|_C_|']
let topRow:string[] = ['1: ','|___|','|___|','|___|']
let midRow:string[] = ['2: ','|___|','|___|','|___|']
let bottomRow:string[] = ['3: ','|___|','|___|','|___|']

let m = [headRow,topRow,midRow,bottomRow]

let board:string[][] = [headRow,topRow,midRow,bottomRow]
let emptyBox:string = '|___|'
let player:string = 'PLAYER 1'
let ficha:string

//msingle o multi
let singleMultiOption:string[] = ['Multijugador','Un jugador']

let checkWin = (a:string[]) => (a[0] == a[1] && a[1] == a[2] && a[2] != emptyBox) ? true : false
let options:string[] = ['a1','b1','c1','a2','b2','c2','a3','b3','c3']

//Condiciones para ganar:


let playerWin = (m:string[][]) => {
    const checkArrays:string[][] = [[m[1][1],m[1][2],m[1][3]],[m[2][1],m[2][2],m[2][3]],[m[3][1],m[3][2],m[3][3]],[m[1][1],m[2][1],m[3][1]],[m[1][2],m[2][2],m[3][2]],[m[1][3],m[2][3],m[3][3]],[m[1][1],m[2][2],m[3][3]],[m[3][1],m[2][2],m[1][3]]];
    let win = false;
    for (let i = 0; i<checkArrays.length && win == false; i++){
       if (checkWin(checkArrays[i])){
        win = true
       }
    }
    return win
}

//modo un jugador
//primero mirar si puede ganar
let iaCanWin = (a:string[]) => (a.filter((valor)=>valor === '|_X_|').length == 2 && a.filter((valor)=>valor === '|___|').length == 1) ? a.indexOf('|___|') : -1


let playerCanWin = (a:string[]) => (a.filter((valor)=>valor === '|_O_|').length == 2 && a.filter((valor)=>valor === '|___|').length == 1) ? a.indexOf('|___|') : -1

let getIndex = (myArr:number[]) => {
    let letterIndex:number=0
    let rowIndex:number =0
    let arrToInt:number = 10*myArr[0]+myArr[1]
        switch (arrToInt){
            case 0:
            case 30:
            case 60:
                letterIndex = 1;
                rowIndex = 1;
                break;
            case 10:
            case 31:
                letterIndex = 1;
                rowIndex = 2;
                break;
            case 20:
            case 32:
            case 70:
                letterIndex = 1;
                rowIndex = 3;
                break;
            case 1:
            case 40:
                letterIndex = 2;
                rowIndex = 1;
                break;
            case 11:
            case 41:
            case 61:
            case 71:
                letterIndex = 2;
                rowIndex = 2;
                break;
            case 21:
            case 42:
                letterIndex = 2;
                rowIndex = 3;
                break;
            case 2:
            case 50:
            case 72:
                letterIndex = 3;
                rowIndex = 1;
                break;
            case 12:
            case 51:
                letterIndex = 3;
                rowIndex = 2;
                break;
            case 22:
            case 52:
            case 62:
                letterIndex = 3;
                rowIndex = 3;
                break;
            default:
                break;        
            }
        let result:number[] = [letterIndex,rowIndex];
        return result
}
/// primer check: devuelve un array result de 3 numeros. 
// result[0] = 0:false, 1:true (indica si el pc puede ganar en esa jugada)
// result[1] = fila del tablero 
// result[2] = columna del tablero (1:A, 2:B, 3:C)
// si result[1] y [2] son -1: el PC no puede ganar ni tampoco hay una jugada de evitar que gane el player1
let iaCheck1 = (m:string[][]) => {
    const checkArrays:string[][] = [[m[1][1],m[1][2],m[1][3]],[m[2][1],m[2][2],m[2][3]],[m[3][1],m[3][2],m[3][3]],[m[1][1],m[2][1],m[3][1]],[m[1][2],m[2][2],m[3][2]],[m[1][3],m[2][3],m[3][3]],[m[1][1],m[2][2],m[3][3]],[m[3][1],m[2][2],m[1][3]]];
    
    let win = false
    let pcMove:number[] = [-1, -1]
    let result:number[]

    for (let i = 0; i<checkArrays.length; i++){
        let j:number = iaCanWin(checkArrays[i])
        if (j>=0){
            let combi:number[] = [i,j]
            pcMove = getIndex(combi)
            i = checkArrays.length
            win = true
        }
     }

     if (!win){
        for (let i = 0; i<checkArrays.length; i++){
            let j:number = playerCanWin(checkArrays[i])
            if (j>=0){
                let combi:number[] = [i,j]
                pcMove = getIndex(combi)
                i = checkArrays.length
            }
         }
        
     }

     result = [+!!win, pcMove[0], pcMove[1]]

     return result
}


let currentBox:string;
let gameEnd:boolean = false

console.log('Bienvenido al TRES EN RAYA')
console.log('Usa tu teclado para indicar dónde quieres colocar tu próxima ficha.\nLas posiciones se especifican utilizando una letra para la columna (A, B o C) y un número para la fila (1, 2 o 3).\nPor ejemplo, "A1" representa el primer recuadro del tablero.\n\n')

console.log('Escoge un modo de juego:')
let singleMultiIndex:number = rls.keyInSelect(singleMultiOption,'NOTA: si eliges CANCEL se asignara por defecto el modo multijugador')
let modoJuego:string = singleMultiIndex != 1? 'Multijugador':'Solitario'

console.log(`Has seleccionado el modo de juego: ${modoJuego}`)

let frase:string 
while (!gameEnd){
    frase = 'Elige una casilla'
    console.log(headRow)
    console.log(topRow)
    console.log(midRow)
    console.log(bottomRow)
    do{
        currentBox = rls.question(`${player}: ${frase}\n`).toLowerCase();
        frase = 'Por favor, introduce una casilla que exista y no este ocupada' 
        
    }while (options.indexOf(currentBox)<0)

    options.splice(options.indexOf(currentBox),1);

    ficha = player == 'PLAYER 1' ? '|_O_|' : '|_X_|'
    
    let coordenadas = (box:string, tipoFicha:string) =>{
        switch (box){
            case 'a1':
                m[1][1] = tipoFicha;
                break;
            
            case 'b1':
                m[1][2] = tipoFicha;
                break;
            
            case 'c1':
                m[1][3] = tipoFicha;
                break;
            case 'a2':
                m[2][1] = tipoFicha;
                break;
            
            case 'b2':
                m[2][2] = tipoFicha;
                break;
            
            case 'c2':
                m[2][3] = tipoFicha;
                break;
            case 'a3':
                m[3][1] = tipoFicha;
                break;
            
            case 'b3':
                m[3][2] = tipoFicha;
                break;
            
            case 'c3':
                m[3][3] = tipoFicha;
                break;
            }
    }
    
    coordenadas(currentBox, ficha)

    //ha ganado?
    if (playerWin(m)){
        console.log(`¡Enhorabuena! ${player} ha ganado la partida.`)
        gameEnd = true
    }else if (options.length == 0){
        console.log("No quedan más jugadas. Es un empate.")
        gameEnd = true;        
    }else{
        if (modoJuego =='Multijugador'){
                player = player == 'PLAYER 1' ? 'PLAYER 2': 'PLAYER 1'
        }else {
            let arrOpt1:number[][] = [[1,1],[1,3],[3,1],[3,3]]
            let arrOpt2:number[][] = [[1,2],[2,1],[2,3],[3,2]]

            let filterOpt = (options:number[][]) => options.filter((valor) => m[valor[0]][valor[1]] == '|___|');
            let randomOpt = (options:number[][]) => options[Math.floor(Math.random()*options.length)]

            let fichaPC:string = '|_X_|'
            let boxPC:string
            let abc:string = '_abc'
            let pcWin:boolean = false
            let pcMove:number[] = [-1,-1]

            console.log(m[0])
            console.log(m[1])
            console.log(m[2])
            console.log(m[3])

            let winAndWinMove = (iaCheck1(m))
            // si el primer elemento es igual a 1 es porque el win? de iaCheck1 ha dado true >> el PC puede ganar
            pcWin = winAndWinMove[0] == 1
            if (winAndWinMove.indexOf(-1)<0){
                boxPC = abc[winAndWinMove[2]]+winAndWinMove[1]
                pcMove = [winAndWinMove[2],winAndWinMove[1]]
            }else{
                //no puede ganar ni evitar jugada ganadora
                switch (true){
                    case (m[2][2] == '|___|'):
                        pcMove = [2,2]
                        break;
                    case (m[1][2] == '|_O_|' && m[2][1] == '|_0_|' && m[1][1] == '|___|'):
                        pcMove = [1,1]  ;
                        break;
                    case (m[2][1] == '|_O_|' && m[3][2] == '|_0_|' && m[3][1] == '|___|'):
                        pcMove = [3,1]  ;
                        break;
                    case (m[1][2] == '|_O_|' && m[2][3] == '|_0_|' && m[1][3] == '|___|'):
                        pcMove = [1,3]  ;
                        break;
                    case (m[2][3] == '|_O_|' && m[3][2] == '|_0_|' && m[3][3] == '|___|'):
                        pcMove = [3,3]  ;
                        break;
                    case (m[1][2] == '|_X_|' && m[2][1] == '|_X_|' && m[1][1] == '|___|'):
                        pcMove = [1,1]  ;
                        break;
                    case (m[2][1] == '|_X_|' && m[3][2] == '|_X_|' && m[3][1] == '|___|'):
                        pcMove = [3,1]  ;
                        break;
                    case (m[1][2] == '|_X_|' && m[2][3] == '|_X_|' && m[1][3] == '|___|'):
                        pcMove = [1,3]  ;
                        break;
                    case (m[2][3] == '|_X_|' && m[3][2] == '|_X_|' && m[3][3] == '|___|'):
                        pcMove = [3,3]  ;
                        break;
                    case (m[1][1] == '|___|' || m[1][3] == '|___|' || m[3][1] == '|___|' || m[3][3] == '|___|'):
                        pcMove = randomOpt(filterOpt(arrOpt1));
                        break;
                    default:
                        pcMove = randomOpt(filterOpt(arrOpt2));
                        break;
                }
            } 
            
            // console.log(pcMove)
            boxPC = abc[pcMove[1]]+pcMove[0]
            coordenadas(boxPC, fichaPC)

            options.splice(options.indexOf(boxPC),1)

            console.log(`El PC pone su ficha en ${boxPC}`)

            if (pcWin){
                gameEnd = true;
                console.log(m[0])
                console.log(m[1])
                console.log(m[2])
                console.log(m[3])
                console.log('Vaya! Parece que has perdido contra el ordenador :`(')
            } 
                        
        }
    } 
}
     


