const axios = require('axios');
const { Dog, Temper } = require('../db');
// const { v4: uuidv4 } = require("uuid");

const message = (msg, data) => {
    return {
        msg: msg,
        data: data
    }
}

const filterTemperamentsUniques = (data) => {
    let listTemperaments = []

    data.map((dog) => {      
        if(dog.temperament !== undefined) {
            const newArrayTemperamentDog = dog.temperament.split(', ');
            newArrayTemperamentDog.map(temperament => {
                listTemperaments.push(temperament)
            })
    } 
    })
    const setListTemperaments = new Set(listTemperaments)
    let result = [...setListTemperaments];
    return result;
}

const seedTemperament = async (req,res) => {
    try {
        // Se pidio la data de los perros
        const {data} = await axios.get('https://api.thedogapi.com/v1/breeds');
        // Se creo el temperamento
        const listTemperaments = filterTemperamentsUniques(data)
        await listTemperaments.map(temperament => {
            const newTemperament = {temperament: temperament}
            Temper.create(newTemperament) 
        })
        res.status(200).send({ 
            msg: 'Seed temperaments success',
            temperaments: listTemperaments
        })
    } catch (error) {
        res.status(404).send({ 
            msg: 'No data',
            error: error
        })
    }
};

const getDogsFilter = (data) => {
    let listDogs = [];
    let contador = 0
    data.map(dog => {
        contador++
        const { 
            weight,
            height,
            id,
            name,
            temperament,
            image,
            life_span } = dog
        const newDog = {
            id,
            name,
            temperament,
            weight,
            height,
            image : image.url,
            life_span
        }
        listDogs.push(newDog)
    })
    return listDogs
}

const getDogsFilter2 = (data) => {
    let listDogs = [];
    let contador = 0
    data.map(dog => {
        contador++
        const { 
            weight,
            height,
            id,
            name,
            tempers,
            image,
            life_span } = dog
        const newDog = {
            id,
            name,
            temperament: tempers[0].temperament,
            weight,
            height,
            image,
            life_span
        }
        listDogs.push(newDog)
    })
    return listDogs
}
const getDogsFilter3 = (data) => {

        const { 
            weight,
            height,
            id,
            name,
            tempers,
            image,
            life_span } = data
        const newDog = {
            id,
            name,
            temperament: tempers[0].temperament,
            weight,
            height,
            image,
            life_span
        }
        return newDog

}

const getDogs = async (req, res) => {
    try {
        const { data } = await axios.get('https://api.thedogapi.com/v1/breeds');
        const listDogs = await getDogsFilter(data)
        let listDogsDb = await Dog.findAll({
            include: {
                model: Temper,
                attributes: ['temperament']
            }
        })
        listDogsDb = await getDogsFilter2(listDogsDb)
        res.status(200).send([...listDogs, ...listDogsDb])
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
        if (idRaza.length > 0) {
            if(idRaza.length > 3) {
                const id = idRaza
                let dog = await Dog.findOne({
                    where: { id },
                    include: {
                        model: Temper,
                        attributes: ['temperament']
                    }
                })
                dog = await getDogsFilter3(dog)
                if(dog) {
                    res.status(200).send(message('Dog found',dog));
                } else {
                    res.status(417).send(message('Dog not found'));
                }
            } else {
                idRaza = parseInt(idRaza)
                const {data} = await axios.get('https://api.thedogapi.com/v1/breeds');
                let dogsFiltered = getDogsFilter(data)
                const dog = await dogsFiltered.find(dog => dog.id === idRaza)
                res.status(200).send(message('Dog found',dog));
            }
        } else {
            res.status(400).send(message('Bad Request'));
        }
    } catch (error) {
        res.status(404).send('Dog not found!')
    }
};



{/*

    stateLimpio: los datos de la api en crudo,
    stateFiltered: este estado va a tomar de SateLimpio y lo va a filtar cuando se ejecute algun ord/filt,
    statePagination: [[8], [8], [8]]

    stateCardsEight: [asdf,f,asdf,dsf,fasd,f]

    >1 2 3
    statePagination
*/}

// { 
//     "name": "Indefinido 3",
//     "weight": {
//             "imperial": "6 - 13",
//             "metric": "3 - 6"
//         },
//     "height": {
//         "imperial": "9 - 11.5",
//         "metric": "23 - 29"
//     },
//     "yearsOfLife": 10,
//     "image":"https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg",
//     "temperament": ["09982ae7-aaa3-4662-8eef-6ac9f906de31"]
// }


const createDog = async (req, res) => {
    try {
        const { name, height, weight, life_span, temperamentID , image } = req.body;
        
        const dogValidate = await Dog.findOne({
            where: {name}
        })
        console.log(dogValidate)
        // const temperament = await Temper.findByPk(temperamentID)
        
        let temperamentAsync = async (id) => {
            let temperFind = await Temper.findByPk(id);
            return temperFind;
        }

        


        if (!dogValidate) {
            const dogCreate = await Dog.create({ name, height, weight, life_span, image })

            temperamentID.map(async (id) => {
                let temperamentFinded = await temperamentAsync(id);
                if(temperamentFinded){
                    dogCreate.addTemper(id);
                }
            })

            res.status(200).send({
                msg: 'NEW DOG CREATED',
                dog: dogCreate
            })


        } else {
            res.status(417).send(message('Existing dog in database.'))
        }


    } catch (error) {
        res.status(400).send('Dog not create!')
    }
}

const getTemperaments = async (req, res) => {
    try {
        const temperaments = await Temper.findAll()
        res.status(200).send(temperaments)
    }
    catch (error) {
        res.status(404).send({ msg: 'Temperament not found!'})
    }
};

module.exports = {
    seedTemperament,
    getDogs,
    getDogByIdBreed,
    createDog,
    getTemperaments,
};