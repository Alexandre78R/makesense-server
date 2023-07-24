require("dotenv").config();

const fs = require("fs");
const mysql = require("mysql2/promise");
const argon2 = require("argon2");

const migrate = async () => {
  const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

  const connection = await mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    multipleStatements: true,
  });

    await connection.query(`drop database if exists ${DB_NAME}`);
    await connection.query(`create database ${DB_NAME}`);
    await connection.query(`use ${DB_NAME}`);
    const sql = fs.readFileSync("./makesense.sql", "utf8");

    await connection.query(sql);

    const role = [
        { name : "Décisionnaire"},
        { name : "Employer"},
        { name : "Bénévole"},
    ];

  for (let i = 0; i < role.length; i++) {
    const { name } = role[i];
    await connection.query("insert into role (name) values (?)", [name]);
    await console.log(`Add Role : ${name}`);
  }

  await console.log(`Total Role : ${role.length}`);

  const job = [
    { name : "Directeur Associatif" },
    { name : "Directeur Général" },
    { name : "Service Civique" },
    { name : "RH" },
    { name : "Développeur" },
    { name : "Technicien" },
    { name : "Commercial" },
    { name : "Brand Manager" },
    { name : "Design Director" },
    { name : "Technicien surface" },
    { name : "comptable" },
    { name : "Réceptionniste" },
    { name : "Community Manager" },

  ];

  for (let i = 0; i < job.length; i++) {
    const { name } = job[i];
    await connection.query("insert into job (name) values (?)", [name]);
    await console.log(`Add Job : ${name}`);
  }

  await console.log(`Total Job : ${job.length}`);

  const user = [
    {
        "firstname": "Alexandre",
        "lastname": "Renard",
        "email": "alexandre.renard98@gmail.com",
        "password": "alex",
        "avatar": `${process.env.BACKEND_URL}/upload/user/default_user.png`,
        "affiliated_site": "France",
        "tel": "07 11 38 49 57",
        "job_id": "5",
        "admin" : "1",
        "role_id": "1"
    },
    {
        "firstname": "Etienne",
        "lastname": "Chamarier",
        "email": "etienne@makesense.org",
        "password": "etienne",
        "avatar": `${process.env.BACKEND_URL}/upload/user/default_user.png`,
        "affiliated_site": "France",
        "tel": "06 32 58 67 84",
        "job_id": "5",
        "admin" : "1",
        "role_id": "1"
    },
    {
        "firstname": "Thomas",
        "lastname": "Fachinetti",
        "email": "thomas@makesense.org",
        "password": "thomas",
        "avatar": `${process.env.BACKEND_URL}/upload/user/default_user.png`,
        "affiliated_site": "France",
        "tel": "06 74 62 31 99",
        "job_id": "5",
        "admin" : "1",
        "role_id": "1"
    },
    {
        "firstname": "Jean-Maxime",
        "lastname": "Djnt",
        "email": "jean-maxime@makesense.org",
        "password": "jean-maxime",
        "avatar": `${process.env.BACKEND_URL}/upload/user/default_user.png`,
        "affiliated_site": "France",
        "tel": "07 41 39 99 75",
        "job_id": "5",
        "admin" : "1",
        "role_id": "1"
    },
    {
        "firstname": "Kader",
        "lastname": "Benderdouche",
        "email": "kader@makesense.org",
        "password": "kader",
        "avatar": `${process.env.BACKEND_URL}/upload/user/default_user.png`,
        "affiliated_site": "France",
        "tel": "06 12 97 34 56",
        "job_id": "5",
        "admin" : "1",
        "role_id": "1"
    },
    {
      "firstname": "John",
      "lastname": "Doe",
      "email": "john@makesense.org",
      "password": "user",
      "avatar": `${process.env.BACKEND_URL}/upload/user/default_user.png`,
      "affiliated_site": "France",
      "tel": "06 74 62 31 99",
      "job_id": "7",
      "admin" : "0",
      "role_id": "3"
  },
  {
    "firstname": "Christian",
    "lastname": "Vanizette",
    "email": "christianvanizette@makesense.org",
    "password": "christian",
    "avatar": `${process.env.BACKEND_URL}/upload/user/default_user.png`,
    "affiliated_site": "France",
    "tel": "06 74 62 31 99",
    "job_id": "2",
    "admin" : "0",
    "role_id": "2"
  },
  {
    "firstname": "Christian",
    "lastname": "Vanizette",
    "email": "christianvanizette@makesense.org",
    "password": "christian",
    "avatar": `${process.env.BACKEND_URL}/upload/user/default_user.png`,
    "affiliated_site": "France",
    "tel": "06 74 62 31 99",
    "job_id": "2",
    "admin" : "0",
    "role_id": "2"
  },
  {
    "firstname": "admin",
    "lastname": "admin",
    "email": "christianvanizette@makesense.org",
    "password": "admin",
    "avatar": `${process.env.BACKEND_URL}/upload/user/default_user.png`,
    "affiliated_site": "France",
    "tel": "06 74 62 31 99",
    "job_id": "6",
    "admin" : "1",
    "role_id": "3"
  },
  {
    "firstname": "Sandrine",
    "lastname": "Maitre",
    "email": "sndrinemaitre@makesense.org",
    "password": "sandrine",
    "avatar": `${process.env.BACKEND_URL}/upload/user/default_user.png`,
    "affiliated_site": "France",
    "tel": "06 74 62 31 99",
    "job_id": "4",
    "admin" : "0",
    "role_id": "2"
  },
  {
    "firstname": "Daniel",
    "lastname": "Buendía",
    "email": "danielbuendía@makesense.org",
    "password": "daniel",
    "avatar": `${process.env.BACKEND_URL}/upload/user/default_user.png`,
    "affiliated_site": "France",
    "tel": "06 74 62 31 99",
    "job_id": "8",
    "admin" : "0",
    "role_id": "2"
  },
  {
    "firstname": "Luis",
    "lastname": "David Araiza",
    "email": "luisdavidaraiza@makesense.org",
    "password": "daniel",
    "avatar": `${process.env.BACKEND_URL}/upload/user/default_user.png`,
    "affiliated_site": "Mexico",
    "tel": "06 74 62 31 99",
    "job_id": "9",
    "admin" : "0",
    "role_id": "2"
  },
  ];

  for (let i = 0; i < user.length; i++) {
    const { firstname, lastname, email, password, avatar, affiliated_site, tel, job_id, role_id, admin} = user[i];
    const hash = await argon2.hash(password);
    await connection.query("insert into user (firstname, lastname, email, password, avatar, affiliated_site, tel, job_id, role_id, admin) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [firstname, lastname, email, hash, avatar, affiliated_site, tel, job_id, role_id, admin]);
    await console.log(`Add user : ${firstname} ${lastname}`);
  }

  await console.log(`Total User : ${user.length}`);

  const post = [
    {
        "title": "Post 1 !",
        "description": "Post 1 description !",
        "createdDate": "2023-06-21T12:01:38.000",
        "status": "encours",
        "profit": "maxtune",
        "risk": "pasdetune",
        "avatar": `${process.env.BACKEND_URL}/upload/post/default_background_project.jpg`,
        "user_id": "1",
        "location": "France",
        "impact": "impacte",
        "deadlineDate":"2023-06-21T12:01:38.000",
        "makeDecisionDate": "2023-06-21T12:01:18.000",
        "conflitDate": "2023-06-21T15:01:55.000"
    },
    {
        "title": "Post 2 !",
        "description": "Post 2 description !",
        "createdDate": "2023-06-21T12:01:38.000",
        "status": "encours",
        "profit": "maxtune",
        "risk": "pasdetune",
        "avatar": `${process.env.BACKEND_URL}/upload/post/default_background_project.jpg`,
        "user_id": "2",
        "location": "France",
        "impact": "impacte",
        "deadlineDate":"2023-06-21T12:01:38.000",
        "makeDecisionDate": "2023-06-21T12:01:18.000",
        "conflitDate": "2023-06-21T15:01:55.000"
    },
    {
        "title": "Post 3 !",
        "description": "Post 3 description !",
        "createdDate": "2023-06-21T12:01:38.000",
        "status": "encours",
        "profit": "maxtune",
        "risk": "pasdetune",
        "avatar": `${process.env.BACKEND_URL}/upload/post/default_background_project.jpg`,
        "user_id": "3",
        "location": "Australie",
        "impact": "impacte",
        "deadlineDate":"2023-06-21T12:01:38.000",
        "makeDecisionDate": "2023-06-21T12:01:18.000",
        "conflitDate": "2023-06-21T15:01:55.000"
    },
    {
        "title": "Post 4 !",
        "description": "Post 1 description !",
        "createdDate": "2023-07-21T12:01:38.000",
        "status": "encours",
        "profit": "maxtune",
        "risk": "pasdetune",
        "avatar": `${process.env.BACKEND_URL}/upload/post/default_background_project.jpg`,
        "user_id": "3",
        "location": "France",
        "impact": "impacte",
        "deadlineDate":"2023-08-21T12:01:38.000",
        "makeDecisionDate": "2023-08-21T12:01:18.000",
        "conflitDate": "2023-08-21T15:01:55.000"
    },
    {
        "title": "Post 5 !",
        "description": "Post 2 description !",
        "createdDate": "2023-07-21T12:01:38.000",
        "status": "encours",
        "profit": "maxtune",
        "risk": "pasdetune",
        "avatar": `${process.env.BACKEND_URL}/upload/post/default_background_project.jpg`,
        "user_id": "4",
        "location": "Espagne",
        "impact": "impacte",
        "deadlineDate":"2023-08-21T12:01:38.000",
        "makeDecisionDate": "2023-08-21T12:01:18.000",
        "conflitDate": "2023-08-21T15:01:55.000"
    },
    {
        "title": "Post 6 !",
        "description": "Post 3 description !",
        "createdDate": "2023-07-21T12:01:38.000",
        "status": "encours",
        "profit": "maxtune",
        "risk": "pasdetune",
        "avatar": `${process.env.BACKEND_URL}/upload/post/default_background_project.jpg`,
        "user_id": "5",
        "location": "France",
        "impact": "impacte",
        "deadlineDate":"2023-08-21T12:01:38.000",
        "makeDecisionDate": "2023-08-21T12:01:18.000",
        "conflitDate": "2023-08-21T15:01:55.000"
    },
    {
        "title": "Post 7 !",
        "description": "Post 1 description !",
        "createdDate": "2023-06-21T12:01:38.000",
        "status": "encours",
        "profit": "maxtune",
        "risk": "pasdetune",
        "avatar": `${process.env.BACKEND_URL}/upload/post/default_background_project.jpg`,
        "user_id": "1",
        "location": "France",
        "impact": "impacte",
        "deadlineDate":"2023-09-21T12:01:38.000",
        "makeDecisionDate": "2023-09-21T12:01:18.000",
        "conflitDate": "2023-09-21T15:01:55.000"
    },
    {
        "title": "Post 8 !",
        "description": "Post 2 description !",
        "createdDate": "2023-06-21T12:01:38.000",
        "status": "encours",
        "profit": "maxtune",
        "risk": "pasdetune",
        "avatar": `${process.env.BACKEND_URL}/upload/post/default_background_project.jpg`,
        "user_id": "2",
        "location": "France",
        "impact": "impacte",
        "deadlineDate":"2023-09-21T12:01:38.000",
        "makeDecisionDate": "2023-09-21T12:01:18.000",
        "conflitDate": "2023-09-21T15:01:55.000"
    },
    {
        "title": "Post 9 !",
        "description": "Post 3 description !",
        "createdDate": "2023-06-21T12:01:38.000",
        "status": "encours",
        "profit": "maxtune",
        "risk": "pasdetune",
        "avatar": `${process.env.BACKEND_URL}/upload/post/default_background_project.jpg`,
        "user_id": "3",
        "location": "Australie",
        "impact": "impacte",
        "deadlineDate":"2023-09-21T12:01:38.000",
        "makeDecisionDate": "2023-09-21T12:01:18.000",
        "conflitDate": "2023-09-21T15:01:55.000"
    },
    {
        "title": "Post 10 !",
        "description": "Post 1 description !",
        "createdDate": "2023-07-21T12:01:38.000",
        "status": "encours",
        "profit": "maxtune",
        "risk": "pasdetune",
        "avatar": `${process.env.BACKEND_URL}/upload/post/default_background_project.jpg`,
        "user_id": "3",
        "location": "France",
        "impact": "impacte",
        "deadlineDate":"2023-09-21T12:01:38.000",
        "makeDecisionDate": "2023-09-21T12:01:18.000",
        "conflitDate": "2023-09-21T15:01:55.000"
    },
    {
        "title": "Post 11 !",
        "description": "Post 2 description !",
        "createdDate": "2023-07-21T12:01:38.000",
        "status": "encours",
        "profit": "maxtune",
        "risk": "pasdetune",
        "avatar": `${process.env.BACKEND_URL}/upload/post/default_background_project.jpg`,
        "user_id": "4",
        "location": "Espagne",
        "impact": "impacte",
        "deadlineDate":"2023-10-21T12:01:38.000",
        "makeDecisionDate": "2023-10-21T12:01:18.000",
        "conflitDate": "2023-10-21T15:01:55.000"
    },
    {
        "title": "Post 12 !",
        "description": "Post 3 description !",
        "createdDate": "2023-07-21T12:01:38.000",
        "status": "encours",
        "profit": "maxtune",
        "risk": "pasdetune",
        "avatar": `${process.env.BACKEND_URL}/upload/post/default_background_project.jpg`,
        "user_id": "5",
        "location": "France",
        "impact": "impacte",
        "deadlineDate":"2023-10-21T12:01:38.000",
        "makeDecisionDate": "2023-10-21T12:01:18.000",
        "conflitDate": "2023-10-21T15:01:55.000"
    },
  ];

  for (let i = 0; i < post.length; i++) {
    const { title, description, createdDate, status, profit, risk, avatar, user_id, location, impact, deadlineDate, makeDecisionDate, conflitDate } = post[i];
    await connection.query("insert into post (title, description, createdDate, status, profit, risk, avatar, user_id, location, impact, deadlineDate, makeDecisionDate, conflitDate) values (?, ?, ?, ?, ?, ?, ?, ?, ? , ?, ?, ?, ?)",
    [title, description, createdDate, status, profit, risk, avatar, user_id, location, impact, deadlineDate, makeDecisionDate, conflitDate]);
    await console.log(`Add Post : ${title}`);
  }

  await console.log(`Total Post : ${post.length}`);

  await console.log("Check ALL User Password Finish")
  const alert = [
    { title : "Alert1"},
    { title : "Alert2"},
    { title : "Alert3"},
    { title : "Alert4"},
    { title : "Alert5"},
    { title : "Alert6"},
    { title : "Alert7"},
    { title : "Alert8"},
  ];

  for (let i = 0; i < alert.length; i++) {
    const { title } = alert[i];
    await connection.query("insert into alert (title) values (?)", [title]);
    await console.log(`Add alert : ${title}`);
  }

  await console.log(`Total Alert : ${alert.length}`);

  const user_alert = [
    { alert_id : 1, user_id : 1},
    { alert_id : 4, user_id : 1},
    { alert_id : 2, user_id : 2},
    { alert_id : 3, user_id : 2},
    { alert_id : 1, user_id : 2},
    { alert_id : 5, user_id : 3},
    { alert_id : 7, user_id : 4},
    { alert_id : 6, user_id : 4},
    { alert_id : 2, user_id : 4},
  ];

  for (let i = 0; i < user_alert.length; i++) {
    const { alert_id, user_id} = user_alert[i];
    await connection.query("insert into user_alert (alert_id, user_id) values (?, ?)", [alert_id, user_id]);
    await console.log(`Add User Alert : n°${i+1}`);
  }

  await console.log(`Total User Alert : ${user_alert.length}`);

  const user_participant = [
    { user_id : 1, post_id : 1, expert : 1, impacted : 1},
    { user_id : 2, post_id : 1, expert : 0, impacted : 1},
    { user_id : 3, post_id : 1, expert : 1, impacted : 0},
    { user_id : 4, post_id : 1, expert : 0, impacted : 0},
    { user_id : 5, post_id : 1, expert : 1, impacted : 1},
  ];

  for (let i = 0; i < user_participant.length; i++) {
    const { user_id, post_id, expert, impacted } = user_participant[i];
    await connection.query("insert into user_participant (user_id, post_id, expert, impacted) values (?, ?, ?, ?)", [user_id, post_id, expert, impacted]);
    await console.log(`Add User Participant : n°${i+1}`);
  }

  await console.log(`Total ser Participant : ${user_participant.length}`);

  const user_post_avis = [
    { user_id : 1, post_id : 1, text : "avis user 1", date : "2023-06-21T12:01:38.000"},
    { user_id : 2, post_id : 1, text : "avis user 2", date : "2023-06-21T12:02:12.000"},
    { user_id : 3, post_id : 1, text : "avis user 3", date : "2023-07-21T12:12:08.000"},
    { user_id : 4, post_id : 1, text : "avis user 4", date : "2023-07-21T12:13:24.000"},
    { user_id : 5, post_id : 1, text : "avis user 5", date : "2023-08-21T12:10:43.000"},
  ];

  for (let i = 0; i < user_post_avis.length; i++) {
    const { user_id, post_id, text, date } = user_post_avis[i];
    await connection.query("insert into user_post_avis (user_id, post_id, text, date) values (?, ?, ?, ?)", [user_id, post_id, text, date]);
    await console.log(`Add User Post Avis : n°${i+1}`);
  }

  await console.log(`Total User Post Avi : ${user_post_avis.length}`);

  const user_post_vote = [
    { user_id : 1, post_id : 1, vote : 1},
    { user_id : 2, post_id : 1, vote : 0},
    { user_id : 3, post_id : 1, vote : 1},
    { user_id : 4, post_id : 1, vote : 0},
    { user_id : 5, post_id : 1, vote : 1},
  ];

  for (let i = 0; i < user_post_avis.length; i++) {
    const { user_id, post_id, vote } = user_post_vote[i];
    await connection.query("insert into user_post_vote (user_id, post_id, vote) values (?, ?, ?)", [user_id, post_id, vote]);
    await console.log(`Add User Post Vote : n°${i+1}`);
  }

  await console.log(`Total User Post Vote : ${user_post_vote.length}`);

  connection.end();
};

try {
  migrate().then(() => console.log("Database schema successfully synchronised"));;
} catch (err) {
  console.error(err);
}