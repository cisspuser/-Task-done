$(document).on("click", "#save_configs", function () {
  const api_token = $("#api_token").val();
  const company_id = $("#company_id").val();

  $.ajax({
    type: "POST",
    url: "/api/settings",
    data: JSON.stringify({
      company_id,
      api_token,
    }),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (data) {
      $("#save_status").html(showStatusMessage("Settings saved successfully!"));
    },
    error: function (errMsg) {
      $("#save_status").html(showStatusMessage("Failed saving settings!"));
    },
  });
});

// Shows a status message
function showStatusMessage(message) {
  return `<div class="alert alert-success alert-dismissible" role="alert"><div>${message}</div><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`;
}
