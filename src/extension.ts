// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import SimpleHtmlParser from './lib';

const parser = new SimpleHtmlParser();

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "get-sass-structure-from-html" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('get-sass-structure-from-html.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from get-sass-structure-from-html!');
	});

	const generateStructure = vscode.commands.registerCommand("get-sass-structure-from-html.generate-structure", (fileUri: vscode.Uri) => {
		const editor = vscode.window.activeTextEditor;
		const tplstring = editor?.document.getText(editor.selection);
		const handler = {
			startElement(sTagName: any, oAttrs: any) {
				let tmp = oAttrs[0].value;
				if (tmp.split(' ').length > 1) {
					tmp.split(' ').forEach((item: any, index: any) => {
						if (index === 0) {
							res += `
							.${item} {`;
						} else {
							res += `
							&.${item} {}`;
						}
					});
				} else {
					res += `
					.${oAttrs[0].value} {`;
				}
			},
			endElement(sTagName: any) {
				res += `
			}`;
			},
			characters: () => { },
			comment: () => { }
		};
		let res = '';
		parser.parse(tplstring, handler);
		vscode.env.clipboard.writeText(res);
		vscode.window.showInformationMessage('已复制');
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(generateStructure);
}

// this method is called when your extension is deactivated
export function deactivate() { }
