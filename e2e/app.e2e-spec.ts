import { VadaclDemoPage } from './app.po';

describe('vadacl-demo App', () => {
  let page: VadaclDemoPage;

  beforeEach(() => {
    page = new VadaclDemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
