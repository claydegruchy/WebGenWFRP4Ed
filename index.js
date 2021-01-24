var faker = require('faker');
const marked = require('marked');
var TurndownService = require('turndown')

var turndownService = new TurndownService()


faker.locale = "de";


const toMd = html => turndownService.turndown(html)
const toHtml = md => marked(md)

document.__proto__.customCreateElement = (tag = 'div', attributes = {}, parent) => {
    // // console.log("customCreateElement", tag, attributes)
    var myNewElement = document.createElement(tag);
    for (var a in attributes) {
        if (myNewElement[a] == '' || typeof attributes[a] == 'function') {
            myNewElement[a] = attributes[a]
        } else {
            myNewElement.setAttribute(a, attributes[a]);

        }
    }
    if (parent) parent.appendChild(myNewElement)
    return myNewElement;
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}



const chooseRandom = array => {
    return array[Math.floor(Math.random() * array.length)]

}



window.addEventListener("load", e => {

    var data = require('./data.json');

    const formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });

    data.settings = {
        quirks: 1,
        traits: 2,
        race: Object.keys(data.races)[0],
        ignoreWeights: false,
    }


    var nameChar = document.querySelector(".name")
    var classChar = document.querySelector(".class")
    var careerChar = document.querySelector(".career")
    var personalityChar = document.querySelector(".personality")
    var quirksChar = document.querySelector(".quirks")
    var statusChar = document.querySelector(".status")
    var controlsChar = document.querySelector(".controls")
    var infoChar = document.querySelector(".info")
    var notesChar = document.querySelector(".notes")
    // var statsChar = document.querySelector(".stats")
    // var talentsChar = document.querySelector(".talents")


