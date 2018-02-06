//Create base population
var population = [];
var population_size = 800;
var target = "Cruella DeVille if she doesnt scare you no evil thing will"
var generation = [];
var generation_nb = 0;

var nongraded_retain_percent = 0.1;
var graded_retain_percent = 0.2;

var mutationRate = 0.001;

var mating_pool;

var date_object;
var start_time, end_time, current_time;

function setup(){

	createCanvas(windowWidth, windowHeight);

	//Start timer
	date_object = new Date();
	start_time = date_object.getTime();

	//Fill population array
	for(var i = 0; i < population_size; i++){
		population[i] = new Chromosome(target.length);
	}

}

function draw(){

	date_object = new Date();
	current_time = date_object.getTime() - start_time;

	background(255, 255, 255);

	//Calculate fitness of every element in the population
	for(var i = 0; i < population_size; i++){
		population[i].evaluateFitness(target);
		if(population[i].fitness == 1){
			noLoop();
			date_object = new Date();
			end_time = date_object.getTime();
		}
	}

	//Find max fitness for accurate mapping ( prob = relative fitness )
	var maxFitness = 0;

	for(var i = 0; i < population_size; i++){
		if(population[i].fitness > maxFitness) maxFitness = population[i].fitness;
	}

	//Natural selection
	mating_pool = [];	//Empty mating pool

	for (var i = 0; i < population_size; i++) {
    	  
    	var fitness = map(population[i].fitness,0,maxFitness,0,1);
      	var n = floor(fitness * 100);  // Arbitrary multiplier, we can also use monte carlo method
      	for (var j = 0; j < n; j++) {            
        	mating_pool.push(population[i]);
      	}
    }

    //TODO: SHUFFLE ARRAY

	//Fill new generation
	generation_nb++;

	population = population.sort(function(a,b){
		if(a.fitness == b.fitness) return 0;
		else return a.fitness > b.fitness? -1:1;
	});

	//console.log(population);


	for(var i = 0; i < population_size; i++){
		
		//Retain percentage of most fit chromosomes
		if(i < graded_retain_percent*population_size){
			generation[i] = population[i];
		
		//Retain percentage of randomly picked chromosomes
		}else if(i < (graded_retain_percent + nongraded_retain_percent)*population_size){
			generation[i] = population[Math.floor(random(0, population_size))];
		
		//Fill rest of population with children
		}else{
			var p1 = mating_pool[Math.floor(random(mating_pool.length))];
			var p2 = mating_pool[Math.floor(random(mating_pool.length))];
			generation[i] = p1.crossover(p2);
		}

		//Mutate genes with probability mutationRate
		generation[i].mutate(mutationRate);
	}

	population = generation;

	console.log(maxFitness);

	textSize(32);
	clear();
	text(population[0].phenotype(), 10, 30);
	text('Generation :' + generation_nb, 10, 80);
	text('Time running (seconds):'+ current_time/1000, 10, 120);

}