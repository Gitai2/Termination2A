import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import Termination2A from './components/Termination2A';
import { ITermination2AProps } from './components/Termination2A';

export interface ITermination2AWebPartProps {
  functionUrl: string;
}

export default class Termination2AWebPart extends BaseClientSideWebPart<ITermination2AWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ITermination2AProps> = React.createElement(
      Termination2A,
      {
        functionUrl: this.properties.functionUrl
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "Termination2A Configuration"
          },
          groups: [
            {
              groupName: "Function Settings",
              groupFields: [
                PropertyPaneTextField('functionUrl', {
                  label: "GetAllEmployees API URL"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
