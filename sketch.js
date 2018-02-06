//Create base population
var population = [];
var population_size = 100;
var target = "Cruella DeVille, Cruella DeVille, if she doesnt scare you no evil thing will"

var mating_pool;

function setup(){

	createCanvas(windowWidth, windowHeight);

	//Fill population array
	for(var i = 0; i < population_size; i++){
		population[i] = new Chromosome(target.length);
	}


}

function draw(){

	background(255, 255, 255);

	//Calculate fitness of every element in the population
	for(var i = 0; i < population_size; i++){
		population[i].evaluateFitness(target);
	}

	//Find max fitness for accurate mapping ( prob = relative fitness )
	var maxFitness = 0;

	for(var i = 0; i < population_size; i++){
		if(population[i].fitness > maxFitness) maxFitness = population[i].fitness;
	}

	//Natural selection
	mating_pool = [];	//Empty mating pool

	for(var i = 0; i < population_size; i++){

		//Random number
		var q = Math.random(1);
		if(map(population[i].fitness, 0, maxFitness, 0, 1) >= q){
			mating_pool.push(population[i]);
			
		}
		console.log(population[i].fitness)

		// console.log(map(population[i].fitness, 0, maxFitness, 0, 1))
	}

	//console.log(mating_pool)
	

}