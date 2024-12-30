const Router = require("express").Router;
const router = new Router();
const db = require("../data/connection");
const util = require("../util/helper");

router.get("/", async (req, res) => {
  res.send(
    "Welcome to My App in pipedrive. Check the README.md for further details."
  );
});

router.post("/api/settings", async (req, res) => {
  try {
    await db.updateSettings(req.body.company_id, req.body.api_token);
    res.send({ success: true });
  } catch (error) {
    return util.sendErrorResponse(
      "Could not update app settings",
      error,
      500,
      res
    );
  }
});

router.post("/api/job", async (req, res) => {
  try {
    const settings = await db.getSettings(req.body.company_id);
    const dealFields = await util.getdealFields(
      settings.company_domain,
      settings.api_token
    );

    if (
      dealFields &&
      dealFields.data &&
      dealFields.data.data &&
      Array.isArray(dealFields.data.data)
    ) {
      const fields = [
        "firstName",
        "lastName",
        "phone",
        "email",
        "jobType",
        "jobSource",
        "jobDescription",
        "address",
        "city",
        "state",
        "zip",
        "area",
        "startDate",
        "startTime",
        "endTime",
        "testSelect",
      ];
      const newDealsDetals = {};   

      dealFields.data.data
        .filter((e) => fields.includes(e.name))
        .forEach((e) => {
          newDealsDetals[e.key] = req.body[e.name];
        });
 
      await util.updateDealFields(
        settings.company_domain,
        req.body.selected_id,
        settings.api_token,
        newDealsDetals
      );
    }
    res.render("modal-success", {});
  } catch (error) {
    return util.sendErrorResponse("Could not save job", error, 500, res);
  }
});

module.exports = router;
