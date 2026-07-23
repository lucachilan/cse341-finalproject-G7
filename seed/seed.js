require("dotenv").config();

const { MongoClient, ObjectId } = require("mongodb");

const client = new MongoClient(process.env.MONGODB_URI);


async function seedDatabase() {

    try {

        await client.connect();

        console.log("MongoDB Connected");

        const db = client.db("highschool");


        // CLEAN DATABASE

        await db.collection("teachers").deleteMany({});
        await db.collection("students").deleteMany({});
        await db.collection("courses").deleteMany({});
        await db.collection("classes").deleteMany({});


        // ============================
        // TEACHERS
        // ============================

        const teachersResult = await db.collection("teachers").insertMany([

            {
                firstName:"Emily",
                lastName:"Johnson",
                email:"emily.johnson@school.edu",
                phone:"555-1001",
                department:"Mathematics",
                hireDate:"2018-08-15",
                yearsExperience:12,
                status:"Active"
            },

            {
                firstName:"Michael",
                lastName:"Smith",
                email:"michael.smith@school.edu",
                phone:"555-1002",
                department:"Computer Science",
                hireDate:"2020-01-10",
                yearsExperience:8,
                status:"Active"
            },

            {
                firstName:"Sarah",
                lastName:"Williams",
                email:"sarah.williams@school.edu",
                phone:"555-1003",
                department:"English",
                hireDate:"2016-09-01",
                yearsExperience:15,
                status:"Active"
            },

            {
                firstName:"David",
                lastName:"Brown",
                email:"david.brown@school.edu",
                phone:"555-1004",
                department:"Science",
                hireDate:"2019-03-20",
                yearsExperience:10,
                status:"Active"
            },

            {
                firstName:"Jessica",
                lastName:"Davis",
                email:"jessica.davis@school.edu",
                phone:"555-1005",
                department:"History",
                hireDate:"2017-08-12",
                yearsExperience:14,
                status:"Active"
            },

            {
                firstName:"Robert",
                lastName:"Miller",
                email:"robert.miller@school.edu",
                phone:"555-1006",
                department:"Physical Education",
                hireDate:"2021-01-15",
                yearsExperience:7,
                status:"Active"
            },

            {
                firstName:"Linda",
                lastName:"Wilson",
                email:"linda.wilson@school.edu",
                phone:"555-1007",
                department:"Art",
                hireDate:"2015-06-10",
                yearsExperience:18,
                status:"Active"
            },

            {
                firstName:"James",
                lastName:"Taylor",
                email:"james.taylor@school.edu",
                phone:"555-1008",
                department:"Computer Science",
                hireDate:"2022-08-01",
                yearsExperience:5,
                status:"Active"
            },

            {
                firstName:"Maria",
                lastName:"Anderson",
                email:"maria.anderson@school.edu",
                phone:"555-1009",
                department:"Chemistry",
                hireDate:"2014-09-01",
                yearsExperience:20,
                status:"Active"
            },

            {
                firstName:"Daniel",
                lastName:"Thomas",
                email:"daniel.thomas@school.edu",
                phone:"555-1010",
                department:"Physics",
                hireDate:"2019-02-11",
                yearsExperience:9,
                status:"Active"
            }

        ]);


        console.log("Teachers inserted");


        // ============================
        // STUDENTS
        // ============================


        const studentsResult = await db.collection("students").insertMany([

            ...Array.from({length:20}, (_,i)=>({

                studentId:`ST${1001+i}`,
                firstName:[
                    "John","Anna","Luis","Maria","Carlos",
                    "Sofia","Daniel","Emma","David","Laura",
                    "Kevin","Isabella","Mateo","Olivia",
                    "Noah","Camila","Ethan","Valentina",
                    "Lucas","Mia"
                ][i],

                lastName:[
                    "Carter","Garcia","Martinez","Lopez",
                    "Perez","Smith","Brown","Wilson",
                    "Taylor","Anderson",
                    "Thomas","Moore","Jackson","White",
                    "Harris","Martin","Lee","Clark",
                    "Lewis","Walker"
                ][i],

                email:`student${1001+i}@student.edu`,

                gradeLevel:10 + (i % 3),

                dateOfBirth:"2008-05-12",

                enrollmentDate:"2025-08-01",

                status:"Active"

            }))

        ]);


        console.log("Students inserted");


        // ============================
        // COURSES
        // ============================


        const coursesResult = await db.collection("courses").insertMany([

            {
                courseCode:"CSE341",
                courseName:"Web Backend Development",
                description:"Node.js and REST API development",
                department:"Computer Science",
                credits:3,
                semester:"Fall",
                capacity:30
            },

            {
                courseCode:"MATH101",
                courseName:"Algebra I",
                description:"Basic mathematics concepts",
                department:"Mathematics",
                credits:3,
                semester:"Fall",
                capacity:30
            },

            {
                courseCode:"ENG101",
                courseName:"English Literature",
                description:"Reading and writing",
                department:"English",
                credits:3,
                semester:"Fall",
                capacity:25
            },

            {
                courseCode:"BIO101",
                courseName:"Biology",
                description:"Introduction to biology",
                department:"Science",
                credits:4,
                semester:"Fall",
                capacity:25
            },

            {
                courseCode:"HIS101",
                courseName:"World History",
                description:"History fundamentals",
                department:"History",
                credits:3,
                semester:"Fall",
                capacity:30
            }

        ]);


        console.log("Courses inserted");


        // ============================
        // CLASSES
        // ============================


        await db.collection("classes").insertMany([

            {
                classCode:"CSE341-A",

                teacherId:teachersResult.insertedIds[1],

                courseId:coursesResult.insertedIds[0],

                classroom:"Room 201",

                schedule:"Monday-Wednesday-Friday 09:00 AM",

                semester:"Fall 2026",

                students:[
                    studentsResult.insertedIds[0],
                    studentsResult.insertedIds[1],
                    studentsResult.insertedIds[2]
                ]
            },


            {
                classCode:"MATH101-A",

                teacherId:teachersResult.insertedIds[0],

                courseId:coursesResult.insertedIds[1],

                classroom:"Room 105",

                schedule:"Tuesday-Thursday 10:00 AM",

                semester:"Fall 2026",

                students:[
                    studentsResult.insertedIds[3],
                    studentsResult.insertedIds[4]
                ]
            },


            {
                classCode:"ENG101-A",

                teacherId:teachersResult.insertedIds[2],

                courseId:coursesResult.insertedIds[2],

                classroom:"Room 301",

                schedule:"Monday-Friday 11:00 AM",

                semester:"Fall 2026",

                students:[
                    studentsResult.insertedIds[5],
                    studentsResult.insertedIds[6]
                ]
            },


            {
                classCode:"BIO101-A",

                teacherId:teachersResult.insertedIds[3],

                courseId:coursesResult.insertedIds[3],

                classroom:"Laboratory 1",

                schedule:"Wednesday-Friday 01:00 PM",

                semester:"Fall 2026",

                students:[
                    studentsResult.insertedIds[7],
                    studentsResult.insertedIds[8]
                ]
            },


            {
                classCode:"HIS101-A",

                teacherId:teachersResult.insertedIds[4],

                courseId:coursesResult.insertedIds[4],

                classroom:"Room 210",

                schedule:"Tuesday-Thursday 02:00 PM",

                semester:"Fall 2026",

                students:[
                    studentsResult.insertedIds[9],
                    studentsResult.insertedIds[10]
                ]
            }

        ]);


        console.log("Classes inserted");


        console.log("DATABASE SEEDED SUCCESSFULLY");


    }
    catch(error){

        console.error(error);

    }
    finally{

        await client.close();

    }

}


seedDatabase();