const config = {
  deps:
    process.env.NODE_ENV === "development"
      ? {
          API_ENDPOINT:
            "https://khu95sfrxj.execute-api.ap-south-1.amazonaws.com/dev",
        }
      : {
          API_ENDPOINT:
            "https://b3c7gkzt1f.execute-api.ap-south-1.amazonaws.com/prod",
        },
  SG_PRIVATE_KEY: "$@dhGuRu",
  //24hr = 1440 + 15min(buffer)
  //Tweets are posted exactly at 2:45 GMT everyday, so we triggger an api call only after 3:00GMT the next day
  ADD_MINS_TO_TRIGGER: 1455,
  CHROME_EXT_URL: "https://bit.ly/3wavtTD",
};

export default config;
