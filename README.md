# WORK IN PROGRESS
# TwitterWeatherBot

A bot that will tweet the weather every 2 hours and works for most cities in the United States. Other optional tweets like alerts and local weather station retweets are available. Check the [configuration](#configuration) section for more info.

## Getting Started
Api keys from Twitter and OpenWeatherMap are needed.  
+ [Register for an OpenWeatherMap developer account](https://home.openweathermap.org/users/sign_up)
+ [Register for a Twitter developer account](https://developer.twitter.com/en/apply)

This service runs on [Node.js](https://nodejs.org/en/download/).  
After cloning, run `npm install` where `package.json` is which should be the root project directory.  
Configure `config.json` with your location and api keys.  

__❗❗❗Make sure `config.json` is not tracked by git. If `git status` shows your config as `modified`, use `git update-index --assume-unchanged config.json` to untrack it. Having the file tracked may expose your API keys.__

## Included Node Packages  
### Dependencies  
[lune](https://www.npmjs.com/package/lune/v/0.4.0) calculates moon phases.  
[Node Schedule](https://www.npmjs.com/package/node-schedule) like cron.  
[Node Windows](https://www.npmjs.com/package/node-windows)  
[Twitter for Node.js](https://www.npmjs.com/package/twitter)  
[Winston](https://www.npmjs.com/package/winston) a logger.  
  
### Developer Dependencies  
[standard js](https://standardjs.com/) A javascript linter.  
[chai js](https://www.chaijs.com/) A BDD / TDD assertion library.  
[mocha js](https://mochajs.org/) A feature-rich JavaScript test framework.  

## Deployment
Running `node index.js` will start up the bot.  
  
vv Not Yet vv  
Running `node windowsInstall.js` will install the bot as a service so it automatically starts when booting your windows machine.  
^^ Planned Feature ^^  
  
### Configuration  
#### Required Configuration:  
##### Logging  
For now the only configuration for logging is to specify a path to where logs will be stored.
The json below will set the logging diectory to `logs/` relative to `index.js`.  

    "log": {
      "logDir": "logs"
    }
  
##### Open Weather Map  
To specify a location for forecasts, `config.weather.openWeatherMap.location` can contain one of the key value pair combinations below.  
Accptable key value pairs are:  

City Name  
`q: "{city name},{country code}"`  
City ID  
A list of city ids can be [downloaded here](http://bulk.openweathermap.org/sample/city.list.json.gz).  
`id: {city id}`  
Geographic Coordinates  
`lat: {lat}`  
`lon: {lon}`  
Zip Code  
`zip: "{zip code},{country code}"`

`config.weather.openWeatherMap.key` will contain the openWeatherMap api key  
  
Example

    "weather":{
      "openWeatherMap": {
        "location": {
          "id": 4381982
        },
        "key": "YOUR API KEY"
      }
    }

##### Twitter  
All four values of `config.twitter` shown below will be keys generated from your twitter developer account.

    "twitter": {
      "consumer_key": "CONSUMER KEY",
      "consumer_secret": "CONSUMER SECRET",
      "access_token_key": "ACCESS TOKEN KEY",
      "access_token_secret": "ACCESS TOKENM SECRET"
    }

#### Optional Configuration:  
##### Alerts  
Alerts are sent out at midnight, 6:00, noon, and 18:00.  
In order to receive alert data from the national weather service, a header containing a contact email, an app name, an app version number, and either a personal website or an app website must be included with each request. These are specified in `config.weather.alerts.app`  
`weather.alerts.params` will contain get parameters to send to api.weather.gov/alerts in the form of key value pairs. More information about valid get paramters and a request tester can be found [here](https://www.weather.gov/documentation/services-web-api#/default/get_alerts) under the "Specification" tab.
  
Example:

    "weather": {
      "alerts": {
        "app": {
          "contact": "yourEmail@example.com",
          "name": "AppName",
          "version": "0.1",
          "website": "www.yourWebsite.com"
        },
        "params": {
          "active": true,
          "area": "MO",
          "status": "actual"
        }
      }
    }

###### Alert Filters

##### Extra Messages  
##### Retweets  

## Contributing
A description with your pull request is fine.
Would be appreciated if it could be deployed as a linux service so it automatically starts on boot. 
