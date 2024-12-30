const User = require("./user");
const util = require("../util/helper");

User.sync();

const getSettings = async (company_id) => {
  try {
    const record = await User.findOne({
      where: {
        company_id,
      },
    });
    if (record && record.dataValues.settings) {
      return {
        configured: true,
        api_token: record.dataValues.settings,
        company_domain: record.dataValues.company_domain,
      };
    } else {
      return {
        configured: false,
      };
    }
  } catch (error) {
    throw new Error("Getting app settings from database failed");
  }
};

const createCompany = async (company, token) => {
  try {
    await User.upsert({
      company_id: company.company_id,
      company_domain: company.company_domain,
      settings: null,
    });
  } catch (error) {
    throw new Error("Getting app settings from database failed");
  }
};

const updateSettings = async (company_id, api_token) => {
  try {
    await User.update({ settings: api_token }, { where: { company_id } });
  } catch (error) {
    throw new Error("Updating app settings in the database failed");
  }
};

module.exports = {
  getSettings,
  createCompany,
  updateSettings,
};
