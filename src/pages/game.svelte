<script lang="ts">
    import {
        BlankArr,
        fillArray,
        isInArray,
        fetchWord,
        compareArrays,
    } from "../utils/converter.ts";

    const alfabeto = Array.from({ length: 26 }, (_, i) =>
        String.fromCharCode("a".charCodeAt(0) + i),
    );

    let word = "hanged";
    let original = word.split("");
    let blank = BlankArr(original);
    let tries: number = 10;
    let w = false;
    let won = false;
    let usedLetters: string[] = [];
    let casualMode = false;

    function onKeyDown(e: any) {
        if (e.code === `Key${e.key.toUpperCase()}`) {
            console.log(`You pressed ${e.key}`);
        }
        if (!isInArray(alfabeto, e.key)) return;
        if (isInArray(usedLetters, e.key)) return;
        usedLetters = [...usedLetters, e.key];
        usedLetters = usedLetters.sort();
        if (isInArray(original, e.key)) {
            blank = fillArray(original, blank, e.key);
            if (compareArrays(original, blank)) {
                w = true;
                win();
            }
        } else {
            if (tries > 0 && !casualMode) {
                tries--;
            }
        }
    }
    function reset() {
        win();
    }
    async function win() {
        won = true;
        tries = 10;
        usedLetters = [];
        word = await fetchWord();
        original = word.split("");
        blank = BlankArr(original);
        setInterval(() => {
            won = false;
            w = false;
        }, 2000);
    }
    function toggleCasualMode(){
        casualMode = !casualMode
    }
</script>

<div class="container">
    {#if !won}
        <div class="cont">
            <h2>Intentos restantes: {tries}</h2>
            <button on:click={reset}>Reset</button>
            {#if casualMode}
                <button on:click={toggleCasualMode}>modo normal</button>
            {:else}
                <button on:click={toggleCasualMode}>modo casual</button>
            {/if}
        </div>
        {#if tries >= 1}
            <div class="cont">
                {#each blank as letter}
                    <h3>{letter}</h3>
                {/each}
            </div>
            <h4>Letras Usadas:</h4>
            <div>
                {#each usedLetters as lett}
                    <span class="l">{lett}</span>
                {/each}
            </div>
        {:else}
            <h3>No hay mas intentos</h3>
        {/if}
    {:else}
        {#if w}
            <h2>Felicidades, has ganado la palabra!</h2>
        {/if}
        <h3>Generando nueva palabra</h3>
    {/if}
</div>

<svelte:window on:keydown|preventDefault={onKeyDown} />

<style>
    .container {
        max-width: 50%;
        margin: auto;
    }
    .cont {
        display: flex;
        justify-content: space-between;
        gap: 1;
    }
    h3 {
        font-size: 1.1rem;
    }
    .l {
        border: 1px solid black;
        margin: 0 0.3rem;
        padding: 0.5rem;
    }
</style>
