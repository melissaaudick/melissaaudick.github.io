

var animal = { }; 
animal.species = "dog";
animal["name"] = "Nacho";
animal["noises"] = [];



console.log(animal);

var noises = []; 
noises[0] = "chomp";
noises.push("grr");
noises.unshift("cocorico");
noises[noises.length] = "ouah";
noises.push("eeeeeeeeee");

animal["noises"] = noises;

console.log(noises.length);
console.log(noises[noises.length-1]);
console.log(noises);
console.log(animal);

var animals = [];
animals.push(animal);

console.log(animals);

var duck = {
    species: 'duck', 
    name: 'Jerome', 
    noises: ['quack', 'honk', 'sneeze', 'woosh']
};

animals.push(duck);

console.log(animals.length);

var nutria = {
    species: 'nutria', 
    name: 'Boudreaux', 
    noises: ['splurt', 'quan', 'uhhhh', 'aiee']
};

var pelican = {
    species: 'pelican', 
    name: 'Gladys', 
    noises: ['woo woo', 'mrup', 'squick', 'plop']
};


animals.push(nutria);
animals.push(pelican);

//console.log(animals);
//console.log(animals.length);

var friends = [];
//this is my new empty array for my animal friends list. i chose it so that we could push the result of our random mathy thing into it

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  friends.push(animals[( Math.floor(Math.random() * (max - min + 1)) + min)].name);
  
  //animals[( Math.floor(Math.random() * (max - min + 1)) + min)].friends = friends;
  //i was trying to be all cool here and add the friend to a random animal
}
getRandom(-1,animals.length);
//should this start at 0?

animals[0].friends = friends;


function search(searchName) {
                for (var i = 0; i < animals.length; i++) {
                if (animals[i].name.toLowerCase() === searchName.toLowerCase()) {
                    return animals[i];
                    }
                }
}

function edit(editName, objectNew) {
                for (var i = 0; i < animals.length; i++) {
                if (animals[i].name === editName) {

                    var index = animals.indexOf(editName);
                    return animals.splice(index, 1, objectNew);
                   
                    
                    }
                }
}
function remove(removeName) {
    for (var i = 0; i < animals.length; i++) {
        if (animals[i].name === removeName) {
        var index = animals.indexOf(removeName);
        return animals.splice(index, 1)[0];
        }
    }

}

function create(animalNew) {
    if ((animalNew.name.length > 0) && (animalNew.species.length > 0)) {
        for (var i = 0; i < animals.length; i++) {
            if (animals[i].name === animalNew.name) {
                return;
            }
        }
        return animals.push(animalNew);
    }

};