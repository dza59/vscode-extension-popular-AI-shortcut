// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const sites = require('./sites.json');

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
  const data = sites.map((site) => {
    return {
      label: site.title,
      detail: site.description,
      link: site.link,
    };
  });
  // console.log(data);

  console.log('Congratulations, your extension "ai-link-open" is now active!');

  let disposable = vscode.commands.registerCommand(
    'ai-link-open.AIshortcut',
    async function () {
      const site = await vscode.window.showQuickPick(data, {
        matchOnDetail: true,
      });
      if (site == null) return;
      vscode.window.showInformationMessage('Hello World: ' + site.label);
      vscode.env.openExternal(site.link);

      vscode.window.showInformationMessage('Hello World! Danni');
    },
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
