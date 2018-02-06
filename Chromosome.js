
function random(min, max){
	if(max > 0){
		min = Math.ceil(min);
		max = Math.floor(max);
		return (Math.random() * (max - min)) + min;
	}else{
		return Math.random() * min;
	}
}

/**
 * Generates an alphabetical character randomly
 * @return {Character}
 */
function generateChar(){
	
	var c = Math.floor(random(63,122));
	if (c === 63) c = 32;
	if (c === 64) c = 46;

	return String.fromCharCode(c);
}

/**
 * Embodies the genotype and phenotype, crossover, fitness, and mutation functions of the chromosome used in a genetic algorithm
 * @constructor Chromosome
 * @param Genes array length{Integer}
 */
function Chromosome(length){
	
	/** @type {Array} 
	 *  @description Genes array that holds all the genes of the current chromosome   
	 */
	this.genes = []; 

	/** @type {Float}  
	 *	@description Fitness value of current chromosome evaluated according to the fitness function 
	 */
	this.fitness = 0;

	// Generate genes array from random characters
	for(var i = 0; i < length; i++){
		this.genes[i] = generateChar(); 
	}

	/**
	 * Phenotype function that returns the genes array as a string
	 * @return {String}
	 */
	this.phenotype = function(){	
		return this.genes.join("");
	}

	/**
	 * @param Target string that the algorithm is trying to find - Corresponds to fitness 1.0 {String}
	 * @return Fitness value of current chromosome {Float}
	 */
	this.evaluateFitness = function(target){
		
		var score = 0;

		for(var i = 0; i < this.genes.length; i++){
			if(this.genes[i] == target[i]){
				score++;
			}
		}
		this.fitness = score/target.length;
	}

	/**
	 * Crossover function, takes partner chromosome and produces child chromosome
	 * @param  Partner {Chromosome}
	 * @return Child {Chromosome}
	 */
	this.crossover = function(partner){

		/** @type {Chromosome} 
		 *  @description Creating empty child with same chromosome genes array length 
		 */
		var child = new Chromosome(this.genes.length);

		/** @type {Integer} 
		 *  @description Randomly picked crossover point to mix genes of parents in child 
		 */
		var crossover_point = Math.floor(Math.random(this.genes.length));

		//Actual crossover functionality
		for(var i = 0; i < this.genes.length; i++){
			if( i <= crossover_point){
				child.genes[i] = this.genes[i];
			}else{
				child.genes[i] = partner.genes[i];
			}
		}

		return child;
	}

	/**
	 * Mutation function
	 * @param  Mutation Rate{Integer}
	 */
	this.mutate = function(mutationRate){

		//Mutate each character with probability equal to mutationRate
		for(var i = 0; i < this.genes.length; i++){
			if(Math.random(1) < mutationRate){
				this.genes[i] = generateChar();
			}
		}
	}

}

