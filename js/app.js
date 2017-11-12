'use strict';

var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;
var gLastRes = null;

$(document).ready(init);

function init() {
    var tree = getStorageTree();
    
    if(!tree){
    gQuestsTree = createQuest('Male?');

    gQuestsTree.yes = createQuest('Gandhi');
    gQuestsTree.no = createQuest('Rita');
    } else {
        gQuestsTree = tree;
    }
    

    gCurrQuest = gQuestsTree;
}






function startGuessing() {
    // TODO: hide the gameStart section
    $('.gameStart').hide();

    renderQuest();
}

function renderQuest() {
    // TODO: select the <h2> inside gameQuest and update its text by the currQuest text
    $('.gameQuest').show();
    $('.gameQuest > h2').text(gCurrQuest.txt);
    $('.gameStart').hide();
}

function userResponse(res) {

    // If this node has no children
    if (gCurrQuest.yes === null) {
        if (res === 'yes') {
            alert('Yes, I knew it!');
            // TODO: improve UX
        } else {
            alert('I dont know...teach me!')
            // TODO: hide and show gameNewQuest section
            $('.gameNewQuest').show();
            $('.gameQuest').hide();
        }
    } else {
        // TODO: update the prev, curr and res global vars
        if (res === 'yes') {
            gPrevQuest = gCurrQuest;
            gCurrQuest = gCurrQuest.yes;
            // gLastRes = createQuest(gCurrQuest.txt);
        } else {
            gPrevQuest = gCurrQuest;
            gCurrQuest = gCurrQuest.no;
            // gLastRes = createQuest(gCurrQuest.txt);
        }
        gLastRes = res;

        renderQuest();
    }
}

function addGuess() {
    // TODO: create 2 new Quests based on the inputs' values
    var $newQuest = createQuest($('#newQuest').val());
    var $newGuess = createQuest($('#newGuess').val());
    // TODO: connect the 2 Quests to the quetsions tree
    $newQuest.yes = $newGuess;
    $newQuest.no = createQuest(gCurrQuest.txt);
    gPrevQuest[gLastRes] = $newQuest;

    updateStorageTree()
    restartGame();
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function restartGame() {
    $('.gameNewQuest').hide();
    $('.gameStart').show();
    gCurrQuest = getStorageTree();
    gPrevQuest = null;
    gLastRes = null;
}

function updateStorageTree() {
    window.localStorage.setItem('QuestsTree', JSON.stringify(gQuestsTree));
}

function getStorageTree() {
    return JSON.parse(window.localStorage.getItem('QuestsTree'));
}