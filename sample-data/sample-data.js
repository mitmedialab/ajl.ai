/* template:
{
  name: "",
  perceivedGender: "",
  age: ,
  perceivedEthnicity: "",
  imgUri: "",
  landmarks: []
}

imgUri prefix: http://www.code4rights.com/

landmarks key:
left-eye-x  left-eye-y
right-eye-x  right-eye-x
nose-x  nose-y
left-mouth-corner-x   left-mouth-corner-y
right-mouth-corner-x right-mouth-corner-y

// concept landmarks model
landmarks: {
  leftEye: {
    center: 104.250000, 141.750000,
    width: 50,
    height
  },
  rightEye: {}, etc

}

*/

/*
sample payload to server:
var annotations = [
  {
    image_id: ''
    demographics:[{
      name: '',
      option: ''
    },{
      name: '',
      option: ''
    }],
    regions: [],
    landmarks: [{}, {}, {}],
  },
  {...}
];
*/



module.exports = {
  annotations:{
    demographics: [{
        name: 'Perceived Age',
        options: ['infant', 'child', 'young adult', 'adult', 'elderly']
      },
      {
        name: 'Perceived Gender',
        options: ['other', 'female', 'male'],
      },
      {
        name: 'Perceived Ethnicity',
        options: ['balck', 'white', 'lantino/a', 'asian', 'other']
      }
    ],
    regions: [{}],
    landmarks: [{}]
  },
  data : [{
    name: "Barry Bonds",
    perceivedGender: "male",
    age: 51,
    perceivedEthnicity: "black",
    imgUri: "lfw_subjects/Barry_Bonds_0001.jpg",
    landmarks: [104.250000, 141.750000, 131.250000, 113.750000, 145.250000, 113.250000, 110.750000, 130.750000, 156.250000, 152.750000, "1 2 2 3"]
  },
  {
    name: "Agbani Darego",
    perceivedGender: "female",
    age: 34,
    perceivedEthnicity: "black",
    imgUri: "lfw_subjects/Agbani_Darego_0001.jpg",
    landmarks: [102.750000, 149.750000, 116.750000, 108.250000, 144.750000, 112.250000, 110.250000, 134.250000, 156.250000, 155.750000, "2 1 2 3"]
  },
  {
    name: "Brandon Lloyd",
    perceivedGender: "male",
    age: 36,
    perceivedEthnicity: "black",
    imgUri: "lfw_subjects/Brandon_Lloyd_0001.jpg",
    landmarks: [100.750000, 141.750000, 131.750000, 114.750000, 147.750000, 115.250000, 108.750000, 127.750000, 157.250000, 153.750000]
  },
  {
    name: "Allyson Felix",
    perceivedGender: "female",
    age: 33,
    perceivedEthnicity: "black",
    imgUri: "lfw_subjects/Allyson_Felix_0001.jpg",
    landmarks: [102.750000, 145.750000, 120.750000, 103.750000, 139.750000, 113.250000, 113.250000, 132.750000, 158.250000, 158.750000]
  },
  {
    name: "Brandon Hammond",
    perceivedGender: "male",
    age: 44,
    perceivedEthnicity: "black",
    imgUri: "lfw_subjects/Brandon_Hammond_0001.jpg",
    landmarks: [106.250000, 146.750000, 127.750000, 111.750000, 143.250000, 117.750000, 117.250000, 134.250000, 164.250000, 163.250000]
  },
  {
    name: "Antonio Catania",
    perceivedGender: "male",
    age: 44,
    perceivedEthnicity: "hispanic",
    imgUri: "lfw_subjects/Antonio_Catania_0001.jpg",
    landmarks: [103.250000, 146.750000, 116.750000, 102.250000, 140.250000, 108.750000, 114.250000, 139.250000, 158.750000, 163.250000, "1 1 2 3"]
  },
  {
    name: "Al Cardenas",
    perceivedGender: "male",
    age: 59,
    perceivedEthnicity: "hispanic",
    imgUri: "lfw_subjects/Al_Cardenas_0001.jpg",
    landmarks: [103.750000, 148.750000, 131.250000, 100.750000, 140.250000, 107.750000, 116.250000, 142.250000, 161.250000, 165.750000, "1 2 2 4"]
  },
  {
    name: "Alexa Vega",
    perceivedGender: "female",
    age: 28,
    perceivedEthnicity: "hispanic",
    imgUri: "lfw_subjects/Alexa_Vega_0001.jpg",
    landmarks: [110.750000, 149.750000, 132.750000, 108.750000, 136.250000, 110.250000, 118.250000, 136.750000, 154.250000, 158.750000, "2 2 2 3"]
  },
  {
    name: "Astrid Betancourt.jpg",
    perceivedGender: "female",
    age: 30,
    perceivedEthnicity: "hispanic",
    imgUri: "lfw_subjects/Astrid_Betancourt_0001.jpg",
    landmarks: [104.250000, 143.250000, 112.250000, 103.750000, 132.750000, 109.750000, 115.250000, 133.750000, 157.250000, 161.750000]
  },
  {
    name: "Andres Pastrana",
    perceivedGender: "male",
    age: 65,
    perceivedEthnicity: "hispanic",
    imgUri: "lfw_subjects/Andres_Pastrana_0001.jpg",
    landmarks: [107.750000, 147.250000, 133.250000, 111.250000, 144.250000, 116.250000, 114.250000, 142.250000, 160.750000, 161.750000, "1 2 2 3"]
  },
  {
    name: "Annette Lu",
    perceivedGender: "female",
    age: 58,
    perceivedEthnicity: "asian",
    imgUri: "lfw_subjects/Annette_Lu_0001.jpg",
    landmarks: [103.250000, 143.250000, 125.250000, 108.750000, 149.750000, 113.750000, 108.750000, 133.250000, 159.750000, 154.250000, "2 1 1 3"]
  },
  {
    name: "Bill Kong",
    perceivedGender: "male",
    age: 44,
    perceivedEthnicity: "asian",
    imgUri: "lfw_subjects/Bill_Kong_0001.jpg",
    landmarks: [105.250000, 145.250000, 123.250000, 112.750000, 147.250000, 115.750000, 111.750000, 137.750000, 158.250000, 153.250000]
  },
  {
    name: "Alan Tang Kwong-wing",
    perceivedGender: "male",
    age: 45,
    perceivedEthnicity: "asian",
    imgUri: "lfw_subjects/Alan_Tang_Kwong-wing_0001.jpg",
    landmarks: [109.750000, 148.750000, 131.750000, 108.250000, 140.750000, 110.750000, 113.250000, 135.750000, 157.750000, 159.250000, "1 2 2 3"]
  },
  {
    name: "Angel Maza",
    perceivedGender: "male",
    age: 44,
    perceivedEthnicity: "asian",
    imgUri: "lfw_subjects/Angel_Maza_0001.jpg",
    landmarks: [106.250000, 145.250000, 128.750000, 106.750000, 145.250000, 111.750000, 112.750000, 135.750000, 149.750000, 148.750000, "1 1 2 3"]
  },
  {
    name: "Brajesh Mishra",
    perceivedGender: "male",
    age: 86,
    perceivedEthnicity: "asian",
    imgUri: "lfw_subjects/Brajesh_Mishra_0001.jpg",
    landmarks: [109.250000, 152.250000, 139.750000, 112.250000, 147.750000, 112.250000, 112.750000, 133.250000, 154.750000, 157.250000, "1 2 2 4"]
  },
  {
    name: "Laura Linney",
    perceivedGender: "female",
    age: 36,
    perceivedEthnicity: "white",
    imgUri: "lfw_subjects/Laura_Linney_0001.jpg",
    landmarks: [106.750000, 148.750000, 121.250000, 103.750000, 147.750000, 112.750000, 116.750000, 134.250000, 156.250000, 159.250000, "2 1 2 3"]
  },
  {
    name: "Anthony Corso",
    perceivedGender: "male",
    age: 41,
    perceivedEthnicity: "white",
    imgUri: "lfw_subjects/Anthony_Corso_0001.jpg",
    landmarks: [112.750000, 146.750000, 141.250000, 107.250000, 144.750000, 112.750000, 112.750000, 132.250000, 151.250000, 150.250000, "1 1 2 4"]
  },
  {
    name: "David Trimble",
    perceivedGender: "male",
    age: 51,
    perceivedEthnicity: "white",
    imgUri: "lfw_subjects/David_Trimble_0001.jpg",
    landmarks: [102.750000, 145.750000, 128.250000, 107.750000, 143.250000, 111.250000, 111.250000, 139.250000, 161.750000, 161.250000]
  },
  {
    name: "Davey Johnson",
    perceivedGender: "male",
    age: 42,
    perceivedEthnicity: "white",
    imgUri: "lfw_subjects/Davey_Johnson_0001.jpg",
    landmarks: [106.250000, 146.750000, 131.750000, 118.250000, 153.250000, 120.250000, 112.250000, 144.750000, 168.750000, 160.750000]
  },
  {
    name: "Amanda Coetzer",
    perceivedGender: "female",
    age: 28,
    perceivedEthnicity: "white",
    imgUri: "lfw_subjects/Amanda_Coetzer_0001.jpg",
    landmarks: [106.250000, 143.250000, 126.750000, 102.750000, 130.750000, 108.250000, 116.250000, 136.250000, 149.250000, 156.250000, "2 2 2 4"]
  },
  {
    name: "Abdel Aziz Al-Hakim",
    perceivedGender: "male",
    age: 47,
    perceivedEthnicity: "unlisted",
    imgUri: "lfw_subjects/Abdel_Aziz_Al-Hakim_0001.jpg",
    landmarks: [111.750000, 149.250000, 137.750000, 112.750000, 142.750000, 111.250000, 114.750000, 134.250000, 153.250000, 155.250000]
  },
  {
    name: "Blas Ople",
    perceivedGender: "male",
    age: 69,
    perceivedEthnicity: "unlisted",
    imgUri: "lfw_subjects/Blas_Ople_0001.jpg",
    landmarks: [103.250000, 152.750000, 123.750000, 103.750000, 141.250000, 113.250000, 118.750000, 146.750000, 160.750000, 166.250000]

  },
  {
    name: "Art Cooper",
    perceivedGender: "male",
    age: 46,
    perceivedEthnicity: "unlisted",
    imgUri: "lfw_subjects/Art_Cooper_0001.jpg",
    landmarks: [110.250000, 150.250000, 136.250000, 107.250000, 145.250000, 107.750000, 113.250000, 130.750000, 150.750000, 152.750000, "1 1 2 4"]
  },
  {
    name: "Ahmed Ibrahim Bilal",
    perceivedGender: "male",
    age: 28,
    perceivedEthnicity: "unlisted",
    imgUri: "lfw_subjects/Ahmed_Ibrahim_Bilal_0001.jpg",
    landmarks: [100.250000, 149.250000, 125.250000, 105.250000, 142.750000, 108.750000, 111.250000, 129.750000, 154.750000, 154.750000, "1 2 2 3"]
  }]
}
