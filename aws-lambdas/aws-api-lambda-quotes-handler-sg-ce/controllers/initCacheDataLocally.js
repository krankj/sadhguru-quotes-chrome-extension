const createError = require("http-errors");
const asyncHandler = require("express-async-handler");
const fs = require("fs").promises;
const config = require("../config");
const lockfile = require("proper-lockfile");
const logger = require("log4js").getLogger();
logger.level = "debug";
const { fetchDataFromDb, cacheDataLocally } = require("../utils");

/**
 * @author Sudarshan K J <kjsudi@gmail.com>
 */

/*
Note: All unexpected errors arising out of failing await statements or otherwise are captured by asyncHandler, 
passes the error object to the custom error handler defined at the bottom of this page.
*/
const initCacheDataLocally = asyncHandler(async (req, res, next) => {
  logger.info("[ Cache Data Locally Request - START ]");

  /* File is checked if present, and only then created in the following catch block. 
    Not doing this would create a dummy file everytime with the value 'undefined'
    causing JSON.parse in the /query api to break while reading from the file*/
  try {
    await fs.access(config.LOCAL_CACHE_FILE_NAME);
  } catch {
    logger.info("< Creating new empty file >");
    await fs.writeFile(config.LOCAL_CACHE_FILE_NAME, "");
  }

  let data;
  try {
    data = await fetchDataFromDb();
  } catch {
    throw createError(e);
  }

  let release = await lockfile.lock(config.LOCAL_CACHE_FILE_NAME);
  /*
     We had to wrap the 'cacheDataLocally()' call in a try/catch block 
     since not doing so would keep the HTTP request hanging if an error occurs in the function cacheDataLocally
     We now throw an error received from the function and respond to the caller with the error stack. 
     Finally, the file lock is released regardless of the operation status.
    */
  try {
    await cacheDataLocally(data);
  } catch (e) {
    throw createError(e);
  } finally {
    release();
  }
  logger.info("[ Cache Data Locally Request - END ]");
  return res.status(200).send({
    message: "Successfully saved fetched data from db to local file cache",
  });
});

module.exports = initCacheDataLocally;
