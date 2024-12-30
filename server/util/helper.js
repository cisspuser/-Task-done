const axios = require("axios");

async function getdealFields(company_domain, api_token) {
  return doRequest(
    "GET",
    `https://${company_domain}.pipedrive.com/api/v1/dealFields:(key,name)?api_token=${api_token}`
  );
}

async function updateDealFields(company_domain, deal_id, api_token, data) {
  return doRequest(
    "PUT",
    `https://${company_domain}.pipedrive.com/api/v1/deals/${deal_id}?api_token=${api_token}`,
    data
  );
}

async function doRequest(method, url, data) {
  try {
    const request = {
      method,
      url,
    };
    if (data) {
      request.data = data;
    }
    return axios(request);
  } catch (error) {
    throw new Error(`API request to ${url} failed`);
  }
}

function sendErrorResponse(name, detail, status_code, response) { 
  response.status(status_code).send({
    success: false,
    message: name,
  });
}

module.exports = {
  getdealFields,
  updateDealFields,
  sendErrorResponse,
};
