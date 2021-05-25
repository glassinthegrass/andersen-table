module.exports={
    newRecipe: async (req,res)=>{
const db = req.app.get('db');
const {member_id}=req.params;
const {name}=req.body;
        try{
           let recipe = await db.recipes.create_recipe(name,member_id)
            res.status(200).send(recipe)
        } catch (err) {
            console.log('error making recipe'+err)
            res.sendStatus(500)
        }
    },
    newDirection: async (req,res)=>{
        const db = req.app.get('db');
        const {recipe_id}=req.params;
        const {step}=req.body;
                try{
                   let direction = await db.directions.create_recipe_direction(recipe_id,step)
                    res.status(200).send(direction)
                } catch (err) {
                    console.log('error making recipe'+err)
                    res.sendStatus(500)
                }
            },
            newIngredient: async (req,res)=>{
                const db = req.app.get('db');
                const {recipe_id}=req.params;
                const { ingredient }=req.body;

                        try{
                           let ingredientAll = await db.ingredients.create_recipe_ingredient(recipe_id,ingredient)
                            res.status(200).send(ingredientAll)
                        } catch (err) {
                            console.log('error making recipe'+err)
                            res.sendStatus(500)
                        }
                    },
}