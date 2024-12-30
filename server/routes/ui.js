const Router = require("express").Router;
const router = new Router();
const db = require("../data/connection");
const util = require("../util/helper");

router.get("/ui/panel", async (req, res) => {
  try { 
    const settings = await db.getSettings(req.query.companyId);

    if (settings.configured) {
      res.render("panel", {});
    } else {
      res.render("settings", {});
    }
  } catch (error) {
    return util.sendErrorResponse(
      "Could not render Custom UI panel",
      error,
      500,
      res
    );
  }
});

router.get("/ui/modal", async (req, res) => {
  try { 

    const domain = process.env.PROJECT_DOMAIN;

    const context = {
      url: `https://${domain}.glitch.me/ui/modal/add?companyId=${req.query.companyId}&selectedIds=${req.query.selectedIds}`,
    };
    res.render("modal", context);
  } catch (error) {
    return util.sendErrorResponse(
      "Could not render the Custom UI modal",
      error,
      500,
      res
    );
  }
});

router.get("/ui/modal/add", async (req, res) => {
  try {

    const context = {
      url: "/api/job",
      company_id: req.query.companyId,
      selected_id: req.query.selectedIds,
    };

    res.render("add-job", context);
  } catch (error) {
    return util.sendErrorResponse(
      "Could not render the Custom UI modal",
      error,
      500,
      res
    );
  }
});

router.get("/ui/settings", async (req, res) => {
  try {

    const settings = await db.getSettings(req.query.companyId);
    
    const context = {
      company_id: req.query.companyId,
      api_token: (settings && settings.api_token) ? settings.api_token : "",
    };

    res.render("settings", context);
  } catch (error) {
    return util.sendErrorResponse(
      "Could not render the settings page",
      error,
      500,
      res
    );
  }
});

module.exports = router;
