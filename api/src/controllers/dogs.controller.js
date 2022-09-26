const axios = require('axios');
const { Dog, Temper } = require('../db');
// const { v4: uuidv4 } = require("uuid");

const seedTemperament = async () => {
    const {data} = await axios.get('https://api.thedogapi.com/v1/breeds');
    await data.map(dog => {
        const newTemperament = {temperament: dog.temperament}
        Temper.create(newTemperament) 
    })
    return { msg: 'Seed temperaments success'}
};

const getDogsFilter = (data) => {
    let listDogs = [];
    data.map(dog => {
        const { 
            weight,
            height,
            id,
            name,
            temperament,
            image } = dog
        const newDog = {
            id,
            name,
            temperament,
            weight,
            height,
            image
        }
        listDogs.push(newDog)
    })
    return listDogs
}

const getDogs = async (req, res) => {
    let { idRaza } = req.params;
    
    try {
        if (idRaza) {
            const allDogs = await axios.get('https://api.thedogapi.com/v1/breeds');
            let dog = allDogs.find(dog => dog.id === parseInt(idRaza))
            dog = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${dog.name}`);
        } else {
            const { data } = await axios.get('https://api.thedogapi.com/v1/breeds');
            const listDogs = await getDogsFilter(data)
            res.status(200).send(listDogs)
        }
    } catch (error) {
        res.status(404).send({ 
            msg: 'No data',
            error: error
        })
    }
};

const getDogByIdBreed = async (req, res) => {
    try {
        let { idRaza } = req.params;
        idRaza = parseInt(idRaza)
        console.log("🚀 ~ file: dogs.controller.js ~ line 91 ~ getDogByIdBreed ~ idRaza", idRaza)
        let allDogs = await axios.get('https://api.thedogapi.com/v1/breeds');
        allDogs = getDogsFilter(allDogs.data)
        const { name } = await allDogs.find(dog => dog.id === idRaza)
        console.log("🚀 ~ file: dogs.controller.js ~ line 96 ~ getDogByIdBreed ~ name", name)
        const { data } = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`);
        res.status(200).send(getDogsFilter(data)[0])
    } catch (error) {
        res.status(404).send('Dog not found!')
    }
};

const createDog = async (req, res) => {
    try {
        const { name, height, weight, yearsOfLife, temperament } = req.body
        const dog = { name, height, weight, yearsOfLife }
        const validate = await Dog.findOne({
            where: { name }
        })
        if (!validate) {
            const dogCreate = await Dog.create(dog)
            let dogDb = await Temper.findAll({
                where: { temperament: temperament }
            })
            await dogCreate.addTemper(dogDb)
            res.status(200).send('NEW DOG CREATED')
        } else {
            let dogCreate = await Temper.findAll({
                where: {
                    temperament: temperament
                }
            })
            await validate.addTemper(dogCreate)
            res.status(200).send('NEW DOG CREATED')
        }
    } catch (error) {
        res.status(404).send('Dog not create!')
    }
}

const getTemperaments = async (req, res) => {
    try {
        const temperaments = await Temper.findAll({
            attributes: ['id','temperament']
        })
        res.status(200).send(temperaments)

    }
    catch (error) {
        res.status(400).send({ msg: 'Temperament not found!'})

    }
};

module.exports = {
    seedTemperament,
    getDogs,
    getDogByIdBreed,
    createDog,
    getTemperaments,
};