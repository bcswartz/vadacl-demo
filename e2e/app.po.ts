import { browser, by, element } from 'protractor';

export class VadaclDemoPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root div.container-fluid h2')).getText();
  }
}
