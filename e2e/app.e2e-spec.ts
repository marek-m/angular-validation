import { AngularValidationPage } from './app.po';

describe('angular-validation App', () => {
  let page: AngularValidationPage;

  beforeEach(() => {
    page = new AngularValidationPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
