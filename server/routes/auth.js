const Router = require("express").Router;
const router = new Router();
const pipedrive = require("pipedrive");
const db = require("../data/connection");
const util = require("../util/helper");
const jwt = require("jsonwebtoken");
 
router.get("/auth/callback", async (req, res) => {
  const apiClient = pipedrive.ApiClient.instance;
  let oauth2 = apiClient.authentications.oauth2;
  oauth2.clientId = process.env.CLIENT_ID;
  oauth2.clientSecret = process.env.CLIENT_SECRET;
  oauth2.redirectUri = `https://${process.env.PROJECT_DOMAIN}.glitch.me/auth/callback`;

  if (req.query.code) {
    try {
      const token = await apiClient.authorize(req.query.code);
      const userAPIInstance = new pipedrive.UsersApi();
      const loggedInUser = await userAPIInstance.getCurrentUser();
      await db.createCompany(loggedInUser.data, token);
      let settingsPage = `https://${loggedInUser.data.company_domain}.pipedrive.com/settings/marketplace/app/${process.env.CLIENT_ID}/app-settings`;

      return res.status(200).redirect(settingsPage);
    } catch (error) {
      return util.sendErrorResponse(
        "Authorization with Pipedrive failed",
        error,
        401,
        res
      );
    }
  } else {
    return res.status(400);
  }
});

router.use("/ui/*", (req, res, next) => {
  if (process.env.JWT_SECRET)
    try {
      jwt.verify(req.query.token, process.env.JWT_SECRET);
      next();
    } catch (error) {
      return util.sendErrorResponse("JWT Verfication Failed", error, 401, res);
    }
  else next();
});

module.exports = router;
