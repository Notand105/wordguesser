export function BlankArr( arr : string[] ): string[]{
    let newArr : string[] = [] 
    for (let i = 0; i<arr.length; i++){
        newArr.push("__")
    }

    return newArr
}
export function isInArray (arr: string[], letter : string) : boolean{
    
    for (let i = 0; i<arr.length; i++){
        if (arr[i] == letter){
            return true
        }
    }
    return false
}
 export function fillArray(original : string[],  arr : string[], letter: string) : string[]{

    for (let i = 0; i<original.length; i++){
        if(original[i] == letter){
            arr[i]= letter
        }
    }
    return arr

 }

 export async function fetchWord():Promise<string>{
    const res = await fetch('https://random-word-api.herokuapp.com/word')
    const word = await res.json()
    console.log(word)
    return word[0]
 }

 export function compareArrays(arr1 : string[],arr2 : string[]):boolean{
    if (arr1.length != arr2.length) return false
    for(let i = 0; i<arr1.length; i++){
        if(arr1[i]!=arr2[i]) return false
    }
    return true

 }