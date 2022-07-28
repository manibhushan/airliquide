var AWS = require('aws-sdk');
const fetch = require('node-fetch');
const { v4 : uuidv4 } = require('uuid');
AWS.config.loadFromPath('./config.json');

// Create DynamoDB service object
var ddb = new AWS.DynamoDB({ apiVersion: '2019-11-21' });

const filter_by_year_actor = (year, actor) => {
  var params = {
    ExpressionAttributeValues: {
      ':year' : { N: year }
    },
    KeyConditionExpression: 'year = :year',
    TableName: 'movies'
  };
  
  ddb.query(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      if (!actor) return data;
      const filtered_data = data.Items.map(item => item.cast.inclues(actor));
      return filtered_data;
    }
  });
}

const load_data = async () => {
  const response = await fetch ("https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/movies.json");
  const data = await response.json();

  data.forEach(item => {
    const params = {
      Item: {
        ...item,
        movie_id: uuidv4()
      },
      TableName: 'movies'
    }
    console.log(params);
    ddb.putItem(params, function(err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log(data);
      }
    });
  })
}

module.exports = {
  filter_by_year_actor,
  load_data
}
