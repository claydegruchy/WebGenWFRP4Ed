    var faker = require('faker');
    faker.locale = "de";


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

    window.addEventListener("load", e => {

        //makes the containers and inner parts that hold the cchar info
        const makeInner = (target, title = "fck", rerollFunction, inputType = "text", customValues) => {
            //clear the objeccts inner
            target.innerHTML = ""
            //make top level ccontainer
            var container = document.customCreateElement('div', { class: 'char-info-container' })
            document.customCreateElement('h3', { innerText: title.capitalize(), }, container)
            //make text container, initalise with the title
            var text = document.customCreateElement('input', { type: inputType, value: title, }, container)
            //create the listners that will save changes 
            text.addEventListener('change', e => console.log(e));
            text.addEventListener('keyup', e => console.log(e));

            //if we need to reroll this object, use the reroll function, elese dont bother making the button
            if (rerollFunction) {
                var reroll = document.customCreateElement('button', {
                    innerHTML: 'Reroll',
                    class: 'reroll-button',
                    onclick: e => {
                        //use the entered reroll function
                        text.value = rerollFunction();
                        //then dispatch a cchange event to save
                        text.dispatchEvent(new Event('change'))
                    }
                }, container)
            }
            //if special ccustom details are specified, use them to set the value
            if (customValues) text.value = customValues.value
            //attach this to the stat area
            target.appendChild(container)
        }


        var randomName = faker.name.findName(); // Rowan Nikolaus

        var nameChar = document.querySelector(".name")
        var classChar = document.querySelector(".class")
        var statsChar = document.querySelector(".stats")
        var talentsChar = document.querySelector(".talents")
        var notesChar = document.querySelector(".notes")
        var careerChar = document.querySelector(".career")
        var personalityChar = document.querySelector(".personality")
        var quirksChar = document.querySelector(".quirks")
        var statusChar = document.querySelector(".status")
        var controlsChar = document.querySelector(".controls")
        var infoChar = document.querySelector(".info")
        var fields = [
            nameChar,
            classChar,
            statsChar,
            talentsChar,
            notesChar,
            careerChar,
            personalityChar,
            quirksChar,
            statusChar,
            controlsChar,
            infoChar,
        ]

        fields.forEach(f => makeInner(f, f.innerText, () => faker.name.findName()))

        statsChar.style.display = 'none';
        talentsChar.style.display = 'none';

        /////// #########. BEGIN SECTION WHERE NEW DATA IS PARSED FROM PREVIOUS REPOS DATASET
        // the purpose here is to take the previous generation methods and make them a bit easier to read (by me)
        //theyll no longer use a d100 system and will instead use a 'chanec to get' system 

        var CareerHuman = [1, 2, 3, 5, 6, 11, 13, 14, 15, 17, 19, 20, 21, 23, 26, 27, 28, 29, 30, 31, 32, 35,
            36, 37, 38, 39, 40, 42, 43, 44, 45, 50, 51, 52, 54, 56, 57, 58, 59, 60, 62, 63, 66, 68, 70, 71, 73, 74,
            76, 77, 78, 79, 83, 86, 87, 88, 90, 92, 93, 94, 95, 99, -1, 100
        ];
        var CareerDwarf = [1, 4, 6, -1, 7, -1, 9, -1, 11, 17, 18, 20, 25, -1, 31, 34, 36, 37, 38, 40, 41, 42,
            43, 45, 47, -1, -1, 49, 54, -1, 55, 56, 60, 61, 63, -1, 65, 67, -1, -1, 69, 70, 72, -1, 73, 75, 77, 78,
            -1, -1, 79, -1, 82, 83, 84, -1, -1, 87, -1, 90, 93, 96, 100, -1
        ];
        var CareerHalfling = [1, 2, 4, -1, 6, -1, 8, -1, 10, 15, 19, 21, 25, 28, 31, 33, 34, 36, -1, 37, -1,
            43, 44, 46, 47, -1, 50, 52, 53, -1, 54, 57, 58, 60, 63, -1, 65, 67, 68, -1, 69, 70, 73, 74, 75, 79, 84, -1,
            85, 86, 87, 88, 89, 93, 94, -1, -1, 96, -1, 97, -1, 100, -1, -1
        ];
        var CareerHElf = [2, -1, 6, -1, 8, -1, 12, 16, -1, 19, -1, 21, 26, -1, 28, 29, 31, 32, 34, 37, 40, -1,
            43, 45, -1, -1, 47, 50, -1, -1, 56, -1, 59, -1, 62, -1, 63, -1, -1, -1, 64, -1, -1, -1, 79, 80, -1, -1,
            82, 85, -1, -1, 88, -1, -1, -1, 92, 94, 95, 97, 98, 100, -1, -1
        ];
        var CareerWElf = [-1, -1, -1, -1, -1, -1, 1, 5, -1, 10, -1, -1, -1, -1, -1, -1, 14, 18, -1, 25, 31,
            -1, 35, -1, -1, -1, 42, 53, -1, 57, 68, -1, 70, -1, 78, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            79, -1, -1, -1, -1, 85, -1, -1, -1, 90, 92, 94, 96, -1, 100, -1, -1
        ];
        var CareerGnome = [
            1, -1, 2, -1, 4, 5, 7, 14,
            15, 17, 18, 19, 21, 22, 28, 29,
            30, 31, -1, 32, 33, 35, 40, 42,
            43, -1, 44, 46, 54, -1, 58, 62,
            63, -1, 68, -1, 69, 75, -1, -1,
            76, -1, 80, -1, -1, 83, -1, -1,
            85, 90, 91, -1, 92, 94, 98, -1,
            -1, 99, -1, -1, -1, 100, -1, -1
        ];

        var classes = {
            Academics: ["Apothecary", "Engineer", "Lawyer", "Nun", "Physician", "Priest", "Scholar", "Wizard", ],
            Burghers: ["Agitator", "Artisan", "Beggar", "Investigator", "Merchant", "Rat Catcher", "Townsman", "Watchman", ],
            Courtiers: ["Advisor", "Artist", "Duellist", "Envoy", "Noble", "Servant", "Spy", "Warden", ],
            Peasants: ["Bailiff", "Hedge Witch", "Herbalist", "Hunter", "Miner", "Mystic", "Scout", "Villager", ],
            Rangers: ["Bounty Hunter", "Coachman", "Entertainer", "Flagellant", "Messenger", "Pedlar", "Roadwarden", "Witch Hunter", ],
            Riverfolk: ["Boatman", "Huffer", "Riverwoman", "Riverwarden", "Seaman", "Smuggler", "Stevedore", "Wrecker", ],
            Rogues: ["Bawd", "Charlatan", "Fence", "Grave Robber", "Outlaw", "Thief", "Racketeer", "Witch", ],
            Warriors: ["Cavalryman", "Guard", "Knight", "Pit Fighter", "Protagonist", "Soldier", "Troll Slayer", "Warrior Priest", ],
        }
        const findClass = career => {
            var x = Object.keys(classes).find(rclass => classes[rclass].includes(career))
            if (!x) throw ["cant find", career];
            return x
        }



        var CareerAll = ["Apothecary", "Engineer", "Lawyer", "Nun",
            "Physician", "Priest", "Scholar", "Wizard",
            "Agitator", "Artisan", "Beggar", "Investigator",
            "Merchant", "Rat Catcher", "Townsman", "Watchman",
            "Advisor", "Artist", "Duellist", "Envoy",
            "Noble", "Servant", "Spy", "Warden",
            "Bailiff", "Hedge Witch", "Herbalist", "Hunter",
            "Miner", "Mystic", "Scout", "Villager",
            "Bounty Hunter", "Coachman", "Entertainer", "Flagellant",
            "Messenger", "Pedlar", "Roadwarden", "Witch Hunter",
            "Boatman", "Huffer", "Riverwoman", "Riverwarden",
            "Seaman", "Smuggler", "Stevedore", "Wrecker",
            "Bawd", "Charlatan", "Fence", "Grave Robber",
            "Outlaw", "Racketeer", "Thief", "Witch",
            "Cavalryman", "Guard", "Knight", "Pit Fighter",
            "Protagonist", "Soldier", "Troll Slayer", "Warrior Priest"
        ];


        var races = {
            "Human": {},
            "Dwarf": {},
            "Halfling": {},
            "High Elf": {},
            "Wood Elf": {},
            "Gnome": {},
        }

        var careerMapping = {
            "Human": CareerHuman,
            "Dwarf": CareerDwarf,
            "Halfling": CareerHalfling,
            "High Elf": CareerHElf,
            "Wood Elf": CareerWElf,
            "Gnome": CareerGnome,
        }

        var data = { careers: {}, races: JSON.parse(JSON.stringify(races)) }
        CareerAll.forEach(c => data.careers[c] = { races: JSON.parse(JSON.stringify(races)) })
        Object.keys(data.careers).forEach(c => Object.keys(data.careers[c].races).forEach(r => data.careers[c].races[r].chances = 0))
        // var x = CareerHuman
        //     .filter(val => val > 0)
        //     .filter(val => data.careers[val])
        //     .forEach(val => data.careers[val])

        // CareerHuman
        // CareerAll
        // var roll = Math.round(Math.random() * 100)
        console.log("rolling")

        function findOdds(careerChoices) {
            console.log("finding choies")
            return [...Array(100).keys()].map(roll => {
                var i = 0

                while (careerChoices[i] < roll) {
                    i += 1;
                }
                return CareerAll[i]
            })

        }
        Object.keys(careerMapping).forEach(race => {
            console.log("race", race)
            var careerChances = findOdds(careerMapping[race])
            careerChances.forEach(career => {
                // console.log(race, career, data.careers[career].races[race].chances)
                data.careers[career].races[race].chances
                data.careers[career].races[race].chances += 1
            })

        })


        // data.careers[career].class = findClass(career)

        data.classes = {
            Academics: {},
            Burghers: {},
            Courtiers: {},
            Peasants: {},
            Rangers: {},
            Riverfolk: {},
            Rogues: {},
            Warriors: {},
        }
        Object.keys(data.careers).forEach(career => data.classes[findClass(career)][career] = data.careers[career])

        console.log(data)


        // console.log(findOdds(CareerHuman))

        // CareerN = i;
        // console.log()

        console.log(Math.round(Math.random() * 100))


        // var careers = CareerHuman.map(val => CareerAll[val])
        console.log(CareerAll.length)


        ///////// ########## END GENERATION SECTION
    })