var memory 
    const save = () => {
        // if (!this.memory) this.memory = document.customCreateElement('div')
        // // const findElement = (title) => this.memory.querySelector('')
        // console.log("saved", title, savedata)
        // console.log(this.memory)

        // why convert everything, when i can just read the page as it is and save that

        infoChar.innerHTML = ""
        memory = null
        memory = document.querySelector(".main-container").cloneNode(true);
        [...memory.querySelectorAll("input, textarea")]
        // .map(e => [e.parentElement])
        .map(e => {
            document.customCreateElement('p', { innerText: e.value }, e.parentElement);
            // [...e.parentElement.querySelectorAll('input, button, .hidden, .control-container, .control')].forEach(r => r.remove())
        });
        //filter out any shit we dont want in the file
        [...memory.querySelectorAll('input, button, .hidden, .control-container')]
        .forEach(r => r.remove());
        console.log(memory)
        var pre = document.customCreateElement('pre', {}, infoChar)
        var code = document.customCreateElement('code', { class: 'markdown' }, pre)

        code.innerHTML = toMd(memory)
        hljs.highlightBlock(code)


    }


    //makes the containers and inner parts that hold the cchar info
    const makeInner = (target, title = "fck", rerollFunction, inputType = "text", customValues = ['div', 'h4', 'input']) => {
        //clear the objeccts inner
        target.innerHTML = ""
        //make top level ccontainer
        var container = document.customCreateElement(customValues[0], { class: 'char-info-container' })
        var containerTitle = document.customCreateElement(customValues[1], { innerText: title.capitalize(), }, container)
        //make text container, initalise with the title
        if (inputType == "textarea") {
            var text = document.customCreateElement("textarea", { type: inputType, value: title }, container)
            text.addEventListener('change', e => {
                text.style.height = ""
                text.style.height = text.scrollHeight + "px"
            });

        } else {
            var text = document.customCreateElement('input', { type: inputType, value: title, }, container)
        }
        //create the listners that will save changes 
        text.addEventListener('change', e => save(title, text.value));
        text.addEventListener('keyup', e => save(title, text.value));


        //if we need to reroll this object, use the reroll function, elese dont bother making the button
        if (rerollFunction) {

            container.reroll = e => {
                // console.log("activated")
                //use the entered reroll function
                text.value = rerollFunction(e);
                //then dispatch a cchange event to save
                text.dispatchEvent(new Event('change'))
            }

            var reroll = document.customCreateElement('button', {
                innerHTML: 'Reroll',
                class: 'reroll-button',
                onclick: container.reroll
            }, container)
        }

        //attach this to the stat area
        target.appendChild(container)
        return container
    }


    var randomName = faker.name.findName(); // Rowan Nikolaus




    //#### NAME
    var nameChar = makeInner(nameChar, "Name", () => faker.name.firstName() + " " + faker.name.lastName(), 'text', ['div', 'h3'])
    //make somewhere to store the class, as the career depends on it
    var currentClass = ""
    var currentCareer = ""




    var statusChar = makeInner(statusChar, "Status", (e) => {
        return chooseRandom(data.classes[currentClass][currentCareer].status)
    })

    //#### CAREER
    //make the career holder
    var careerChar = makeInner(careerChar, "Career", (e) => {
        var choices = []
        //get a list of the ccaeers
        //get the chancces for each carreer for the selected race
        //add them all to an array, adding more likely options more times
        //then choose from the temp array (choices)
        var careers = Object.entries(data.classes[currentClass]).map(i => [...Array((i[1].races[data.settings.race].chances))].map(c => choices.push(i[0])))
        if (data.settings.ignoreWeights) choices = Object.keys(data.classes[currentClass]);
        console.log(data.settings.race, careers, choices, "data.settings.ignoreWeights:", data.settings.ignoreWeights)
        currentCareer = chooseRandom(choices)
        statusChar.reroll()
        //pick a random thing
        return currentCareer
    })

    //#### CLASS
    //make the class holder
    var classChar = makeInner(classChar, "Class", (e) => {
        //if the class changes, reroll the career
        currentClass = chooseRandom(Object.keys(data.classes))
        careerChar.reroll()
        return currentClass
    })
    //initalise the class, as the career depends on it

    //#### QUIRKS
    //this sucks and might be removed
    var quirksChar = makeInner(quirksChar, "Quirks", (e) => {
        var quirks = [...Array(data.settings.quirks).keys()].map(() => chooseRandom(data.personality.quirks))
        return formatter.format(quirks).capitalize()
    }, "textarea")

    //#### personality traits
    var personalityChar = makeInner(personalityChar, "Personality", (e) => {
        var traits = [...Array(data.settings.traits).keys()].map(() => chooseRandom(data.personality.traits))
        return formatter.format(traits).capitalize()
    }, "textarea")



    var generateNotes = () => {
        notesChar.innerHTML = ""
        var container = document.customCreateElement('div', { class: 'char-info-container' }, notesChar)
        document.customCreateElement('h4', { innerText: "notes".capitalize(), }, container)
        var text = document.customCreateElement("textarea", { value: "", placeholder: "Notes..." }, container)
        text.style.width = '100%'
        text.style["max-width"] = '100%'

        text.addEventListener('change', e => {
            text.style.height = ""
            text.style.height = text.scrollHeight + "px"
        })

        text.addEventListener('change', e => save());
        text.addEventListener('keyup', e => save());
    }


    var makeContainerWithTitle = (title, parent) => {
        var container = document.customCreateElement('div', { class: 'control-container' }, parent)
        document.customCreateElement('h5', { innerText: title.capitalize(), }, container)
        return container
    }

    var makeSelect = (title, optionArray, changeFunction, parent) => {
        var container = makeContainerWithTitle(title, parent)
        var select = document.customCreateElement('select', {}, container)
        optionArray.forEach(opt => addOption(select, opt))
        select.addEventListener('change', e => changeFunction(e));
        select.addEventListener('keyup', e => changeFunction(e));
        return container
    }
    var addOption = (ele, text) => {
        var opt = document.createElement("option");
        opt.value = text;
        opt.text = text;

        ele.add(opt, null);
    }


    var generateControls = () => {
        controlsChar.innerHTML = ""
        var container = document.customCreateElement('div', { class: 'control-container' }, controlsChar)
        document.customCreateElement('h4', { innerText: "controls".capitalize(), }, container)



        var r = makeContainerWithTitle("Reroll All", container)
        document.customCreateElement('button', {
            innerHTML: 'Reroll All',
            class: '',
            onclick: rerollAll
        }, r)

        makeSelect('Race', Object.keys(data.races), (e) => {
            data.settings.race = e.target.value
            console.log(data.settings.race)
        }, container)
        makeSelect('Ignore career weights', ['false', 'true'], (e) => {
            data.settings.ignoreWeights = JSON.parse(e.target.value.toLowerCase())
            console.log("data.settings.ignoreWeights", data.settings.ignoreWeights)
        }, container)



        // document.customCreateElement('button', {
        //     innerHTML: 'Download character',
        //     class: '',
        //     onclick: () => downloadMarkdown(toMd(memory ), name)
        // }, container)

        document.customCreateElement('button', {
            innerHTML: 'Copy Char',
            class: '',
            onclick: () => updateClipboard(toMd(memory))
        }, container)

    }



    function downloadMarkdown(md, exportName) {
        var dataStr = "data:text/markdown;charset=utf-8," + md;
        var downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", exportName + ".md");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }


    function updateClipboard(newClip) {
        navigator.clipboard.writeText(newClip).then(function() {
            /* clipboard successfully set */
        }, function() {
            /* clipboard write failed */
        });
    }


    generateNotes()
    generateControls()

    function rerollAll() {
        classChar.reroll()
        nameChar.reroll()
        quirksChar.reroll()
        personalityChar.reroll()
    }

    rerollAll()






})