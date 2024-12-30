(async function () {
  const sdk = await new AppExtensionsSdk().initialize();
  await sdk.execute(AppExtensionsSdk.Command.RESIZE, {
    width: 1000,
    height: 600,
  });

  window.document.addEventListener("closeModalWindow", async function () {
    const sdk = await new AppExtensionsSdk().initialize();
    await sdk.execute(AppExtensionsSdk.Command.CLOSE_MODAL);
    await sdk.execute(Command.REDIRECT_TO, { view: View.DEALS });
  });
})();
