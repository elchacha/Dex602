# Salesforce DX Project: Next Steps

Now that you’ve created a Salesforce DX project, what’s next? Here are some documentation resources to get you started.

## How Do You Plan to Deploy Your Changes?

Do you want to deploy a set of changes, or create a self-contained application? Choose a [development model](https://developer.salesforce.com/tools/vscode/en/user-guide/development-models).

## Configure Your Salesforce DX Project

The `sfdx-project.json` file contains useful configuration information for your project. See [Salesforce DX Project Configuration](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_ws_config.htm) in the _Salesforce DX Developer Guide_ for details about this file.

## Read All About It

- [Salesforce Extensions Documentation](https://developer.salesforce.com/tools/vscode/)
- [Salesforce CLI Setup Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm)
- [Salesforce DX Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_intro.htm)
- [Salesforce CLI Command Reference](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference.htm)


# Contenu du repository :
 
## ./lwcOpener:
contient un lien vers un runner de js et le code js à écrire pour générer dynamiquement l'url d'un lwc avec les paramètres publiques si il y'en a

## /scripts/preventRedirection.txt
Indication sur ouvrir un record en création et empecher la redirection vers le dit record au moment du save

## /scripts/apex/pushTopic.apex
code apex pour générer un pushTopic sur une org. Permet de génerer des event coté backend qui pourront etre intercepté via le front end

## /force-app/main/default/lwc/fakeScreenAction
composant lwc qui permet de réaliser une "headless action" avec un spinner 

## /force-app/main/default/lwc/studentBrowserForm
modification du composant initial pour mettre en pratique 4 solutions pour forcer un refresh coté front
