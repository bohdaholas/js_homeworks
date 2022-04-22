/* DONT CHANGE THIS CODE - START */
function wait(ms = 1) { return new Promise(resolve => setTimeout(resolve, ms)) }

class Dish {
    constructor(cookingTime) {
        this.cookingTime = cookingTime;
    }

    async cook() {
        const actualCookingTime = this.cookingTime * (1 + Math.random()) * 100;
        await wait(actualCookingTime);
        return this;
    }
}
/* DONT CHANGE THIS CODE - END */

class Ingredient {
    constructor(ingredientName, quantity) {
        this.ingredientName = ingredientName
        this.quantity = quantity
    }
}

const Ingredients = {
    potato: 'potato',
    spaghetti: 'spaghetti',
    meat: 'meat',
    tomato: 'tomato'
};

class Bolognese extends Dish{
    constructor() {
        super(10)
        this.necessaryIngredients = [
            new Ingredient(Ingredients.meat, 2),
            new Ingredient(Ingredients.spaghetti, 10)
        ]
    }
}

class MashedPotatoes extends Dish{
    constructor() {
        super(8)
        this.necessaryIngredients = [
            new Ingredient(Ingredients.meat, 9)
        ]
    }
}

class Steak extends Dish{
    constructor() {
        super(7)
        this.necessaryIngredients = [
            new Ingredient(Ingredients.meat, 3),
        ]
    }
}

class SteakAndFries extends Dish{
    constructor() {
        super(12)
        this.necessaryIngredients = [
            new Ingredient(Ingredients.meat, Infinity),
            new Ingredient(Ingredients.potato, 1000)
        ]
    }
}

const Dishes = {
    Bolognese: new Bolognese(),
    MashedPotatoes: new MashedPotatoes(),
    Steak: new Steak(),
    SteakAndFries: new SteakAndFries()
}

class Kitchen {
    constructor() {
        this.fridge = {}
    }

    addToFridge(ingredientsArray) {
        for (const ingredient of ingredientsArray) {
            this.fridge[ingredient.ingredientName] = ingredient.quantity
        }
    }

    areAvailableIngredients(dish) {
        for (const necessaryIngredient of dish.necessaryIngredients) {
            if (this.fridge[necessaryIngredient.ingredientName] < necessaryIngredient.quantity) {
                return false
            }
        }
        return true
    }

    takeIngredients(dish) {
        for (const necessaryIngredient of dish.necessaryIngredients) {
            this.fridge[necessaryIngredient] -= necessaryIngredient.quantity
        }
    }

    order(dish) {
        if (!this.areAvailableIngredients(dish)) {
            throw 'Not enough ingridients in fridge'
        }
        this.takeIngredients(dish)
    }

    async cookFastestOrder() {
        let minCookingTime = Infinity;
        let fastestOrder = null;
        for (const [dishName, dish] of Object.entries(Dishes)) {
            if (this.areAvailableIngredients(dish)) {
                if (dish.cookingTime < minCookingTime) {
                    minCookingTime = dish.cookingTime
                    fastestOrder = dish
                }
            }
        }
        this.order(fastestOrder);
        await fastestOrder.cook()
        return fastestOrder
    }

    async cookAllOrders() {
        const cookedDishes = []
        for (const [dishName, dish] of Object.entries(Dishes)) {
            if (this.areAvailableIngredients(dish)) {
                this.order(dish)
                await dish.cook()
                cookedDishes.push(dish)
            }
        }
        return cookedDishes;
    }
}

async function test() {
    const kitchen = new Kitchen();
    kitchen.addToFridge([
        new Ingredient(Ingredients.potato, 30),
        new Ingredient(Ingredients.spaghetti, 40),
        new Ingredient(Ingredients.meat, 21),
        new Ingredient(Ingredients.tomato, 19)
    ])

    kitchen.order(new Bolognese()); // Bolognese extends Dish (~ngTime = 10)
    kitchen.order(new MashedPotatoes()); // MashedPotatoes extends Dish (cookingTime = 8)
    kitchen.order(new Steak()); // Steak extends Dish (cookingTime = 7)

    // Feel free to experiment with various dishes and ingridients

    await kitchen.cookFastestOrder(); // Returns fastest dish to make
    await kitchen.cookAllOrders(); // Returns two dishes in array

    kitchen.order(new SteakAndFries()); // Throws Error: Not enough ingridients in fridge

}

test();
