module.exports = function (db, done) {
  db.user.bulkCreate([
    {username: "markus", email: "markus@markus.de"},
    {username: "johannes", email: "johannes@johannes.de"},
    {username: "marius", email: "marius@marius.de"},
    {username: "marcus", email: "marcus@marcus.de"},
    {username: "hanspeter", email: "hanspeter@hanspeter.de"},
    {username: "claudius", email: "claudius@claudius.de"},
    {username: "friedrich", email: "friedrich@friedrich.de"},
    {username: "gustav", email: "gustav@gustav.de"},
    {username: "gustavo", email: "gustavo@gustavo.de"},
    {username: "gustavio", email: "gustavio@gustavio.de"}
  ])
  .then(() => {
    return db.poll.bulkCreate([
      {title: "What is your favorite animal?", userId: 1},
      {title: "What is your favorite star?", userId: 2},
      {title: "What is your favorite drink?", userId: 3},
      {title: "What is your favorite food?", userId: 4},
      {title: "What is your favorite beer?", userId: 5},
      {title: "What is your favorite human?", userId: 6},
      {title: "What is your favorite snake?", userId: 7},
      {title: "What is your favorite spider?", userId: 8},
      {title: "What is your favorite game?", userId: 9},
      {title: "What is your favorite fruit?", userId: 10}
    ]);
  })
  .then(() => {
    return db.option.bulkCreate([
      {title: "dog", pollId: 1},
      {title: "cat", pollId: 1},
      {title: "horse", pollId: 1},

      {title: "andromeda", pollId: 2},
      {title: "sirius", pollId: 2},

      {title: "beer", pollId: 3},
      {title: "liquor", pollId: 3},
      {title: "vodka", pollId: 3},

      {title: "becks", pollId: 5},
      {title: "radeberger", pollId: 5},

      {title: "friedrich", pollId: 6},
      {title: "klaus", pollId: 6},

      {title: "black widow", pollId: 8},
      {title: "Brown Recluse", pollId: 8},

      {title: "chess", pollId: 9},
      {title: "tennis", pollId: 9},

      {title: "apple", pollId: 10},
      {title: "cherry", pollId: 10},
    ]);
  })
  .then(() => {
    return db.vote.bulkCreate([
      {ip: "123.123.123.123", optionId: 1},
      {ip: "123.123.123.123", optionId: 2},
      {ip: "123.123.123.123", optionId: 3},
      {ip: "123.123.123.123", optionId: 4},
      {ip: "123.123.123.123", optionId: 5},
      {ip: "123.123.123.123", optionId: 6},
      {ip: "123.123.123.123", optionId: 7},
      {ip: "123.123.123.123", optionId: 8},
      {ip: "123.123.123.123", optionId: 9},
      {ip: "123.123.123.123", optionId: 10},
      {ip: "123.123.123.123", optionId: 10},
      {ip: "123.123.123.123", optionId: 9},
      {ip: "123.123.123.123", optionId: 8},
      {ip: "123.123.123.123", optionId: 7},
      {ip: "123.123.123.123", optionId: 6},
      {ip: "123.123.123.123", optionId: 5},
      {ip: "123.123.123.123", optionId: 4},
      {ip: "123.123.123.123", optionId: 3},
      {ip: "123.123.123.123", optionId: 2},
      {ip: "123.123.123.123", optionId: 1},
      {ip: "123.123.123.123", optionId: 11},
      {ip: "123.123.123.123", optionId: 12},
      {ip: "123.123.123.123", optionId: 13},
      {ip: "123.123.123.123", optionId: 14},
      {ip: "123.123.123.123", optionId: 15},
      {ip: "123.123.123.123", optionId: 16},
      {ip: "123.123.123.123", optionId: 17},
      {ip: "123.123.123.123", optionId: 18},
      {ip: "123.123.123.123", optionId: 12},
      {ip: "123.123.123.123", optionId: 15},
    ]);
  })
  .then(() => {
    if(process.env.NODE_ENV =! "test") {
      console.log("DB seeded");
    }
    done();
  }, (err) => {
    throw err;
  });
}